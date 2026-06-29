const BASE = import.meta.env.VITE_ASSETS_BASE_URL || '';

export function assetUrl(path) {
  return BASE ? `${BASE}${path}` : path;
}
