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
  x: number;
  y: number;
  width: number;
  height: number;
  fill: string;
  stroke: string;
}> = [
  {
    wing: "richelieu",
    itemId: "louvre-richelieu-wing",
    label: "Richelieu",
    x: 36,
    y: 36,
    width: 288,
    height: 56,
    fill: "#efe2c4",
    stroke: "#c69b5b"
  },
  {
    wing: "sully",
    itemId: "louvre-sully-wing",
    label: "Sully",
    x: 242,
    y: 92,
    width: 82,
    height: 92,
    fill: "#dde6df",
    stroke: "#526459"
  },
  {
    wing: "denon",
    itemId: "louvre-denon-wing",
    label: "Denon",
    x: 36,
    y: 184,
    width: 288,
    height: 56,
    fill: "#ead6d2",
    stroke: "#8f4b45"
  }
];

const wingColor: Record<LouvreWingId, string> = {
  denon: "#8f4b45",
  sully: "#526459",
  richelieu: "#c69b5b"
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

  return (
    <section className="rounded-[0.5rem] border border-ink/10 bg-white/75 p-5 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-moss">
            In-app interactive map
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
        这是应用内简化示意图，用来帮助理解三翼和重点展品的相对关系。点三翼区域或圆点查看说明，再进入对应语音导览。
      </p>

      <div className="mt-5 overflow-hidden rounded-[0.5rem] border border-ink/10 bg-paper">
        <svg viewBox="0 0 360 276" role="img" aria-label="卢浮宫三翼互动示意图" className="h-auto w-full">
          <rect x="0" y="0" width="360" height="276" fill="#f7f2ea" />
          <rect x="92" y="94" width="152" height="88" rx="12" fill="#fffaf0" stroke="#d8c8ad" />
          <text x="168" y="124" textAnchor="middle" className="fill-ink text-[10px] font-semibold">
            Cour Napoléon
          </text>
          <polygon points="168,136 188,170 148,170" fill="#d8e0e4" stroke="#8fa0a8" />
          <text x="168" y="198" textAnchor="middle" className="fill-ink/50 text-[9px]">
            金字塔入口
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
              >
                <rect
                  x={shape.x}
                  y={shape.y}
                  width={shape.width}
                  height={shape.height}
                  rx="12"
                  fill={shape.fill}
                  stroke={isActive ? "#1f2933" : shape.stroke}
                  strokeWidth={isActive ? 3 : 1.5}
                />
                <text
                  x={shape.x + shape.width / 2}
                  y={shape.y + shape.height / 2 + 4}
                  textAnchor="middle"
                  className="pointer-events-none fill-ink text-[13px] font-semibold"
                >
                  {shape.label}
                </text>
              </g>
            );
          })}

          {visiblePins.map((pin) => {
            const isActive = selection.type === "pin" && selection.pinId === pin.id;
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
                <circle
                  cx={pin.x}
                  cy={pin.y}
                  r={isActive ? 8 : 6}
                  fill={wingColor[pin.wing]}
                  stroke="#fff"
                  strokeWidth="2"
                />
                <text
                  x={pin.x}
                  y={pin.y - 10}
                  textAnchor="middle"
                  className="pointer-events-none fill-ink text-[8px] font-semibold"
                >
                  {pin.shortLabel}
                </text>
              </g>
            );
          })}
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
