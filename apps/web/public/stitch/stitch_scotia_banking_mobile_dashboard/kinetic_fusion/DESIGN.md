---
name: Kinetic Fusion
colors:
  surface: '#f9f9fc'
  surface-dim: '#d9dadd'
  surface-bright: '#f9f9fc'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3f6'
  surface-container: '#edeef1'
  surface-container-high: '#e8e8eb'
  surface-container-highest: '#e2e2e5'
  on-surface: '#1a1c1e'
  on-surface-variant: '#5e3f3b'
  inverse-surface: '#2f3133'
  inverse-on-surface: '#f0f0f3'
  outline: '#936e69'
  outline-variant: '#e9bcb6'
  surface-tint: '#c0000f'
  primary: '#bf000f'
  on-primary: '#ffffff'
  primary-container: '#ec111a'
  on-primary-container: '#ffffff'
  inverse-primary: '#ffb4aa'
  secondary: '#954a00'
  on-secondary: '#ffffff'
  secondary-container: '#fd8100'
  on-secondary-container: '#5d2c00'
  tertiary: '#5f5e5d'
  on-tertiary: '#ffffff'
  tertiary-container: '#777676'
  on-tertiary-container: '#ffffff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdad5'
  primary-fixed-dim: '#ffb4aa'
  on-primary-fixed: '#410001'
  on-primary-fixed-variant: '#930008'
  secondary-fixed: '#ffdcc6'
  secondary-fixed-dim: '#ffb785'
  on-secondary-fixed: '#301400'
  on-secondary-fixed-variant: '#723700'
  tertiary-fixed: '#e5e2e1'
  tertiary-fixed-dim: '#c8c6c5'
  on-tertiary-fixed: '#1c1b1b'
  on-tertiary-fixed-variant: '#474746'
  background: '#f9f9fc'
  on-background: '#1a1c1e'
  surface-variant: '#e2e2e5'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 48px
  xl: 80px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 64px
---

## Brand & Style
This design system centers on the high-energy intersection of two distinct financial identities, blending them into a cohesive, forward-leaning experience. The brand personality is **Energetic, Professional, and Fluid**. It targets a modern demographic that values the security of established banking with the agility of digital-first fintech.

The visual style is **Corporate Modern with Kinetic Accents**. It utilizes a clean, high-white-space foundation to ensure clarity, while employing "Transient Gradients" to signal movement and progression. The emotional response should be one of momentum—feeling that the user's capital is active and working, rather than static.

## Colors
The palette is dominated by the **Kinetic Gradient**, a transition from Scotiabank Red to Tangerine Orange. 

- **Primary & Secondary:** These are reserved for high-intent actions, progress indicators, and brand-heavy moments. 
- **Transient State:** Use the gradient for hover states and active indicators to imply a "fusion" of energy.
- **Neutrals:** A cool-toned light gray base (#F4F4F7) provides a stable stage for the warm-toned primaries, preventing the interface from feeling over-saturated.
- **Functional Colors:** Success, Warning, and Error states should remain distinct from the brand orange and red to maintain semantic clarity.

## Typography
The design system exclusively utilizes **Inter** to maintain a systematic, utilitarian aesthetic that balances the vibrant color palette. 

- **Weight Strategy:** Use Bold (700) and Semi-Bold (600) for headlines to anchor the page. Regular (400) is reserved for long-form reading to maximize legibility.
- **Tight Kerning:** For larger display sizes, a slight negative letter spacing is applied to create a more "engineered" and professional look.
- **Clarity:** Maintain high contrast ratios by using the Tertiary color (#1A1A1A) for all primary text content against the light neutral background.

## Layout & Spacing
The spacing philosophy follows a strict **8px grid system** to ensure mathematical harmony and ease of handoff.

- **Grid Model:** Use a 12-column fluid grid for desktop with 24px gutters. On mobile, transition to a 4-column grid with 16px margins.
- **Rhythm:** Vertical rhythm is driven by the `md` (24px) unit for component grouping and `lg` (48px) for section headers.
- **Safe Areas:** Interactive elements must maintain a minimum 44px hit target, regardless of the visual padding defined by the spacing tokens.

## Elevation & Depth
This design system uses **Tonal Layers** supplemented by **Ambient Shadows** to create a sense of organized hierarchy without visual clutter.

- **Surface Levels:** 
  - Level 0: Background (#F4F4F7).
  - Level 1: Main content cards (White) with a 1px soft stroke (#E2E2E9).
  - Level 2: Elevated elements (Modals, Popovers) using a diffused shadow with a 2% Red-Orange tint (e.g., `box-shadow: 0 12px 32px rgba(236, 17, 26, 0.08)`).
- **Interactive Depth:** On hover, buttons and cards should transition from a flat state to a subtle lift, increasing the shadow spread while maintaining a crisp 1px border.

## Shapes
In alignment with the "modern and soft" requirement, the design system utilizes a **Rounded-XL** foundation.

- **Container Radius:** Standard cards and containers use 1.5rem (24px).
- **Interactive Radius:** Buttons and input fields use 0.5rem (8px) to provide a more stable, functional appearance compared to the softer outer containers.
- **Consistency:** Avoid mixing sharp corners with rounded elements. Every visual container, including images and video players, must adhere to the 1.5rem radius.

## Components
- **Buttons:** Primary buttons feature the Kinetic Gradient. Secondary buttons use a transparent background with a 2px gradient-colored border (Ghost style). Hover states should trigger a slight shift in the gradient's angle (from 135deg to 150deg).
- **Chips:** Small, pill-shaped indicators using the `gradient_soft` background with primary red text for high legibility.
- **Input Fields:** Use a 1px neutral stroke that transitions to the primary orange color on focus. Labels should use `label-md` and sit above the field.
- **Cards:** White backgrounds with 24px padding and 1.5rem corners. A subtle 4px vertical accent bar on the left side using the primary red can be used to denote "active" or "priority" status.
- **Progress Indicators:** Linear bars should use the `gradient_primary` to visualize growth or completion, moving from Red (start) to Orange (finish).
- **Navigation:** Top navigation should remain white with a thin bottom border. Active links are indicated by a 3px gradient underline.