---
name: Clinical Trust & Deployment System
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#424750'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#727781'
  outline-variant: '#c2c6d1'
  surface-tint: '#27609d'
  primary: '#003461'
  on-primary: '#ffffff'
  primary-container: '#004b87'
  on-primary-container: '#8abcff'
  inverse-primary: '#a3c9ff'
  secondary: '#006a68'
  on-secondary: '#ffffff'
  secondary-container: '#86f4f1'
  on-secondary-container: '#00706f'
  tertiary: '#472f00'
  on-tertiary: '#ffffff'
  tertiary-container: '#644400'
  on-tertiary-container: '#f5ac07'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d3e4ff'
  primary-fixed-dim: '#a3c9ff'
  on-primary-fixed: '#001c38'
  on-primary-fixed-variant: '#004882'
  secondary-fixed: '#86f4f1'
  secondary-fixed-dim: '#69d8d5'
  on-secondary-fixed: '#00201f'
  on-secondary-fixed-variant: '#00504f'
  tertiary-fixed: '#ffdead'
  tertiary-fixed-dim: '#ffba3b'
  on-tertiary-fixed: '#281900'
  on-tertiary-fixed-variant: '#604100'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
  deep-navy: '#0B3C5D'
  clinical-green: '#5FCF80'
  bg-canvas: '#F5F7FA'
  surface-white: '#FFFFFF'
  text-primary: '#1E293B'
  border-subtle: '#E2E8F0'
typography:
  display:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-mobile:
    fontFamily: Inter
    fontSize: 34px
    fontWeight: '800'
    lineHeight: 42px
    letterSpacing: -0.015em
  headline-lg:
    fontFamily: Inter
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Open Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Open Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Open Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.04em
  stat-metric:
    fontFamily: Inter
    fontSize: 44px
    fontWeight: '800'
    lineHeight: 48px
    letterSpacing: -0.02em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 2rem
  margin-mobile: 1.25rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
  space-2xl: 4rem
  space-3xl: 6rem
---

## Brand & Style

This design system establishes an authoritative, clinical, and high-velocity digital presence tailored for enterprise healthcare staffing leaders, hospital network talent acquisition directors, and specialized clinical candidates. The brand language balances uncompromising institutional compliance with energetic operational delivery. 

The aesthetic is **Clinical Precision & Modern Corporate**. It draws heavily from institutional healthcare rigor—crisp light surfaces, high typographic contrast, structural data grids, and clean separation of concerns—while infusing warmth and momentum via dynamic amber accents derived from the brand's orbital logo mark. Rather than appearing as a passive job board, the UI projects the feel of an enterprise recruitment infrastructure engine: metrics-forward, verifiable, transparent, and seamless.

## Colors

The color architecture is anchored in healthcare authority and clinical transparency:

- **Primary (`#004B87`)**: High-fidelity royal/clinical blue pulled directly from the core corporate identity. Used for primary navigation, core interactive triggers, high-order headlines, and authoritative structural headers.
- **Deep Navy (`#0B3C5D`)**: An ultra-deep contrast tone dedicated to institutional hero sections, footers, and high-contrast recruitment CTA containers.
- **Secondary (`#2CA6A4`)**: Medical teal functioning as a stabilizing bridge between operational blue and health indicators. Applied to step indicators, secondary actions, active tabs, and workflow lines.
- **Tertiary Accent (`#F2A900`)**: Golden amber taken directly from the logo’s dynamic circular swoosh. Used intentionally for high-conversion conversion touchpoints, metric accents, "Fast Delivery" tags, and status highlights.
- **Clinical Green (`#5FCF80`)**: Dedicated to verified candidate credentials, compliance checks, live availability states, and success indicators.
- **Neutrals & Surfaces**: `#F5F7FA` serves as the canvas substrate, `#FFFFFF` isolates elevated cards and input fields, with `#1E293B` ensuring high-contrast AA/AAA legibility for clinical copy.

## Typography

The type scale combines the crisp, structural geometry of **Inter** for all display headlines, labels, and statistical callouts with the open, humanist readability of **Open Sans** for descriptive copy and clinical service narratives.

- **Inter**: Drives rapid scanning across headers, credential badges, and dashboard telemetry. Tight negative letter spacing is applied to headings above 24px to impart modern authority.
- **Open Sans**: Deployed for body copy to prevent visual fatigue when healthcare administrators parse detailed compliance standards, candidate profiles, and partnership delivery models.
- **Metrics & Indicators**: Dedicated statistical sizes ensure critical proof points (e.g., "48–96 Hours", "25+ Years") command instant attention on conversion screens.

## Layout & Spacing

The layout is built on an enterprise 12-column grid system with a maximum centered container width of `1280px`. 

- **Desktop (1024px+)**: 12-column structure with `1.5rem` (24px) gutters and generous vertical section rhythm (`space-3xl` / 96px) to establish clinical authority and uncluttered presence.
- **Tablet (768px - 1023px)**: 8-column layout with 24px gutters and `2rem` page padding. Complex 4-card service rows reflow to 2x2 grids.
- **Mobile (< 768px)**: 4-column layout with `1rem` (16px) gutters and `1.25rem` (20px) margins. Horizontal step sequences reflow into vertical milestone chains with progressive connecting lines.
- **Micro-Spacings**: All card internals, badge padding, and form inputs strictly observe the 8-point base increment (`space-xs` through `space-xl`).

## Elevation & Depth

Visual hierarchy is maintained through subtle, low-opacity, cool-tinted elevation layered over structural borders, avoiding deep or muddy drop shadows.

- **Level 0 (Flat / Canvas)**: Background `#F5F7FA` with no elevation. Form fields and non-interactive backgrounds reside here.
- **Level 1 (Cards & Data Panels)**: Pure white `#FFFFFF` surface bordered by a crisp `1px solid #E2E8F0` hairline with an ultra-soft blue-tinted drop shadow: `0 1px 3px rgba(11, 60, 93, 0.05), 0 1px 2px rgba(11, 60, 93, 0.03)`.
- **Level 2 (Hover States & Elevated Cards)**: Applied to interactive talent cards, active process steps, and floating navigation bars: `0 10px 25px -5px rgba(11, 60, 93, 0.08), 0 8px 10px -6px rgba(11, 60, 93, 0.04)`.
- **Level 3 (Modals & Sticky Recruitment Banners)**: High-priority overlays use `0 20px 35px -5px rgba(11, 60, 93, 0.14)`.
- **Contrast Dividers**: Used in place of heavy elevations between sections, utilizing contrasting Deep Navy (`#0B3C5D`) full-bleed containers adjacent to light canvas surfaces to ground calls to action.

## Shapes

The design system adopts a balanced **Rounded (`2`)** shape posture. 

- Interactive buttons, badge containers, and text input fields utilize `0.5rem` (8px) corners to balance modern approachability with institutional stability.
- Content cards, service modules, and process step containers leverage `rounded-lg` (`1rem` / 16px) corner radiuses.
- Hero media containers and primary CTA banner cards leverage `rounded-xl` (`1.5rem` / 24px) to subtly reference the smooth curvature of the HDDP corporate circular mark.
- Small status dots and credential verification checkmarks remain fully circular (`9999px`).

## Components

### Buttons
- **Primary Action (Request Talent / Partner With Us)**: Fill of `#004B87` with crisp white text, `font-family: Inter`, `font-weight: 600`, `font-size: 16px`, `padding: 14px 28px`, `border-radius: 8px`. Hover shifts to `#0B3C5D` with subtle `translateY(-1px)`.
- **High-Conversion Accent Button (Schedule Consultation / Urgent Request)**: Fill of `#F2A900` with deep slate `#1E293B` text for high contrast. Hover scales brightness slightly with a warm amber glow.
- **Secondary / Ghost Button**: Transparent background, `2px solid #004B87`, text `#004B87`. Hover fills with `rgba(0, 75, 135, 0.06)`.

### Trust Indicators & Credibility Bar
- Full-bleed band with `#FFFFFF` background and top/bottom `#E2E8F0` hairlines.
- Displays metric items (e.g., "25+ Years", "48–96 Hours Delivery") with `stat-metric` numerical labels in `#004B87`, accompanied by descriptive `label-sm` text in `#64748B`.
- Integrated verification icons tinted in `#2CA6A4` or `#5FCF80`.

### Credentialing Badges & Chips
- **Verified State**: Background `rgba(95, 207, 128, 0.15)`, text `#1b6b33`, featuring a solid `#5FCF80` checkmark icon, `padding: 4px 10px`, `border-radius: 6px`.
- **Role Category Chips**: Light background `#F5F7FA`, border `1px solid #E2E8F0`, text `#1E293B`, `font-size: 13px`. Active selection shifts border and text to `#004B87`.

### Process Step Flow (5-Step Sequence)
- Desktop: Horizontal continuous progression connected by a `2px` teal guide wire (`#2CA6A4`).
- Step Node: `40px` circular badge with bold numerical counter. Completed/active steps use `#004B87` fill with white text; future steps use `#FFFFFF` with `#CBD5E1` border.
- Beneath each node: Step name (`headline-sm`), turnaround SLA indicator, and clear micro-copy.

### Talent & Service Cards
- White `#FFFFFF` base, `1px solid #E2E8F0` border, `16px` border-radius, `24px` internal padding.
- Card Header: Category indicator tag + subtle teal accent corner line.
- Content: Clear hierarchical role taxonomy (e.g., "Registered Nurse - ICU", "EHR Specialist") followed by verification checklists.
- Card Footer: Sub-action link styled with an arrow icon transitioning `+4px` on hover.

### Input Fields & Consultation Forms
- Base: Height `48px`, background `#FFFFFF`, border `1px solid #CBD5E1`, `padding: 0 16px`, `font-size: 15px`.
- Focus state: `border-color: #004B87`, box-shadow `0 0 0 3px rgba(0, 75, 135, 0.15)`.
- Labeling: Always visible top-aligned `label-md` in `#1E293B`, with optional helper text in `#64748B`.

### High-Conversion CTA Blocks
- Deep Navy container (`#0B3C5D`) with an internal dual-tone radial gradient simulating the golden/teal orbital arc of the brand logo.
- High-contrast white headline accompanied by amber accent pill (`#F2A900`) triggers.