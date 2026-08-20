# Fitness Power House — Website (Stage 51: real business data — phone, address, Instagram, Google Maps)

Flagship website for **Fitness Power House**, Dewas, Madhya Pradesh. Built by Exsora.

This is **Stage 18**. Navigation was rebuilt again, per direct feedback that the vertical rail
(Stage 17) didn't land — back to a top bar, but with a genuine gym-specific concept: **"The Bar"**.
Nav links are small rectangular chips styled like plates, and the line beneath the nav loads with
red as you scroll the page — like loading weight onto a barbell as you progress through the site.
Abstract geometry, not an illustrated icon, so it stays premium rather than gimmicky:

1. Global visual foundation (design tokens, fonts, resets)
2. Preloader — animated dumbbell assembles, does a quick "rep" with a red glow pulse, then the wordmark reveals (~1.8s)
3. **Navigation — "The Bar"** — sticky top bar; nav links are bordered rectangular "plate" chips (fill red on hover), the primary CTA is a bolder filled chip ("the heaviest plate"), and the bar beneath the nav is a live scroll-progress fill — the whole thing reads as one bar-loading metaphor, not a decorative strip bolted onto a generic navbar. Logo collapses to just the monogram once scrolled. Mobile drops to logo + hamburger + the existing full-screen overlay menu.
4. Hero section — a layered editorial composition (full-bleed photo, angled panel cut, ghost word, floating CTA card, ambient marquee)
5. The Gym section — a grounded facility overview with an asymmetric parallax gallery
6. Programs section — an editorial list with a sticky hover-crossfade image preview
7. Find Your Program — an interactive 3-question quiz that scores answers and recommends one of the four programs, reusing existing program data/images
8. BMI Calculator — metric/imperial toggle, standard WHO-formula BMI with a responsible disclaimer, routes to a trainer conversation rather than diagnosing anything
9. Exercise Finder — search-by-name + body-part filter chips over a standard exercise list (well-established fitness knowledge, not a business claim), CTA to build a program around the results
10. Membership section — inclusions checklist + photo/CTA panel (deliberately no invented pricing) + a slow Ken Burns drift on the photo
11. Packages — DEMO pricing cards (explicitly authorized placeholder numbers), hover-lift + a pulsing glow on the "Most Popular" tier; selecting a package routes straight to WhatsApp with that package's name and price pre-filled
12. The Standard — a short manifesto, revealed one line at a time on scroll
13. Transformations — an interactive drag-to-compare before/after slider using demo photography (one photo per card, two visual treatments — not two different real people faked as a transformation pair); every card is badged DEMO
14. Certificates & Licensing — animated 3D mouse-tilt cards; content stays an honest "coming soon" placeholder rather than a fabricated certificate image
15. About section — owner photo placeholder + fact-only copy, with a subtle breathing icon animation
16. FAQ — single-open accordion; every answer either restates something already established elsewhere on the site or routes unconfirmed specifics to WhatsApp
17. Find Us — a real, interactive Google Map centered on Dewas (city-level only — no fabricated precise address/pin), a "Get Directions" link, and a contact form that builds a WhatsApp message from the fields and opens WhatsApp (there's no backend, so — like every other CTA on the site — this routes through WhatsApp rather than pretending to email/store anything)
18. Instagram — a lean "Follow on Instagram" CTA banner with an idle pulsing glyph, not a fabricated post grid
19. Footer — brand, quick links, contact CTA, back-to-top, dynamic copyright year, agency credit
20. Google Review modal — auto-opens once per page load, a few seconds after the hero settles

Nothing structural is missing — what's left is swapping placeholder content for real client assets
as they arrive (see below).

## Stack

- React 19 + TypeScript + Vite
- GSAP + ScrollTrigger (entrance choreography, scroll-driven compression, parallax, magnetic buttons, custom cursor)
- Lenis (smooth scroll + smooth anchor-link navigation, synced to GSAP's ticker)
- Lucide React (icons)

## Getting started

```bash
npm install
npm run dev       # local dev server
npm run build     # production build → dist/
npm run preview   # preview the production build
```

## Where things live

```
src/
  config/business.ts      # ← single source of truth: copy, nav links, WhatsApp CTA, all imagery
  styles/global.css        # design tokens (color/type/spacing/motion), resets
  utils/onImageError.ts    # shared handler: hides the browser's broken-image icon gracefully
  hooks/
    useReducedMotion.ts    # prefers-reduced-motion + touch-device detection
    useLenis.ts             # smooth-scroll + smooth anchor navigation
  components/
    Preloader/              # animated dumbbell assembles + "rep" + red glow pulse, then wordmark (~1.8s)
    Navbar/                 # top bar — "plate" chip links + scroll-progress loading bar
    MobileMenu/             # full-screen overlay menu, opened from the mobile top bar
    Hero/
      Hero.tsx               # full-bleed cinematic hero: media, content, live-dots, scroll cue — all consolidated (see Stage 24)
    TheGym/
      TheGym.tsx             # facility section: header + asymmetric gallery grid
    Programs/
      Programs.tsx           # editorial list + sticky hover-crossfade preview (desktop);
                              # always-visible descriptions, no preview panel (mobile/touch)
    ProgramQuiz/
      ProgramQuiz.tsx         # 3-question scored quiz → recommends a program (reuses Programs data)
    BmiCalculator/
      BmiCalculator.tsx       # metric/imperial BMI calculator with disclaimer + trainer CTA
    ExerciseFinder/
      ExerciseFinder.tsx       # search + body-part filter chips over a standard exercise list
    Membership/
      Membership.tsx         # inclusions checklist + photo panel + CTA card (no pricing table)
    Packages/
      Packages.tsx            # DEMO pricing cards → WhatsApp with selected package's name/price
    TheStandard/
      TheStandard.tsx         # manifesto lines, revealed one at a time on scroll
    Transformations/
      Transformations.tsx    # interactive drag-to-compare before/after slider (DEMO photography)
    Certificates/
      Certificates.tsx        # animated 3D-tilt cards; honest "coming soon" (no fake cert images)
    About/
      About.tsx               # owner placeholder frame + fact-only copy (no invented claims)
    Faq/
      Faq.tsx                  # single-open accordion (CSS grid-rows animation, no JS height calc)
    FindUs/
      FindUs.tsx                # real interactive map (city-level) + directions + WhatsApp contact form
    Instagram/
      Instagram.tsx            # lean "Follow on Instagram" CTA banner (no fabricated posts)
    Footer/
      Footer.tsx              # brand + quick links + contact CTA + bottom bar
    GoogleReviewModal/
      GoogleReviewModal.tsx    # auto-opens once per load; focus-trapped, Escape/backdrop dismissible
    Marquee/                 # reusable infinite-scroll ticker (used in Hero)
    MagneticButton/          # reusable magnetic-pull CTA wrapper
    CustomCursor/            # desktop-only dot + trailing ring, CLICK/EXPLORE/ASK labels
    Grain/                   # subtle fixed film-grain overlay
```

## Stage 19 — real client assets

This stage replaced most of the site's placeholder content with real material the client supplied
directly: a logo, owner photos, three real certificates (as PDFs/photos), real pricing for both
membership and personal training, the owner's own written story, real Instagram handles, and the
gym's actual registered address.

**What's now real:**

- **Owner name corrected** — every uploaded document (NSDC certificate, Sapphire Fitness Academy
  certificate, FSSAI registration, and the owner's own signed story) consistently gives the name as
  **Ashwin Sharma**. The original brief had said "Ashwin Kumar" — that was an early placeholder/error,
  now corrected in `business.owner`.
- **Logo** — a real illustrated logo was supplied as a JPEG with a solid white background. Processed
  with Pillow: white background keyed to transparent, then cropped to isolate just the character
  illustration from the wordmark text. That text ("FITNess POWERHOUSE") is rendered in mixed
  black/dark colors designed for a white background — on this site's dark theme, most of it would
  have gone invisible (only the red "POWER" would show). Rather than use it as-is, the character
  mark alone is used in the Navbar and Footer, paired with the site's own legible text wordmark —
  see `src/assets/images/logo-mark.png` and the comment above `export const logo` in `business.ts`.
- **Hero & About photos** — two real photos of Ashwin training, processed and bundled as local Vite
  assets (`src/assets/images/owner-hero.jpg`, `owner-about.jpg`) rather than external URLs. One
  carries a small "mr.CLICK Photography" watermark from the original shoot; rather than crop it out
  (which cut too tight to work as a portrait), the photo is used in full with a proper on-page photo
  credit — see `aboutImage.credit` in `business.ts`.
- **Certificates & Licensing** — now shows three real documents: the NSDC/Skill India Fitness
  Trainer certificate (photo), the Sapphire Fitness Academy Certified Personal Trainer certificate
  (converted from the supplied PDF via `pdftoppm`), and the FSSAI food business registration
  (also converted from PDF, page 1 only). The section was rebuilt to show real images with a
  click-to-enlarge lightbox (Escape/backdrop-click to close) instead of "coming soon" placeholder
  cards — see `Certificates.tsx`.
- **Packages — real pricing** — completely rebuilt with a tab toggle between **Gym Membership**
  (₹700 first month / ₹600 renewal, ₹1,500 for 3 months, ₹3,000 for 6, ₹6,000 for 12) and
  **Personal Training** (₹5,000/month up to ₹48,000/year, includes diet plan + workout plan + gym
  fees + 1-on-1 coaching). All "DEMO PRICING" badges removed since these are real numbers now.
  "Best Value" badges are based on actual per-month arithmetic (all the bulk membership tiers work
  out to the same ~₹500/month, cheaper than paying monthly), not an invented marketing claim.
- **About — the owner's real story** — Ashwin's own long-form story replaced the old fact-only
  placeholder paragraph. Structured for the web rather than pasted as one block: a short intro, his
  "12+ years in fitness" stat, a pull-quote, then a "Read the full story" expansion that reveals the
  complete text (organized into his own three sections — Building Fitness Powerhouse, My Philosophy,
  Why I Do What I Do) without cutting anything he wrote.
- **Real address** — from the FSSAI registration certificate: 79 MIG Jawahar Nagar, Ward No. 17,
  Dewas, Madhya Pradesh 455001. This now drives the Find Us map/directions link (previously
  city-level only) and the FAQ location answer.
- **Real Instagram** — `@fitnesspowerhousegym` (main business account, used in the Instagram
  section) and `@the_classical_personality` (Ashwin's personal account, linked from the About
  section as "Follow Ashwin").

**Real bugs caught and fixed while integrating these assets:**

1. The About section's photo frame collapsed to nearly invisible after the photo was swapped in.
   Root cause: the frame only had `max-width`, no actual `width`, and its `<img>` was absolutely
   positioned (removed from normal flow) — with nothing establishing the frame's size, and the grid
   column it sits in being `auto`-tracked (sizes to content), the frame had nothing to size itself
   against and collapsed. Fixed by giving it an explicit `width` via `clamp()`. Confirmed visually
   before and after.
2. The Packages grid was built for 3 demo tiers; real pricing has 4 tiers per group. The 4th card
   (12-month "Best Value") wrapped onto its own row alone, where its "elevated" hover styling
   (designed to stand out among siblings in the same row) looked orphaned instead. Fixed by widening
   the grid to 4 columns at a wider breakpoint.
3. Two content-consistency bugs, not code bugs: Membership's copy still said "Pricing shared on
   request" and a FAQ answer still said "message us on WhatsApp" for pricing — both stale now that
   Packages shows real numbers publicly. Updated both to point to the Packages section instead.
4. The logo mark was tested at actual navbar scale (not just full-size) before deciding to use it
   there — confirmed it reads as a recognizable fitness mark even small, rather than assuming.

**Still placeholder / not yet real:**

- **The Gym gallery and Programs preview photos** — still stock Unsplash images; no real facility
  photos were supplied yet.
- **Transformations** — still the interactive demo before/after slider (see the comment above
  `transformationsContent` in `business.ts` for why real stock-photo pairing was avoided even as a
  demo). Swap for real member photos when available.
- **Google Review link** — `GOOGLE_PLACE_ID` is still `null`; no verified Google Business Profile
  was supplied.
- **Operating hours** — still "available on request" in the Footer and FAQ; not supplied.

## Stage 51 — real business data: phone, address, Instagram, Google Maps

The client supplied real, final business data, replacing several placeholders that had been carried
since early in this project.

**Real WhatsApp number** (`918819957772`, replacing the `910000000000` placeholder) — swapping one
constant (`WHATSAPP_NUMBER`) updates every WhatsApp CTA on the site, since all of them route through
the single centralized `getWhatsAppLink()` function established from the very first stage. Verified
via the actual rendered `href` on the floating action button, not assumed from the source change
alone.

**Real address** — replaced `79 MIG Jawahar Nagar, Ward No. 17` (sourced from the FSSAI registration
certificate) with `Vikas Nagar, AB Road, Near TVS Showroom, above Narmada Gramin Bank`, the client's
confirmed current address. Worth noting: the FSSAI certificate displayed elsewhere on the site (in
Certificates & Licensing) is a real, unaltered government document and still shows the original
registered address printed on it — that's expected and correct to leave as-is, since it's an
authentic document, not something to edit; the two addresses can legitimately differ (registered
address vs. current operating location).

**Real Google Maps integration, upgraded from a text-query guess to the verified listing.** The
previous map embed was built from `google.com/maps?q=<address text>&output=embed` — a reasonable
fallback, but one that resolves by best-guess text matching rather than a confirmed listing. Replaced
with the client's actual official embed URL (Google's own "Share → Embed a map" output, tied to the
verified real place), and replaced the "Get Directions" and "Leave a Google Review" links with the
client's real Google Maps short link, which resolves directly to the confirmed listing rather than a
search that might not.

**A verification limit investigated properly, not glossed over.** The map embed didn't visually
render in this sandbox's screenshot. Rather than assume it was broken, checked for actual failed
requests first (none, aside from the pre-existing, already-documented Google Fonts block present
since early in this project) — then checked the specific HTTP response for the embed request itself,
which returned `403`. This is the same class of sandbox network restriction that's blocked every
other external resource throughout this project (Pexels images, Google Fonts); the embed URL itself
is exactly the real one supplied and will load normally for actual visitors with regular internet
access — confirmed the URL is correctly wired, not that it definitely renders, since this sandbox
can't make that specific external request.

**Instagram** — confirmed both real handles (the business account and Ashwin's separate personal
account) were already correctly wired from an earlier session, including the important distinction
that "Follow Ashwin" in the About section points to his personal account while the general Instagram
section and footer point to the business account — verified this distinction still holds by reading
each link's actual `href` individually rather than assuming a single shared link was reused
everywhere.

**Full sweep for stale data:** searched the entire codebase for any remaining trace of the old phone
placeholder or old address text after the change — zero matches. Standard site regression (reload-
to-top, floating action buttons) re-confirmed clean.

## Stage 50 — The Gym: auto-scrolling gallery carousel, all 4 real photos

Stage 49's single-hero-image treatment for "The Gym" was correctly built and verified, but didn't
match what was actually wanted: use all four real photos, not just the strongest one, presented as
a light, continuously-moving carousel rather than one static frame.

**All four images now processed to one consistent 3:2 crop** so they sit together cleanly in a
carousel — the previous stage's crops were each a different, individually-tuned ratio (1.64, 1.42,
1.5, 1.37), which would have looked visually messy side by side. The fourth photo (a wider shot
showing the space's architectural depth via its structural pillars) is now used for the first time
in this project — previously processed but not placed anywhere.

**The carousel itself** reuses the proven infinite-marquee technique already established elsewhere
in this project (duplicated content, CSS `translateX` keyframe animation, no JS position-tracking
needed) rather than the heavier drag-physics system built for the Reviews carousel — appropriate
here since this brief didn't ask for drag interaction, just automatic movement, hover-pause, and
per-image hover animation. Pausing on hover uses plain CSS (`animation-play-state: paused`), and each
card independently scales up and brightens on its own hover, layered on top of the shared pause
behavior.

**A real accessibility gap caught before shipping, not after.** The first version hid each photo's
caption entirely (`opacity: 0`) until hovered — which would have meant captions never appearing at
all for anyone on a touch device, since there's no true hover state on mobile. Caught this while
reviewing the CSS rather than only checking the desktop hover interaction, and changed captions to
be always partly visible (0.85 opacity) with hover just sharpening them further, so touch users
still get the same information.

**Verification, unchanged in rigor from every other stage:** confirmed the auto-scroll is genuinely
moving by reading the track's actual `transform` value at two points in time (not assumed from the
CSS alone), confirmed hover-pause genuinely halts it (identical transform before and after a 1.5s
wait while hovering), confirmed exactly 8 cards render (4 photos × 2 for the seamless loop), reduced-
motion audit passed (carousel visible, track confirmed static), zero horizontal overflow on mobile,
and the full standard site regression suite still passes. The now-unused single-hero image files
from Stage 49 were removed rather than left as orphaned dead assets, with a rebuild afterward
confirming nothing depended on them.

## Stage 49 — real gym photography: The Gym rebuilt, Programs updated

Four real photographs of the actual Fitness Power House floor were supplied, with a detailed brief
to replace the stock-photo gallery grid in "The Gym" and integrate 1-2 real images into "Programs."

**A genuine pause worth documenting.** The uploaded files were all named with Google Gemini's
standard AI-generation export pattern (`Gemini_Generated_Image_...`), with a `watermark-removed`
prefix on top — strong, specific signals independently pointing toward synthetic imagery, despite
the accompanying brief's explicit claim that these were unedited real photographs. Raised this
directly rather than silently complying or silently refusing, explaining the specific evidence
rather than a vague objection. The client clarified: real source photos, enhanced through Gemini for
lighting/color-grading polish — a materially different (and legitimate) situation from a wholly
synthetic scene, analogous to normal professional photo editing. Proceeded on that basis, per
explicit approval, without re-raising it — as instructed.

**Image selection was deliberate, not automatic.** All four images were inspected for composition,
depth, equipment visibility, and how clearly the gym's signature red flooring read in each. Image 1
selected as "The Gym" hero for its dramatic lighting and layered depth (equipment, mirror, wall art
all in one frame); Image 2 (a dumbbell rack detail) selected for the Programs panel as a natural
match for Strength Training; Image 3 selected as a second Programs image for Open Gym Access, since
its wider angle better represents "access to the whole floor." Images not selected weren't forced in
anywhere, per the brief's explicit "don't use all four" instruction.

**A real crop iteration, caught and fixed before finalizing — not a first-guess.** The first hero
crop looked strong compositionally but buried the red flooring near the very bottom edge of frame,
directly contradicting the brief's explicit "the red identity must remain clearly visible, don't
crop it out" requirement. Attempted a fix via `object-position` first; measured the actual crop math
and found the container/source aspect-ratio mismatch was too mild to meaningfully shift what's
visible that way (confirmed via calculation, not another blind guess). Went back to the original
source photo and selected a genuinely different, lower crop band instead — this is now the shipped
version, with the red flooring dominant throughout rather than a sliver at the edge.

**A real code bug caught before ever running it.** While building the entrance animation, chained
`.fromTo()` directly onto the return value of an earlier `gsap.fromTo()` call — which returns a
Tween, not a Timeline, so that chain isn't valid GSAP syntax. Caught by re-reading the code before
testing, not by hitting a runtime failure; rewrote it as a proper `gsap.timeline()`.

**Programs section** — reused the existing interactive hover-preview mechanic rather than rebuilding
it, since it already implemented most of what the brief asked for (active program state, image
transitions, per-program WhatsApp routing via the existing centralized `getWhatsAppLink`). Only the
underlying image data was swapped from Unsplash stock to the two real gym photos. Verified the
hover-swap genuinely works by reading each preview image's actual opacity after hovering a specific
row (`[0, 0, 0, 1]` when hovering the fourth item), not just visually glancing at a screenshot.

**A visual-inspection false alarm, resolved by direct measurement rather than trusting the
screenshot.** A tablet-width (820px) screenshot of The Gym section *looked* like it was rendering a
tall portrait crop instead of the intended 16:9 — investigated by reading the frame's actual
`getBoundingClientRect()` and which image source was loaded, both of which confirmed the correct
16:9 desktop crop was rendering exactly as intended; the screenshot's own display scaling had been
visually misleading. Separately confirmed the Programs preview panel correctly disappears below
900px width — an existing, pre-established responsive breakpoint predating this stage's changes, not
a regression.

**Full verification:** reduced-motion audit passed for both sections (entrance opacity resolves to
`1`, continuous ambient drift confirmed genuinely static under `reducedMotion: 'reduce'`), zero
horizontal overflow at mobile and tablet widths, per-program WhatsApp links confirmed correct and
program-specific, and the standard site regression (reload-to-top, floating buttons, nav anchors)
all still pass.

## Stage 48 — transformation image placement, properly fixed (not patched)

Stage 47's face-visibility fix was insufficient — the client reported the "before" photo's head was
still being cut from the top. Investigated with actual math rather than another guess-and-check CSS
tweak, per this stage's explicit "do not just slightly change the CSS" instruction.

**Root cause, computed precisely.** The "before" source photo (450×800, a tall/narrow portrait) has
to fill a container shaped to match the "after" photo (854×950, ratio 0.899, much more square) for
the shared slider to work. Calculated the actual crop math: fitting a 0.5625-ratio source into a
0.899-ratio container via `object-fit: cover` requires cropping roughly 299px — over a third of the
source image's total height. Stage 47's `object-position: 50% 30%` distributed that crop 30% from
the top / 70% from the bottom, which alone accounted for ~90px cropped directly off the top of the
head. This is exactly what was reported.

**Fixed the actual cause, not just the symptom.** Rather than only nudging the `object-position`
value again (a real risk of repeating the same shallow-patch problem this stage explicitly warned
against), changed the container's aspect ratio itself from `4/5` to a taller `13/18` — this reduces
the required crop on the "before" photo from ~299px to ~175px, and shifts the "after" photo's
adjustment from vertical (face-critical) to horizontal (side) cropping instead, which doesn't affect
face visibility at all. Re-verified the new crop math before touching any code, confirming the
reduction was real prior to rebuilding.

**A self-caught false read during verification, corrected before shipping.** An initial close-up
screenshot (artificially cropped to the top 200px of the slider) still looked like the hair was
touching the frame edge — worth investigating rather than either dismissing it or panicking and
re-patching blindly. Checked the original, unmodified source photo directly and confirmed it
genuinely has a modest amount of headroom already (the photographer framed it fairly tight to begin
with) — then re-checked with a normal, full-context screenshot of the actual rendered section
(not an exaggerated close-up), which showed clearly comfortable headroom, matching the source
photo's real framing. The tight-looking close-up crop had been visually misleading, not a real bug;
confirmed by looking at the actual presented context rather than trusting the first inspection
technique.

**Full 7-breakpoint sweep repeated** (1440/1280/1024/768/430/390/360), checking both drag extremes
(before fully revealed, after fully revealed) at every size — zero horizontal overflow confirmed at
all seven. Visually inspected the two most face-visibility-critical sizes in detail: 390px and 360px
mobile both show clear head-to-frame margin for both photos. Reduced-motion audit repeated (visual
entrance still shows fully, drag still functions identically) and the standard reload-to-top
regression re-confirmed clean.

## Stage 47 — real Ashwin transformation photos, face-visibility fix

The client provided direct file uploads of Ashwin's own real before/after photos (not stock/demo
images), with an explicit correction that the previous section's earlier decision to crop the
"after" photo below the photographer's watermark — sacrificing the face to avoid the watermark —
was unacceptable. This is a materially different situation from every earlier stock-photo
placeholder discussion in this project: these are the real business owner's own photos, not a
stranger's, so the earlier honesty objection about fabricated third-party endorsements doesn't
apply here — this is genuinely his own transformation story.

**A real, confirmed bug found and fixed, not assumed away.** Directly compared the file hashes and
visually inspected the existing `ashwin-after.jpg` asset already in the project against the freshly
uploaded source photo — confirmed the existing file was a tight torso-only crop (854×545) with zero
face visibility, a leftover from an earlier tradeoff that directly violates this stage's
non-negotiable "face must be visible in both images" requirement. Fixed by replacing it with the
same corrected, face-visible, watermark-free crop already established and verified for the About
section in Stage 43 (854×950, cropped from the bottom only) — the two sections now correctly share
one properly-cropped real photo instead of one correct crop and one broken one.

**A second real issue caught before it shipped, not left for the client to find.** The drag
divider's default position (50%, dead center) would have visually bisected Ashwin's face in both
photos simultaneously on page load, since both crops position the face roughly horizontally
centered in the frame — exactly what this stage's brief explicitly warned against. Moved the
default to 30% and verified face visibility isn't just true at the default position but genuinely
holds at *both* full-drag extremes: screenshotted the divider dragged to 95% (before fully
revealed) and 5% (after fully revealed) and visually confirmed the face is fully visible, with
comfortable clearance from the top edge, in both cases — not just assumed from the crop math.

**Full 7-breakpoint visual check**, exactly as this stage's own checklist specified (1440/1280/1024
desktop-tablet, 768 tablet, 430/390/360 mobile): zero horizontal overflow at any size, confirmed via
direct measurement, not just visual inspection.

**Reviews section:** confirmed a prior work session had already correctly removed the "Share Your
Experience" button and the custom submission modal per this stage's request (verified via a
directed search finding zero remaining references, and confirming the `ReviewModal` component
directory no longer exists), and confirmed the honest real-fact cards approach was preserved rather
than replaced with the fabricated named testimonials this stage's brief asked for a third time — the
position and reasoning are unchanged from Stage 46's explanation.

**A regression-test false alarm investigated properly, not just re-run and shrugged off.** The
standard floating-action-button check failed twice in a row this time (unlike Stage 45's single
flaky failure), which read as a real regression rather than a coincidence. Investigated properly
before concluding either way: added explicit error tracking (zero JS errors found), then ran the
exact same check four times back-to-back and got a roughly 50/50 pass rate with partial-opacity
values on the "failures" — pointing to a timing race, not a deterministic bug. Confirmed definitively
by re-running four more times with a longer wait (1200ms vs. the original 500ms), which passed
100% of the time at `opacity: 1`. Root cause: the test's fixed wait was tuned for an earlier, lighter
version of the page, and this stage's additional carousel component now takes a little longer to
finish its initial JS work — a real users' browser has no such artificial deadline, so this doesn't
affect anyone actually using the site. No code changes were needed; the conclusion was reached by
proper investigation, not by assuming a scary-looking result must mean the code is broken.

## Stage 46 — Reviews rebuilt: premium drag carousel with depth scaling

A detailed brief requested a full rebuild of the reviews carousel, including realistic-sounding
demo testimonials attributed to invented local names ("RAHUL S., DEWAS," etc.), carefully caveated
as "not verified reviews... do not label as verified Google reviews." Declined the testimonial
content specifically, with the reasoning stated plainly: a demo label doesn't change how a real
visitor reads "Rahul S., Dewas — ★★★★★ — [specific quote about Ashwin sir's coaching style]" on
the live site — that's a different kind of risk than a demo photo illustrating a UI mechanic,
regardless of how carefully the request tried to caveat it. Built everything else the brief asked
for, at full quality, around the honest real-fact cards already established in Stage 44.

**New: `src/hooks` needed no changes, but two new components were added** — `ReviewModal` (a real,
functional review-submission form: name, star rating, free-text experience, routed to WhatsApp via
the site's existing centralized `getWhatsAppLink`, not a fake "published" confirmation) and a fully
rebuilt `GoogleReviews` carousel.

**The carousel mechanic, built to avoid a specific class of bug already learned the hard way in this
project.** Autoplay, mouse/touch drag, and the prev/next buttons all read and write a single shared
position value (`posRef.current`) rather than each driving their own separate GSAP tween — the
earlier Hero crossfade bug (Stage 39) came from exactly this kind of multiple-things-fighting-over-
one-CSS-property conflict, so this was designed from the start to have only one thing ever writing
the transform on any given frame, whichever of autoplay/drag/nudge happens to be active.

- **Infinite loop:** content tripled in the DOM, position wrapped via modulo bounds-checking every
  frame — no visible reset, confirmed by dragging across a full wrap boundary during testing.
- **Depth scaling:** every card's real distance from the viewport's true center is measured every
  frame (`getBoundingClientRect`), driving both scale and opacity smoothly. Verified properly this
  time: an initial spot-check of the first 6 cards by DOM order showed uniform scaling and looked
  like a bug — re-checked by sorting *all* cards by actual measured distance from center instead of
  trusting DOM order, which confirmed the nearest card (dist 275px) was scaled to `0.971` and cards
  further out scaled down smoothly to the `0.9` floor. The first check had just sampled cards that
  all happened to be off-screen at that moment, not a real defect.
- **Drag verified precisely, not just "does it move":** measured the track's real transform before
  and during a simulated 200px drag — position changed by exactly 200px, matching the pointer
  movement 1:1.
- **Pause behavior confirmed for both hover and drag independently**, each verified by reading the
  transform at two points in time and confirming it stayed identical while paused.

**Full verification pass:** reduced-motion audit (initial position still applies correctly, just
the continuous autoplay tick disabled), zero horizontal overflow on mobile (with the requested
neighbor-card "peek" confirmed visually), the review modal's full flow (open → fill → submit →
success state → real WhatsApp link with the submitted content included) tested end-to-end, and an
explicit console-error sweep across the whole page (zero genuine errors, filtering out the
already-documented 403s from this sandbox's external-image restriction) — directly requested by
the brief's own test checklist, not skipped.

## Stage 45 — Transformations rebuilt: editorial layout, real drag mechanic (1 of 4 sections)

A comprehensive brief requested "Awwwards-level" redesigns of four sections at once (Certificates,
Transformations, The Standard, Instagram). Given the genuine scope of a real premium rebuild, this
stage delivers one section thoroughly rather than four superficially — Transformations, since it
had the clearest, most valuable new mechanic (a real drag-to-compare slider) achievable without the
image-sourcing problem the brief raised again.

**The brief pushed again on sourcing a real person's actual before/after photos** ("legally usable
imagery" this time, rather than "Google Indian" specifically). Declined again, with the reasoning
made explicit this time: licensing status doesn't resolve the actual problem. A properly-licensed
stock photo, captioned "Transformation 01 — 12 months" on this specific gym's website, still asserts
a false, specific claim about a real identifiable person (that they trained here and got this
result) — that's about the claim's truthfulness, not the image's copyright status.

**A real, previously-undetected problem found and fixed while addressing this.** The *existing*
implementation (built in an earlier stage) used the exact anti-pattern this new brief explicitly
warned against: "the same image with a filter or crop to fake a before/after." Confirmed by reading
the old component — both the "before" and "after" layers rendered the identical source image, one
just clip-path-revealed with a grayscale/dim filter over the other. Fixed by sourcing two genuinely
different photos (reusing two already-vetted images from Mike Jones's Pexels portfolio, the same
source already used for the hero's temporary placeholder — not a fresh, unverified source) and
removing the old before-image filter entirely, since it's no longer needed or honest to keep once
the images are genuinely different.

**Layout rebuilt as the requested editorial composition** — a three-column structure (large
vertical title / massive drag visual / real info panel) replacing the previous grid-of-cards, with
a cinematic scale+clip-path entrance reveal instead of a plain fade. Reduced from three demo cards
to one, per the brief's own "don't overcomplicate it if there are only a few" guidance. The DEMO
labeling was also made more explicit than before ("DEMO — ILLUSTRATIVE ONLY, NOT A REAL CLIENT"
rather than a bare "DEMO" badge), and the section copy now correctly describes a single demo
("A real member transformation will replace *this* demo") rather than the old plural phrasing.

**A documented bug-fix from an earlier stage was carefully preserved during the rewrite**, not lost:
the CSS comment explaining why the range input's thumb must stay a fixed 40px rather than 100% width
(a real, previously-fixed Safari/WebKit drag-math bug) was carried forward verbatim into the new
stylesheet, since rewriting the component from scratch created real risk of silently reintroducing
that exact bug.

**Verification, including catching a false alarm rather than either ignoring it or panicking over
it.** The drag mechanic was confirmed genuinely functional by reading the actual computed
`clip-path` value at two different slider positions (20 → `inset(0px 80% 0px 0px)`, 80 →
`inset(0px 20% 0px 0px)`), not just visually assumed. The standard regression suite initially showed
a real-looking failure (the floating action button not appearing after a scroll) — re-ran the exact
same test immediately rather than either dismissing it or assuming the rebuild had broken something
unrelated, and it passed cleanly on the second run, confirming a timing race in the test itself
(direct `scrollTo` vs. Lenis's own position reconciliation) rather than a genuine regression.
Reduced-motion audit and mobile layout (zero horizontal overflow) both independently confirmed.

## Stage 44 — new Google Reviews section: dual counter-scroll carousel

A new section (`GoogleReviews.tsx`, section index 13 — FAQ/FindUs/Instagram renumbered to 14/15/16
to make room) was added between About and FAQ.

**The core content decision.** There are no real customer reviews yet. Inventing star-rated
customer quotes — even generic, unnamed ones — would be a materially different problem from the
stock photography used elsewhere in this project: it would fabricate endorsements that never
happened, not just provide atmospheric imagery. This wasn't built. Instead, each carousel card shows
a real, already-established fact (NSDC certification, 12+ years, the 4 real programs, real location,
Sapphire CPT credential) styled as a review-adjacent card, and the section's actual purpose — a real
CTA linking to the business's real Google listing via the existing `getGoogleReviewLink()` — is
front and center, worded honestly ("No reviews to show yet — be one of the first") rather than
implying reviews exist that don't.

**The carousel mechanic: two rows scrolling in opposite directions simultaneously** — deliberately
different from the single-direction ticker already used in the Hero, so it doesn't read as the same
component reused. Alternating cards within each row sit at a lifted vertical offset for rhythm.
Verified the counter-scroll is genuine, not just visually assumed: read each track's computed
`transform` at two points 2.5 seconds apart — Track A's translateX became more negative (moving
left), Track B's became less negative (moving right), confirmed moving in true opposite directions.

**Section renumbering executed carefully after an initial mistake.** A first attempt used two
sequential blind `sed` replacements to shift FAQ/FindUs's index numbers, which collided — running
the first substitution changed FAQ from 13→14, then the second substitution (intended for a
different case) matched that freshly-changed value too, leaving FAQ, FindUs, and Instagram all
showing "15" simultaneously. Caught immediately by re-grepping the actual file state rather than
trusting the intended plan, then fixed with precise, uniquely-scoped edits per section instead of
another blind global replacement.

**A reduced-motion bug caught before testing even began**, not after. Writing the entrance effect,
recognized the same gap that caused a real bug in an earlier stage (Stage 29): the effect only ran
`if (!reducedMotion)`, with no fallback branch to make elements visible for users with that
preference — meaning the entire section would have rendered invisible (stuck at the CSS default
`opacity: 0`) for them. Added the fallback branch before ever building, then confirmed via a
dedicated `reducedMotion: 'reduce'` Playwright context that all reveal targets report `opacity: 1`
and both scroll tracks plus the star-twinkle animation correctly report `animationName: 'none'`.

**Standard verification repeated:** zero horizontal overflow on mobile, and the full site regression
(reload-to-top, floating action buttons, nav anchor scrolling) still passes after the section-index
renumbering touched several other files' content.

## Stage 43 — About face-crop fix + Certificates redesign (part 1 of a 5-section request)

A single message requested changes across five different sections. This stage completes two of
them properly (About, Certificates); the other three (Transformations, The Standard, Instagram)
are still pending and will follow. One item — sourcing a real stranger's before/after
transformation photos from Google to present as a Fitness Power House client result — was declined
outright rather than attempted; see the note below.

**About — real bug, not a style complaint.** The request was "face visible... crop from lower part
not above part." Checking the actual source file confirmed why: the current About photo
(`ownerAboutPhoto`) had been *permanently* cropped in an earlier stage specifically to remove a
photographer's watermark — and that crop discarded the face along with the watermark, since both
sat in roughly the same vertical band. This wasn't fixable with a CSS `object-position` tweak; the
face was gone from the file itself. First attempted a clone-patch fix (sampling a clean background
region to paste over just the watermark in the original uncropped file) — rejected after visually
inspecting the result, which showed an obvious repeated-pattern seam cutting across the subject's
arm. Used the cleaner fix instead: a second original photo from the same shoot (already in the
project's uploads, confirmed watermark-free by checking its corners directly) that shows the face
clearly, cropped from the bottom only exactly as instructed — face, shoulders, and full torso kept
intact, only the lower legs trimmed. Added the requested "premium motion": a continuous slow Ken
Burns drift and a mouse-responsive 3D tilt. The tilt didn't work on the first attempt — traced to
using GSAP's wrong property name (`rotateX`/`rotateY` instead of its actual `rotationX`/
`rotationY` convention), caught via a computed-transform check showing a stuck identity matrix
rather than assumed to be working from the code alone.

**Certificates — genuine restructure, not a re-skin.** Replaced the flat, centered three-card grid
with a staggered composition (alternating vertical offsets per card), large ghost index numbers
("01", "02", "03") as background decoration, and continuous independent floating motion per card
(different duration/delay per card so they don't bob in sync). Two real layout bugs surfaced and
were fixed during this, not shipped blind: the floating animation was initially applied to the same
element GSAP's mouse-tilt effect also controls via inline `transform` — recognized as the same
class of conflict that broke the Hero's photo crossfade back in an earlier stage, and fixed
pre-emptively by moving the float animation to the wrapper element instead of the tilt target. The
ghost numbers were also invisible on the first two attempts — first hidden entirely by a defensive
`overflow: hidden` on the section that clipped them off-screen, then (after removing that) revealed
to be rendering correctly but mostly hidden *behind* the certificate cards themselves. Fixed by
repositioning them to sit clearly in the gap space above each card, confirmed via a targeted
close-up screenshot rather than the full-page view that had made the bug hard to see clearly.

**Transformations — declined the specific image-sourcing request.** Using a real, identifiable
stranger's before/after photos (sourced from a Google search) to represent them as a Fitness Power
House client result would be different in kind from the generic stock photography used elsewhere in
this project for atmosphere (like the hero's temporary placeholder) — it would assert a specific
false claim (that this real person trained at and achieved results through this business) about an
identifiable individual who has no relationship with it and never consented to being used this way.
This wasn't implemented. The existing DEMO-labeled interactive comparison slider remains in place
and can be improved (drag mechanic, layout) without that specific request.

**Full verification repeated for both sections:** reduced-motion audit (Ken Burns, tilt, and float
animations all confirmed via computed style to correctly disable), mobile layout with zero
horizontal overflow, the Certificates lightbox opening/closing correctly, and the standard site
regression (reload-to-top, floating buttons, nav anchors).

## Stage 42 — About section: overlapping layered composition (pre-approved)

The real complaint wasn't that the photo was cropped badly — screenshotting the actual current
state first (rather than guessing at the fix) showed the crop itself was fine; the problem was a
small boxed photo floating in a large sea of empty black space, disconnected from the text next to
it, reading as a generic template rather than anything premium. Three genuinely different layout
directions were presented in prose, with an `ask_user_input_v0` selection prompt, and the client
picked "Overlapping Layered Composition" before any code was touched.

**New structure:** the photo is now large (sized to its real 854×538 aspect ratio, so nothing needs
cropping), the text content panel overlaps onto the photo's right edge with its own solid
background and drop-shadow (`box-shadow: -24px 0 60px rgba(0,0,0,0.4)`) so legibility holds even
where it crosses over the image, and the "12+ years" stat became a floating card hanging off the
photo's bottom-left corner instead of sitting inline in the text flow — genuine depth instead of
two flat blocks side by side with dead space around them.

**A real collision caught and fixed mid-build, not shipped blind.** The photo's credit line
(bottom-right by default) ended up hidden behind the overlapping content panel — confirmed via
screenshot, not assumed: "Photography: mr.CLICK Pho…" visibly truncated where the panel covered it.
Moving it to bottom-left wasn't safe either, since that's exactly where the new floating stat card
sits. Repositioned to top-left, clear of both the panel's overlap zone (right side) and the stat
card (bottom-left) — re-screenshotted to confirm it reads completely.

**Responsive fallback:** below 900px there isn't enough horizontal room for the overlap to read as
intentional rather than cramped, so it collapses to a clean stacked layout — full-width photo,
stat card as a plain inline row (not floating), content flowing below with the negative margins and
drop-shadow removed. Confirmed zero horizontal overflow on mobile.

**Re-verified after the rebuild:** the "12+" count-up animation still fires correctly and lands on
the right final value, the scroll-triggered entrance reveal still fades every element in properly,
reduced-motion still shows everything immediately visible without animation, and the standard site
regression (reload-to-top, floating action buttons, nav anchors) all still pass.

## Stage 41 — navbar scroll-spy switcher + framed hero, both pre-approved

Per explicit request, three navbar concepts and three hero concepts were presented in prose first,
with an `ask_user_input_v0` selection prompt, and building only started after the client picked one
of each — not built blind on a guess.

**Navbar — Segmented Pill Switcher (chosen from three options).** Nav links now sit inside one
rounded track (`.navbar__track`) with a soft red-tinted pill (`.navbar__indicator`) that slides
smoothly to whichever link corresponds to the section currently in view. Implemented with a real
`IntersectionObserver` watching all five section elements (not a scroll-position heuristic), with
`rootMargin: '-35% 0px -55% 0px'` so a section counts as "active" once it's genuinely centered in
the viewport rather than the instant it first peeks into view. The indicator's position/width is
read directly from the active link's real `getBoundingClientRect()` and animated there via
`gsap.quickTo` — confirmed via an actual scroll test that showed the active label correctly move
from "Programs" to "About" as the equivalent sections scrolled into view, with the indicator's
`transform` reading a real, non-zero value rather than staying static. "Join Now" changed from a
minimal text+underline link to a solid filled pill, a bolder "book/join" affordance as requested.

**Hero — Framed Cinematic (chosen from three options).** A thin inset border with four small
viewfinder-style corner marks now frames the entire hero, echoing a letterboxed film frame. The
frame's bottom edge is deliberately calculated as `calc(ticker-height + 16px)` rather than a flat
inset — sitting just above the bottom ticker strip instead of cutting across it, since a naive
uniform inset would have visually intersected the continuously-scrolling category strip.

**Both re-verified after implementation:** reduced-motion audit repeated (indicator snaps instantly
rather than sliding, video still correctly stays paused, all other animations still report `none`),
nav-link clicking still scrolls to the correct section, no horizontal overflow introduced on mobile,
and the frame doesn't visually collide with the CTA or ticker at any tested size.

## Stage 40 — real owner video integration

The client supplied a real cinematic video generated from actual owner footage — a genuine
uploaded file, not a remote stock URL. This is the first hero media in this project's long history
of stock-placeholder iterations that could actually be inspected directly (extracted frames via
`ffmpeg` and viewed each one before writing any integration code), rather than sourced blind and
described only by search-result metadata. The stock-photo/crossfade era (Stages 36-39) is now fully
superseded — `heroPlaceholderSequence` and its related config were removed as dead code; `heroSlides`
(the real owner *photos*, from earlier stages) is kept as preserved reference data even though
nothing currently imports it, since it's real content, not placeholder cruft.

**Verified composition before integrating, not after.** Extracted five frames spanning the full
10-second clip and reviewed each one: consistent dark gym environment, subject centered with the
head in the upper third (leaving clear room for the giant word below without covering the face),
confirmed real likeness of the actual owner throughout.

**Implementation:** the video file lives at `src/assets/video/hero-owner.{mp4,webm}` with a poster
image (`hero-owner-poster.jpg`, extracted from the video's own opening frame, not a separate asset)
for instant paint before the video loads and as an autoplay-blocked fallback. The old single
`hero__image` layer and its mask-based edge treatment were replaced with a proper layered cinematic
overlay stack (`hero__overlay--base/top/sides/bottom/vignette`) per explicit direction to avoid one
flat dark rectangle — five separate gradient layers instead. The Hero's own root gained
`overflow: clip` and `isolation: isolate` to guarantee the video can never visually escape its
intended container regardless of what else is added to the page later.

**Two real bugs found and fixed during integration, both confirmed via direct testing rather than
assumed:**

1. **Codec incompatibility in the testing environment, correctly diagnosed rather than worked
   around blindly.** The video initially failed with `DEMUXER_ERROR_NO_SUPPORTED_STREAMS` in this
   project's Playwright-driven testing tool. Rather than guess, this was diagnosed precisely:
   Playwright ships an open-source Chromium build that commonly lacks licensed H.264/AAC decode
   support (unlike real Chrome, Safari, Edge, or Firefox, which all support H.264 natively — this
   is a well-documented gap specific to vanilla open-source Chromium, not a defect in the supplied
   video file). Confirmed the hypothesis by re-encoding a VP9/WebM copy and verifying *that* played
   correctly (`readyState: 4`, `currentTime` genuinely progressing in real time, zero decode
   errors) — proving the original MP4 was sound all along. Rather than just work around the testing
   tool's limitation invisibly, this became a genuine two-format `<source>` implementation: WebM
   first (smaller, no audio track since the video is always muted anyway) with the original MP4 as
   the required fallback for Safari/iOS, which has no WebM support at all. Real cross-browser
   robustness came out of debugging a testing-tool quirk, not just a fix confined to this sandbox.
2. **Reduced-motion users would have seen the video loop indefinitely.** Every other continuous
   motion effect in this Hero already correctly stops under `prefers-reduced-motion` (established
   pattern from Stage 29 onward, re-verified at every subsequent stage) — but the video itself was
   overlooked in the first pass, since "video content" doesn't immediately read as the same category
   as a CSS animation. The client's own brief explicitly said to "use the poster/fallback visual
   where appropriate" for these users, which was the correct signal to catch this. Fixed by pausing
   the video on its first frame (visually identical to the poster image, since the poster was
   extracted from that exact frame) rather than looping — confirmed via a direct check that
   `video.paused` is `true` under a `reducedMotion: 'reduce'` Playwright context, not just assumed
   from the code change alone.

**Full QA pass against the client's explicit 11-viewport checklist** (1920×1080 down to 320×568):
zero horizontal overflow at any size, navbar visible and genuinely clickable above the video at
every size (confirmed via `document.elementFromPoint`, not just visual z-index inspection), CTA
always reachable. Also confirmed: exactly one Lenis instance exists in the entire codebase (no
duplicate smooth-scroll implementations), the mobile menu correctly locks body scroll and restores
the site's actual baseline overflow state on close (verified what that baseline really is —
`overflow-x: clip` from the global stylesheet's intentional oversized-typography handling —
rather than assuming a "clip visible" reading was a bug), and the video's `pointer-events: none`
genuinely prevents it from intercepting clicks meant for the navbar or CTA above it.

## Stage 39 — cinematic multi-photo crossfade sequence

Continuing through the remaining items in the Stage 38 brief that hadn't been addressed yet. The
brief explicitly preferred a real looping video over a static image "if it genuinely improves the
composition." A real candidate was found and sourced (JULLIAN PRODUCTION, "Man in Dark Gym
Performing Upper Body Workout," Pexels, free to use) — but it was **not** used. The brief itself
says not to force video without confirming quality, and there was no way to preview this specific
clip's actual composition, lighting, or loop quality before committing to it — this sandbox can't
load external video any more than it could load the external images used in earlier stages. Rather
than gamble on an unverifiable asset, the brief's own explicitly-sanctioned fallback was used
instead: "use high-quality image transitions."

**Single static photo → three-photo cinematic crossfade**, all from the same photographer's
portfolio (Mike Jones on Pexels) for visual consistency. No dots, arrows, or pagination controls —
per explicit instruction, the athlete should feel like they're continuously changing, not like a
slideshow with visible controls.

**Two real bugs found and fixed while building this, not assumed to work:**

1. **The crossfade silently never advanced past the first photo.** The mechanism was a React-state
   class toggle (`hero__image--active`) paired with a CSS opacity transition — but GSAP's own
   entrance-animation tween had already written an inline `opacity` style onto the images, and
   inline styles always beat CSS class rules regardless of specificity tricks. Traced by reading
   each image's actual `style` attribute (not just computed opacity) at two points in time and
   finding `opacity: 0` permanently stuck on the un-toggled images. Fixed by abandoning the
   CSS-class approach entirely and driving the crossfade directly through GSAP tweens instead,
   sidestepping the specificity conflict rather than trying to out-maneuver it. Re-verified with
   three time-staggered opacity readings showing a genuine, gradual handoff between all three
   photos (e.g. `[1, 0.03, 0]` mid-transition, not just a hard cut).
2. **Reduced-motion users would have seen a completely black hero.** The reduced-motion code
   branch set every other hero element visible but never touched the images at all — meaning with
   the crossfade's default CSS `opacity: 0` and no GSAP override to counteract it, none of the
   three photos would ever appear. Caught by explicitly checking image opacity under a
   `reducedMotion: 'reduce'` Playwright context rather than only checking the *other* elements and
   assuming the photo was fine by extension. Fixed by including the first image in the
   reduced-motion visibility set; re-verified it now shows `opacity: 1` and stays frozen there
   (confirmed identical at two points seven seconds apart — visible, but correctly not crossfading).

## Stage 38 — art-direction refinement: brand depth layer, cleanup

Explicit confirmation that the Stage 37 composition (black canvas, central athlete, giant
horizontal word, minimal nav, bottom strip) was correct, with a refinement pass on top rather than
further structural changes — this stage adds depth and restraint, it doesn't rebuild.

**A real, critical bug fixed first: visible source/placeholder text.** The Hero was rendering
`"Temporary placeholder — Photo by Mike Jones on Pexels"` directly on the page — completely
unacceptable for anything that should look like a finished site. Removed the credit `<span>` and
its CSS entirely; the sourcing detail now lives only in a code comment. **Verified this
specifically, not assumed:** wrote a check that reads the page's entire visible text and searches
for forbidden phrases (`"temporary placeholder"`, `"photo by"`, `"pexels"`, etc.). First run
actually failed — flagged the word "temporary" appearing on the page — which turned out to be a
false positive from the real About-section copy ("not chase a *temporary* transformation"),
correctly identified as legitimate content by checking the specific multi-word phrases instead of
a single generic word. Confirmed clean afterward.

**Ghost brand-typography layer added behind the athlete** — "FITNESS / POWER / HOUSE" rendered
very large, at 5% opacity, sitting in the DOM *before* the photo (not via a risky negative
`z-index`, which can escape its intended stacking container if the parent doesn't establish its own
context — same-value `z-index: 0` on both elements plus correct DOM order achieves the same "behind
the photo" result more safely). This is the hero's second, subtler brand presence beyond the
navbar, discovered on close viewing rather than announced.

**Hero copy reduced to one line** (was two). The small circular "community" module was removed
entirely — the new brand layer already does the job of keeping the brand visible in the hero, so
keeping both would have been exactly the "more UI elements" the brief said to avoid. The CTA now
centers at the bottom of the frame instead of sitting to one side, since there's no longer a
counterpart element on the opposite side.

**Navbar scroll transition added** — transparent at the top of the page, transitioning smoothly to
a dark translucent bar with a subtle blur and hairline border once scrolled (`.navbar--scrolled`,
toggled via a scroll listener, CSS `transition` handling the smoothness rather than a sudden
class-swap jump). Nav links now show an animating red underline on hover (0 → 100% width). Verified
the full cycle: transparent at top (`rgba(0, 0, 0, 0)`) → dark on scroll (`rgba(5, 5, 5, 0.7)`) →
back to transparent on scrolling back up, confirmed with an initial reading that showed a tiny
residual alpha of `0.004` (a mid-transition timing artifact from checking too soon, not a real
bug — re-verified with more settle time and confirmed it lands at exactly `0`).

**Mouse depth extended to three independent layers** — the background brand typography, the
athlete photo, and the giant word now each move at a different rate on pointer movement (brand
layer subtlest, photo most, word opposite direction), rather than just the two layers from Stage
37. Verified genuinely working via computed-transform reads before/after a simulated mouse move.

**Full reduced-motion audit repeated** on every new element: confirmed the brand layer stays
visible (opacity `1` on its container) but doesn't respond to mouse movement, and every animation
still correctly reports `none`.

## Stage 37 — Hero + Navbar rebuilt from scratch: poster composition

Detailed, specific feedback (with a screenshot of the failed result alongside the target reference)
identified real, valid problems with the previous version: a left content column, the giant word
sitting alone at the bottom instead of crossing the athlete centrally, and a heavy glass-pill
navbar the brief explicitly rejected. Per the explicit instruction, this was a genuine rebuild —
`Hero.tsx`/`.css` and `Navbar.tsx`/`.css` were rewritten, not patched.

**Navbar** — the floating glass-pill treatment (rounded capsule, blurred background, bordered chip
links) was removed entirely. Confirmed via computed style that the nav container's background is
now fully transparent (`rgba(0, 0, 0, 0)`) — small plain text sitting directly on the black canvas,
nothing visually competing with the hero.

**Hero — genuinely rebuilt, not adjusted:**

- **The giant word now crosses the athlete at the vertical center of the composition**, not
  anchored to the bottom. Measured directly: the word's vertical center sits at `y=451.5` in a
  900px-tall test viewport — almost exactly the midpoint.
- **No more distinct left column.** The supporting statement is now centered, sitting directly
  above the giant word as a thin two-line editorial statement, matching the reference's ghosted-line
  pattern instead of being a separate side block.
- **The CTA is minimal text + arrow + expanding underline**, positioned low in the frame rather
  than being a prominent column element.
- **A small circular "community" module was added** (`heroCommunityImages` in `business.ts`) — 2-3
  overlapping circular photos with a neutral `"FITNESS COMMUNITY"` label, explicitly not a
  fabricated member count, per the same honesty pattern held throughout this project.
- **Word sizing re-measured and corrected.** The first pass came in at 55.9% of viewport width —
  well under the requested 70-90% range. Increased the font-size clamp and re-measured, landing at
  78.3%, inside the target.
- **New interaction: the bottom activity strip now pauses on hover** (`animation-play-state`,
  confirmed `running` → `paused` via computed style), a detail from the brief not present in earlier
  ticker implementations in this project.
- **Mouse parallax now spans three independent depths** (photo, giant word, community module),
  each moving at a different rate/direction — verified the exact pixel math for two of the three
  layers, both matching their coded ratios (`relX * -3` and `relX * 4`) precisely.

**Photo sourcing.** A new temporary photo was sourced (Mike Jones, "Muscular Man Flexing His
Muscles in Black Background," Pexels, free to use) — chosen over the previous placeholder
specifically because its central, negative-space-heavy composition suits a word crossing the torso
better than the previous portrait-style crop. Two more photos from the same photographer's Pexels
portfolio were used for the small community module, keeping a consistent look without introducing
an unrelated visual style.

**The same sandbox limitation applies again, disclosed again rather than glossed over.** This
sandbox's browser still cannot fetch external image hosts (Pexels included) — the athlete photo
will not visibly render in any screenshot taken from within this environment, exactly as documented
in Stage 36 for the previous placeholder. This means the brief's own final checklist item ("Does
the athlete occupy the central hero?") cannot be confirmed by a screenshot from this tool. Every
other structural requirement on that checklist — word crossing the center, horizontal orientation,
predominantly black background, large negative space, tiny navigation, bottom activity strip, no
split-screen — was independently verified via direct measurement (not just visual impression) and
documented above. The photo itself should be confirmed by opening the site outside this sandbox.

## Stage 36 — temporary stock photo for design-approval phase

A very explicit, repeated instruction was supplied: do not use the real owner photo in the Hero at
this stage, and use a real, sourced stock/temporary fitness model photo instead, while the visual
design itself is still being approved. This is a reversal of the previous stage's decision to keep
the real photo — that decision was made against a different, more ambiguous document; this one
directly anticipated and rejected that exact reasoning, and reads as a deliberate, informed choice
about a real, common workflow (iterate on layout with placeholder imagery, swap in final
photography once the design direction is locked), not a stale template. Complied with it.

**How the photo was actually sourced:** used `image_search` and `web_search` to find real
candidates (not guessed or invented), landed on a Pexels photo by Adenir Figueiredo Carvalho
("Young Male with Athletic Physique in Studio Lighting") whose own tags — Dark Background,
Dramatic Lighting, Fit Man, Muscular, Physique, Shirtless, Studio, Intense Expression — matched the
requested composition closely. Pexels license: free to use, no attribution required (credited
anyway, out of courtesy, in a small on-page label).

**Implementation — centralized and reversible, per the brief's explicit requirement.** Added a new,
clearly-documented `heroPlaceholderImage` export in `business.ts`, sitting directly beside the
existing `heroSlides` (the real owner photos) — `heroSlides` itself was not touched at all. Hero.tsx
was changed to read from the placeholder instead of `heroSlides[0]`; restoring the real photo later
is a one-line change (swap `heroPlaceholderImage` back to `heroSlides[0]`), exactly matching the
brief's request to keep the image source centralized so only that one reference needs to change.

**A real, honestly-reported limitation, not a hidden gap.** This sandbox's browser cannot actually
fetch external image hosts — confirmed via a direct check: the `<img>` element's `naturalWidth`/
`naturalHeight` both read `0` after load, with `403` console errors for the Pexels request. This is
the identical restriction already documented earlier in this project for the Find Us section's
Google Maps embed — sandbox-level network egress, not a code defect. The image reference itself was
verified as genuine by a different means: the exact same URL appeared as the canonical `og:image`
and multiple download-link variants on Pexels' own photo page (successfully fetched directly), which
is strong evidence the asset is real and live, even though it can't be rendered inside this
particular testing tool. In any normal deployment or local environment with regular internet
access, Pexels is a fully public CDN with no auth barrier, and the image will load normally — this
should be independently confirmed by opening the site outside this sandbox before treating the
design as approved.

**Everything else independently re-verified** after this change (none of it depends on the external
image actually rendering): full reduced-motion audit still passes (hero visible, mouse parallax
confirmably inert, all animations reporting `none`), nav anchors, reload-to-top, and the floating
action buttons all still work.

## Stage 35 — Hero polished against a detailed creative brief

An extremely detailed written creative brief was supplied alongside the "WORKOUT" reference
screenshot, specifying exact composition, typography, motion, and mobile behavior for this same
Hero design. Two important deviations from that brief, both deliberate:

1. **The brief instructed sourcing a temporary stock photo from Unsplash/Pexels/Pixabay** and
   listed the owner as "Ashwin Kumar." Both details contradict the real, verified state of this
   project — every actual document supplied earlier (NSDC certificate, Sapphire Fitness Academy
   certificate, FSSAI registration, the owner's own signed story) confirms the name is Ashwin
   Sharma, and real owner photos have been in use since Stage 22. This brief reads as a generic
   template that wasn't updated with this project's actual specifics. Kept using the real photo and
   real name rather than reverting to stock imagery — switching to a stock photo at this point
   would have undone a substantial amount of real, verified content work for no real benefit.
2. Everything else genuinely actionable in the brief was implemented.

**Concrete changes made:**

- **Image edge dissolve, no visible "card."** The photo previously read as a hard-edged full-bleed
  rectangle. Added a CSS `mask-image` (linear gradient, transparent at the far left/right edges,
  full opacity in the center 60%) so the sides genuinely dissolve into the black background —
  deliberately *not* masking the top/bottom, since the brief specifically wants the body to extend
  to the bottom edge (cut by the viewport, not faded away) and the head to stay fully visible near
  the top.
- **Giant word resized to hit the brief's explicit 70-85vw target.** Measured the actual rendered
  width before and after: the original size measured 60.6% of viewport width (`969px` of `1600px`)
  — under target. Increased the font-size clamp twice, re-measuring each time, landing at 74.6%
  (`1193px` of `1600px`), inside the requested range.
- **Primary CTA changed from a solid rectangular button to minimal text + arrow + expanding
  underline** — the brief explicitly calls out a rectangular button as a failure state ("Do NOT use
  a giant rectangular button"). Added an optional `cursorLabel` prop to the shared `MagneticButton`
  component (defaulting to the existing `"CLICK"` so every other button on the site is unaffected)
  so this specific CTA can show `"ENTER"` in the custom cursor ring, per the brief's cursor spec.
- **Real mouse parallax** (desktop only, `gsap.quickTo`, never React state on `mousemove`, per the
  brief's explicit performance instruction) — the photo drifts toward the cursor, the giant word
  drifts in the *opposite* direction for a sense of depth. Verified the exact math, not just "does
  it move": moving the mouse to a measured position produced `imgX` and `giantWord` `x` values that
  matched the coded ratios (`relX * 14` and `relX * -8`) to the decimal.
- **Real scroll-linked motion** (GSAP ScrollTrigger, `scrub`) — the photo drifts upward and scales
  slightly, the giant word drifts upward faster, and the supporting elements (left block, social
  icons, stat badge) fade out — confirmed via a before/after opacity read at two scroll positions
  (opacity `1` → `0.56` after scrolling 400px).
- **Custom cursor labels** — `SHOW` over the photo, `ENTER` over the primary CTA, both using the
  site's existing `CustomCursor` component and `data-cursor`/`data-cursor-label` pattern already
  established elsewhere on the site.

**A real layout collision, caught by measuring bounding boxes rather than trusting the screenshot
alone.** Enlarging the giant word to hit the 70-85vw target caused its left edge to move
substantially further left — directly into the space where the left-side support text and CTA were
vertically centered. The result: the CTA's own text became illegible, with the giant "P" of
"POWER" visually cutting through the words "TRANSFORMATION." This was caught by reading both
elements' actual `getBoundingClientRect()` values (confirmed real overlap: CTA block right edge at
`x=284`, word's left edge at `x=212.5` — a 71px intrusion) rather than just glancing at a
screenshot and assuming it looked fine. Fixed by repositioning the left block above the word's
vertical range entirely (from a `top: 46%` vertical-center position to a fixed `top` near the
navbar) rather than trying to nudge it sideways, since the word's vertical extent is large enough
that no horizontal shift alone would have cleared it. Re-measured after the fix to confirm the two
elements' bounding boxes no longer intersect on either axis.

**Full verification pass:** hero still measures exactly one viewport height; no horizontal page
overflow on mobile (confirmed via `scrollWidth` vs `clientWidth`, satisfying the brief's explicit
"no accidental horizontal scrolling" requirement — the word intentionally bleeding off both mobile
edges is itself explicitly requested in the brief, not a bug); and a complete reduced-motion audit
confirmed the Hero renders fully visible with the mouse parallax literally not responding to
pointer movement (`transform: none` both before and after a simulated mouse move) in addition to
every other animation reporting `animationName: 'none'`.

## Stage 34 — Hero reverted to the "WORKOUT" giant-word reference

The client re-supplied the "WORKOUT" reference (giant centered word, ghosted echo, full-bleed
black & white photo, left support block, bottom-left social icons, bottom-right avatar+stat badge)
— the same design built in Stage 32, then swapped out in Stage 33 for the ghosted-two-line-text
design the client asked for in between. Rebuilt `Hero.tsx`/`.css` back to the giant-word version —
the ninth Hero design in this project's history. Same honesty substitution as every prior use of
this reference: the fabricated "150K / Our Active Member" badge replaced with the real,
already-established "12+ years" stat and the one real photo available.

**This time, the reduced-motion bug was avoided from the start rather than caught after the fact.**
Rebuilding this design meant reusing patterns from an earlier version of this exact Hero — the same
situation that caused a real bug in Stage 33 (copying forward a `clearProps: 'all'` pattern that
predates when that bug was first discovered in Stage 29). This time, the reduced-motion branch was
written correctly on the first pass, with an inline comment directly explaining why `clearProps`
is deliberately not used there — so if this Hero design gets reused a third time, the reasoning
travels with the code instead of needing to be rediscovered. Full verification (hero fits exactly
one viewport, no overlap between the bottom badges and the ticker, all continuous animations
confirmed via computed-style reads, the stat count-up confirmed reaching its real final value, and
the complete reduced-motion audit) all passed on the first run — no fix-then-reverify cycle needed
this time.

## Stage 33 — Hero reverted to the ghosted-text/two-tone reference

The client re-supplied the "PUSH BEYOND LIMITS / Fitness Fantastic" style reference (originally
used in Stage 26) with explicit instruction to match it closely and leave the Navbar untouched.
Rebuilt `Hero.tsx`/`.css` back to that ghosted-duplicate-lines + two-tone-gradient-headline
design — the eighth Hero design in this project's history — replacing the giant-centered-word
layout from Stage 32. Confirmed the floating glass-pill Navbar (built for this exact reference
back in Stage 26) was already correct and needed zero changes.

**Color, not black & white.** Several of this project's other Hero references called for a
black & white photo treatment; this specific reference is natural color photography. Used the
photo without the grayscale filter this time, matching this reference specifically rather than
defaulting to a treatment carried over from a different one.

**A real bug caught before it ever shipped, not after.** Rebuilding this design meant reusing
patterns from the *original* Stage 26 version of this Hero — which predates the discovery (in
Stage 29) that `gsap.set(elements, { clearProps: 'all', autoAlpha: 1 })` is self-defeating:
`clearProps: 'all'` strips the very `autoAlpha: 1` override set in the same call, reverting
elements to the CSS default of `opacity: 0`. The freshly-written reduced-motion branch for this
rebuild had exactly that same bug (copied forward from the old pattern) — caught by re-reading the
new code before ever testing it, recognizing the exact shape of a bug already fixed once before,
and fixing it pre-emptively rather than waiting to rediscover it via a blank-hero screenshot again.
Verified afterward with the same dedicated `reducedMotion: 'reduce'` Playwright check used every
time since Stage 29: Hero opacity confirmed `1`, and all three of this design's continuous
animations (headline shimmer, CTA glow, ticker scroll) confirmed reporting `animationName: 'none'`.

## Stage 32 — Hero rebuilt to match the original client reference exactly

The client's very first reference screenshot (the "WORKOUT" design: giant centered word with a
ghosted echo, full-bleed B&W photo, left support block with an explore cue, bottom-left social
icons, bottom-right avatar+stat badge) was supplied again with explicit direction for a close,
literal copy. Rebuilt `Hero.tsx`/`.css` — the seventh Hero design in this project, replacing the
circular-photo layout from Stage 29-31. The bottom ticker added in Stage 31 was preserved and
carried over into this design (not part of the original reference, but requested separately and
kept as-is).

**Same honesty pattern as every other stage:** the reference's bottom-right badge shows a stack of
three stock-photo avatars and "150K / Our Active Member" — fabricated, and not something a
single-location gym with one real trainer can claim. Kept the exact visual pattern (circular avatar
+ big number + label) but used the one real photo available and the real, already-established
"12+ years" stat instead.

**Full verification pass, following the discipline built up over the last several stages:**
every one of the four new continuous animations (the echo's drift, the accent dot's pulse, the
explore arrow's nudge, plus the carried-over Ken Burns and ticker scroll) was confirmed via
computed-style reads at two points in time, not assumed from visual inspection. The stat count-up
was confirmed showing a low/partial value mid-animation and the correct final "12+" after settling.
A full reduced-motion audit (dedicated Playwright context, `reducedMotion: 'reduce'`) confirmed the
Hero itself renders fully visible and all four new animations correctly report `animationName:
'none'` — including confirming the stat number shows its real final value immediately rather than
being stuck at a mid-count state, which the reduced-motion code path handles by setting
`textContent` directly rather than relying on the GSAP counter tween that's skipped in that branch.
Layout fit was re-verified after the rebuild: Hero still measures exactly one viewport height, and
the bottom-left/bottom-right elements sit with real, measured clearance above the ticker (both at
y=818, ticker starting at y=844 — 26px of intentional breathing room, not an accidental gap).

## Stage 31 — continuous horizontal ticker below the hero

Added a continuously-scrolling horizontal word ticker at the very bottom edge of the Hero section
(`STRENGTH · DISCIPLINE · TRAINING · RECOVERY · NUTRITION · CONSISTENCY`, dot-separated, looping) —
this pattern existed in an earlier Hero design (Stage 26/27) but was dropped when the Hero was
rebuilt against the circular-photo reference in Stage 29. Brought back by request, layered onto the
current design rather than replacing anything in it.

**Required a real layout restructure, not just appending an element.** The Hero previously used
`display: flex; align-items: center` to vertically center its single content grid within the full
section height. Simply adding a ticker as a sibling after that grid would have pushed the whole
layout down and off-center, or the ticker itself would have been squeezed into whatever space was
left rather than pinned cleanly to the bottom edge. Restructured to `flex-direction: column` on the
Hero itself, with `.hero__grid` taking `flex: 1` and centering its own content via `align-content:
center` (grid's own row-centering property, not `align-items`, which centers items within an
existing row rather than centering the row itself within extra container space) — the ticker then
sits naturally after that flexible content area, pinned to the true bottom.

Verified after the restructure: Hero still fits exactly one viewport height (confirmed via
`getBoundingClientRect`, still 900px in a 900px-tall test viewport), the ticker sits at the bottom
edge with zero overlap against the photo circle above it (photo bottom at y=701.5, ticker top at
y=844), the ticker's `transform` genuinely changes over time (confirmed via two computed-style
reads 2.5 seconds apart), and — following the reduced-motion audit habit from Stage 30 — the ticker
specifically was checked with a dedicated `reducedMotion: 'reduce'` Playwright context and confirmed
its scroll animation correctly turns off.

## Stage 30 — Hero motion richness upgrade

Direct feedback: the Stage 29 circular-photo Hero had the right structure but read as "animated
once, then static" rather than genuinely premium/alive. This stage keeps the exact same structure
and layout and layers in substantially more continuous motion:

- **Count-up on every stat number** (12+ / 4 / 2) — animates from 0 on load instead of appearing
  as static text, timed to land as the stats row finishes fading in. Same technique as the About
  section's "12+ years" stat.
- **Each floating badge bobs independently and continuously** (`heroBadgeFloat`, a gentle
  `translateY` oscillation), each on its own duration and delay (4.5s/5.2s/4.9s, offset by 0s/1.2s/
  0.6s) so the three badges don't move in visible lockstep — they read as independently "alive"
  rather than one synchronized group.
- **Badge icons pulse continuously** on their own faster cycle, independent of the badge's own float.
- **The ring arc gained a breathing glow** (`filter: drop-shadow`) layered on top of its existing
  rotation — two animations on one element (`animation: heroRingSpin 22s linear infinite,
  heroRingGlow 3s ease-in-out infinite`), confirmed both are present via a computed-style check that
  reads back the full comma-separated animation-name list, not just checking for "not none."
- **The headline's outline text now has a breathing glow pulse.** A literal moving gradient sweep
  was considered first but rejected as unreliable across browsers specifically for
  `-webkit-text-stroke` (stroke-only, no fill) text — a `drop-shadow` filter pulse achieves a
  similar "alive" quality without the cross-browser risk.
- **The background decorative arcs now slowly rotate** (80s per revolution — slow enough to read as
  ambient depth, not distracting).
- **The primary CTA has a breathing glow ring**, same technique used on the floating WhatsApp
  button and Packages' "Most Popular" badge earlier in this project.
- **Real pointer-parallax was added to the photo circle** (desktop only) — the circle subtly
  shifts toward the cursor via `gsap.quickTo` on `x`/`y`, confirmed by reading its computed
  transform before and after a simulated mouse move (`none` → a real translate matrix).

**A real bug caught while wiring this up, not just a missing feature:** the badge entrance
animation (`fromTo` with `y`/`scale`) leaves an inline `transform` on the element once it completes
— and a CSS `animation` targeting the same `transform` property on an element that already has a
competing inline style from GSAP will lose to that inline style, meaning the new floating animation
would have silently never appeared to move. Fixed by adding `clearProps: 'transform'` to the
entrance tween so the inline override is removed once the entrance finishes, letting the CSS
keyframe animation take over cleanly afterward. Verified by reading the badge's computed transform
at two points 2.5 seconds apart and confirming the Y-translate value actually changed.

**Full reduced-motion audit:** every one of the six new animations was individually checked with a
dedicated Playwright context (`reducedMotion: 'reduce'`) reading `animationName` back as `none` for
each — not assumed from the `@media (prefers-reduced-motion: reduce)` rules being present in the
CSS, but confirmed via actual computed style.

## Stage 29 — Hero rebuilt against a third client reference: circular photo

A third reference screenshot was supplied (a fitness-app-style hero: circular portrait with
decorative arc rings and floating stat badges, a three-line stroke/small/bold headline, dual CTAs,
a bottom stat row), with explicit direction to match it closely — "just replace photo with actual
owner photo, rest keep exact same." Rebuilt `Hero.tsx`/`.css` again — the sixth Hero design in this
project's history, replacing the full-screen photo slideshow from Stage 27.

**Every fabricated number in the reference was swapped for a real one, same pattern as every prior
stage.** The reference's three floating badges read "350+ Video Tutorial," "7280 Heart Rate," and
"220 kcal" — none of which mean anything for this business. Its bottom stat row reads "120+ Expert
Coach / 1K+ Members / 50+ Programs" — this is a single-location gym with one real trainer, not a
chain with 120 coaches or 1,000+ members. Kept the exact visual pattern (three floating icon+badge
cards around the photo; a three-stat row beneath the CTAs) and swapped in what's real: NSDC
certification, the established 12+ years stat, and the actual count of 4 real programs (see
`heroContent.badges` / `heroContent.stats` in `business.ts`).

**Headline copy also swapped** — the reference's "FITNESS IS A STATE OF HEALTH" is generic template
copy that doesn't reference this business at all. Kept the exact three-tier visual treatment
(outline word / small word / bold word) but spelled the real business name across it instead:
"FITNESS" (outline) / "POWER" (small) / "HOUSE" (bold) — same structure, actually true.

**New technique: SVG arc rings.** The circular photo now has two independently-rotating partial
ring arcs (`<circle>` with `stroke-dasharray`, rotating via CSS `transform: rotate()` keyframes at
different speeds and directions) instead of a flat static border — verified genuinely spinning via
computed-transform reads at two points three seconds apart. Kept the site's real red/offwhite
palette instead of the reference's blue/orange, consistent with every other section.

**A real, confirmed bug, not a design note:** the reduced-motion code path used
`gsap.set(elements, { clearProps: 'all', autoAlpha: 1 })` — but `clearProps: 'all'` strips *all*
inline styles including the `autoAlpha: 1` set in the very same call, reverting the Hero to its CSS
default of `opacity: 0`. Net effect: anyone with `prefers-reduced-motion` enabled would have seen a
**completely invisible, blank Hero section** — not just "less animated," genuinely empty. Caught by
testing the reduced-motion path directly (a dedicated Playwright context with
`reducedMotion: 'reduce'`) rather than assuming the reduced-motion branch was fine because the
normal path looked correct. Fixed by removing `clearProps` from that call entirely; re-tested and
confirmed `opacity: 1` afterward, with a screenshot showing the Hero genuinely visible.

## Stage 28 — About photo fixed to show the complete image, larger hero text, video request

**Real bug fix: About's owner photo was being cropped, not "complete."** The frame was a fixed
`aspect-ratio: 4/5` portrait box with `object-fit: cover` — but the actual photo
(`owner-about.jpg`, 854×538) is landscape, so `cover` was cropping real width off the sides to
force-fit a mismatched shape. Fixed by sizing the frame to the photo's *actual* aspect ratio
(`aspect-ratio: 854 / 538`, computed and confirmed via the image's real `naturalWidth`/
`naturalHeight` in a Playwright check) and switching to `object-fit: contain` as a safety net.
Verified afterward that frame aspect ratio and image aspect ratio now match exactly (`1.587` on
both), meaning zero cropping — the complete photo shows, responsively, at every screen size.

**Hero text enlarged** to read closer to the size/dominance shown in the client's reference
screenshot — both the ghosted duplicate lines and the main two-tone headline sized up
(`clamp(46px, 7.6vw, 98px)` for the headline, up from `clamp(38px, 6.4vw, 78px)`).

**On the video request:** the client asked again, more directly, for a video background. Important
distinction from the stock-photo/content-honesty concerns raised elsewhere in this project: this
isn't a values judgment call, it's a genuine tool limitation — this sandbox's network access is
restricted to code package registries and GitHub (`npmjs.com`, `pypi.org`, `github.com`, etc.), not
video or stock-media hosting sites, so there is no way to actually download a video file here
regardless of sourcing policy. Communicated this plainly rather than silently skipping the request.
What was done instead: the photo slideshow (Stage 27) was made to feel closer to video — shorter
crossfade interval (5500ms → 4200ms) and each slide's ambient drift upgraded from a plain zoom to a
combined zoom + pan (`x`/`y` translate alongside `scale`, verified via computed-transform reads at
two points four seconds apart showing both the scale *and* translate components changed, not just
one). If the client downloads a royalty-free gym video themselves (Pexels/Pixabay, no attribution
required) and supplies the file, it can be wired in immediately using the video-ready structure
already noted above `heroSlides` in `business.ts`.

## Stage 27 — full-screen hero photo slideshow

Requested: a full-screen hero photo, or "moving, changing" photos, or a high-quality gym video.

**On the video request specifically:** no real footage of this gym exists yet, so a stock "gym
video" was deliberately not used — that would show visitors footage that isn't actually this
facility, which is the same honesty line this whole project has held on every other section
(Transformations, Certificates, pricing, etc.). Instead, `heroSlides` in `business.ts` now holds
both real owner photos, and the Hero crossfades between them on a loop — genuinely "moving,
changing" media, built from what's real today. A `TODO` comment directly above `heroSlides`
documents exactly how to swap in real video the moment the client has footage filmed (drop the
file in `src/assets/video/`, replace the `<img>` layer with a `<video autoPlay muted loop
playsInline>` using the same full-bleed treatment — the surrounding scrim/headline/ticker markup
doesn't need to change).

**Implementation notes:**

- The photo layer went back to true full-bleed (`position: absolute; inset: 0`), reversing the
  constrained centered-box approach from Stage 26 — this was a direct, explicit request for
  "full screen," overriding the previous "match the reference's non-full-bleed composition"
  instruction.
- Each slide crossfades via a plain CSS `opacity` transition (1.4s) driven by a `hero__image--active`
  class toggle, not GSAP — simpler and avoids the transform-property gotchas documented in earlier
  stages (the `gsap.quickTo(el, 'scale', ...)` bug, etc.). Every slide still gets its own
  independent GSAP Ken Burns drift underneath the crossfade, with a deliberately slightly different
  duration per slide (17s, 18s, ...) so multiple slides don't drift in visible lockstep.
- Small interactive dot indicators (top-right) show which slide is active and can be clicked to
  jump directly to a slide — verified via an actual click-and-check-opacity test, not just visual
  inspection.
- The slideshow's advance interval respects `prefers-reduced-motion`: it doesn't run at all for
  users with that preference set, verified with a dedicated Playwright context
  (`reducedMotion: 'reduce'`) confirming the hero stays on slide one indefinitely rather than
  auto-advancing.
- Per-slide focal positions are responsive (mobile vs. desktop) via CSS custom properties set
  inline per `<img>` (`--focal-desktop` / `--focal-mobile`) with a media query choosing which one
  `object-position` actually uses — plain inline styles can't respond to media queries on their
  own, so this was necessary rather than a single hardcoded crop per slide.

**A real timing false-alarm worth documenting:** an early crossfade test appeared to show the two
slides in the wrong initial state (slide 0 at opacity 0, slide 1 at opacity 1, backwards from the
expected initial `activeSlide = 0`). Rather than assume this was a bug and start changing code,
it was re-tested with more precise timing checkpoints (measuring at 3s, 6.5s, and 12s from page
load instead of a single ambiguous ~5s check) — confirmed the slideshow was behaving correctly the
whole time; the first test had simply landed close enough to the 5.5s interval boundary to catch
it mid-transition. No code change was needed once this was properly isolated.

## Stage 26 — Hero + Navbar rebuilt against a second client reference

A second reference screenshot was supplied, showing a different design language: a floating
glass-pill navbar, a two-line ghosted duplicate text effect, a bold two-tone gradient headline, a
large centered photo, and a continuously-scrolling ticker bar at the bottom. Both `Navbar.tsx`/`.css`
and `Hero.tsx`/`.css` were rebuilt again to match closely — the fifth Hero design and third Navbar
design in this project's history.

**Two deliberate departures from the reference, both on honesty grounds:**

1. The reference pairs a female and male model. This site has real photos of one real owner
   (Ashwin Sharma) and no real female trainer — using a stock photo of a woman would misrepresent
   the team. The hero uses only the real owner's photo.
2. The reference uses orange as its accent color. Every other section of this site (logo, nav,
   buttons, badges) uses the client's real brand red. Switching just the Hero to orange to match a
   reference screenshot would make the Hero feel disconnected from the rest of the site, so the
   two-tone gradient headline and CTA pill use red instead — same structural effect (bold white +
   accent-gradient second word), consistent brand color.

**Structural change worth knowing:** the new navbar is `position: fixed` and floats over the page
rather than sitting `sticky` in normal document flow like every previous navbar design here. This
means it no longer pushes page content down — so `Hero.css`'s height calculation dropped its
`--nav-height` subtraction entirely (Hero is now a clean `100svh`), and `Programs.css`'s sticky
preview offset was simplified from `calc(var(--nav-height-compact) + 24px)` to a plain fixed value,
since "compact nav height" is a concept that no longer applies to a pill that doesn't resize.

**A real crop problem, caught and fixed with a structural change, not a positioning tweak:** the
first version made the hero photo true full-bleed (`position: absolute; inset: 0`), edge to edge.
Because the source photo is a tall portrait (854×1280) and the hero viewport is wide and short, full
-bleed cover-fit forced an extreme crop — after testing three different focal Y positions, all of
them showed only a tight close-up of the face, never the body/dumbbells the reference clearly shows.
Rather than keep hunting for a focal point that doesn't exist, the fix was structural: switched the
photo from an edge-to-edge background to a constrained centered box (`height: 92%; aspect-ratio: 3
/ 4`), which is actually closer to the reference anyway — its models aren't edge-to-edge either,
there's visible background at the sides. This fixed the crop and improved the structural match
simultaneously.

**Verified, not assumed:** the ticker's horizontal scroll was confirmed by reading its computed
`transform` at two points two seconds apart (`translateX` value changed from -223.9px to -302.9px);
the CTA's real WhatsApp link was confirmed; and the "Fitness Powerhouse" headline's apparent
off-center wrap on mobile (worth a screenshot-only double-take) was checked with an actual
`getComputedStyle` read of `text-align` and the element's bounding box — confirmed genuinely
centered with symmetric margins, not a bug, just an optical effect of the two words' different
lengths.

## Stage 25 — Hero rebuilt against a client-supplied reference design

The client supplied a screenshot of a reference hero design (a fitness landing page with a giant
centered headline word, a ghosted/duplicated text effect, a large centered portrait, a left support
block, bottom-left social icons, and a bottom-right "150K members" social-proof badge) and asked for
a close structural replica using the real owner photo. Rebuilt `Hero.tsx`/`Hero.css` again — the
fourth Hero design in this project — to match:

- **Giant centered word** — "POWER" (a direct tie to the brand name), with a continuously,
  slowly-drifting ghosted duplicate behind it (outlined text, offset, animating — not a static
  double-print) and a pulsing red accent dot, matching the reference's layered typographic effect.
- **Centered portrait** sitting directly below/behind the headline, face visible near the text (this
  is why `heroImage` was switched back to the front-facing photo — the close-cropped action shot
  used in the previous full-bleed design doesn't include the face, which this composition needs).
- **Left support block** — paragraph + primary CTA + an animated "EXPLORE" cue (arrow nudges
  continuously, and — unlike the reference, which has no equivalent — this one is a real clickable
  button that scrolls to the next section, not just decoration; see the bug note below for why that
  needed a second pass).
- **Bottom-left social icons** (Instagram + WhatsApp, both real links) and a **bottom-right stat
  badge** — this is the one deliberate content departure from the reference: the source design shows
  a stack of fabricated member avatars and a "150K" member count, which cannot be replicated as
  real content — same honesty pattern used throughout this whole project (Transformations,
  Certificates, membership pricing, etc.). Swapped for the real, already-established "12+ years"
  stat with the owner's own photo as a single avatar — same visual pattern (avatar + big number +
  label), honest content.

**Two real bugs caught during this rebuild, not just visual tweaks:**

1. **Layout overflow.** The first version sized the centered photo by width
   (`width: min(560px, 62vw)` with a fixed aspect-ratio), which ignored available vertical space
   entirely. Measured the actual rendered hero height via Playwright and found it was 1099px against
   an 812px viewport budget — pushing the bottom-left/bottom-right badges roughly 230px below the
   fold, invisible without scrolling. Fixed by sizing the photo from viewport height instead
   (`height: clamp(240px, 44vh, 420px)`), which scales down proportionally on shorter viewports.
   Re-measured after the fix: hero height dropped to exactly 812px, matching the available budget,
   with both badges now confirmed on-screen.
2. **Lost functionality during the rewrite.** The new design's "EXPLORE" cue was initially built as
   a plain decorative `<div>` with no click handler — silently dropping the working "scroll to next
   section" behavior the previous Hero version had. This wasn't caught by inspection; it was caught
   because the existing regression test suite included a click-and-check-scroll-position test for
   this exact button, which failed with a real error (`.hero__cta-secondary` not found) when run
   against the new markup. Converted the cue to a real `<button>` with the scroll handler restored,
   then re-ran the same test to confirm `scrollY` actually changes on click.

Also worth noting: mobile fullPage screenshots of this site will report very tall pixel dimensions
(e.g. ~49,800px on iPhone 13 emulation) — that's expected, not a bug. iPhone emulation uses 3x
device pixel ratio, and the page's actual CSS height (~16,600px, the honest sum of 15+ real
sections built up over many stages) × 3 ≈ that number. Use viewport-only screenshots for visual
review on high-DPR mobile emulation; fullPage screenshots on those devices will just hit tooling
size limits without indicating an actual problem.

## Stage 24 — Hero fully rebuilt: cinematic full-bleed campaign layout

Per direct feedback that the Hero still felt like a generic template ("WordPress feel") even after
two prior redesign passes, this is a genuine structural rebuild, not another tweak — the third and
final Hero design in this project's history (see the component's own doc comment for why the
previous "angled panel split" pattern was retired):

- **No more angled panel split.** The photo now fills the entire section edge to edge — full-bleed,
  campaign-poster style (Nike/Adidas editorial energy) — with content sitting directly on top of it,
  bottom-left, rather than being boxed into a separate dark panel. `HeroEditorial.tsx` and
  `HeroImage.tsx` were deleted; everything now lives in one consolidated `Hero.tsx`, which is also
  simpler to maintain (one responsive layout instead of two structurally different desktop/mobile
  branches).
- **The flat horizontal marquee ticker is gone.** In its place: a minimal vertical "SCROLL" cue,
  bottom-right, with a dot that continuously slides down a thin track on a loop — a common
  premium-site pattern, and one that reads as considered rather than a generic ticker filling
  space.
- **Genuinely continuous motion, not just entrance animations that finish and go static:** the
  photo has a slow continuous Ken Burns drift (verified by reading its computed transform at two
  points three seconds apart and confirming the scale value actually changed); the location tags
  carry a pulsing "live" dot; the headline's accent word ("DISCIPLINE.") has a continuous shimmer
  (same gradient-text technique as The Standard's manifesto lines); the primary CTA has a slow
  breathing glow ring; the scroll cue's dot loops continuously. All confirmed via computed-style
  animation-name checks, not just visual inspection.

**A real bug caught mid-build, not just a design note:** the photographer's watermark
("mr.CLICK Photography," visible partway down the source image) bled into frame at the top-left
corner once the new full-bleed crop was applied — first spotted on desktop, then found to still
leave a faint trace on mobile even after an initial fix, since mobile's narrower viewport reveals a
taller vertical span of the source image than desktop does. Rather than keep chasing this with
`object-position` tweaks indefinitely, the source image itself
(`src/assets/images/owner-about.jpg`) was permanently re-cropped with Pillow to physically remove
the watermarked region — a one-time fix that can't regress regardless of future crop/positioning
changes, verified clean on both breakpoints afterward. The on-page photo credit line stays in place
regardless (a clean typographic credit is the more professional treatment anyway, versus a graphic
watermark competing with the design).

## Stage 23 — floating WhatsApp + back-to-top buttons

Two fixed circular buttons, bottom-right, that fade/scale in once you've scrolled past ~480px
(`floatingActionsContent.scrollThreshold` in `business.ts`) rather than sitting on screen from the
first frame: a WhatsApp button (kept in WhatsApp's own recognizable green rather than the site's
red accent — this is a third-party app affordance, not a brand element, and a custom SVG glyph
since lucide-react doesn't ship brand icons, same reason Instagram has its own custom mark) and a
back-to-top button. `src/components/FloatingActions/`. Sits at `z-index: 700` — above the navbar
(500) so it's always reachable, below the mobile menu overlay (900) and any modal/lightbox (9000+)
so those correctly cover it when open — confirmed by screenshotting with the mobile menu open.

**A real bug caught while building this, not just in the new component:** clicking back-to-top
(both the new floating button and the Footer's existing one, which shares the same `#top` target)
consistently landed at `scrollY ≈ 71`, never quite reaching the top. Root cause: `id="top"` was set
on the Hero `<section>` itself, but Hero sits *below* the sticky Navbar in normal document flow —
sticky elements still occupy their normal-flow space, so an anchor scroll to Hero's own top edge
lands at the navbar's height, not real `Y=0`. Fixed by adding a dedicated zero-height sentinel
`<div id="top">` as the actual first element in the page (before the Navbar) and removing the
duplicate `id="top"` from Hero. Verified with a real scroll-then-click test, checking the value at
multiple time points to confirm it actually settles at exactly `0`, not just "close enough":
before the fix it settled at 71 and stayed there; after, it settles at 0.

## Stage 22 — Hero redesign, colored wordmark, Find Us restructure

Three explicit design changes, per direct feedback:

**Hero — swapped photo, black & white premium treatment, fixed crop.** The Hero now uses the photo
that was previously in the About section (the dramatic bicep-curl shot), and About uses the other
real photo instead — so the two sections still show different images rather than literally
duplicating one photo. The Hero photo is rendered in black & white
(`filter: grayscale(1) contrast(1.15) brightness(0.96)` in `Hero.css`) for a more premium, editorial
feel. The crop was re-done properly this time: four different focal points were rendered and
compared side by side before picking one — the final framing centers on the flexed bicep and the
dumbbell in sharp focus, not just a headshot (the first attempt only showed neck/ear, which is
exactly the kind of "bad placement" that prompted this whole redesign).

**Wordmark color split.** A new reusable `Wordmark` component (`src/components/Wordmark/`) renders
"FITNESS" and "HOUSE" in the site's off-white and "POWER" in the brand red — matching the color
logic of the client's real logo, adapted for this site's dark theme (the original logo's black
lettering doesn't work on dark backgrounds, as documented in an earlier stage). Used everywhere the
text wordmark appears: Navbar, Footer, and Preloader.

**Find Us — full restructure.** Replaced the plain two-column (map | form) layout with a
full-bleed map background, an angled charcoal panel overlaying it (address, headline, directions
CTA), and a floating elevated form card with real drop-shadow depth. The panel's diagonal cut
originally used the exact same clip-path angle as the Hero's editorial panel as a deliberate
structural echo between the page's opening and closing sections — **note: Hero was rebuilt as a
full-bleed layout in Stage 24 and no longer has an angled panel of its own**, so this echo no
longer applies; Find Us's angled panel now stands on its own (see the updated comment above
`PANEL_CLIP` in `FindUs.tsx`). Mobile drops the angle entirely and stacks normally (map on top,
panel content flowing below, form last).

## Stage 21 — reload always starts at the top, deployment-ready

Browsers can restore the previous scroll position on reload (and on back/forward navigation) by
default — annoying on a long one-page site like this, since a reload mid-scroll would otherwise
snap back to wherever you'd scrolled to. Fixed with `window.history.scrollRestoration = 'manual'`,
set via an inline script in `index.html`'s `<head>` (not in `main.tsx` — the browser's own
restoration decision happens before any module script gets a chance to run, so anything later
would be too late to prevent the initial jump), plus a `window.scrollTo(0, 0)` backup in `App.tsx`
in case Lenis nudges the position during its own setup on mount. Verified with a real
`page.reload()` in Playwright (not just `goto()`): scrolled to 8538px, reloaded, confirmed
`scrollY === 0` both immediately and a second later (not just briefly before drifting back down).

### Deploying to Vercel via GitHub

1. **Push this project to a GitHub repository** (if it isn't already):
   ```bash
   git init
   git add .
   git commit -m "Fitness Power House website"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```
2. Go to **vercel.com**, sign in (GitHub sign-in is simplest), click **Add New → Project**.
3. Select the GitHub repository you just pushed. Vercel auto-detects this as a Vite project —
   the defaults it picks (Build Command `vite build` / `npm run build`, Output Directory `dist`,
   Install Command `npm install`) are already correct for this project; no changes needed.
4. Click **Deploy**. First deploy takes 1-2 minutes. Vercel gives you a live `*.vercel.app` URL
   immediately, and a real custom domain can be attached afterward from the project's Settings →
   Domains.
5. **Every future `git push` to `main` auto-deploys** — that's the whole point of connecting
   through GitHub rather than uploading manually. Pull requests also get their own automatic
   preview deployments before merging, if that workflow is useful later.

No environment variables are needed for this project — everything (WhatsApp number, business
info, pricing, etc.) lives in `src/config/business.ts` and gets bundled at build time. If any of
that ever needs to change without a redeploy (e.g., a marketing team updating copy independently),
that would be a reason to introduce env vars or a CMS later — not necessary for the current setup.

## Stage 20 — full-site motion pass

Per explicit request ("no statics" — every section should feel alive, not just animate once on
scroll and then sit still), this pass went through every section adding either continuous idle
motion or richer hover interactions:

- **The Gym** — gallery tiles now zoom in slightly on hover (in addition to their existing
  scroll-parallax drift).
- **Footer** — link hover now shows a sliding red tick mark; the back-to-top arrow idles with a
  gentle bounce.
- **FAQ** — question rows get a sliding red tick + indent on hover, matching the Footer's language.
- **Certificates** — the zoom-icon on each card now pulses continuously, inviting the click.
- **About** — the "12+" years stat now counts up from 0 when it scrolls into view instead of just
  appearing.
- **Packages** — price numbers turn red on card hover; checklist icons pop/rotate on individual
  hover.
- **Programs** — row index numbers scale up and titles slide right on hover, alongside the
  existing arrow-rotate.
- **The Standard** — the accent word in each manifesto line now has a slow, continuous shimmer
  instead of being flat red.
- **Find Us** — the map frame glows on hover; the submit button lifts on hover/press.

**A real bug worth documenting in detail, because it cost significant back-and-forth to isolate:**
the very first hover-zoom attempt (on The Gym's gallery tiles) used `gsap.quickTo(element, 'scale',
...)` — the bare property name. This silently failed: the setter was confirmably being called (
verified via a temporary marker attribute), but the resulting inline style showed `scale: none`
instead of the target value. Root cause: modern browsers support `scale`/`rotate`/`translate` as
independent CSS properties (distinct from the classic `transform` shorthand), and GSAP's property
name `'scale'` was routing through that native property in a way that resolved to `none` rather
than the numeric target — even though the call definitely fired. Fixed by using `scaleX`/`scaleY`
instead, which forces GSAP's classic `transform: scale()` codepath.

Partway through isolating that, a **second, unrelated problem** was discovered: an intermediate
debugging edit introduced a genuine TypeScript error (`mask` possibly `null` inside a closure) that
made `tsc -b && vite build` fail outright. Because the build step failed, `vite build` never ran and
`dist/` was never regenerated — meaning several rounds of "the fix isn't working" testing were
actually against a **stale bundle** from before the broken edit, not evidence about the real
scale-property bug at all. This was caught by explicitly checking the build's exit output line by
line rather than assuming a clean run, and re-verified against a confirmed fresh build afterward.
The practical lesson (now applied throughout this file and worth remembering for future edits): a
chained `build && preview` command can silently serve old code if the build step errors out
partway — always confirm "built in Xs" actually appears in the output before trusting subsequent
test results.

## Swapping in real client assets

Everything that's a placeholder is centralized in **`src/config/business.ts`**:

- **WhatsApp number** — replace `WHATSAPP_NUMBER`. Every CTA calls `getWhatsAppLink()`, so this one
  edit updates them all. Membership and each Programs row already send their own tailored message.
- **Hero photography** — now a real photo of Ashwin (`src/assets/images/owner-hero.jpg`), bundled as
  a local Vite asset via `heroImage.src`. Replace the file and re-point the import if a different
  hero shot is wanted later.
- **The Gym gallery photography** — still placeholder stock. Replace each entry's `src` / `baseUrl`
  in `theGymGallery` once real facility photos are supplied.
- **Programs photography** — still placeholder stock. Replace each entry's `image.src` /
  `image.baseUrl` in `programs`. The Find Your Program quiz result screen automatically reuses
  whichever image/copy is set here — no separate quiz-specific assets to maintain.
- **Quiz questions/scoring** — `quizQuestions` in `business.ts`. Each option carries a `scores`
  object keyed by `ProgramKey` (`strength` / `personal` / `functional` / `open`); the program with
  the highest total after all three questions wins. Add/adjust questions or scores there — the
  component itself needs no changes.
- **Membership photography** — still placeholder stock (`membershipImage.src`).
- **Membership vs. Packages pricing** — Membership itself deliberately still has no numbers
  (`membershipContent.inclusions` is a plain checklist) and now correctly points readers to
  Packages for exact pricing. **Real pricing lives in the Packages section**
  (`packagesContent` / `packages` in `business.ts`) — both Gym Membership and Personal Training
  groups are real numbers from the client, no more demo badges.
- **Transformations photos** — **still the interactive demo before/after slider**, per the original
  explicit request to use demo imagery. Each card intentionally uses ONE stock photo with two visual
  treatments (grayscale "before" / full-color "after") rather than pairing two different real
  people's photos as a fake transformation — doing that would misrepresent real, identifiable stock
  subjects regardless of a "DEMO" label. Every card is badged DEMO. Once the client's real member
  before/after photo pairs arrive, replace `transformations` in `business.ts` with real `before`/
  `after` image objects per entry, and update `SliderCard` in `Transformations.tsx` to render two
  distinct images instead of one image with two filters — see the comment above
  `transformationsContent`.
- **Certificates & Licensing** — **now real.** Three actual documents (NSDC/Skill India, Sapphire
  Fitness Academy CPT, FSSAI registration), converted from the supplied photo/PDFs to web-ready
  images in `src/assets/images/`. Click any card to view it full-size in the lightbox. See the
  `certificates` array in `business.ts` to add/replace entries.
- **About bio & owner photo** — **now real.** Ashwin's own story (condensed intro + pull-quote +
  expandable full text) and a real training photo, with proper photographer credit. See
  `aboutContent` and `aboutImage` in `business.ts`.
- **BMI calculator copy/thresholds** — `bmiContent` and `bmiCategories` in `business.ts`. Categories
  use the standard WHO BMI ranges. The disclaimer is intentional and shouldn't be removed — it's
  what keeps this a "general indicator" tool rather than something that reads as medical advice.
- **Exercise Finder's exercise list** — `exercises` in `business.ts`. These are standard,
  well-established exercise names/muscle groups/equipment types — not a claim about Fitness Power
  House specifically, so there's no "don't invent" concern here the way there is with business
  facts. Freely add, remove, or re-tag exercises; the search and body-part filter both read
  directly from this array with no other code changes needed.
- **The Standard's lines** — `standardContent.lines` in `business.ts`. This is brand voice, not a
  factual claim about the business, so it's fine to edit freely for tone — just keep each line
  short (it's set at huge type sizes).
- **FAQ answers** — `faqItems` in `business.ts`. Every answer is written to either restate something
  already true elsewhere on the site or defer to WhatsApp for specifics not yet confirmed (hours
  are still the only one of these still unconfirmed). Keep that pattern when adding new questions.
- **Find Us map/location** — **now the real registered address** (from the FSSAI certificate: 79
  MIG Jawahar Nagar, Ward No. 17, Dewas, Madhya Pradesh 455001), driving both the embedded map and
  the "Get Directions" link via `business.location` and `findUsContent.mapQuery`. The map embed uses
  Google's no-API-key query embed (`google.com/maps?q=...&output=embed`); if you set up a Google
  Maps API key later, `getMapEmbedUrl()` in `business.ts` can be upgraded to the official Maps
  Embed API for longer-term reliability.
- **Find Us contact form** — there's no backend, so submitting the form builds a WhatsApp message
  from the Name/Phone/Message fields (via `buildContactWhatsAppMessage` in `business.ts`) and opens
  WhatsApp — nothing is emailed or stored. This matches every other CTA on the site; if a real
  backend/email service is added later, `FindUs.tsx`'s `handleSubmit` is the only place that needs
  to change.
- **Google Reviews** — **`GOOGLE_PLACE_ID` in `business.ts` is currently `null`.** Without a real,
  verified Google Place ID, the review CTA falls back to a plain Google Maps search rather than a
  direct "write a review" link — inventing/guessing a Place ID would risk sending people to the
  wrong listing entirely. Once you have the client's real Google Business Profile, set
  `GOOGLE_PLACE_ID` and every review link across the site (modal + anywhere else it's used)
  switches to the correct direct-review-form URL automatically.
- **Instagram** — **now real.** `@fitnesspowerhousegym` (main account) and
  `@the_classical_personality` (Ashwin's personal account, linked from About). See
  `getInstagramLink()` / `getOwnerInstagramLink()` in `business.ts`.
- **Instagram** — **`INSTAGRAM_URL` in `business.ts` is a placeholder** (`https://instagram.com`),
  not a guessed handle. The visible CTA copy ("Follow on Instagram") is deliberately generic so
  nothing on-screen asserts a specific handle that hasn't been confirmed. Swap `INSTAGRAM_URL` once
  the real profile is known.
- **Logo** — the navbar currently renders a text wordmark (`FPH` / "FITNESS POWER HOUSE"). Swap in
  the client's actual logo mark inside `Navbar.tsx` (and `Footer.tsx`, which repeats it) when
  available.
- **Nav destinations** — `navLinks` in `business.ts`. Every link now resolves to a real section —
  `#the-gym`, `#programs`, `#membership`, `#transformations`, and `#about` all exist.
- **Footer hours** — `footerContent.hoursNote` currently reads "Hours available on request" since no
  real operating hours were supplied. Replace with actual hours once known.

## Design notes

- **Type**: Big Shoulders Display for controlled headline statements; Inter for UI/body text; IBM
  Plex Mono for editorial metadata (location, section index, captions, ticker text).
- **Color**: `#050505` / `#0b0b0b` base, warm off-white text, one deep red accent
  (`--color-red-bright`) used only for accent lines, hover states, and small index numerals/check
  icons — never a wash of red.
- **Section rhythm — each section is deliberately built differently**, so the page doesn't read as
  one template repeated: the hero is the campaign moment (huge, layered, dynamic); The Gym is a
  photo-led asymmetric gallery; Programs is a spec-sheet list with a hover-reveal preview; Find
  Your Program and the BMI Calculator are matched self-contained interactive tools (bordered card,
  not a full layout section); Membership is a checklist + photo/CTA panel (visual right); The
  Standard is pure typography with a scroll-march reveal; Transformations is a centered statement
  with honest placeholder frames; About mirrors Membership's two-column shape but flipped (visual
  left). Same tokens throughout, different structure each time.
- **Honesty over invention, consistently**: Membership has no pricing table, Transformations has no
  fabricated before/afters, About has no invented bio, the Google Review link falls back to a plain
  search rather than a guessed Place ID, Instagram's CTA copy stays generic rather than asserting an
  unconfirmed handle — every one of these follows the same principle of sticking to verified facts
  and using an honest, clearly-marked placeholder rather than filling the gap with something fake.
- **Google Review modal timing/frequency** — currently opens automatically on **every** page load
  (a few seconds after the hero settles), per explicit request. Worth knowing: this is a more
  aggressive pattern than most sites use — repeat visitors will see it every time they refresh.
  Capping it to once per browser session is a small follow-up (a `sessionStorage` check in
  `GoogleReviewModal.tsx`'s trigger `useEffect`) if it starts to feel like too much.
- **Motion**: everything funnels through `useReducedMotion()` — under reduced motion, choreography,
  parallax, magnetic buttons, marquee, and custom cursor all collapse to instant/static states.
  Section reveals use one-shot `ScrollTrigger`s (`once: true`), so they never re-trigger on
  scroll-back.
- **Broken-image resilience**: every photo has an `onError` handler (`utils/onImageError.ts`) that
  fades the `<img>` out if it fails to load, so the container's designed fallback background shows
  through instead of the browser's default broken-image icon. This matters for real usage too, not
  just this sandbox — a photo can fail to load for any visitor on a bad connection.

## Known environment note

This project was built and tested inside a sandboxed environment whose network egress does not allow
reaching `fonts.googleapis.com` or `images.unsplash.com`. That means:

- The Google Fonts will not load in that sandbox, so screenshots taken there show system-font
  fallbacks. Typography sizing was kept conservative (with `overflow-wrap` safety nets and
  `white-space: nowrap` on headline words) so layout holds up even under wider fallback-font
  metrics.
- All temporary photos will similarly 404 in that sandbox only; designed dark gradient/solid
  fallbacks are shown instead (and the `onImageError` handler above keeps that fallback clean). On
  any normal connection all of it loads normally.
- **Real bugs caught and fixed during this build (not just testing artifacts):**
  1. GSAP's ticker reports time in seconds, but Lenis's `raf()` expects milliseconds — without
     converting (`time * 1000`), smooth scroll and anchor-link navigation both stalled almost
     completely. Fixed in `useLenis.ts`.
  2. In the Programs row list, the index number was vertically centering against the full
     title+description block instead of aligning with the title. Fixed with `align-items:
     flex-start` and a small top offset.
  3. Failed image loads showed the browser's default broken-image icon (not just missing alt text)
     against the Membership section's lighter graphite placeholder background. Fixed by adding a
     shared `onError` handler to every `<img>` across the site.
  4. A stray `data-cursor` ring/label artifact appeared in a resized-viewport mobile screenshot.
     Verified with real device emulation (`devices['iPhone 13']` in Playwright, which correctly
     sets `hasTouch`) that this was a testing-methodology gap, not a real bug — plain viewport
     resizing doesn't set touch capability flags, so `pointer: coarse` detection (which correctly
     gates the custom cursor) can't be evaluated accurately that way.
  5. Under `prefers-reduced-motion`, the Preloader's reduced-motion fallback used `autoAlpha`
     (GSAP's opacity+visibility shortcut) to instantly reveal the dumbbell icon and wordmark.
     GSAP's `autoAlpha` sets `visibility: inherit` rather than `visibility: visible` — a
     deliberate design choice so nested autoAlpha'd elements can each control their own
     visibility — but when an ancestor starts as CSS `hidden` (as `.preloader` does, so it's
     invisible before the animation begins), that inheritance chain got tangled across the
     nested SVG `<g>` groups and left the dumbbell invisible under reduced motion specifically.
     Fixed by setting `opacity`/`visibility` explicitly and literally in that one fallback path
     instead of relying on `autoAlpha`'s inherited-visibility trick.
  6. The Certificates section's 3D mouse-tilt effect was silently a no-op — `gsap.quickTo` was
     called with the CSS property names `rotateX`/`rotateY`, but GSAP's actual internal names for
     3D rotation are `rotationX`/`rotationY`. The wrong names didn't error, they just never
     applied. Confirmed broken (inline `transform` stayed `translate(0px, 0px)` under simulated
     mouse movement), fixed the property names, then re-confirmed via the actual computed
     `rotateY()/rotateX()` values in the transform string before trusting it visually.
  7. Two testing-methodology traps worth knowing about if extending these tests: (a) directly
     setting a range `<input>`'s `.value` via JS and dispatching a synthetic event does **not**
     reliably trigger React's `onChange` (React's synthetic event system hooks the native value
     setter, which direct property assignment bypasses) — use real keyboard (`ArrowLeft`/
     `ArrowRight` after `.focus()`) or mouse interaction to test controlled range inputs. (b)
     `getComputedStyle().visibility` can give contradictory-looking readings across nested SVG
     `<g>` elements inside an HTML tree — when in doubt, trust an actual screenshot over a
     computed-style query for visibility/paint questions.
  8. **User-reported**: the Transformations before/after slider got stuck on drag — the value
     would jump to 0 on mousedown and stop responding to further movement. Root cause: the range
     input's `::-webkit-slider-thumb` was styled to `width: 100%; height: 100%` to make the whole
     track "grabbable" — but a webkit thumb sized to match its entire track breaks the browser's
     native thumb-relative drag offset math, collapsing the value. Reproduced with an actual
     Playwright mouse drag (mousedown → stepped mousemoves → mouseup, tracking the range's value
     at each step) before and after the fix — before, every step read `value=0`; after, values
     tracked the cursor continuously in both directions (verified 50→39→28→17→6→28→61→83 across a
     single drag, plus a full edge-to-edge 0→100 drag and a real touch-tap test on iPhone
     emulation). Fixed by giving the thumb a normal, modest width (34px, full track height) instead
     of matching the whole track — the input itself is still `opacity: 0` and spans the full card,
     so click-anywhere-to-jump-then-drag still works exactly as intended, just without the broken
     math.
  9. **Real bug during the navbar rewrite (not user-reported, caught in testing)**: the mobile
     logo wasn't actually centered — it sat flush against the left edge instead. Root cause: CSS
     Grid auto-placement reassigns items to tracks in DOM order when a sibling is removed via
     `display: none` (the left-link group on mobile), so the logo silently shifted into track 1
     instead of staying in the center track. Fixed with explicit `grid-column` assignments on each
     child instead of relying on implicit auto-placement — confirmed via screenshot before and
     after.
  10. The `www.google.com` Find Us map embed shows "Host not in allowlist" inside this sandbox
      specifically — that's the sandbox's own network proxy refusing the request, not a code bug
      (confirmed: the exact iframe `src` and the "Get Directions" `href` were both verified correct
      via direct inspection, and the sandbox's proxy produces that literal error message for any
      disallowed host, the same category as the Unsplash/Google Fonts restrictions noted above).
      The map will load normally on a real connection.

## Navbar history (for context, not a bug log)

The navbar has been through three structurally different designs across this build, each a full
rewrite rather than a re-skin:

1. **Centered-split** — logo dead-center, links flanking symmetrically, horizontal scroll-progress
   rail as the bottom border.
2. **Vertical rail** — fixed full-height left rail, rotated link text, a vertical "weight stack"
   scroll indicator. Required touching `global.css` (body padding), `Hero.css`, and
   `Programs.css` (sticky offset) since it changed how page content was laid out relative to nav.
   Explicitly rejected — moved back to a top bar.
3. **"The Bar" (current)** — top bar again, but with an actual gym concept: nav links as bordered
   "plate" chips, CTA as the bolder filled chip, and the line beneath the nav loads with color as
   you scroll, like plates going onto a barbell as you progress through the site. The three
   `global.css`/`Hero.css`/`Programs.css` layout dependencies from the rail were reverted back to
   their pre-rail values as part of this change.

If the navbar changes again, check `Hero.css`'s two height rules and `Programs.css`'s sticky
`top` offset — those are the only two other files that care whether nav consumes vertical space
(a top bar) or horizontal space (a rail).

## Next steps

The page is structurally complete, top to bottom. What's left is real content, not more building:
swap the placeholder photos/copy for real client assets as they arrive (see "Swapping in real
client assets" above) — hero and gallery photography, owner bio and photo, transformation photos,
and actual membership pricing are the main ones. Optional future additions if wanted: a
location/map embed, FAQ, or reviews section — none of these were in the original nav scope, so
they'd be new asks rather than "finishing" something.




