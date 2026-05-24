---
name: Kinetic Heritage
colors:
  surface: '#fbf9fc'
  surface-dim: '#dbd9dd'
  surface-bright: '#fbf9fc'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f3f6'
  surface-container: '#efedf0'
  surface-container-high: '#e9e7eb'
  surface-container-highest: '#e3e2e5'
  on-surface: '#1b1b1e'
  on-surface-variant: '#5e3f3b'
  inverse-surface: '#303033'
  inverse-on-surface: '#f2f0f3'
  outline: '#936e69'
  outline-variant: '#e9bcb6'
  surface-tint: '#c0000f'
  primary: '#bf000f'
  on-primary: '#ffffff'
  primary-container: '#ec111a'
  on-primary-container: '#ffffff'
  inverse-primary: '#ffb4aa'
  secondary: '#4e5a98'
  on-secondary: '#ffffff'
  secondary-container: '#aebaff'
  on-secondary-container: '#3c4985'
  tertiary: '#5d5e62'
  on-tertiary: '#ffffff'
  tertiary-container: '#75777b'
  on-tertiary-container: '#040508'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdad5'
  primary-fixed-dim: '#ffb4aa'
  on-primary-fixed: '#410001'
  on-primary-fixed-variant: '#930008'
  secondary-fixed: '#dde1ff'
  secondary-fixed-dim: '#b9c3ff'
  on-secondary-fixed: '#041451'
  on-secondary-fixed-variant: '#36427e'
  tertiary-fixed: '#e2e2e7'
  tertiary-fixed-dim: '#c6c6cb'
  on-tertiary-fixed: '#1a1c1f'
  on-tertiary-fixed-variant: '#45474b'
  background: '#fbf9fc'
  on-background: '#1b1b1e'
  surface-variant: '#e3e2e5'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 34px
    fontWeight: '700'
    lineHeight: 41px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 34px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 28px
  title-lg:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 25px
  body-lg:
    fontFamily: Inter
    fontSize: 17px
    fontWeight: '400'
    lineHeight: 22px
  body-md:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 13px
  display-lg-mobile:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 34px
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 30px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  edge-margin: 16px
  gutter: 12px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 24px
  section-gap: 32px
---

## Brand & Style
The design system balances the institutional authority of a legacy bank with the fluid, high-performance expectations of modern fintech. The target audience includes a broad demographic ranging from digital natives to established professionals, requiring a UI that is both intuitive and reassuring. 

The aesthetic is **Corporate / Modern** with a strong **iOS-native** influence. It prioritizes clarity, precision, and a premium tactile feel. By utilizing high-quality typography and a restrained color palette, the system evokes a sense of financial security and effortless control. Every interaction should feel intentional, smooth, and grounded.

## Colors
The palette is rooted in a high-contrast relationship between action and structure.

*   **Primary (Scotia Red):** Reserved exclusively for primary actions, critical alerts, and brand signifiers. It must be used sparingly to maintain its impact.
*   **Secondary (Navy):** Used for navigation elements, headers, and deep-toned backgrounds to provide a sense of stability and depth.
*   **Surface (Light Grey):** A range of cool greys (starting at #F2F2F7) are used to define content areas and separate functional modules without the harshness of pure white.
*   **Background (White):** Pure white is the foundation for the main content canvas, ensuring maximum legibility and a "breathable" interface.

## Typography
The system utilizes **Inter** across all levels to maintain a systematic, utilitarian, yet modern feel. 

Hierarchy is established through significant weight shifts. Headlines use Bold or Semi-Bold weights with tight tracking to appear impactful. Body text utilizes the Apple-standard 17pt size for primary readability, ensuring accessibility. Label styles are used for secondary metadata and overlines, often employing a slightly heavier weight to remain legible at smaller scales.

## Layout & Spacing
The layout follows a **fluid grid** model optimized for mobile-first consumption. 

*   **Margins:** A standard 16px lateral margin is maintained across all mobile views to align with iOS native standards.
*   **Vertical Rhythm:** A 4px baseline grid governs all spacing. Vertical stacks of related information (like transaction lists) use 8px or 12px gaps, while distinct functional blocks use 24px or 32px to create clear visual separation.
*   **Safe Areas:** Content must respect the notch and home indicator regions, utilizing bottom-sheet patterns for primary transactional flows.

## Elevation & Depth
This design system employs **Tonal Layers** and **Ambient Shadows** to create a sense of organized depth.

*   **Z-0 (Base):** Pure white background.
*   **Z-1 (Platter):** Light grey (#F2F2F7) surfaces used for grouping items (e.g., card sections) without shadows.
*   **Z-2 (Floating):** White cards or buttons with a subtle, highly diffused shadow (0px 4px 12px rgba(0, 15, 77, 0.08)). This provides a "lifted" effect that signals interactivity.
*   **Z-3 (Overlay):** Modals and bottom sheets utilize a backdrop blur (20px) on the layers beneath them to focus user attention, combined with a slightly more aggressive shadow for clear separation.

## Shapes
The shape language is defined by **Rounded** geometry to feel approachable and modern. 

*   **Standard Radius:** 12px for small components like input fields.
*   **Large Radius:** 16px to 20px for container cards and primary buttons, mimicking the radius of modern smartphone hardware.
*   **Pill Shape:** Used exclusively for secondary status indicators (tags/chips) to distinguish them from actionable buttons.

## Components
*   **Buttons:** Primary buttons are Scotia Red with white text, featuring 16px corner radii and a height of 52px for optimal thumb-tap targets. Secondary buttons use a light grey fill with Navy text.
*   **Cards:** Container cards use a white background with a Z-2 elevation shadow or a 1px soft stroke (#E5E5EA) when placed on grey surfaces.
*   **Input Fields:** Use a subtle grey background (#F2F2F7) with 12px rounding. Upon focus, the border transitions to Navy to signal an active state.
*   **Transaction Lists:** Minimalist rows with high-contrast typography for amounts. Use chevron icons (8pt) to indicate drill-down capability.
*   **Chips:** Small, pill-shaped elements with light-tinted backgrounds (e.g., light green for 'Cleared', light amber for 'Pending') to provide status at a glance.
*   **Bottom Sheets:** The preferred pattern for complex inputs or filtered selections, maintaining a 20px top-corner radius and a visible drag handle.