"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import { louvreMapPins, louvreMapZones, louvreWings, type LouvreWingId } from "@/data/louvre";
import { getLouvreGuideItemById } from "@/data/louvreGuide";

type Selection =
  | {
      type: "wing";
      itemId: string;
      wing: LouvreWingId;
    }
  | {
      type: "pin";
      pinId: string;
    };

const levels = ["全部", "Level -1", "Level 0", "Level 1", "Level 2"];

const wingShapes: Array<{
  wing: LouvreWingId;
  itemId: string;
  label: string;
  d: string;
  labelX: number;
  labelY: number;
  fill: string;
  stroke: string;
}> = [
  {
    wing: "richelieu",
    itemId: "louvre-richelieu-wing",
    label: "Richelieu 翼",
    d: "M34 34 H322 Q330 34 330 42 V94 Q330 102 322 102 H260 V132 H210 V102 H42 Q34 102 34 94 Z",
    labelX: 176,
    labelY: 68,
    fill: "#efe2c4",
    stroke: "#c69b5b"
  },
  {
    wing: "sully",
    itemId: "louvre-sully-wing",
    label: "Sully 翼",
    d: "M244 96 H326 Q334 96 334 104 V184 Q334 192 326 192 H250 Q242 192 242 184 V158 H214 V130 H242 V104 Q242 96 244 96 Z",
    labelX: 292,
    labelY: 146,
    fill: "#dde6df",
    stroke: "#526459"
  },
  {
    wing: "denon",
    itemId: "louvre-denon-wing",
    label: "Denon 翼",
    d: "M42 178 H210 V148 H260 V178 H322 Q330 178 330 186 V238 Q330 246 322 246 H34 V186 Q34 178 42 178 Z",
    labelX: 176,
    labelY: 214,
    fill: "#ead6d2",
    stroke: "#8f4b45"
  }
];

const wingColor: Record<LouvreWingId, string> = {
  denon: "#8f4b45",
  sully: "#526459",
  richelieu: "#c69b5b"
};

const levelLabel: Record<string, string> = {
  "Level -1": "-1",
  "Level 0": "0",
  "Level 1": "1",
  "Level 2": "2"
};

export function LouvreInteractiveMap({ basePath }: { basePath: string }) {
  const [activeLevel, setActiveLevel] = useState("全部");
  const [selection, setSelection] = useState<Selection>({
    type: "wing",
    itemId: "louvre-denon-wing",
    wing: "denon"
  });

  const visiblePins = useMemo(() => {
    if (activeLevel === "全部") {
      return louvreMapPins;
    }
    return louvreMapPins.filter((pin) => pin.level === activeLevel);
  }, [activeLevel]);

  const selectedPin =
    selection.type === "pin" ? louvreMapPins.find((pin) => pin.id === selection.pinId) : undefined;
  const selectedWing =
    selection.type === "wing" ? louvreWings.find((wing) => wing.id === selection.wing) : undefined;
  const selectedItem = getLouvreGuideItemById(
    selection.type === "pin" ? selectedPin?.itemId ?? "" : selection.itemId
  );
  const selectedWingZones =
    selection.type === "wing" ? louvreMapZones.filter((zone) => zone.wing === selection.wing) : [];

  const selectedItemHref = selectedItem ? `${basePath}/items/${selectedItem.id}` : undefined;
  const showPinLabels = activeLevel !== "全部";

  return (
    <section className="rounded-[0.5rem] border border-ink/10 bg-white/75 p-5 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-moss">
            Louvre map
          </p>
          <h2 className="mt-2 text-xl font-semibold text-ink">卢浮宫互动地图</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {levels.map((level) => (
            <button
              key={level}
              type="button"
              onClick={() => setActiveLevel(level)}
              className={`rounded-full px-3 py-1 text-xs font-medium ring-1 ring-ink/10 ${
                activeLevel === level ? "bg-ink text-white" : "bg-white/75 text-ink/55"
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      <p className="mt-3 text-sm leading-7 text-ink/60">
        点选三翼或作品圆点，查看所在区域和语音导览。筛选楼层后会显示更多展品标签。
      </p>

      <div className="mt-5 overflow-hidden rounded-[0.75rem] border border-ink/10 bg-[#f6efe3] shadow-inner">
        <svg viewBox="0 0 360 292" role="img" aria-label="卢浮宫三翼互动示意图" className="h-auto w-full">
          <defs>
            <pattern id="louvre-grid" width="18" height="18" patternUnits="userSpaceOnUse">
              <path d="M18 0H0V18" fill="none" stroke="#e3d7c5" strokeWidth="0.55" />
            </pattern>
            <filter id="map-shadow" x="-10%" y="-10%" width="120%" height="130%">
              <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#1f2933" floodOpacity="0.12" />
            </filter>
          </defs>

          <rect x="0" y="0" width="360" height="292" fill="#f7f2ea" />
          <rect x="0" y="0" width="360" height="292" fill="url(#louvre-grid)" opacity="0.55" />

          <path d="M0 260 C70 242 136 270 207 252 C268 236 309 242 360 224 V292 H0 Z" fill="#d9e5e8" />
          <path d="M0 260 C70 242 136 270 207 252 C268 236 309 242 360 224" fill="none" stroke="#8fa0a8" strokeWidth="1.2" />
          <text x="296" y="266" className="fill-ink/45 text-[9px] font-medium">
            Seine
          </text>

          <rect x="88" y="106" width="148" height="70" rx="14" fill="#fff7ea" stroke="#d9c7aa" strokeWidth="1.2" />
          <rect x="104" y="118" width="116" height="46" rx="10" fill="#f7f2ea" stroke="#e0d2bd" strokeDasharray="3 3" />
          <text x="162" y="134" textAnchor="middle" className="fill-ink text-[10px] font-semibold">
            Cour Napoléon
          </text>
          <polygon points="162,142 184,164 140,164" fill="#d8e0e4" stroke="#7c8d96" strokeWidth="1.1" />
          <path d="M162 142 L162 164 M151 153 H173" stroke="#aab8bf" strokeWidth="0.8" />
          <text x="162" y="174" textAnchor="middle" className="fill-ink/50 text-[8px]">
            Pyramid Entrance
          </text>

          <rect x="242" y="114" width="70" height="48" rx="10" fill="#fffaf0" stroke="#d9c7aa" strokeWidth="1" />
          <text x="277" y="142" textAnchor="middle" className="fill-ink/45 text-[8px]">
            Cour Carrée
          </text>

          {wingShapes.map((shape) => {
            const isActive = selection.type === "wing" && selection.itemId === shape.itemId;
            return (
              <g
                key={shape.itemId}
                role="button"
                tabIndex={0}
                aria-label={`选择 ${shape.label}`}
                onClick={() =>
                  setSelection({ type: "wing", itemId: shape.itemId, wing: shape.wing })
                }
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    setSelection({ type: "wing", itemId: shape.itemId, wing: shape.wing });
                  }
                }}
                className="cursor-pointer outline-none"
                filter="url(#map-shadow)"
              >
                <path
                  d={shape.d}
                  fill={shape.fill}
                  stroke={isActive ? "#1f2933" : shape.stroke}
                  strokeWidth={isActive ? 3 : 1.4}
                />
                <path d={shape.d} fill="none" stroke="#ffffff" strokeOpacity="0.45" strokeWidth="4" />
                <text
                  x={shape.labelX}
                  y={shape.labelY}
                  textAnchor="middle"
                  className="pointer-events-none fill-ink text-[12px] font-semibold"
                >
                  {shape.label}
                </text>
              </g>
            );
          })}

          <path d="M74 102 V178 M286 102 V178 M76 178 H286 M76 102 H286" fill="none" stroke="#cdbb9d" strokeWidth="0.8" strokeDasharray="4 5" />
          <text x="36" y="270" className="fill-ink/45 text-[8px]">
            示意图：三翼相对位置与重点展品点位
          </text>

          {visiblePins.map((pin) => {
            const isActive = selection.type === "pin" && selection.pinId === pin.id;
            const labelIsVisible = showPinLabels || isActive;
            return (
              <g
                key={pin.id}
                role="button"
                tabIndex={0}
                aria-label={`选择 ${pin.label}`}
                onClick={() => setSelection({ type: "pin", pinId: pin.id })}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    setSelection({ type: "pin", pinId: pin.id });
                  }
                }}
                className="cursor-pointer outline-none"
              >
                {labelIsVisible ? (
                  <g>
                    <rect
                      x={pin.x - 19}
                      y={pin.y - 24}
                      width="38"
                      height="13"
                      rx="6.5"
                      fill="#fffaf0"
                      stroke="#dcc9ac"
                    />
                    <text
                      x={pin.x}
                      y={pin.y - 15}
                      textAnchor="middle"
                      className="pointer-events-none fill-ink text-[7px] font-semibold"
                    >
                      {pin.shortLabel}
                    </text>
                  </g>
                ) : null}
                <circle
                  cx={pin.x}
                  cy={pin.y}
                  r={isActive ? 9 : 6.5}
                  fill="#ffffff"
                  stroke={wingColor[pin.wing]}
                  strokeWidth={isActive ? 4 : 2.5}
                />
                <circle cx={pin.x} cy={pin.y} r={3} fill={wingColor[pin.wing]} />
                <text
                  x={pin.x}
                  y={pin.y + 2.7}
                  textAnchor="middle"
                  className="pointer-events-none fill-white text-[5px] font-bold"
                >
                  {levelLabel[pin.level] ?? ""}
                </text>
              </g>
            );
          })}

          <g transform="translate(22 116)">
            <rect width="70" height="54" rx="10" fill="#fffaf0" stroke="#ddcfba" />
            <text x="12" y="16" className="fill-ink/55 text-[8px] font-semibold">
              图例
            </text>
            <circle cx="14" cy="29" r="4" fill="#8f4b45" />
            <text x="24" y="32" className="fill-ink/55 text-[7px]">Denon</text>
            <circle cx="14" cy="42" r="4" fill="#526459" />
            <text x="24" y="45" className="fill-ink/55 text-[7px]">Sully</text>
          </g>
        </svg>
      </div>

      <div className="mt-4 rounded-[0.5rem] border border-ink/10 bg-paper/80 p-4">
        {selectedItem ? (
          <>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-moss">
              {selectedItem.kind} · {selectedItem.group}
            </p>
            <h3 className="mt-2 text-lg font-semibold text-ink">{selectedItem.title}</h3>
            <p className="mt-2 text-sm leading-7 text-ink/65">{selectedItem.subtitle}</p>
            {selectedPin ? (
              <p className="mt-2 text-xs text-ink/45">
                {selectedPin.level}
                {selectedPin.roomHint ? ` · ${selectedPin.roomHint}` : ""}
              </p>
            ) : null}
            {selectedWing ? (
              <div className="mt-3 space-y-2">
                <p className="text-sm leading-7 text-ink/60">{selectedWing.description}</p>
                {selectedWingZones.map((zone) => (
                  <p key={`${zone.level}-${zone.roomRange}`} className="text-xs leading-6 text-ink/45">
                    {zone.level} · Rooms {zone.roomRange} · {zone.title}
                  </p>
                ))}
              </div>
            ) : null}
            {selectedItemHref ? (
              <Link
                href={selectedItemHref}
                className="mt-4 inline-flex items-center gap-2 rounded-[0.5rem] bg-ink px-4 py-2.5 text-sm font-semibold text-white"
              >
                打开解说
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            ) : null}
          </>
        ) : (
          <p className="text-sm text-ink/60">请选择地图上的一个区域或展品。</p>
        )}
      </div>
    </section>
  );
}
