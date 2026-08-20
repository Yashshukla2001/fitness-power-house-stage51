import './Grain.css';

/**
 * A single fixed, low-opacity SVG-noise layer applied across the whole
 * viewport. Lightweight (one inline SVG filter, no image request) and
 * non-distracting — this is atmosphere, not texture.
 */
export function Grain() {
  return <div className="grain" aria-hidden="true" />;
}
