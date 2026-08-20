import { business } from '../../config/business';

interface WordmarkProps {
  className?: string;
}

/**
 * Renders the business name with the same color split as the client's
 * real logo (adapted for our dark theme): "FITNESS" and "HOUSE" in the
 * site's off-white, "POWER" in the brand red. Used anywhere the text
 * wordmark appears (Navbar, Footer) instead of a single flat-color span.
 */
export function Wordmark({ className }: WordmarkProps) {
  const words = business.name.toUpperCase().split(' ');

  return (
    <span className={className}>
      {words.map((word, i) => (
        <span key={word} className={word === 'POWER' ? 'wordmark__accent' : undefined}>
          {word}
          {i < words.length - 1 ? '\u00A0' : ''}
        </span>
      ))}
    </span>
  );
}
