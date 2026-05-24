---
name: Kinetic Heritage
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#393939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353534'
  on-surface: '#e5e2e1'
  on-surface-variant: '#e9bcb6'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#af8782'
  outline-variant: '#5e3f3b'
  surface-tint: '#ffb4aa'
  primary: '#ffb4aa'
  on-primary: '#690004'
  primary-container: '#ec111a'
  on-primary-container: '#ffffff'
  inverse-primary: '#c0000f'
  secondary: '#b9c3ff'
  on-secondary: '#1e2b66'
  secondary-container: '#36427e'
  on-secondary-container: '#a5b1f5'
  tertiary: '#4edea3'
  on-tertiary: '#003824'
  tertiary-container: '#00885d'
  on-tertiary-container: '#000703'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdad5'
  primary-fixed-dim: '#ffb4aa'
  on-primary-fixed: '#410001'
  on-primary-fixed-variant: '#930008'
  secondary-fixed: '#dde1ff'
  secondary-fixed-dim: '#b9c3ff'
  on-secondary-fixed: '#041451'
  on-secondary-fixed-variant: '#36427e'
  tertiary-fixed: '#6ffbbe'
  tertiary-fixed-dim: '#4edea3'
  on-tertiary-fixed: '#002113'
  on-tertiary-fixed-variant: '#005236'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353534'
typography:
  display-lg:
    fontFamily: Hanken Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-md:
    fontFamily: Hanken Grotesk
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
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
  container-max: 1280px
  gutter: 24px
---

## Brand & Style
The design system embodies a high-performance, institutional aesthetic that bridges legacy stability with modern speed. It is designed for high-stakes environments where precision and authority are paramount. The visual language is **Corporate Modern** with a technical edge, utilizing deep saturation and sharp contrasts to command attention.

The UI evokes a sense of "engineered reliability." It avoids unnecessary decoration in favor of structural integrity, using light and color only to denote hierarchy, action, and state changes. The atmosphere is nocturnal, focused, and premium.

## Colors
The palette is rooted in a "Deep Space" hierarchy. The primary background uses a charcoal base to reduce eye strain, while the deep navy is reserved for structural sidebars or primary container backgrounds to establish the brand's "Kinetic" heritage.

*   **Primary (Scotia Red):** Used exclusively for high-intent actions, critical indicators, and branding moments.
*   **Secondary (Deep Navy):** Represents the core "Heritage" foundation; used for large surfaces and navigational backgrounds.
*   **Success (Emerald Green):** A vibrant accent for positive deltas, gains, and completed states.
*   **Neutrals:** A range of charcoal and elevated greys facilitate a multi-layered surface architecture.

## Typography
Typography is functional and highly legible. 
- **Headlines:** Use *Hanken Grotesk* for its sharp, contemporary geometry, providing a precise and professional tone.
- **Body:** *Inter* handles the bulk of the information design, ensuring clarity in dense data environments.
- **Data/Labels:** *JetBrains Mono* is used for technical strings, timestamps, and status labels to reinforce the "engineered" nature of the design system.

Headlines should always be pure white (`#FFFFFF`) to pop against the dark backgrounds, while body text should utilize silver-grey tones (`#A0AEC0`) to maintain a clear visual hierarchy.

## Layout & Spacing
The layout follows a **Rigid Grid** philosophy. It uses a 12-column system for desktop with a consistent 24px gutter. The spacing scale is strictly linear, based on an 8px root, ensuring that all elements align to a technical cadence.

- **Desktop:** Large margins (40px+) and centered containers for focus.
- **Mobile:** Fluid 4-column layout with reduced margins (16px) to maximize screen real estate for data presentation.
- **Reflow:** Components should stack vertically on mobile, with secondary navigation moving to a bottom-docked or hamburger menu.

## Elevation & Depth
In this dark mode environment, depth is communicated through **Tonal Layers** and **Subtle Outlines** rather than heavy shadows.

- **Level 0 (Background):** Charcoal (#121212).
- **Level 1 (Card/Surface):** Elevated Grey (#1E1E1E) with a 1px solid border (#2D2D2D).
- **Level 2 (Popovers/Modals):** Dark Navy (#1A2235) to provide a distinct color shift from the base background, appearing "closer" to the user.

Shadows, when used, are tight and high-opacity to prevent "muddy" UI: `0 4px 12px rgba(0, 0, 0, 0.5)`.

## Shapes
The shape language is disciplined. A standard **8px (0.5rem) corner radius** is applied to buttons, input fields, and cards. This "Soft" setting provides enough approachable warmth to keep the UI from feeling aggressive while maintaining the professional structure of a corporate tool.

Interactive components like checkboxes use a smaller 4px radius, while circular elements are reserved exclusively for avatars or specific status pips.

## Components

### Buttons
- **Primary:** Solid Scotia Red (#EC111A) with White text. Bold weight.
- **Secondary:** Ghost style with a 1px Silver border (#A0AEC0) and White text.
- **Tertiary:** Pure text buttons in Scotia Red for "light" actions.

### Input Fields
Inputs use a dark background (#1E1E1E) with a 1px border (#2D2D2D). Upon focus, the border transitions to Scotia Red with a subtle 2px outer glow.

### Chips & Badges
- **Success:** Emerald Green background (20% opacity) with solid Emerald Green text.
- **Neutral:** Charcoal background with Silver text.

### Cards
Cards are the primary container unit. They must have a subtle top-border highlight (1px) in a slightly lighter grey than the border to simulate a "beveled" top edge, enhancing the high-fidelity tactile feel.

### Lists
Data lists should use alternating row highlights or "zebra striping" at very low opacity (5%) to assist horizontal tracking across dense data points.