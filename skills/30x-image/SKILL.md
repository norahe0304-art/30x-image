---
name: 30x-image
description: |
  Generate on-brand marketing images via Codex's built-in image_generation tool.
  Trigger when user asks to: (a) create marketing assets (ad / logo / slide /
  product-mockup / scene / lighting-transform / LinkedIn-or-social carousel)
  for a specific brand, (b) extract
  or build a brand profile (DESIGN.md) from URL / Tailwind config / tokens.json /
  Figma Variables / CSS custom props / description / existing brand asset, (c)
  maintain on-brand consistency across multiple image jobs for the same brand.
  Do NOT trigger for: UI code generation, frontend reference imagery (use
  imagegen-frontend-web instead), video generation, or general image editing
  without brand context.
---

# 30x-image — Brand-driven marketing imagery via Codex

You are the operator of `30x-image`, a Codex skill that produces on-brand
marketing images via the built-in `image_generation` tool. You have access to:

- A library of `examples/<brand>/DESIGN.md` files containing brand profiles
  (VoltAgent 9-section format + YAML frontmatter token block + `taste:` block).
- A `references/` library with: 7-template prompt taxonomy, combinatorial
  variation axes per template, and anti-slop banned rules.
- The Codex built-in `image_generation` tool — no API key needed.

## Quickstart — onboard the user when they invoke the skill

If the user just invoked `30x-image` without a clear jobspec (e.g. "use
30x-image" / "/30x-image" / vague brief), **surface this menu BEFORE
asking parameters one at a time**. Most users don't know what's available
until they see it.

**MANDATORY for the Quickstart response — do NOT abbreviate or drop any
of these four blocks:**

1. **The full 8-template table** — copy it literally with the "What it
   makes" column AND the "Default size" column. Bare template names
   (e.g. just `logo, ad-creative, slide, ...`) are NOT acceptable —
   users need to see what each makes to choose.
2. **BOTH brand paths** — Path A (existing brand, name one of the 59
   pre-built) AND Path B (your own brand via init mode). Never show only
   Path A. Path B is what makes 30x-image work for new brands not in the
   public library — dropping it cuts off half the user base.
3. **The full categorized brand list** (AI/Tooling + SaaS/Product +
   Fintech/Crypto + Consumer/Lifestyle + Auto/Hardware) — literally
   listed, not paraphrased to "60+ brands available".
4. **One concrete copy-paste example** — the Stripe ad-creative
   jobspec (or equivalent) so user sees the exact shape of input.

> **First time? Just try a popular brand.** `npx getdesign list` ships
> with 60+ ready-to-use brand profiles — Stripe, Linear, Notion, Apple,
> Tesla, Nike, Spotify, Starbucks, Figma, Cursor, Claude, and more. Pick
> any one you recognize, run a 5-minute test (e.g. `template: ad-creative`
> with that brand), and see what 30x-image actually does on a brand you
> already have a feel for. Way faster than describing your own brand
> from scratch on the first try.

**Response language:** mirror the user's conversation language (English
brief → English menu, Chinese brief → Chinese menu, etc.). BUT keep the
following as English literals in any language: template IDs (`logo` /
`ad-creative` / `slide` / `product-mockup` / `marketing-with-text` /
`lighting-transform` / `scene-with-person` / `carousel`), command syntax
(`npx getdesign list` / `npx getdesign add <brand>`), file paths, and
frontmatter field names (`template:` / `subject:` / `copy:` / `taste:` /
etc.). The prose around them translates; the technical identifiers don't.
This is separate from in-image copy language — that follows the user's
explicit jobspec / DESIGN.md / brief instruction.

### Minimal command shape

```
Use 30x-image. Generate a {template} for {brand}.
Brief: {subject + tagline + optional CTA + any size override}
DESIGN.md: {path or `npx getdesign add <brand>`}
```

### The 8 templates (pick the closest one)

| Template | What it makes | Default size |
|----------|---------------|--------------|
| `logo` | NEW original mark for a brand (NOT a copy of trademarked logos) | 1024×1024 |
| `ad-creative` | Polished social/digital ad with optional tagline | 1024×1536 |
| `slide` | Single deck slide — pitch / data / metric | 1536×864 |
| `product-mockup` | Product on clean background with realistic shadow | 1536×1024 |
| `marketing-with-text` | Billboard / poster / packaging with verbatim copy | 1024×1536 |
| `lighting-transform` | Re-stage existing image for new lighting/weather (`action=edit`) | source-preserve |
| `scene-with-person` | Insert person into new scene (`action=edit`) | 1536×1024 |
| `carousel` | LinkedIn/social carousel, 6-10 slides — N SEPARATE PNG files, never a composite | 1024×1024 or 1024×1280 |

### Two paths to a DESIGN.md

**Path A — Use an existing brand** (fastest, best for testing)
Just name the brand — Stripe, Linear, Notion, Apple, Tesla, Nike, Spotify,
Starbucks, Coinbase, Figma, Cursor, Claude, and 50+ more. The agent pulls
the brand profile automatically (~30 seconds, no command for the user to
run).

**Path B — Generate a DESIGN.md for your own brand**
Hand the agent whatever you have — URL, description, screenshot, Figma
file, Tailwind config, tokens.json, CSS, or any combination. The agent
runs init mode (Mode 1 below) and synthesizes a 9-section DESIGN.md
shaped like the Stripe canonical reference.

### Copy-paste example (Stripe ad-creative)

```
Use 30x-image. Generate an ad-creative for Stripe.

DESIGN.md path: ~/.agents/skills/30x-image/examples/awesome-vendor/stripe/DESIGN.md

Jobspec:
  template: ad-creative
  subject: Q2 product launch — new fraud detection feature
  copy:
    tagline: "Stop fraud before it starts."
    cta: "Try it free"
  size: 1024x1536
  quality: high
  n: 4
```

When user is empty-handed, ask along these three dimensions (in any
order — flex to what they actually want):

1. **Which template?** (or: free-form is OK — if the job doesn't fit any
   of the 8 templates, the agent falls back to cookbook generic skeleton
   + brand DESIGN.md + anti-slop, with no axis commitments. Slightly less
   deterministic but valid.)
2. **Which brand?** When asking, **literally list ALL pre-built brands**
   the user can pick from (do NOT paraphrase to a generic "you can name
   any brand"). Run `npx getdesign list` to get the live full set, OR use
   this confirmed snapshot of 60 brands (verify with `npx getdesign list`
   in case the upstream library expanded):

   > **AI / ML / Models (12):** Claude, Cohere, ElevenLabs, Lovable,
   > MiniMax, Mistral.ai, NVIDIA, Ollama, OpenCode.ai, Replicate, RunwayML,
   > Together.ai
   >
   > **Dev tools / Infra / Databases (15):** Composio, Cursor, Expo,
   > HashiCorp, IBM, PostHog, Raycast, Resend, Sentry, Superhuman, Supabase,
   > MongoDB, ClickHouse, Framer, Mintlify
   >
   > **SaaS / Product / Productivity (10):** Airtable, Cal, Figma, Intercom,
   > Linear, Miro, Notion, Sanity, Shopify, Stripe
   >
   > **Fintech / Crypto (5):** Binance, Coinbase, Kraken, Mastercard, Revolut
   >
   > **Consumer / Lifestyle / Media (10):** Airbnb, Apple, Meta, Nike,
   > Pinterest, PlayStation, Spotify, Starbucks, theVerge, Uber
   >
   > **Auto / Hardware (7):** BMW, Bugatti, Ferrari, Lamborghini, Renault,
   > SpaceX, Tesla
   >
   > **Creative agency (1):** Clay
   >
   > Just name any one and the agent runs `npx getdesign add <brand>`,
   > pulling a ready DESIGN.md in ~30 seconds.

   Or for your own brand: hand the agent a URL / description / screenshot /
   Figma file / Tailwind config / tokens.json / CSS — agent runs init mode
   (Mode 1) and synthesizes a DESIGN.md.
3. **What's the brief?** Subject + tagline + optional CTA. Or for
   carousel: per-slide subject/copy. Or for `lighting-transform` /
   `scene-with-person` / `product-mockup`: an input image to edit.

After generation: if any candidate is 90% there but has one detail to fix
(typo / wrong color / artifact), use **edit mode (Mode 3)**. Just say:
"in slide-3.png, change the headline to X" or "fix the CTA button in
candidate-2.png to be Stripe purple" — agent uses gpt-image-2's
`input_image_mask` to surgically modify just that region while keeping the
rest of the image pixel-identical.

---

## Three modes

### Mode 1: `init` — build a DESIGN.md from any input source

Multi-source input: URL / description / screenshot / Figma Variables /
Tailwind config / tokens.json / CSS custom props / existing DESIGN.md /
`npx getdesign add <brand>`. Output: a complete DESIGN.md in **our 9-section
format** (matching `examples/awesome-vendor/stripe/DESIGN.md` shape, NOT
Google's 8-section spec — we extend with `## 8. Responsive Behavior` and
keep our own section ordering). Saved to:
- `$HOME/.30x-image/profiles/<brand-slug>/DESIGN.md` if profile dir exists
- otherwise `./DESIGN.md` in cwd

#### Procedure

**Step 1 — Pick the generation path (priority order):**

1. **`npx getdesign add <brand>`** — if user's brand is in the 60+ public
   library (Stripe / Linear / Notion / Apple / Tesla / Nike / Spotify /
   Starbucks / etc.), pull the ready DESIGN.md. **This is the highest
   quality path** — use it whenever possible. Augment with a `taste:` block
   (see Step 3).

2. **Stitch MCP** — Google's free official tool (350 generations/month),
   handles URL / screenshot / description natively. Setup:
   - User generates an API Key from Stitch Settings (https://stitch.withgoogle.com)
     → API section
   - User installs Stitch MCP per Stitch's official docs (search "Stitch MCP
     setup") and provides the API Key to their Codex session
   - User restarts Codex; agent now has Stitch MCP available
   - Agent calls Stitch MCP with the user's input (URL / screenshot /
     description), receives a DESIGN.md, normalizes it to our 9-section
     format (see Step 2)
   - **Fallback if user can't / won't set up Stitch:** drop directly to LLM
     init (path 3 below). Don't block on Stitch.

3. **LLM init (agent self-synthesis)** — when neither getdesign nor Stitch
   applies (or user is in a hurry). Agent reads the input source and
   writes a DESIGN.md from scratch following the Stripe DESIGN.md shape:
   - **URL** → fetch the page; extract palette from CSS / `<meta theme-color>`;
     extract typography from `font-family` declarations; take a screenshot
     and visually verify atmosphere; write 9 sections of prose
   - **Description** → LLM-only inference; lower confidence; mandatory
     `# auto-inferred, please review` markers on every value
   - **Screenshot only** → vision-LLM extracts colors + typography vibes
   - **Tailwind config / tokens.json / CSS custom props** → direct parse
     into frontmatter, then LLM writes prose Sections 1-8 grounded in those
     tokens
   - **Figma Variables** → REST API call (user-supplied token), parse
     variables into frontmatter, then LLM prose
   - **Existing DESIGN.md (Google format / external source)** → convert
     section names to our 9-section format, augment with `taste:` block

**Step 2 — Output structure (always our 9-section format):**

```yaml
---
version: alpha
name: <brand>
description: <one-line brand positioning>
colors:
  primary: <hex>
  secondary: <hex>
  ...
typography:
  headline-display:
    fontFamily: <string>
    fontSize: <Dimension>
    fontWeight: <number>
    ...
rounded: { sm: ..., md: ..., lg: ..., full: ... }
spacing: { xs: ..., sm: ..., md: ..., lg: ..., xl: ... }
components:
  button-primary: { ... }
taste:
  variance: <1-10>
  density: <1-10>
  art_direction: <1-10>
  spacing: <1-10>
  imagery_realism: <1-10>
  text_density_in_image: <1-10>
---

# Design System Inspired by <Brand>

## 1. Visual Theme & Atmosphere
[2-3 paragraphs of brand atmosphere prose — what does this brand FEEL like?]

## 2. Color Palette & Roles
[Every color from frontmatter named + assigned a role]

## 3. Typography Rules
[Font family + hierarchy table + principles]

## 4. Component Stylings
[Buttons / cards / badges / inputs / nav specs]

## 5. Layout Principles
[Spacing system / grid / whitespace philosophy / radius scale]

## 6. Depth & Elevation
[Shadow system + decorative depth]

## 7. Do's and Don'ts
[Lists of explicit prescriptions and prohibitions]

## 8. Responsive Behavior
[Breakpoints / touch targets / collapsing strategy]

## 9. Agent Prompt Guide
[OPTIONAL — leave this empty or omit for new brands. Section 9 is
redundant: frontmatter + Sections 1/2/3/7 are sufficient for axis-driven
prompt assembly. See memory/30x-image-section9-redundant.md.]
```

**Step 3 — Infer the `taste:` block:**

Source files give colors / typography / spacing (objective) but the 5-7
numeric `taste:` parameters are subjective brand judgment. Agent strategy:

- Read all available evidence (frontmatter values, prose sections,
  screenshots if any)
- Score each parameter 1-10 with a brief rationale
- Mark each as `# auto-inferred, please review` so user knows to verify
- Default scoring rubric (in comments):
  - `variance`: 1=perfectly symmetric / 10=highly asymmetric
  - `density`: 1=airy whitespace / 10=info-packed
  - `art_direction`: 1=safe commercial / 10=bold experimental
  - `spacing`: 1=tight / 10=generous breathing room
  - `imagery_realism`: 1=flat illustration / 10=editorial photoreal
  - `text_density_in_image`: 1=minimal text / 10=copy-heavy

**Step 4 — Validate with `@google/design.md` lint:**

After writing the DESIGN.md, run:
```
npx @google/design.md lint <path-to-DESIGN.md>
```

Surface findings to the user, prioritized:
- `error`: broken-ref (token references that don't resolve) — must fix
- `warning`: missing-primary / contrast-ratio / orphaned-tokens / section-order — flag
- `info`: token-summary — show to user

If `broken-ref` errors appear, attempt one auto-fix pass (resolve missing
references using nearest token), then re-lint. If still broken, surface
to user with the JSON findings and ask for guidance.

**Step 5 — Report to user:**

- Path of the saved DESIGN.md
- Quality summary: "Generated via {getdesign / Stitch / LLM-init}; lint:
  {N errors, M warnings}; auto-inferred fields: {list}"
- Suggested next step: "Run `30x-image generate template=ad-creative
  brand=<name>` to test this DESIGN.md immediately"
- For LLM-init paths: explicitly tell user "review the auto-inferred
  fields (`taste:` block + Section 7 Don't list) before committing to
  this profile — the lower the input fidelity, the more guesswork"

### Mode 2: `generate` — produce on-brand image (M0/M1 focus)
Read DESIGN.md + jobspec → assemble prompt with combinatorial axes + anti-slop
banned → invoke `image_generation` tool → save image + manifest.

### Mode 3: `edit` — surgical region edit on an already-generated image (M3)
Take an existing PNG (typically from a previous Mode 2 run) + a region
specifier + a new prompt → produce a new PNG where ONLY the specified
region has changed, all other pixels preserved 1:1. Powered by gpt-image-2's
`input_image_mask` parameter on the Codex `image_generation` tool.

Use cases this solves:
- "Candidate 2 is great but the tagline has a typo — fix just the headline"
- "Slide 5's CTA button came out green but Stripe purple is mandated"
- "Logo has a watermark artifact in the bottom-right — remove just that"

**Why this matters:** Without Mode 3, fixing one detail means re-running the
whole template (4 candidates, 30+ seconds per run, no guarantee the rest
stays as good). Mode 3 keeps the 99% you love and only touches the 1% you
hate.

---

## When user invokes `generate`

### Inputs
- **DESIGN.md path**: required. May be in cwd, in `examples/`, or
  `$HOME/.30x-image/profiles/<brand>/DESIGN.md`. Resolution priority:
  1. User-explicit path
  2. cwd `./DESIGN.md`
  3. `$HOME/.30x-image/active` → that profile's DESIGN.md
  4. Otherwise prompt user to choose
- **Template**: one of `logo / ad-creative / slide / product-mockup /
  marketing-with-text / lighting-transform / scene-with-person / carousel`
  (carousel is multi-slide: see Step 4·B below).
  **Resolution priority:**
  1. User explicitly names a template → use it directly.
  2. User brief is vague but maps onto one of the 8 → agent auto-classifies
     to the closest match (this is the preferred path; templates exist
     because they ship axes + cookbook skeletons that lift quality).
  3. Brief is genuinely outside all 8 templates (e.g. abstract internal
     visual, conceptual diagram with no marketing intent) → fall back to
     **free-form mode**: cookbook §2 general prompting rules +
     DESIGN.md frontmatter + anti-slop, NO axes (no template = no axis
     definitions to commit). Free-form is fallback only — never the
     default when a template fits.
- **Jobspec**: subject + copy.tagline + copy.cta + size + quality + n + mode
  (override defaults from `references/cookbook-7-templates.md`)

### Procedure (do these in order)

**Step 1 — Load DESIGN.md.**
Parse YAML frontmatter (token block + `taste:`). Read all 9 sections.
Pay special attention to:
- `## 1. Visual Theme & Atmosphere` (gives image atmosphere)
- `## 2. Color Palette & Roles` (every color name + hex + role)
- `## 3. Typography Rules` (especially the typography table)
- `## 7. Do's and Don'ts` → the **Don't** list is the brand's anti-slop banned
- `## 9. Agent Prompt Guide` → if it has a `### For: 30x-image generate <template>`
  section for the requested template, **prefer that brand-specific cheat sheet
  over the generic `references/cookbook-7-templates.md` skeleton**.

**Step 2 — Pick combinatorial axes.**
Read `references/combinatorial-axes.md` for the requested template. Each axis
has 4-6 options. Pick **exactly one** per axis, biased by the `taste:` block:
- Higher `variance` → asymmetric / artistic options
- Higher `density` → packed / dense options
- Higher `imagery_realism` → photoreal / hard-light options
- Higher `art_direction` → bold / experimental options
**Commit the picks**: write them into the prompt explicitly. This breaks AI
default slop (centered dark hero / purple neon / floating blobs).

**Step 3 — Assemble final prompt.**
```
[Template skeleton from cookbook-7-templates.md OR Section 9 brand cheat sheet]

VISUAL ATMOSPHERE:
[paraphrase Section 1 essence — 2-3 sentences]

PHOTOGRAPHY / ILLUSTRATION STYLE:
[derive from taste.imagery_realism + Section 1 prose]

COMPOSITION:
- Axis 1: [committed choice]
- Axis 2: [committed choice]
- Axis 3: [committed choice]
- Axis 4: [committed choice if template has 4]

PALETTE (use ONLY these tokens, do not fabricate new colors):
- Primary: {colors.primary} ({brand-color-name from Section 2})
- Surface: {colors.surface}
- Headlines: {colors.on-surface}
- Body: {colors.neutral}
- Accent: {colors.tertiary} (sparingly)

TYPOGRAPHY IN IMAGE:
- Display: {typography.headline-display.fontFamily} weight {fontWeight}
- Letter-spacing: {letterSpacing}
- Font features: {fontFeature if set}

SUBJECT / COPY (from jobspec):
- Subject: {jobspec.subject}
- Tagline: "{jobspec.copy.tagline}" (verbatim, in quotes)
- CTA: {jobspec.copy.cta if provided}

ANTI-SLOP CONSTRAINTS (always include — read references/anti-slop-rules.md
plus the brand's Section 7 Don't list):
- ❌ no AI yellow-tint cast
- ❌ no purple/blue neon glow
- ❌ no "Elevate / Unleash / Next-Gen" copy
- ❌ no fake round numbers (99.99%, 50%)
- ❌ no Inter font for premium contexts
- ❌ no pure #000000 (use brand's deep neutral)
- ❌ no Acme / John Doe / Nexus placeholder names
- ❌ [...add brand-specific rules from Section 7 Don't]
```

**Step 4 — Invoke `image_generation` tool.**
Tool params (defaults from `references/cookbook-7-templates.md`, override from
jobspec):
- `size`: e.g. 1024x1536 for ad-creative
- `quality`: low for explore, high for final
- `n`: 4 for explore, 1 for final
- `action`: "generate" for new, "edit" for iterate
- `output_format`: png

**Step 4·B — Carousel multi-slide handling (template=carousel only).**

Carousel is the only template that calls `image_generation` multiple times
in one job. Procedure:

1. **Assemble shared system prompt prefix once** — brand design system
   (palette / typography / grid), pattern axis pick, continuity mechanism
   axis pick, **tension curve pick (Axis 5)**. This prefix is identical
   across all slides.
2. **Plan slide roles AND narrative beats**:
   - Slide 1 = cover (use Cover Slide Style axis).
   - Slides 2..(N-1) = body (use Body Slide Rhythm axis).
   - Slide N = CTA.
   - **Apply tension curve (Axis 5) to assign each body slide a narrative
     beat**: e.g. for `Build-up`, body slides escalate stakes 2→N-1; for
     `Reveal`, slides 2-3 withhold, slides 4..(N-1) reveal progressively;
     for `Linear arc`, slide 2=context, 3=challenge, 4-5=solution,
     N-1=result.
   - **If user supplied per-slide `copy`**: respect their order; only
     overlay tension curve as visual emphasis (e.g. slide N-1 gets
     larger headline, more saturated color — the "payoff slide").
   - **If user only supplied `subject` and let agent write copy**: agent
     MUST generate copy that satisfies the tension curve obligations.
     Sanity-check: does slide N-1 feel like the payoff? Does slide 1
     hook toward it?
3. **Fan out ALL slides in parallel as independent `action=generate`
   calls — produce N SEPARATE PNG files, never a single composite image.**
   Same logic as every other template, just N calls instead of 1.
   **DO NOT generate a single image with N panels arranged inside it
   (comic-strip / grid style).** Each slide is a standalone full-resolution
   PNG that the user uploads as one slide of the swipe sequence on
   LinkedIn / Instagram / X. If you produce one composite image, that's
   wrong — the user can't break it apart, and the platform won't paginate
   it as a carousel:
   - Build per-slide prompt = shared design-system prefix + `THIS SLIDE:
     slide N of n_slides, role: <cover|body-N|cta>, subject:
     <jobspec.slides[N].subject>, copy: "<verbatim>"`.
   - **Every slide**: `action=generate`, `n=1`, quality at user's level
     (default `high`). **No `action=edit` chain.** Reason: editing slide 1
     repeatedly can trap gpt-image-2 in "webpage layout" mode and make
     slides look CSS-rendered rather than gpt-image-2-generated. Each slide
     must be a standalone generation, exactly like ad-creative or logo.
   - Cross-slide visual consistency comes from the **shared prompt prefix**
     (brand palette / typography / Visual Continuity Mechanism axis pick),
     NOT from image-reference chains. Trust the prefix.
   - Fire all N calls in parallel — wall-clock = ~1 image_generation call.
   - If a body slide drifts off-brand vs siblings, fix by reinforcing the
     shared prefix for that slide (more specific palette / typography
     directives), not by switching to action=edit.
4. **Save each slide** to `candidates/slide-{N}.png` (not `1.png` / `2.png`
   — slide-numbered for clarity).
5. **manifest.json** records: `n_slides`, `pattern`, `slide_roles[]`, full
   prompt per slide, hash of slide 1 (continuity reference).

**Step 5 — Save outputs.**
Default location: `$HOME/.30x-image/profiles/<brand-slug>/marketing/<job-id>/`
Files:
- `candidates/{1..n}.png` (each candidate)
- `manifest.json` (see structure below)

If profile dir does not exist (running from `examples/`), default to
`./marketing/<job-id>/` in cwd.

**Step 6 — Write manifest.json.**
```json
{
  "job_id": "ISO-timestamp_short-slug",
  "design_md_path": "...",
  "design_md_hash": "sha256:...",
  "template": "ad-creative",
  "jobspec": { ... },
  "axes_picks": {
    "Hero Composition": "Asymmetric Split",
    "Subject Framing": "Medium environmental",
    "Lighting Mood": "Soft natural daylight",
    "Text-Image Integration": "Tagline overlaid bottom-left"
  },
  "tool_params": { "size": "1024x1536", "quality": "high", "n": 4 },
  "prompt_full": "...",
  "outputs": [
    { "path": "candidates/1.png", "selected": false },
    { "path": "candidates/2.png", "selected": false },
    ...
  ],
  "created_at": "..."
}
```

**Step 7 — Report to user.**
Tell them:
- Where the candidates are
- Which axis picks were committed (transparency)
- Optional: suggest "select one and run again with action=edit, quality=high"
  for the final pass.
- Optional: remind that surgical edits are available — "if any candidate is
  90% there but has one detail to fix (typo / wrong color / artifact), use
  edit mode (Mode 3) to fix just that part and keep everything else."

---

## When user invokes `edit` (Mode 3 — surgical region edit)

### Inputs

- **`input_image`**: required. Path to the PNG you want to edit (typically
  from a previous Mode 2 run, e.g. `candidates/2.png` or `slide-3.png`).
- **What to change** (one of four ways — pick the most natural for the user):
  1. **Natural-language region** — `region: "the headline at the top"` /
     `"the CTA button"` / `"the bottom-right corner"`. Agent uses vision
     to locate and generate a mask programmatically. Most natural UX.
  2. **Normalized bbox** — `region_box: [x1, y1, x2, y2]` in 0.0-1.0
     coordinates (top-left origin). Agent generates a rectangular mask.
     Use when user gives precise coords or "the top 20%" type framing.
  3. **User-supplied mask** — `mask: ./my-mask.png`. Same dimensions as
     input_image, transparent (alpha=0) where to edit, opaque where to
     preserve. For users who painted in Photoshop / Preview / Figma.
  4. **Global edit (no mask)** — `global_prompt: "make it black and white"`.
     No mask, prompt-only. ⚠️ Risk: gpt-image-2 may regenerate the whole
     image, drifting from the original. Only use for true global changes
     (color grade, time-of-day, weather). Warn user before proceeding.
- **`prompt`**: what should appear in the masked region (or the global
  change for global mode). Be specific — e.g. `"change tagline to 'Stop
  fraud before it starts.' in the same font and weight"` not `"fix the
  text"`.
- **`output_path`**: optional. Default: alongside the input as
  `<input-name>-edited-<timestamp>.png`.

### Procedure (do these in order)

**Step 1 — Load and validate input_image.**
- Confirm file exists, is a PNG, is gpt-image-2-readable.
- Read its dimensions (W × H) — needed for mask sizing.

**Step 2 — Resolve the region into a mask PNG.**

| Region type | How to produce mask |
|-------------|---------------------|
| Natural-language (`region: "..."`) | Pass input_image through Codex's vision capability. Identify the pixel bounding box of the described element. Generate a same-dimension PNG: target region transparent (alpha=0, RGBA 0,0,0,0), rest opaque (alpha=255). Use Python+PIL via shell, e.g. `python -c "from PIL import Image, ImageDraw; ..."`. |
| Normalized bbox (`region_box: [x1,y1,x2,y2]`) | Multiply by W,H to get pixel rect. Generate mask PNG with that rect transparent, rest opaque. |
| User mask (`mask: path`) | Verify dimensions match input_image. If mismatch, resize or error with clear message. |
| Global (`global_prompt`) | No mask. Skip to Step 3. |

Save the mask to a temp file (e.g. `/tmp/30x-image-mask-<job-id>.png`).

**Step 3 — Upload input_image (and mask, if any) as files.**

```python
from openai import OpenAI
client = OpenAI()

def create_file(path):
    with open(path, "rb") as f:
        return client.files.create(file=f, purpose="vision").id

input_file_id = create_file(input_image)
mask_file_id = create_file(mask_path) if mask_path else None
```

**Step 4 — Invoke `image_generation` tool with `input_image_mask`.**

For region/bbox/mask edits (Steps 2.1, 2.2, 2.3):
```python
response = client.responses.create(
    model="gpt-5.5",
    input=[{
        "role": "user",
        "content": [
            {"type": "input_text", "text": prompt_with_brand_context},
            {"type": "input_image", "file_id": input_file_id}
        ],
    }],
    tools=[{
        "type": "image_generation",
        "quality": "high",
        "input_image_mask": {"file_id": mask_file_id}
    }],
)
```

For global edits (Step 2.4 — no mask):
```python
# Same call, but omit input_image_mask. Warn user about regeneration risk.
```

**Prompt assembly** — wrap the user's edit prompt with brand context to
prevent off-brand drift in the edited region. Pull from the original
`manifest.json` (or DESIGN.md if available):

```
Edit ONLY the masked region of this image. Preserve everything outside
the mask exactly.

EDIT INSTRUCTION:
{user's edit prompt}

BRAND CONTEXT (the edited region must remain on-brand):
- Palette: {colors.primary}, {colors.surface}, {colors.on-surface} — do not
  introduce new colors
- Typography: {typography.headline-display.fontFamily} weight {fontWeight}
- Anti-slop: same banned list as original generation (no AI yellow-tint, no
  pure black, no Inter font, etc.)

Do not regenerate the whole image. Do not alter pixels outside the mask.
```

**Step 5 — Save and report.**

- Save output PNG to `output_path`.
- Append to a Mode-3 manifest entry:
  ```json
  {
    "edit_id": "ISO-timestamp",
    "input_image": "...",
    "input_image_hash": "sha256:...",
    "region_type": "natural-language" | "bbox" | "user-mask" | "global",
    "region_value": "the headline at the top",
    "mask_path": "/tmp/30x-image-mask-...png",
    "mask_hash": "sha256:...",
    "edit_prompt": "...",
    "output_path": "...",
    "created_at": "..."
  }
  ```
- Tell user: where the edited PNG is, what region was masked (transparency),
  and a side-by-side diff suggestion ("compare to the original at <input_path>").

### Important limitations (from gpt-image-2 documented behavior)

1. **Iterative-edit "stubbornness"** — editing the same image more than
   2-3 times in succession causes the model to stop making meaningful
   changes. **Workaround:** if a third edit doesn't take, regenerate the
   image fresh from Mode 2 with the desired change baked into the prompt.
2. **Mask is guidance, not law** — gpt-image-2 uses the mask as guidance
   but may not follow its exact shape with complete precision. Edges can
   bleed slightly into preserved areas. For pixel-perfect preservation
   needs, consider compositing in a separate image editor.
3. **Self-correction hallucination** — if the user asks to edit something
   that doesn't actually exist in the image (e.g. "remove the QR code"
   when there is no QR code), the model may hallucinate the missing
   element AND then "fix" it. Vision-validate the region exists before
   masking.
4. **Global edits without mask drift** — using `global_prompt` (no mask)
   risks the model regenerating the whole image. For true preservation,
   always provide a mask, even if the mask is the entire image except
   one tiny corner.

---

## Quality bars (M0 acceptance)

A generated image is **on-brand** if:
1. Primary color from frontmatter is visibly dominant (CTA / accent)
2. Typography style matches `## 3. Typography Rules` (e.g., Stripe = light
   weight 300, NOT bold)
3. No item from anti-slop banned list violated
4. Mood / density / variance match the `taste:` block

If hand-judging gives any "no" — iterate (re-pick axes / strengthen
constraints / explicit anti-slop in prompt).

---

## When you DON'T have enough

Refuse / clarify gracefully:
- DESIGN.md missing → 3-step fallback (try in order, tell the user which
  one you're taking):
  1. **`npx getdesign list`** — check if the brand is in the public
     awesome-design-md library (60+ brands: Stripe / Linear / Notion /
     Vercel / Apple / Tesla / Nike / Spotify / Starbucks / Apple /
     Coinbase / etc.). If yes →
  2. **`npx getdesign add <brand>`** — pulls a ready DESIGN.md to cwd in
     one command. Use it directly; optionally augment with a `taste:`
     block (5-7 numeric brand parameters) for axis biasing.
  3. Brand not in library → run `init` mode (M2) or hand-write a DESIGN.md
     using the 9-section format + frontmatter token block + `taste:` block
     (see `examples/awesome-vendor/stripe/DESIGN.md` as the canonical
     reference).
- Template name wrong → list 8 valid templates (incl. carousel)
- User brief doesn't match any template after honest attempt to classify →
  enter free-form fallback (NOT refuse). Tell user "no template matched,
  using free-form with brand DESIGN.md + anti-slop only" so they know
  determinism is reduced this run.
- Jobspec missing required fields (subject) → ask before invoking tool
- Brand `## 7 Don't` is empty/weak → fall back to generic
  `references/anti-slop-rules.md`

---

## Composition example — Stripe ad-creative

```
DESIGN.md:  examples/awesome-vendor/stripe/DESIGN.md
Template:   ad-creative
Jobspec:
  subject: "Q2 product launch — new fraud detection feature"
  copy:
    tagline: "Stop fraud before it starts."
    cta: "Try it free"
  size: 1024x1536
  quality: high
  n: 4

Axis picks (committed by 30x-image based on taste.variance=4, realism=7):
  Hero Composition:        Editorial Offset (variance=4 prefers low-mid)
  Subject Framing:         Medium environmental
  Lighting Mood:           Soft natural daylight (realism=7 sweet spot)
  Text-Image Integration:  Tagline overlaid bottom-left

→ image_generation tool invoked → 4 candidates saved
→ manifest.json records hash of DESIGN.md + axis picks + full prompt
```
