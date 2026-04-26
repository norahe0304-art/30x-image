# OpenAI Cookbook — 7 Marketing Templates (Condensed Reference)

Source: [GPT Image Generation Models Prompting Guide](https://developers.openai.com/cookbook/examples/multimodal/image-gen-models-prompting-guide)
(2026-04-21, OpenAI Cookbook)

This file is the canonical reference for 30x-image's 7 starting templates.
Each template maps 1:1 to a section in the cookbook. Use this as the prompt
skeleton when a brand DESIGN.md doesn't have a Section-9 cheat sheet for the
requested template.

---

## Template 1: `logo` (cookbook §4.5)

**Default tool params:** `size=1024x1024`, `quality=medium`, `n=4`, `action=generate`

**Skeleton:**
> Create an original, non-infringing logo for {brand.name}. The logo should
> feel {imagery_style_descriptors}. Use clean, vector-like shapes, a strong
> silhouette, and balanced negative space. Favor simplicity over detail so it
> reads clearly at small and large sizes. Flat design, minimal strokes, no
> gradients unless essential. Plain background. Deliver a single centered
> logo with generous padding. No watermark.

**Why n=4:** logo is the one template where multiple variations help the
human pick. Use `n` parameter for variation.

---

## Template 2: `ad-creative` (cookbook §4.6)

**Default tool params:** `size=1024x1536`, `quality=high`, `n=1`, `action=generate`

**Skeleton:**
> Polished marketing campaign image for {brand.name}, audience: {target_audience}.
> Brand positioning: {brand_positioning_one_liner}.
> Visual atmosphere: {Section 1 essence}.
> Composition: {axes choices}.
> Palette: dominated by {colors.surface} with {colors.primary} as accent.
> Tagline rendered exactly once: "{jobspec.copy.tagline}", clearly and
> legibly, integrated into the layout, in {typography.headline-display}.
> No extra text, no watermarks, no unrelated logos.

**Cookbook key insight:** "Ad generation works best when the prompt is
written like a creative brief rather than a purely technical image spec."
Include brand / audience / culture / concept / composition / exact copy.

---

## Template 3: `slide` (cookbook §4.10)

**Default tool params:** `size=1536x864`, `quality=high`, `n=1`, `action=generate`

**Skeleton:**
> Create one pitch-deck slide titled "{slide_title}" that feels like a real
> Series A fundraising slide. Use {colors.surface} background, modern
> {typography.headline-display.fontFamily} typography, crisp minimal layout.
> Include: {data_or_diagram_specs}. Real numbers, real labels, polished
> spacing, professional startup-style visual language.
> Avoid clip art, stock photography, gradients, shadows, decorative elements.

**Cookbook key insight:** Write as artifact spec, not illustration. Include
real numbers and labels in prompt. Use `quality=high` for small text.

---

## Template 4: `product-mockup` (cookbook §5.4)

**Default tool params:** `size=1536x1024`, `quality=high`, `n=1`, `action=generate` (or `edit` if user supplies product image)

**Skeleton:**
> Product mockup of {product_name} on {background_spec}. Edge quality: clean
> silhouette, no fringing, no halos. Label integrity: keep all text on
> packaging sharp and unchanged. {lighting_mood}. Optional subtle contact
> shadow. Background opaque.

**Cookbook key insight:** "Success depends on edge quality and label
integrity." Use `action=edit` with input image when polishing real product
photos.

---

## Template 5: `marketing-with-text` (cookbook §5.5)

**Default tool params:** `size=1024x1536`, `quality=high`, `n=1`, `action=generate`

**Skeleton:**
> Realistic marketing creative — billboard / social / poster — for
> {brand.name}. Setting: {setting_spec}. The headline reads exactly:
> "{copy.tagline}" — render verbatim, no extra characters, no spelling
> changes. Typography: {typography.headline-display}. Placement:
> {axes.text_image_integration}.

**Cookbook key insight:** "Put the exact copy in quotes, demand verbatim
rendering. If text fidelity is imperfect, keep the prompt strict and
iterate." Use ALL CAPS or quotes for literal text.

---

## Template 6: `lighting-transform` (cookbook §5.6)

**Default tool params:** `size=source` (preserve input), `quality=medium`, `n=1`, `action=edit`

**Skeleton:**
> Re-stage this image for {target_lighting_or_weather}. Change ONLY the
> environmental conditions: lighting direction/quality, shadows, atmosphere,
> precipitation, ground wetness. Preserve identity, geometry, camera angle,
> composition, object placement. Do not alter saturation, layout, arrows,
> labels, or surrounding objects unrelated to lighting/weather.

**Cookbook key insight:** Edit prompt must explicitly enumerate
"change-only" and "preserve" lists. Repeat preserve list each iteration to
prevent drift.

---

## Template 7: `scene-with-person` (cookbook §5.8)

**Default tool params:** `size=1536x1024`, `quality=high`, `n=1`, `action=edit` (with person reference image)

**Skeleton:**
> Insert {person_description} into {scene_description}. Preserve the person's
> identity, facial features, body proportions, and clothing exactly. Match
> the scene's lighting direction, color temperature, and shadow pattern to
> the person so they appear naturally placed, not pasted on. Do not change
> the scene composition, camera angle, or background detail.

**Cookbook key insight:** "Preserve identity, geometry. Match lighting,
shadows, color temperature so it integrates photorealistically without
looking pasted on."

---

## Template 8: `carousel` (30x-image extension — NOT in OpenAI cookbook)

**Default tool params:** `size=1080x1080` (square) or `1080x1350` (portrait 4:5),
`quality=high`, `n=1` per slide, **`n_slides=6` (default; user can override
to 6-10)**, `action=generate` for **every** slide (no `action=edit` chain —
slides are independent gpt-image-2 generations, same as every other template;
cross-slide consistency comes from shared prompt prefix, fired in parallel)

**Why this template exists:** OpenAI cookbook covers single-deliverable use cases.
LinkedIn / X / Instagram carousels are multi-image sequences with their own
conventions — narrative arc, cross-slide visual consistency, role-differentiated
slides (cover ≠ body ≠ CTA). Cannot be served by `slide` (single deck slide) or
`marketing-with-text` (single creative). Native to social/B2B content marketing.

**Skeleton (per slide, repeat with shared prefix for slide 1..N):**
> CAROUSEL DESIGN SYSTEM (identical across all slides):
> - Brand: {brand.name}, palette {colors.surface}/{colors.primary}/{colors.on-surface}
> - Typography: {typography.headline-display.fontFamily} weight {fontWeight}
> - Grid: {spacing tokens}, {n_slides}-slide series
> - Pattern: {Carousel Pattern axis pick}
> - Continuity mechanism: {Visual Continuity Mechanism axis pick}
>
> THIS SLIDE: slide {N} of {n_slides}, role: {cover | body-{N} | cta}
> Subject: {jobspec.slides[N].subject}
> Copy (verbatim, integrated): "{jobspec.slides[N].copy}"
> Layout: {Cover Slide Style if N=1, else Body Slide Rhythm axis pick}
>
> [palette / typography / anti-slop blocks as in other templates]

**Cookbook key insight (30x-image addition):**
1. **Carousels live or die on cross-slide visual continuity AND narrative arc.**
   Treat the 6-10 images as one piece, not 6-10 independents.
2. **Cover slide carries the hook** (≤ 2-second eyeball test); **final slide
   carries the CTA** (clear next action). **Middle slides are atomic** — one
   point + one visual each.
3. **Generate all slides as independent `action=generate` calls in parallel
   with a shared design-system prompt prefix.** Do NOT use `action=edit`
   referencing prior slides — that traps gpt-image-2 in "webpage edit"
   mode and produces CSS-rendered-looking output instead of clean
   gpt-image-2 imagery. Trust the shared prefix to lock visual consistency.
4. **Native dimensions matter:** LinkedIn 1080×1080 (square) or 1080×1350
   (4:5 portrait — gets more feed real estate). Avoid 1024×1536 (cuts off).
5. **Slide count sweet spot:** 6-8 slides. <5 feels thin, >10 hits LinkedIn cap
   and engagement drops.

---

## General prompting rules (cookbook §2 — apply to ALL templates)

1. **Structure + goal:** Background → subject → key details → constraints →
   intended use. Short labeled segments beat one paragraph.
2. **Specificity + quality cues:** Materials, shapes, textures, medium
   (photo / 3D render / watercolor). Add "photorealistic" explicitly when
   you want photoreal mode.
3. **Composition:** Framing (close-up / wide / top-down), angle, lighting,
   element placement (e.g., "logo top-right").
4. **Constraints:** What to change vs preserve. Always state exclusions
   ("no watermark, no extra text, no logos / trademarks").
5. **Text in images:** Quote literal text. Specify font family, size, color,
   placement. For tricky words, spell letter-by-letter.
6. **Multi-image inputs:** Reference each by index ("Image 1: ..., Image 2: ...").
7. **Iterate, don't overload:** Clean base prompt + small follow-up edits
   beats one mega-prompt.
8. **Latency vs fidelity:** Start `quality=low` for explore. Use
   `medium`/`high` for small text, dense info, identity-sensitive edits.

---

## Mapping to 30x-image template names

| Template ID         | Cookbook §  | Default size  | Default quality | Default n |
|---------------------|-------------|---------------|-----------------|-----------|
| logo                | 4.5         | 1024×1024     | medium          | 4         |
| ad-creative         | 4.6         | 1024×1536     | high            | 1         |
| slide               | 4.10        | 1536×864      | high            | 1         |
| product-mockup      | 5.4         | 1536×1024     | high            | 1         |
| marketing-with-text | 5.5         | 1024×1536     | high            | 1         |
| lighting-transform  | 5.6         | source-preserve | medium        | 1         |
| scene-with-person   | 5.8         | 1536×1024     | high            | 1         |
| carousel            | (extension) | 1080×1080 / 1080×1350 | high  | 1 per slide × 6 default (parallel) |
