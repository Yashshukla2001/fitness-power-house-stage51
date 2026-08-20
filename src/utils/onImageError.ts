import type { SyntheticEvent } from 'react';

/**
 * If a photo fails to load (offline, broken URL, network block), browsers
 * draw a small "broken image" icon regardless of any CSS applied to the
 * <img> itself — hiding alt text doesn't hide that icon. This handler
 * fades the element out instead, so the container's own background
 * (usually a designed gradient/solid fallback) shows through cleanly.
 */
export function onImageError(event: SyntheticEvent<HTMLImageElement>): void {
  event.currentTarget.style.opacity = '0';
}
