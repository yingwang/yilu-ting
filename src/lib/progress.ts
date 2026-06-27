const STORAGE_KEY = "yilu-ting-listened";
const LAST_POI_KEY = "yilu-ting-last-poi";

function canUseLocalStorage() {
  return typeof window !== "undefined" && "localStorage" in window;
}

export function getListenedPoiIds(): string[] {
  if (!canUseLocalStorage()) {
    return [];
  }

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    const parsed = stored ? JSON.parse(stored) : [];
    return Array.isArray(parsed) ? parsed.filter((id): id is string => typeof id === "string") : [];
  } catch {
    return [];
  }
}

export function getListenedIds(): string[] {
  return getListenedPoiIds();
}

export function isPoiListened(id: string) {
  return getListenedPoiIds().includes(id);
}

// Supabase sync can replace this localStorage implementation later while keeping the same public helpers.
export function markPoiAsListened(id: string, listened = true) {
  if (!canUseLocalStorage()) {
    return;
  }

  try {
    const current = new Set(getListenedPoiIds());
    if (listened) {
      current.add(id);
      window.localStorage.setItem(LAST_POI_KEY, id);
    } else {
      current.delete(id);
      if (window.localStorage.getItem(LAST_POI_KEY) === id) {
        window.localStorage.removeItem(LAST_POI_KEY);
      }
    }
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(current)));
    window.dispatchEvent(new Event("yilu-ting-progress"));
  } catch {
    return;
  }
}

export function setPoiListened(id: string, listened = true) {
  markPoiAsListened(id, listened);
}

export function getLastPoiId() {
  if (!canUseLocalStorage()) {
    return null;
  }
  try {
    return window.localStorage.getItem(LAST_POI_KEY);
  } catch {
    return null;
  }
}
