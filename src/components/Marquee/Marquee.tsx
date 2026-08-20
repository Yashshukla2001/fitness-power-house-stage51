import './Marquee.css';

interface MarqueeProps {
  items: readonly string[];
  className?: string;
}

/**
 * A continuously-scrolling ticker strip. Two identical tracks sit side by
 * side and the pair is translated exactly -50%, so as soon as the first
 * track scrolls fully offscreen the second is in the exact position the
 * first started in — a seamless loop with no jump cut.
 *
 * Purely decorative/ambient (this is what keeps the hero feeling alive
 * after the entrance animation finishes, rather than going static), so
 * it's hidden from assistive tech and pauses under prefers-reduced-motion.
 */
export function Marquee({ items, className }: MarqueeProps) {
  const track = (
    <div className="marquee__track">
      {items.map((item, i) => (
        <span className="marquee__item" key={i}>
          {item}
          <span className="marquee__dot" aria-hidden="true">
            •
          </span>
        </span>
      ))}
    </div>
  );

  return (
    <div className={`marquee ${className ?? ''}`} aria-hidden="true">
      <div className="marquee__rail">
        {track}
        {track}
      </div>
    </div>
  );
}
