export function TagPill({ label }: { label: string }) {
  return (
    <span className="rounded-full border border-ink/10 bg-white/70 px-3 py-1 text-xs font-medium text-ink/70">
      {label}
    </span>
  );
}
