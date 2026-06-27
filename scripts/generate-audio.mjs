import { spawn } from "node:child_process";
import { mkdir, mkdtemp, rm, stat, writeFile } from "node:fs/promises";
import { readFileSync } from "node:fs";
import { homedir, tmpdir } from "node:os";
import { join } from "node:path";

const root = process.cwd();
const dataPath = join(root, "src/data/pois.ts");
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

function readPoiAudioJobs() {
  const source = readFileSync(dataPath, "utf8");
  const jobs = [];
  const entryPattern =
    /{\s*id:\s*"([^"]+)"[\s\S]*?title:\s*"([^"]+)"[\s\S]*?script:\s*\n\s*"([^"]+)"[\s\S]*?audioUrl:\s*"([^"]+)"/g;

  for (const match of source.matchAll(entryPattern)) {
    const [, id, title, script, audioUrl] = match;
    jobs.push({
      id,
      title,
      script,
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
  const entryPattern =
    /{\s*slug:\s*"([^"]+)"[\s\S]*?name:\s*"([^"]+)"[\s\S]*?guideScript:\s*\n\s*"([^"]+)"[\s\S]*?guideAudioUrl:\s*"([^"]+)"/g;

  for (const match of source.matchAll(entryPattern)) {
    const [, slug, name, script, audioUrl] = match;
    jobs.push({
      id: `intro-${slug}`,
      title: `${name}介绍`,
      script,
      output: join(root, "public", audioUrl.replace(/^\//, ""))
    });
  }

  if (jobs.length === 0) {
    throw new Error("No destination audio jobs found.");
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
const jobs = [...readDestinationAudioJobs(), ...readPoiAudioJobs()];

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
