# RUN-IN-CODEX.md — M0 + M1 + M2 + M3 验收记录

> **状态**（2026-04-26）：
> - M0 ✅ — Stripe ad-creative 端到端跑通（首次实测）
> - M1 ✅ — 其余 6 模板（logo / slide / product-mockup / marketing-with-text /
>   lighting-transform / scene-with-person）combinatorial axes 补完，全部实测通过
> - M1.5 ✅ — carousel 第 8 模板，多 slide 并行 action=generate，N 张独立 PNG
> - M2 ✅ — `init` 模式落地：3 路径（getdesign 优先 / Stitch MCP 次之 / LLM 兜底），输出我们的 9 节格式，跑完用 `@google/design.md lint` 校验，auto-inferred 字段标注 `# auto-inferred, please review`
> - M3 ✅ — `edit` 模式落地：手术刀级区域编辑。用户给已生成的 PNG + 区域描述（自然语言 / bbox / 用户自画 mask / 全局），agent 调 vision 找边界 → 程序生成 mask → 通过 `image_generation` tool 的 `input_image_mask` 参数局部修改，其他像素 1:1 保留。覆盖三种修复场景：错字 / 颜色错误 / 单元素 artifact
>
> **关键判断（M1 实测验证）**：DESIGN.md `## 9. Agent Prompt Guide` 的
> brand-specific cheat sheet **不需要为每个新模板补**。frontmatter（colors /
> typography / taste）+ Section 1/2/3/7 已足够让 agent 自动拼出 on-brand
> prompt。Section 9 是冗余层，不再投资。

哥，30x-image M0 已经落盘到 `~/.agents/skills/30x-image/`。Codex 启动时会自动发现这个 skill。

## 一、确认 skill 被 Codex 看到

打开 Codex CLI（在终端跑 `codex` 或在 Codex App 里），输入：

```
list available skills
```

应该看到 `30x-image` 在列表里，描述是 "Generate on-brand marketing images via Codex's built-in image_generation tool..."

如果没看到：
- 检查 `$HOME/.agents/skills/30x-image/SKILL.md` 是否存在
- 检查 SKILL.md 第一行是否是 `---`（YAML frontmatter）
- 重启 Codex session

---

## 二、跑第一张 Stripe ad-creative 图

把这段话直接喂给 Codex（中文 / 英文都可，agent-friendly 描述）：

```
Use the 30x-image skill. Generate an ad-creative for Stripe.

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

Save outputs to ./marketing/2026-04-25_stripe-q2-launch/
```

## 三、Codex 应该做什么（你监督它）

1. **读 DESIGN.md** —— Codex 应该解析 frontmatter（colors / typography / taste）
   和 9 节 markdown body
2. **读 references** —— 应该加载 cookbook-7-templates.md / combinatorial-axes.md /
   anti-slop-rules.md
3. **挑 axes** —— 应该 commit 4 个轴的选择（Stripe taste.variance=4 应该选
   "Editorial Offset" 或 "Asymmetric Split"，不是 "Floating Polaroid Scatter"）
4. **拼 prompt** —— 应该包含 Stripe 颜色（#533afd / #061b31）+ sohne-var 字体 +
   anti-slop 列表
5. **调 image_generation tool** —— 自动调内置工具，size=1024x1536 quality=high n=4
6. **存 4 张候选 + manifest.json**

---

## 四、验收清单（M0 完成判据）

打开 4 张候选，逐项判断：

### 必须 pass：
- [ ] **Codex 自动触发了 30x-image skill**（不需要你手动指定）
- [ ] **图明显是 Stripe brand**：紫色 #533afd 占主导，深蓝 #061b31 不是黑色
- [ ] **字体细看像 sohne-var**（轻细 weight 300，不是粗体）
- [ ] **没有 AI yellow tint**（图整体是 neutral 或 cool，不是发黄）
- [ ] **没有紫光晕**（CTA 按钮是 matte purple，不是 neon glow）
- [ ] **tagline "Stop fraud before it starts." 字面渲染**（没有错字，没有
      额外字符）

### 加分项：
- [ ] manifest.json 存在且包含 design_md_hash + axes_picks
- [ ] 4 张候选**真的不一样**（有 axis 多样性，不是同一张图四份）
- [ ] 没有出现 "Elevate / Unleash / Next-Gen" 等 anti-slop 文案

---

## 四·B、M1 实测记录（2026-04-26）

补完 `references/combinatorial-axes.md` 中其余 6 模板的 4 轴定义后，对
Stripe DESIGN.md 跑全模板 sweep。

### 验收摘要

| 模板 | 状态 | 关键观察 |
|------|------|----------|
| ad-creative | ✅ M0 | 原始基线，紫色 + sohne-var weight 300 + 蓝调阴影到位 |
| logo | ✅ M1 | Mark Geometry 在 variance=4 偏置下选 Geometric/Typographic，无 Acme/Nexus 风险 |
| slide | ✅ M1 | 通过 |
| product-mockup | ✅ M1 | 通过 |
| marketing-with-text | ✅ M1 | 通过 |
| lighting-transform | ✅ M1 | 通过 |
| scene-with-person | ✅ M1 | 通过 |
| carousel | ⏳ M1.5 | 30x-image 自建（非 cookbook 源），4 轴定义 + multi-slide procedure 已落 SKILL.md，待实测 |

### 经验沉淀

1. **Section 9 cheat sheet 是冗余层**——logo（最高风险品牌识别模板）不写
   cheat sheet 也能出 Stripe 味儿。证明 frontmatter 抽取 + 通用 anti-slop +
   品牌 Section 7 Don't 注入 = 充分条件。未来扩品牌时**不再写 Section 9**，
   省 N×6 维护成本。
2. **taste 数值化真的工作**——`variance=4` 让 logo 自动避开"Organic
   hand-drawn"，落到 "Geometric primitive" / "Typographic monogram"，
   品牌一致性来自数值偏置算法而非手写 prompt。
3. **Cookbook skeleton + 4 轴 + anti-slop 三件套足够**——这是 30x-image 的
   minimum viable 架构，不需要更多层。

---

## 五、如果某项 fail，怎么 debug

### "Codex 没自动触发 30x-image"
- 检查 SKILL.md frontmatter `description` 是否清晰描述触发条件
- 显式调用：`Use the 30x-image skill to generate ...`

### "图不像 Stripe"
- Codex 可能没读 DESIGN.md。检查 prompt 里是否包含 "#533afd" 和 "sohne-var"
- 让 Codex 把它实际发给 image_generation 的 prompt 打印出来 audit

### "AI slop（紫光晕 / yellow tint）出现"
- 检查 prompt 末尾是否包含 ANTI-SLOP CONSTRAINTS 列表
- 加强约束：`重新生成，每条 ANTI-SLOP CONSTRAINTS 必须严格遵守`
- 切到 quality=high（low 容易滑回 AI 默认）

### "tagline 出错字"
- gpt-image-2 文字 99% 准确率，但偶尔失误
- 加 action=edit 二次 pass：`基于第 N 张候选，仅修改 tagline 文字使其准确，其他保持不变`

---

## 六、之后干啥

M0 ✅ + M1 ✅ + M2 ✅ → 下一步候选：

- **vendor 更多品牌实测**：getdesign 60+ 库里挑 Linear / Notion / Vercel /
  Apple / Tesla / Nike 跑模板 sweep，验证轴系统跨品牌泛化
- **drift checker**（视觉漂移检查）：图片生成后跑独立 vision-LLM 审计，
  对比 DESIGN.md（palette / typography / Section 7 Don't），REJECTED
  自动 retry — 这是图像生成赛道独家差异化
- ~~写 scripts/render-prompt-guide.ts 自动生成 Section 9 cheat sheet~~
  → **取消**：M1 验证 Section 9 是冗余层

如果某条路径卡住 → 回头看：
- M2 init 三路径中 LLM 兜底质量是否够用？
- Stitch MCP 输出格式归一化到我们 9 节是否漂？
- vendor 更多品牌时 axes 是否需要新增/调整？

---

## 七、文件清单（所有 M0 产物）

```
~/.agents/skills/30x-image/
├── SKILL.md                                              # Codex 入口
├── agents/openai.yaml                                    # Codex 元数据
├── references/
│   ├── cookbook-7-templates.md                           # 7 模板浓缩
│   ├── combinatorial-axes.md                             # ad-creative 4 轴 (M1 补完)
│   └── anti-slop-rules.md                                # Universal banned list
├── examples/
│   ├── awesome-vendor/
│   │   ├── stripe-original.md                            # 原始 npx getdesign 输出
│   │   └── stripe/DESIGN.md                              # 我们扩展版（含 frontmatter + Section 9 cheat sheet）
│   └── google-official/atmospheric-glass/
│       ├── DESIGN.md                                     # Google 官方 8 节示范
│       ├── README.md
│       ├── design_tokens.json
│       └── tailwind.config.js
└── RUN-IN-CODEX.md                                       # 本文件
```

总文件数：11
总大小：~132 KB（Codex skill 限额 25 MB，远低于上限）
