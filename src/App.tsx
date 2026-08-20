import { useEffect, useState } from 'react';
import { Preloader } from './components/Preloader/Preloader';
import { Navbar } from './components/Navbar/Navbar';
import { Hero } from './components/Hero/Hero';
import { TheGym } from './components/TheGym/TheGym';
import { Programs } from './components/Programs/Programs';
import { ProgramQuiz } from './components/ProgramQuiz/ProgramQuiz';
import { BmiCalculator } from './components/BmiCalculator/BmiCalculator';
import { ExerciseFinder } from './components/ExerciseFinder/ExerciseFinder';
import { Membership } from './components/Membership/Membership';
import { Packages } from './components/Packages/Packages';
import { TheStandard } from './components/TheStandard/TheStandard';
import { Transformations } from './components/Transformations/Transformations';
import { Certificates } from './components/Certificates/Certificates';
import { About } from './components/About/About';
import { GoogleReviews } from './components/GoogleReviews/GoogleReviews';
import { Faq } from './components/Faq/Faq';
import { FindUs } from './components/FindUs/FindUs';
import { Instagram } from './components/Instagram/Instagram';
import { Footer } from './components/Footer/Footer';
import { GoogleReviewModal } from './components/GoogleReviewModal/GoogleReviewModal';
import { FloatingActions } from './components/FloatingActions/FloatingActions';
import { CustomCursor } from './components/CustomCursor/CustomCursor';
import { Grain } from './components/Grain/Grain';
import { useReducedMotion, useIsTouchDevice } from './hooks/useReducedMotion';
import { useLenis } from './hooks/useLenis';

export default function App() {
  const [preloaderDone, setPreloaderDone] = useState(false);
  const reducedMotion = useReducedMotion();
  const isTouch = useIsTouchDevice();

  useLenis(!reducedMotion);

  // Backup safeguard alongside the inline script in index.html — in case
  // Lenis or anything else nudges scroll position during its own setup
  // on mount, this snaps back to 0 on every fresh app load.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {!preloaderDone && (
        <Preloader reducedMotion={reducedMotion} onComplete={() => setPreloaderDone(true)} />
      )}

      <CustomCursor enabled={!reducedMotion && !isTouch} />
      <Grain />

      {/* True top-of-page sentinel — deliberately separate from Hero.
          Hero itself sits below the sticky Navbar in normal document
          flow, so an anchor scroll targeting Hero directly lands at the
          navbar's height (~70-90px), not real Y=0. This zero-height
          marker is the actual first element in the page, so "#top"
          links (Footer, FloatingActions) land at a genuine 0. */}
      <div id="top" aria-hidden="true" />

      <Navbar reducedMotion={reducedMotion} ready={preloaderDone} />

      <main>
        <Hero ready={preloaderDone} reducedMotion={reducedMotion} isTouch={isTouch} />
        <TheGym reducedMotion={reducedMotion} />
        <Programs reducedMotion={reducedMotion} isTouch={isTouch} />
        <ProgramQuiz reducedMotion={reducedMotion} />
        <BmiCalculator reducedMotion={reducedMotion} />
        <ExerciseFinder reducedMotion={reducedMotion} />
        <Membership reducedMotion={reducedMotion} isTouch={isTouch} />
        <Packages reducedMotion={reducedMotion} />
        <TheStandard reducedMotion={reducedMotion} />
        <Transformations reducedMotion={reducedMotion} />
        <Certificates reducedMotion={reducedMotion} isTouch={isTouch} />
        <About reducedMotion={reducedMotion} isTouch={isTouch} />
        <GoogleReviews reducedMotion={reducedMotion} isTouch={isTouch} />
        <Faq reducedMotion={reducedMotion} />
        <FindUs reducedMotion={reducedMotion} />
        <Instagram reducedMotion={reducedMotion} />
      </main>

      <Footer />

      <GoogleReviewModal ready={preloaderDone} reducedMotion={reducedMotion} />

      <FloatingActions />
    </>
  );
}
