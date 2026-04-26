# Anti-Slop Rules — Marketing-Specific Banned List

Borrowed from Leonxlnx/taste-skill stitch-skill (Section 9 anti-patterns) +
imagegen-frontend-web (rebellion against AI defaults).

**Why this exists:** `image_generation` tool defaults to a specific AI slop
look — it has been trained on millions of stock-photo / AI-generated /
trend-of-the-month images. Without explicit prohibition, output collapses to
the lowest-common-denominator AI aesthetic.

**How to use:** Every `30x-image generate` invocation MUST inject this list
into the prompt as hard constraints (typically the trailing `ANTI-SLOP
CONSTRAINTS:` block). Brand-specific Don'ts from `## 7. Do's and Don'ts`
section of DESIGN.md augment this universal list.

---

## Universal Banned List (always inject)

### Visual: AI image gen defaults

- ❌ **AI yellow-tint cast** — gpt-image-1.5 era warm yellow overlay; gpt-image-2
  is neutral but old habits persist. Force neutral color balance.
- ❌ **Purple/blue AI neon glow** — the "AI assistant glowing purple orb"
  aesthetic. No outer glow on UI elements. No neon haze on backgrounds.
- ❌ **Floating meaningless gradient blobs** — decorative chromatic blobs
  with no narrative purpose. If gradient is used, it must serve composition.
- ❌ **Centered dark hero** — generic dark-mode hero with subject perfectly
  centered. Use only if `taste.variance ≤ 3`.
- ❌ **Generic dashboard card spam** — 3-equal-card row showing fake metrics.
  Use 2-column zigzag or asymmetric instead.
- ❌ **Cloned sections** — the same composition repeated 3x with different
  text. Each section must earn its own visual treatment.

### Typography: AI default fonts

- ❌ **Inter font** — overused since 2020. Forbidden in premium contexts
  unless brand DESIGN.md explicitly chooses it.
- ❌ **Generic serif** (Times New Roman / Georgia / Garamond / Palatino) —
  use distinctive modern serifs (Fraunces / Editorial New / Instrument
  Serif) only if the brand calls for serif.
- ❌ **Pure black `#000000`** — too harsh, lacks brand warmth. Use deep
  navy / off-black / zinc-950 from the brand's neutral palette.
- ❌ **Excessive gradient text on large headers** — 2020-era trick that AI
  overuses. Solid color with strong weight contrast beats gradient.

### Copy: AI marketing clichés

- ❌ **"Elevate / Seamless / Unleash / Reimagine / Next-Gen / Empower"** — the
  six horsemen of AI marketing copy. Never appear in tagline.
- ❌ **Fake round numbers** — "99.99% accurate", "10x faster", "50% off" —
  too clean to believe. Real metrics or no metrics.
- ❌ **Generic placeholder names** — "John Doe", "Acme Corp", "Nexus Inc",
  "TechCo" — real names or believable fictional names ("Aurora Studio",
  "Thread", "Field & Flour").
- ❌ **AI-style vague copy** — "Transform your workflow with AI-powered
  insights." Be specific or be absent.
- ❌ **Filler UI text** — "Scroll to explore", "Swipe down", scroll arrow,
  bouncing chevron. Content should pull users in naturally.

### Composition: AI layout tells

- ❌ **3 equal cards horizontally** — generic feature row. Use 2-column
  zigzag, asymmetric grid, or horizontal scroll.
- ❌ **Pill-shaped buttons (border-radius > 12px)** — overused. Match
  brand's `rounded.*` tokens (typically 4-8px for premium B2B).
- ❌ **Custom mouse cursors** — unnecessary novelty.
- ❌ **Overlapping elements** — every element must occupy clean spatial
  zone. No absolute-positioned content stacking.
- ❌ **Centered Hero** when variance ≥ 4 — force Split / Left-Aligned /
  Asymmetric Whitespace.

### Photography: AI photo defaults

- ❌ **Generic stock-photo polish** — sterile / overlit / "too professional"
  / Shutterstock energy. Add film grain, natural imperfection, real lighting.
- ❌ **Stock-photo CFO/founder archetype** — middle-aged white guy in suit
  pointing at chart. Use real diversity, real environments, real grain.
- ❌ **Plastic skin retouching** — pores, wrinkles, sun texture must be
  visible on people unless brand explicitly demands flawless.

---

## Per-Brand Augmentation

Always read the brand's `## 7. Do's and Don'ts` → `### Don't` section and
append every entry to the prompt. Examples:

**Stripe DESIGN.md Don't might add:**
- ❌ no harsh saturated colors outside #533afd / #ea2261 / #f96bee palette
- ❌ no weight 700 headlines (Stripe uses weight 300)
- ❌ no large radius (>8px) — Stripe stays in conservative 4-8px range

**Linear DESIGN.md Don't might add:**
- ❌ no decorative illustration (Linear is text-first)
- ❌ no warm color cast (Linear is cool/neutral)

---

## Prompt injection format

Append at the END of every image_generation prompt (last block before tool
invocation):

```
ANTI-SLOP CONSTRAINTS (hard requirements, do not relax):
- ❌ no AI yellow-tint cast
- ❌ no purple/blue neon glow
- ❌ no floating gradient blobs
- ❌ no Inter font / pure #000000
- ❌ no "Elevate / Unleash / Next-Gen / Reimagine" copy
- ❌ no fake round numbers (99.99%, 50%, 10x)
- ❌ no Acme / John Doe / Nexus placeholder names
- ❌ no generic stock-photo polish (sterile / overlit)
- [+ all entries from DESIGN.md ## 7. Do's and Don'ts → Don't section]

Output: image_generation must satisfy ALL constraints above.
```

---

## When constraints conflict with brand DESIGN.md

Brand wins. If a brand explicitly chooses Inter, pure black, gradient
headers, or any other "AI default" — that is the brand's choice and
universal banned list does NOT override it. The brand's `## 1. Visual Theme`
prose + `## 7. Do's` list is authoritative.

---

## Quality bar for "no slop"

A generated image is **slop-free** if:
1. No item from universal banned list visible in image
2. No item from brand's Don't list violated
3. The image cannot be confused with a generic AI-stock-photo / AI-marketing
   template — it is unmistakably this brand
4. A designer reviewing the image would not recognize "AI defaults"
   (template-feeling layouts, neon glow, yellow tint, etc.)

If any check fails → regenerate with stronger anti-slop prompting OR
manually pick a different combinatorial axis combo.
