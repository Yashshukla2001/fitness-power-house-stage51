import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { heroContent, heroBrandLayerLines, getWhatsAppLink } from '../../config/business';
import { MagneticButton } from '../MagneticButton/MagneticButton';
import heroVideoMp4 from '../../assets/video/hero-owner.mp4';
import heroVideoWebm from '../../assets/video/hero-owner.webm';
import heroPosterSrc from '../../assets/video/hero-owner-poster.jpg';
import './Hero.css';

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  ready: boolean;
  reducedMotion: boolean;
  isTouch: boolean;
}

/**
 * Hero — real owner video integration on top of the Stage 38/39
 * composition, which is kept unchanged (black canvas, central subject,
 * giant horizontal POWER, ghost brand layer, minimal nav, bottom strip).
 * The temporary photo crossfade sequence is replaced by a real looping
 * video of the actual owner (uploaded directly, not sourced from a
 * stock site — verified before use by extracting and inspecting frames
 * across the clip's full 10s duration, since this project's earlier
 * stock-placeholder stages established that unverified media shouldn't
 * ship). A layered cinematic overlay stack (base darken, top/side/bottom
 * gradients, vignette) replaces the previous single scrim, per explicit
 * direction to avoid one flat dark rectangle.
 */
export function Hero({ ready, reducedMotion, isTouch }: HeroProps) {
  const heroRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const brandLayerRef = useRef<HTMLDivElement>(null);
  const statementRef = useRef<HTMLDivElement>(null);
  const giantWrapRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  // ---- ensure autoplay actually starts; browsers can silently block
  // autoplay even with muted+playsInline in some conditions. Also
  // respects reduced-motion: per the established site-wide pattern
  // (every other continuous motion effect already stops for these
  // users) and the explicit "use the poster/fallback visual where
  // appropriate" instruction, the video is paused on its first frame
  // rather than looping indefinitely — the poster image and the video's
  // own first frame are the same shot, so this is a clean, static hold
  // rather than a jarring freeze mid-motion. ----
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (reducedMotion) {
      video.pause();
      video.currentTime = 0;
      return;
    }

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay was blocked — the poster image (already set via the
        // `poster` attribute) stays visible as a graceful fallback
        // instead of a blank/broken video area.
      });
    }
  }, [reducedMotion]);

  // ---- entrance choreography: one cinematic sequence ----
  useEffect(() => {
    if (!ready) return;
    const hero = heroRef.current;
    if (!hero) return;

    if (reducedMotion) {
      gsap.set([hero, brandLayerRef.current, statementRef.current, giantWrapRef.current, ctaRef.current], {
        autoAlpha: 1,
      });
      return;
    }

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.set(hero, { autoAlpha: 1 })
      .fromTo(brandLayerRef.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.7 }, 0.1)
      .fromTo(
        videoRef.current,
        { scale: 1.06, autoAlpha: 0 },
        { scale: 1, autoAlpha: 1, duration: 1.1, ease: 'power2.out', clearProps: 'opacity,visibility' },
        0.2
      )
      .fromTo(
        giantWrapRef.current,
        { clipPath: 'inset(0 50% 0 50%)' },
        { clipPath: 'inset(0 0% 0 0%)', duration: 0.75, ease: 'power4.out', clearProps: 'clip-path' },
        0.65
      )
      .fromTo(statementRef.current, { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.6 }, 0.9)
      .fromTo(ctaRef.current, { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.5 }, 1.1);

    return () => {
      tl.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, reducedMotion]);

  // ---- mouse depth: background brand layer, video, and headline each
  // move at a different rate/direction (desktop only, GSAP quickTo, no
  // React state on pointer movement) ----
  useEffect(() => {
    if (!ready || reducedMotion || isTouch) return;
    const hero = heroRef.current;
    const video = videoRef.current;
    const brand = brandLayerRef.current;
    const giant = giantWrapRef.current;
    if (!hero || !video || !brand || !giant) return;

    const brandX = gsap.quickTo(brand, 'x', { duration: 1, ease: 'power3.out' });
    const giantX = gsap.quickTo(giant, 'x', { duration: 0.9, ease: 'power3.out' });
    const videoX = gsap.quickTo(video, 'x', { duration: 0.9, ease: 'power3.out' });
    const videoY = gsap.quickTo(video, 'y', { duration: 0.9, ease: 'power3.out' });

    function onMove(e: MouseEvent) {
      const rect = hero!.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width - 0.5;
      const relY = (e.clientY - rect.top) / rect.height - 0.5;
      brandX(relX * 2);
      giantX(relX * -3);
      videoX(relX * 7);
      videoY(relY * 6);
    }
    function onLeave() {
      brandX(0);
      giantX(0);
      videoX(0);
      videoY(0);
    }

    hero.addEventListener('mousemove', onMove);
    hero.addEventListener('mouseleave', onLeave);
    return () => {
      hero.removeEventListener('mousemove', onMove);
      hero.removeEventListener('mouseleave', onLeave);
    };
  }, [ready, reducedMotion, isTouch]);

  // ---- scroll: the scene transforms rather than simply fading ----
  useEffect(() => {
    if (!ready || reducedMotion) return;
    const hero = heroRef.current;
    if (!hero) return;

    const ctx = gsap.context(() => {
      gsap
        .timeline({ scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: 0.4 } })
        .to(videoRef.current, { yPercent: -6, ease: 'none' }, 0)
        .to(giantWrapRef.current, { yPercent: -14, ease: 'none' }, 0)
        .to(brandLayerRef.current, { yPercent: 10, ease: 'none' }, 0)
        .to([statementRef.current, ctaRef.current], { autoAlpha: 0, ease: 'none' }, 0);
    }, hero);

    return () => ctx.revert();
  }, [ready, reducedMotion]);

  return (
    <section ref={heroRef} className="hero" aria-label="Fitness Power House">
      <div className="hero__frame" aria-hidden="true">
        <span className="hero__frame-corner hero__frame-corner--tl" />
        <span className="hero__frame-corner hero__frame-corner--tr" />
        <span className="hero__frame-corner hero__frame-corner--bl" />
        <span className="hero__frame-corner hero__frame-corner--br" />
      </div>

      <div ref={brandLayerRef} className="hero__brand-layer" aria-hidden="true">
        {heroBrandLayerLines.map((line) => (
          <span key={line}>{line}</span>
        ))}
      </div>

      <div className="hero__media" data-cursor="explore" data-cursor-label="EXPLORE">
        <video
          ref={videoRef}
          className="hero__video"
          poster={heroPosterSrc}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        >
          {/* WebM listed first — smaller file, preferred by Chrome/Firefox/
              Edge. MP4/H.264 as the fallback: Safari and iOS Safari don't
              support WebM at all, so this is required for real-world
              coverage, not just a redundant backup. */}
          <source src={heroVideoWebm} type="video/webm" />
          <source src={heroVideoMp4} type="video/mp4" />
        </video>
        <div className="hero__overlay hero__overlay--base" aria-hidden="true" />
        <div className="hero__overlay hero__overlay--top" aria-hidden="true" />
        <div className="hero__overlay hero__overlay--sides" aria-hidden="true" />
        <div className="hero__overlay hero__overlay--bottom" aria-hidden="true" />
        <div className="hero__overlay hero__overlay--vignette" aria-hidden="true" />
      </div>

      <div className="hero__scene">
        <div ref={statementRef} className="hero__statement">
          {heroContent.statementLine}
        </div>

        <div ref={giantWrapRef} className="hero__giant-wrap">
          <span className="hero__accent-dot" aria-hidden="true" />
          <h1 className="hero__giant">{heroContent.giantWord}</h1>
        </div>
      </div>

      <div ref={ctaRef} className="hero__cta-row">
        <MagneticButton
          href={getWhatsAppLink()}
          enabled={!reducedMotion && !isTouch}
          className="hero__cta-primary"
          external
          cursorLabel="ENTER"
          ariaLabel={`${heroContent.primaryCta} — contact Fitness Power House on WhatsApp`}
        >
          <span>{heroContent.primaryCta}</span>
          <ArrowRight size={14} strokeWidth={2} className="hero__cta-arrow" aria-hidden="true" />
        </MagneticButton>
      </div>

      <div className="hero__ticker" aria-hidden="true">
        <div className="hero__ticker-track">
          {[0, 1].map((rep) => (
            <div className="hero__ticker-group" key={rep}>
              {heroContent.tickerWords.map((word) => (
                <span className="hero__ticker-item" key={`${rep}-${word}`}>
                  {word}
                  <span className="hero__ticker-dot" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
