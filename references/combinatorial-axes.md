# Combinatorial Variation Engine — Per-Template Axes

Borrowed from Leonxlnx/taste-skill imagegen-frontend-web Section 2.

**Why this exists:** image_generation tool defaults to AI slop (centered dark
hero, purple/blue neon glow, floating meaningless blobs, generic dashboard
spam, weak typography, cloned sections). To break this default, **30x-image
must commit to one option per axis** and write the choices explicitly into
the prompt. Don't let the model pick for you — picking creates AI slop;
committing creates intent.

**How to bias picks using DESIGN.md `taste:`** —
- `taste.variance`: 1-3 → symmetric/predictable picks; 4-7 → balanced/offset;
  8-10 → asymmetric/artistic
- `taste.density`: 1-3 → airy options; 4-7 → balanced; 8-10 → packed
- `taste.art_direction`: 1-3 → safe commercial; 4-7 → contemporary; 8-10 →
  bold creative
- `taste.imagery_realism`: 1-3 → illustration; 4-6 → editorial; 7-10 →
  photoreal
- `taste.text_density_in_image`: 1-3 → minimal text; 4-7 → moderate; 8-10 →
  info-dense

---

## Template: `ad-creative` (M0 — fully defined)

### Axis 1: Hero Composition (pick 1 of 5)

1. **Cinematic Centered Minimalist** — single subject middle, generous
   negative space. Best for: variance ≤ 3, density ≤ 4, premium luxury.
2. **Asymmetric Split** — subject on one side (40-60% width), copy on the
   other. Best for: variance 4-6, contemporary brands, B2B SaaS.
3. **Floating Polaroid Scatter** — 3-5 product/lifestyle shots arranged
   organically. Best for: variance 7-10, density 6-8, lifestyle/consumer.
4. **Inline Typography Behemoth** — typography is the hero, image inline
   between/inside letterforms. Best for: variance 7-9, art_direction ≥ 8,
   editorial / fashion.
5. **Editorial Offset** — subject offset against horizon line / fold,
   editorial magazine feel. Best for: variance 4-7, premium brands with
   stories.

### Axis 2: Subject Framing (pick 1 of 4)

1. **Macro close-up** — fills 60-80% frame, one detail. Best for: product,
   sensory, food.
2. **Medium environmental** — subject at chest-up or hip-up, environment
   visible. Best for: people, work scenes, lifestyle.
3. **Wide cinematic** — subject is small in environment. Best for:
   architecture, mood, atmosphere.
4. **Top-down flat-lay** — bird's eye view, items arranged. Best for:
   tools, food, organized chaos.

### Axis 3: Lighting Mood (pick 1 of 4, biased by `taste.imagery_realism`)

1. **Soft natural daylight** — diffuse window light, no harsh shadows.
   Realism 5-8. Mood: calm, trustworthy, premium.
2. **Hard studio rim-light** — strong directional with rim accent. Realism
   7-10. Mood: dramatic, premium, sharp.
3. **Golden hour warm** — low-angle warm directional. Realism 6-9. Mood:
   aspirational, lifestyle, optimistic.
4. **Cool blue cinematic** — high-contrast cool palette, deep shadows.
   Realism 8-10. Mood: tech, fintech, evening, urban.

### Axis 4: Text-Image Integration (pick 1 of 4)

1. **Tagline overlaid bottom-left** — classic ad layout, large headline at
   bottom, image fills above. Best for: most B2B / SaaS ads.
2. **Tagline floating top-right** — minimal interference with subject,
   wordmark style. Best for: luxury / fashion / Apple-aesthetic.
3. **Tagline as hero (image is supporting)** — copy dominates, image is
   atmospheric/textural support. Best for: editorial, brand statement.
4. **Inline tagline (text wraps around image)** — fashion magazine layout.
   Best for: variance ≥ 7, art_direction ≥ 8.

---

## Template: `logo` (M1 — fully defined)

Cookbook §4.5 anchor: "clean vector-like shapes, strong silhouette, balanced
negative space, scalability, flat design, plain background."

### Axis 1: Mark Geometry (pick 1 of 5)

1. **Geometric primitive** — circles, squares, triangles fused into a
   precise mark. Best for: variance ≤ 4, art_direction 4-7, fintech / SaaS
   / engineering.
2. **Organic / hand-drawn silhouette** — rounded, slightly irregular,
   warmth-forward. Best for: variance 5-8, food / lifestyle / wellness /
   bakery-style brands.
3. **Typographic monogram** — single letterform or 2-letter ligature as the
   mark. Best for: variance 3-6, premium / heritage / fashion / agency.
4. **Abstract symbolic** — non-literal mark suggesting motion / flow /
   network. Best for: variance 6-9, art_direction ≥ 7, deep-tech / data /
   AI brands.
5. **Wordmark only** — pure typography, no separate symbol. Best for:
   variance ≤ 5, density ≤ 4, editorial / publishing / consultancy.

### Axis 2: Stroke & Weight (pick 1 of 4)

1. **Hairline precision** — 1-2px equivalent, technical drafting feel.
   Best for: art_direction 5-8, premium / financial / scientific.
2. **Medium uniform** — consistent moderate stroke, friendly and balanced.
   Best for: variance 3-6, mainstream consumer / SaaS.
3. **Chunky bold** — heavy stroke, retail-readable at small sizes. Best
   for: density 6-9, consumer brands / retail / FMCG.
4. **Variable / contrast weight** — thick-thin transitions, calligraphic
   echo. Best for: art_direction ≥ 7, fashion / editorial / luxury.

### Axis 3: Negative Space Strategy (pick 1 of 4)

1. **Contained closed mark** — silhouette is solid, negative space frames
   it externally. Best for: variance ≤ 4, conservative / institutional.
2. **Hidden symbol in negative space** — clever counterform reveals second
   meaning (FedEx-arrow style). Best for: art_direction ≥ 7, design-aware
   audiences.
3. **Open silhouette** — the mark breathes through, intentional gaps. Best
   for: density ≤ 4, spacing ≥ 6, modern / minimal.
4. **Counterform-driven** — the white space IS the subject, mark is the
   frame. Best for: art_direction ≥ 8, variance ≥ 6, gallery / editorial.

### Axis 4: Color Application (pick 1 of 4)

1. **Single solid brand color** — one hex, max conviction. Best for:
   variance ≤ 5, density ≤ 5, brand-anchor logos.
2. **Two-tone (primary + neutral)** — accent + dark navy / off-black
   pairing. Best for: balanced default for most brands.
3. **Subtle mono-gradient** — single-hue tonal shift, no rainbow. Best
   for: art_direction 5-7, premium tech.
4. **Monochrome black & white only** — defers all color to context. Best
   for: variance ≥ 6, editorial / fashion / heritage / when logo must
   survive any background.

---

## Template: `slide` (M1 — fully defined)

Cookbook §4.10 anchor: "artifact spec, real numbers, polished spacing, NO
clip art / stock / decorative gradients / shadows."

### Axis 1: Layout Pattern (pick 1 of 5)

1. **Centered hero stat** — one number / claim dominates, supporting copy
   below. Best for: variance ≤ 4, density ≤ 4, keynote moments.
2. **Left text + right visualization** — claim left, chart/diagram right.
   Best for: variance 4-7, density 5-7, B2B SaaS / fundraising standard.
3. **2-column comparison** — before/after, us/them, current/future. Best
   for: density 5-8, art_direction 4-7, sales / pitch.
4. **Asymmetric stack** — headline top, supporting blocks offset / staggered.
   Best for: variance 6-9, art_direction ≥ 7, design-forward decks.
5. **Grid of metrics (3-4 cells)** — equal-weight KPIs / features. Best
   for: density ≥ 7, text_density_in_image ≥ 6, board reports / annual.

### Axis 2: Data-Viz Style (pick 1 of 4)

1. **Minimal line chart** — single trend line, light axes, no fill. Best
   for: density ≤ 5, growth narratives, time-series data.
2. **Concentric rings (TAM/SAM/SOM)** — nested circles for hierarchy. Best
   for: market sizing slides, fundraising context.
3. **Bar chart muted** — 3-7 bars, no gradients, clear labels. Best for:
   density 5-7, comparison / breakdown narratives.
4. **No chart — big number hero** — single $X / N% / ratio at display size.
   Best for: density ≤ 3, variance ≤ 5, traction / milestone slides.

### Axis 3: Hierarchy Density (pick 1 of 4)

1. **Single hero element** — one number or claim, nothing else competes.
   Best for: density ≤ 3, keynote / brand moments.
2. **2-tier (headline + 3 supporting)** — classic deck rhythm. Best for:
   density 4-6, default for most pitch slides.
3. **Dense (5-7 elements)** — packed but organized. Best for: density 7-9,
   text_density_in_image ≥ 6, technical / due diligence.
4. **Index / TOC style** — numbered list, hierarchy by indent. Best for:
   structure-heavy decks, agendas, executive summaries.

### Axis 4: Surface Treatment (pick 1 of 4)

1. **Pure white minimal** — clean canvas, brand color used sparingly. Best
   for: variance ≤ 5, fundraising / financial / consultancy.
2. **Muted neutral palette** — off-white / cream / light gray base. Best
   for: art_direction 5-7, editorial / mature brands.
3. **Branded color section** — brand surface dominates as background. Best
   for: art_direction ≥ 7, brand-immersion moments.
4. **Dark mode with light text** — inverted, high-contrast premium feel.
   Best for: imagery_realism ≥ 7, tech / fintech / late-stage.

---

## Template: `product-mockup` (M1 — fully defined)

Cookbook §5.4 anchor: "clean silhouette, no halos/fringing, label integrity,
opaque background, subtle contact shadow, do not restyle."

### Axis 1: Background Treatment (pick 1 of 5)

1. **Pure white seamless** — catalog standard, opaque white sweep. Best
   for: ecommerce / catalog default, variance ≤ 4.
2. **Soft gradient surface** — subtle tonal shift behind product. Best
   for: art_direction 4-7, premium consumer.
3. **Textured studio paper** — cream / linen / canvas texture, organic.
   Best for: imagery_realism 5-7, food / wellness / craft brands.
4. **Contextual lifestyle scene** — product in implied use environment.
   Best for: imagery_realism ≥ 7, density 5-8, lifestyle ads.
5. **Floating against brand color block** — saturated single-color
   background. Best for: art_direction ≥ 7, variance ≥ 6, editorial /
   campaign.

### Axis 2: Lighting Setup (pick 1 of 4)

1. **Soft diffuse studio** — large softbox, no harsh shadow, even fill.
   Best for: realism 5-7, beauty / skincare / supplements.
2. **Hard rim with crisp shadow** — directional key + sharp ground shadow.
   Best for: realism 7-10, art_direction ≥ 6, premium/tech products.
3. **Warm directional sidelight** — golden cast, sculptural shadows. Best
   for: realism 6-9, food / craft / heritage.
4. **Cool overhead clinical** — flat top-light, neutral cast, technical
   feel. Best for: realism 7-9, medical / industrial / B2B SaaS hardware.

### Axis 3: Camera Angle (pick 1 of 4)

1. **Straight-on eye level** — flat product face, label fully readable.
   Best for: catalog default, label-critical SKUs.
2. **3/4 hero angle** — slight rotation reveals depth + label. Best for:
   variance 4-7, hero shots / packaging-forward.
3. **Top-down flat-lay** — bird's-eye view, multiple items arranged. Best
   for: density ≥ 6, lifestyle / kit / set products.
4. **Low-angle heroic** — looking up at product, monumental feel. Best for:
   art_direction ≥ 7, variance ≥ 6, statement / luxury.

### Axis 4: Surface Material Mood (pick 1 of 4)

1. **Premium matte** — soft, non-reflective, expensive-feeling. Best for:
   art_direction 5-8, premium consumer / cosmetics.
2. **Glossy reflective** — visible highlights, slight reflection underneath.
   Best for: realism 7-10, beverage / electronics / luxury.
3. **Textured organic** — visible grain / weave / paper / wood. Best for:
   realism 6-9, craft / artisanal / heritage / food.
4. **Sterile clinical** — even, flawless, lab-grade. Best for: realism 8-10,
   medical / pharma / scientific.

---

## Template: `marketing-with-text` (M1 — fully defined)

Cookbook §5.5 anchor: "exact copy in quotes, verbatim rendering, placement +
font style; billboard / social / poster contexts; iterate strict prompts."

### Axis 1: Setting Type (pick 1 of 5)

1. **Outdoor billboard at scale** — highway / cityscape, large format. Best
   for: variance 4-7, big-launch campaigns.
2. **Urban street poster** — bus stop / wheatpaste / kiosk context. Best
   for: density 5-7, art_direction ≥ 6, culture / fashion / retail.
3. **Social-square minimal** — 1:1 or 4:5 stripped-down composition. Best
   for: density ≤ 5, variance ≤ 5, performance-marketing default.
4. **Magazine spread layout** — editorial 2-page feel, body copy implied.
   Best for: art_direction ≥ 7, density 6-8, fashion / lifestyle / luxury.
5. **Packaging mock-up** — copy renders on product surface itself. Best
   for: realism ≥ 7, CPG / DTC / beverage.

### Axis 2: Text-Image Layout (pick 1 of 4)

1. **Full-bleed image with text overlay** — image fills frame, copy floats.
   Best for: variance 4-7, immersive campaigns.
2. **Text band (top or bottom)** — solid color band hosts copy, image
   above/below. Best for: variance ≤ 5, retail / promotion clarity.
3. **Half image + half text** — clean 50/50 split. Best for: density 5-7,
   B2B / informational ads.
4. **Typography dominates with image inset** — copy is hero, image
   supports as small inset. Best for: art_direction ≥ 7, variance ≥ 6,
   editorial / brand-statement.

### Axis 3: Typography Treatment (pick 1 of 4)

1. **Clean sans bold** — geometric / neo-grotesque, high legibility.
   Best for: variance ≤ 5, mainstream consumer / SaaS.
2. **Refined serif editorial** — display serif, elegant. Best for:
   art_direction ≥ 7, premium / luxury / heritage.
3. **Wordmark stencil / display** — distinctive condensed or stencil.
   Best for: art_direction ≥ 7, variance ≥ 6, music / streetwear /
   counter-culture.
4. **Handwritten / script** — informal, human, signature feel. Best for:
   art_direction 5-7, food / craft / wellness / personal brands.

### Axis 4: Atmosphere & Mood (pick 1 of 4)

1. **Bright optimistic daylight** — high-key, saturated, clean. Best for:
   realism 5-8, mainstream consumer / family / health.
2. **Golden hour cinematic** — warm directional, aspirational. Best for:
   realism 6-9, lifestyle / travel / fashion.
3. **Hard cool studio** — high-contrast neutral, premium-tech. Best for:
   realism 7-10, art_direction ≥ 6, fintech / B2B / hardware.
4. **Moody low-key** — dark, atmospheric, restrained palette. Best for:
   art_direction ≥ 7, variance ≥ 6, fragrance / spirits / luxury / film.

---

## Template: `lighting-transform` (M1 — fully defined)

Cookbook §5.6 anchor: "change ONLY environmental conditions; preserve
identity / geometry / camera angle / object placement; explicit
change-only + preserve list every iteration."

**Note:** This template is `action=edit` only (input image required). Axes
choose the *target* lighting/weather state — preserve list is universal.

### Axis 1: Light Direction (pick 1 of 4)

1. **Front diffuse** — soft fill, minimal shadow. Best for: clean catalog,
   neutral baseline.
2. **Side raking** — strong directional 90°, sculptural shadows. Best for:
   art_direction ≥ 6, dramatic / textural moods.
3. **Back rim** — silhouette + halo, atmospheric. Best for: variance ≥ 6,
   cinematic / hero treatments.
4. **Overhead high-noon** — top-down, hard ground shadows. Best for:
   realism 7-10, exterior / outdoor authenticity.

### Axis 2: Time-of-Day (pick 1 of 5)

1. **Blue hour pre-dawn / post-dusk** — cool ambient, no sun. Best for:
   art_direction ≥ 7, moody / urban / tech.
2. **Golden hour** — warm low-angle, long shadows. Best for:
   realism 6-9, aspirational / lifestyle.
3. **High noon** — neutral overhead, harsh. Best for: realism 7-10,
   documentary / authentic / outdoor.
4. **Overcast neutral daylight** — soft diffuse, no directional sun. Best
   for: realism 5-8, editorial / commercial reliable.
5. **Night with practicals** — artificial sources (street lamps, neon,
   windows). Best for: art_direction ≥ 7, urban / nightlife / cinematic.

### Axis 3: Weather Condition (pick 1 of 5)

1. **Clear dry** — baseline, no precipitation. Best for: most catalog /
   editorial use cases.
2. **Light rain / wet ground** — surface reflections, mild atmosphere.
   Best for: art_direction ≥ 6, urban moods.
3. **Heavy rain saturated** — visible droplets, full-soak ground. Best
   for: variance ≥ 6, dramatic narratives.
4. **Snow accumulation** — surface coverage, soft light scatter. Best for:
   seasonal / holiday / winter campaigns.
5. **Fog / haze** — depth-flattening atmosphere, reduced contrast. Best
   for: art_direction ≥ 7, mystery / atmospheric.

### Axis 4: Color Temperature (pick 1 of 4)

1. **Warm 3000K tungsten** — golden cast, intimate. Best for: interior /
   evening / cozy moods.
2. **Neutral daylight 5500K** — accurate, no cast. Best for: catalog /
   product fidelity / documentary.
3. **Cool 7500K overcast** — blue-shifted, premium-tech. Best for:
   art_direction ≥ 6, fintech / urban / clinical.
4. **Mixed warm/cool sodium** — sodium-vapor street + cool sky, urban
   night. Best for: art_direction ≥ 7, variance ≥ 6, urban realism.

---

## Template: `scene-with-person` (M1 — fully defined)

Cookbook §5.8 anchor: "preserve identity, geometry; match scene's lighting /
shadow pattern / color temperature so person appears naturally placed, not
pasted on; grounded photographic look, no cinematic grading."

**Note:** This template is `action=edit` (person reference image required).
Axes choose how to *insert* — identity preservation is universal.

### Axis 1: Body Framing & Scale (pick 1 of 4)

1. **Full body environmental wide** — person small in scene, environment
   dominates. Best for: variance 4-7, story / context-heavy narratives.
2. **3/4 medium environmental** — person from hip-up, scene visible
   around them. Best for: balanced default, lifestyle / campaign.
3. **Waist-up portrait scene** — torso framing, scene as backdrop. Best
   for: density ≤ 5, brand portraits / interview style.
4. **Close portrait scene-implied** — face/shoulders dominant, scene
   suggested by light + bokeh. Best for: art_direction ≥ 7, intimate /
   editorial.

### Axis 2: Gaze & Action (pick 1 of 4)

1. **Looking away into scene** — viewer follows their gaze. Best for:
   variance 4-7, narrative / immersive.
2. **Direct camera gaze** — eye contact, viewer-engaged. Best for:
   variance ≤ 5, brand portrait / testimonial.
3. **Looking at action object** — engaged with task / item in frame. Best
   for: realism 6-9, demonstration / authentic-use.
4. **Mid-action no eye line** — captured-in-motion, candid feel. Best for:
   realism 7-10, documentary / sport / lifestyle authenticity.

### Axis 3: Environment Type (pick 1 of 5)

1. **Natural outdoor** — forest / mountain / beach / open landscape. Best
   for: realism 6-9, lifestyle / wellness / travel.
2. **Urban street** — city architecture, sidewalk, transit. Best for:
   art_direction ≥ 6, fashion / streetwear / culture.
3. **Interior domestic** — home / kitchen / living room. Best for:
   realism 5-8, consumer / wellness / family.
4. **Interior commercial** — office / cafe / studio / retail. Best for:
   realism 6-8, B2B / SaaS / professional.
5. **Abstract studio backdrop** — seamless color or minimal set. Best for:
   variance ≤ 5, brand portrait / editorial control.

### Axis 4: Lighting Match Strategy (pick 1 of 4)

1. **Match scene's existing key light** — mimic source direction +
   quality precisely. Best for: realism 8-10, photoreal compositing.
2. **Soft natural ambient blend** — diffuse fill that integrates without
   competing. Best for: balanced default, most lifestyle scenes.
3. **Golden warm hero** — golden-hour key on subject, scene supports.
   Best for: art_direction 5-8, aspirational / brand-portrait.
4. **Overcast neutral grounding** — flat soft fill, removes artificial
   feel. Best for: realism 7-10, documentary / authentic / news-feel.

---

## Template: `carousel` (M1.5 — 30x-image extension, fully defined)

LinkedIn / X / Instagram multi-slide carousel. Cookbook §extension anchor:
"6-10 image sequence with narrative arc + cross-slide visual continuity;
cover ≠ body ≠ CTA roles; native social dimensions."

### Axis 1: Carousel Pattern (pick 1 of 5)

1. **How-to step-by-step** — sequential procedure, slides numbered, action
   verbs ("Step 1: ..., Step 2: ..."). Best for: density 5-7, B2B / SaaS
   instructional, productivity content.
2. **Listicle (N tactics / N rules / N mistakes)** — countdown or count-up,
   parallel slide structure. Best for: density 5-8, art_direction 4-7,
   content marketing default.
3. **Hot-take rebuttal** — provocative cover claim → 4-6 evidence slides →
   conclusion. Best for: variance 6-9, art_direction ≥ 7, thought
   leadership / founder voice.
4. **Case study story arc** — context → challenge → solution → result,
   linear narrative. Best for: variance 4-7, B2B sales / customer story /
   portfolio.
5. **Before-after / myth-vs-reality** — paired comparison rhythm
   throughout. Best for: density 5-7, change-management / education /
   migration content.

### Axis 2: Cover Slide Style (pick 1 of 4)

1. **Hook headline at display size** — typography is the cover, no image,
   maximum hook density. Best for: variance ≤ 5, density ≤ 4, text-driven
   / thought-leader brands.
2. **Provocative question** — full-cover question moment ("Why does X
   fail?"). Best for: variance 6-9, art_direction ≥ 7, contrarian voices.
3. **Number promise** — "7 ways to X" / "$1M in 90 days" big-number
   anchor. Best for: density ≤ 5, listicle pattern, performance content.
4. **Visual hook + headline** — strong image with overlaid headline.
   Best for: variance 4-7, imagery_realism ≥ 6, lifestyle / visual brands.

### Axis 3: Body Slide Rhythm (pick 1 of 4)

1. **All-text slides** — pure typography, no visuals on body slides.
   Best for: variance ≤ 5, density ≤ 4, thought leadership / quote-led.
2. **Text + visual 50/50** — split layout per body slide. Best for:
   density 4-6, balanced default for most brands.
3. **Full-visual + small caption** — image dominates, copy is captional.
   Best for: imagery_realism ≥ 7, variance 5-8, visual / lifestyle / DTC.
4. **Data-viz dominant** — chart / diagram per slide, copy supports.
   Best for: density ≥ 6, B2B analytics / consultancy / research.

### Axis 4: Visual Continuity Mechanism (pick 1 of 4)

1. **Shared palette only** — colors consistent, layouts free to vary.
   Best for: variance 6-9, art_direction ≥ 7, editorial flexibility.
2. **Shared palette + grid** — same color + same baseline grid across all
   slides. Best for: balanced default for most carousels.
3. **Shared grid + slide number indicators** — explicit "1/8, 2/8 ..."
   page markers visible on every slide. Best for: density 5-7,
   art_direction 4-6, structured / instructional content.
4. **Repeated brand element anchor** — recurring logo / icon / border
   treatment in every slide. Best for: variance ≤ 5, density 4-6,
   brand-immersion / corporate.

### Axis 5: Narrative Tension Curve (pick 1 of 5)

**Why this axis exists:** Pattern (Axis 1) sets the *shape* of the story
(listicle / case-study / etc.); this axis sets the *tension build* across
slides. Without it, even a "listicle" carousel reads as 7 flat bullets
instead of an escalating reveal. Viral carousels almost always have a
non-flat tension curve.

1. **Flat list (no arc)** — each slide independent, equal weight; works
   when content is genuinely parallel. Best for: density 5-7, listicle /
   how-to patterns where each item is atomic.
2. **Build-up (escalate)** — slide 1 hook → body slides increase
   stakes/depth → slide N-1 is the payoff → slide N CTA. Best for:
   variance 5-8, listicle counted DOWN to #1 / case-study / hot-take.
3. **Push-pull (tension / release)** — alternating "yes, but..." rhythm,
   each body slide reverses or qualifies the previous. Best for:
   art_direction ≥ 6, before-after / myth-vs-reality patterns.
4. **Reveal (mystery → answer)** — slides 1-3 set puzzle / withhold
   answer; slides 4-(N-1) reveal progressively. Best for: variance ≥ 7,
   hot-take / contrarian thought-leadership.
5. **Linear arc (4-act story)** — context → challenge → solution →
   result, classic narrative structure. Best for: variance 4-7, case-study
   / customer story / portfolio piece.

**Pattern × Tension compatibility (defaults if user doesn't specify):**
- listicle → Build-up (count-down) OR Flat (count-up)
- how-to → Build-up (each step builds on prior) OR Flat (truly independent steps)
- hot-take → Reveal OR Build-up
- case-study → Linear arc (almost always)
- before-after → Push-pull

---

## Selection algorithm (executed by Codex at runtime)

```
For each axis in template.axes:
  candidates = axis.options
  filtered = [opt for opt in candidates
              if opt.compatible_with(DESIGN.md.taste)]
  if filtered is empty:
    pick = candidates default
  else:
    pick = first(filtered) sorted by closeness to taste values

Write all picks into prompt explicitly:
  "Composition:
   - Hero: <pick>
   - Framing: <pick>
   - Lighting: <pick>
   - Text Integration: <pick>"

Save picks to manifest.json under 'axes_picks' for audit.
```

**Determinism note:** Same DESIGN.md + same template should produce same axis
picks (deterministic given `taste:` block). Variation comes from `n=4` at the
image_generation tool layer (multiple candidates from same prompt), not from
re-picking axes per candidate.
