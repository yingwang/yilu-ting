import { spawn } from "node:child_process";
import { mkdir, mkdtemp, rm, stat, writeFile } from "node:fs/promises";
import { existsSync, readFileSync } from "node:fs";
import { homedir, tmpdir } from "node:os";
import { join } from "node:path";

const root = process.cwd();
const dataPath = join(root, "src/data/pois.ts");
const guidePath = join(root, "src/data/spotGuide.ts");
const louvreGuidePath = join(root, "src/data/louvreGuide.ts");
const louvreGuideExtraPath = join(root, "src/data/louvreGuideExtra.ts");
const voice = process.env.YILU_TTS_VOICE || "zh-CN-XiaoxiaoNeural";
const rate = process.env.YILU_TTS_RATE || "-8%";
const force = process.argv.includes("--force");

async function pathExists(path) {
  try {
    await stat(path);
    return true;
  } catch {
    return false;
  }
}

async function findEdgeTtsBin() {
  if (process.env.YILU_TTS_BIN) {
    return process.env.YILU_TTS_BIN;
  }

  const candidates = [
    join(homedir(), "Library", "Python", "3.9", "bin", "edge-tts"),
    join(homedir(), "Library", "Python", "3.10", "bin", "edge-tts"),
    join(homedir(), "Library", "Python", "3.11", "bin", "edge-tts"),
    join(homedir(), "Library", "Python", "3.12", "bin", "edge-tts"),
    "/opt/homebrew/bin/edge-tts",
    "/usr/local/bin/edge-tts",
    "edge-tts"
  ];

  for (const candidate of candidates) {
    if (candidate === "edge-tts" || await pathExists(candidate)) {
      return candidate;
    }
  }

  return "edge-tts";
}

function parseQuotedString(source, start) {
  let index = start + 1;
  let value = "";

  while (index < source.length) {
    const char = source[index];
    if (char === "\\") {
      value += char + source[index + 1];
      index += 2;
      continue;
    }
    if (char === "\"") {
      return {
        end: index + 1,
        value: JSON.parse(`"${value}"`)
      };
    }
    value += char;
    index += 1;
  }

  throw new Error("Unterminated string in guide copy.");
}

function skipWhitespaceAndCommas(source, start) {
  let index = start;
  while (index < source.length && /[\s,]/.test(source[index])) {
    index += 1;
  }
  return index;
}

function extractRecordBody(source, exportName) {
  const marker = `export const ${exportName}`;
  const markerIndex = source.indexOf(marker);
  if (markerIndex === -1) {
    throw new Error(`Could not find ${exportName}.`);
  }

  const openIndex = source.indexOf("{", markerIndex);
  if (openIndex === -1) {
    throw new Error(`Could not find ${exportName} body.`);
  }

  let depth = 0;
  let inString = false;
  let escaped = false;

  for (let index = openIndex; index < source.length; index += 1) {
    const char = source[index];

    if (inString) {
      if (escaped) {
        escaped = false;
      } else if (char === "\\") {
        escaped = true;
      } else if (char === "\"") {
        inString = false;
      }
      continue;
    }

    if (char === "\"") {
      inString = true;
      continue;
    }

    if (char === "{") {
      depth += 1;
    } else if (char === "}") {
      depth -= 1;
      if (depth === 0) {
        return source.slice(openIndex + 1, index);
      }
    }
  }

  throw new Error(`Could not parse ${exportName} body.`);
}

function parseStringArrayRecord(source) {
  const record = new Map();
  let index = 0;

  while (index < source.length) {
    index = skipWhitespaceAndCommas(source, index);
    if (index >= source.length) {
      break;
    }

    let key;
    if (source[index] === "\"") {
      const parsed = parseQuotedString(source, index);
      key = parsed.value;
      index = parsed.end;
    } else {
      const match = source.slice(index).match(/^([A-Za-z0-9_-]+)/);
      if (!match) {
        break;
      }
      key = match[1];
      index += key.length;
    }

    index = skipWhitespaceAndCommas(source, index);
    if (source[index] !== ":") {
      throw new Error(`Expected ':' after ${key}.`);
    }
    index += 1;
    index = skipWhitespaceAndCommas(source, index);
    if (source[index] !== "[") {
      throw new Error(`Expected string array for ${key}.`);
    }

    index += 1;
    const paragraphs = [];
    while (index < source.length) {
      index = skipWhitespaceAndCommas(source, index);
      if (source[index] === "]") {
        index += 1;
        break;
      }
      if (source[index] !== "\"") {
        throw new Error(`Expected paragraph string for ${key}.`);
      }
      const parsed = parseQuotedString(source, index);
      paragraphs.push(parsed.value);
      index = parsed.end;
    }

    record.set(key, paragraphs.join("\n\n"));
  }

  return record;
}

function readGuideCopyOverrides() {
  const source = readFileSync(guidePath, "utf8");
  return {
    destinations: parseStringArrayRecord(extractRecordBody(source, "destinationGuideCopy")),
    pois: parseStringArrayRecord(extractRecordBody(source, "poiGuideCopy"))
  };
}

function readPoiAudioJobs() {
  const source = readFileSync(dataPath, "utf8");
  const jobs = [];
  const overrides = readGuideCopyOverrides().pois;
  const entryPattern =
    /{\s*id:\s*"([^"]+)"[\s\S]*?title:\s*"([^"]+)"[\s\S]*?script:\s*\n\s*"([^"]+)"[\s\S]*?audioUrl:\s*"([^"]+)"/g;

  for (const match of source.matchAll(entryPattern)) {
    const [, id, title, script, audioUrl] = match;
    jobs.push({
      id,
      title,
      script: overrides.get(id) || script,
      output: join(root, "public", audioUrl.replace(/^\//, ""))
    });
  }

  if (jobs.length === 0) {
    throw new Error("No POI audio jobs found.");
  }

  return jobs;
}

function readDestinationAudioJobs() {
  const source = readFileSync(dataPath, "utf8");
  const jobs = [];
  const overrides = readGuideCopyOverrides().destinations;
  const entryPattern =
    /{\s*slug:\s*"([^"]+)"[\s\S]*?name:\s*"([^"]+)"[\s\S]*?guideScript:\s*\n\s*"([^"]+)"[\s\S]*?guideAudioUrl:\s*"([^"]+)"/g;

  for (const match of source.matchAll(entryPattern)) {
    const [, slug, name, script, audioUrl] = match;
    jobs.push({
      id: `intro-${slug}`,
      title: `${name}介绍`,
      script: overrides.get(slug) || script,
      output: join(root, "public", audioUrl.replace(/^\//, ""))
    });
  }

  if (jobs.length === 0) {
    throw new Error("No destination audio jobs found.");
  }

  return jobs;
}

function readLouvreTitles(source) {
  const titles = new Map();
  const entryPattern = /{\s*id:\s*"([^"]+)"[\s\S]*?title:\s*"([^"]+)"/g;

  for (const match of source.matchAll(entryPattern)) {
    const [, id, title] = match;
    titles.set(id, title);
  }

  return titles;
}

function tryParseStringArrayRecord(source, exportName) {
  try {
    return parseStringArrayRecord(extractRecordBody(source, exportName));
  } catch (error) {
    if (String(error.message || error).includes(`Could not find ${exportName}`)) {
      return new Map();
    }
    throw error;
  }
}

function readLouvreAudioJobs() {
  const jobs = [];
  const sources = [
    {
      path: louvreGuidePath,
      destinationExport: "louvreDestinationGuideCopy",
      poiExport: "louvrePoiGuideCopy"
    },
    {
      path: louvreGuideExtraPath,
      destinationExport: "louvreDestinationGuideCopyExtra",
      poiExport: "louvrePoiGuideCopyExtra"
    }
  ];

  for (const sourceConfig of sources) {
    if (!existsSync(sourceConfig.path)) {
      continue;
    }

    const source = readFileSync(sourceConfig.path, "utf8");
    const destinations = tryParseStringArrayRecord(source, sourceConfig.destinationExport);
    const pois = tryParseStringArrayRecord(source, sourceConfig.poiExport);
    const titles = readLouvreTitles(source);

    for (const [slug, script] of destinations.entries()) {
      jobs.push({
        id: `intro-${slug}`,
        title: slug === "louvre" ? "卢浮宫整体介绍" : `${slug}介绍`,
        script,
        output: join(root, "public", "audio", `intro-${slug}.mp3`)
      });
    }

    for (const [id, script] of pois.entries()) {
      jobs.push({
        id,
        title: titles.get(id) || id,
        script,
        output: join(root, "public", "audio", `${id}.mp3`)
      });
    }
  }

  return jobs;
}

async function synthesize(bin, job) {
  const dir = await mkdtemp(join(tmpdir(), "yilu-tts-"));
  const textPath = join(dir, `${job.id}.txt`);
  await writeFile(textPath, job.script, "utf8");

  try {
    await new Promise((resolve, reject) => {
      const child = spawn(
        bin,
        [
          "--voice",
          voice,
          `--rate=${rate}`,
          "--file",
          textPath,
          "--write-media",
          job.output
        ],
        { stdio: ["ignore", "pipe", "pipe"] }
      );

      let stderr = "";
      child.stderr.on("data", (chunk) => {
        stderr += chunk.toString();
      });
      child.on("error", reject);
      child.on("close", (code) => {
        if (code === 0) {
          resolve();
        } else {
          reject(new Error(`${job.id} failed with exit ${code}: ${stderr.slice(-800)}`));
        }
      });
    });
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
}

const bin = await findEdgeTtsBin();
const jobs = [...readDestinationAudioJobs(), ...readPoiAudioJobs(), ...readLouvreAudioJobs()];

await mkdir(join(root, "public/audio"), { recursive: true });
console.log(`Generating ${jobs.length} files with ${voice} at ${rate}`);

for (const [index, job] of jobs.entries()) {
  if (!force && await pathExists(job.output)) {
    console.log(`[${index + 1}/${jobs.length}] skip ${job.id}`);
    continue;
  }

  console.log(`[${index + 1}/${jobs.length}] ${job.id} - ${job.title}`);
  await rm(job.output, { force: true });
  await synthesize(bin, job);
}
