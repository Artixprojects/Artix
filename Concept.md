# ARTIX | Creative Technology Studio - Concept & Blueprint

## 🎨 Creative Concept
ARTIX is designed as a **digital universe**, not just a website. The experience is centered around a persistent 3D environment that evolves as the user journeys through the studio's narrative.

### Design Philosophy
- **Cinematic Immersion**: High-contrast lighting, deep blacks, and monochromatic accents create a premium, mysterious atmosphere.
- **Motion-First**: Every interaction is intentional. We use a combination of smooth scrolling (Lenis), scroll-driven 3D transformations (GSAP), and micro-interactions (Framer Motion).
- **Technical Brutalism**: Monospace fonts and grid systems juxtaposed with fluid 3D organic shapes (the AI core).

---

## 🧠 UX Flow Map
1. **Arrival (Hero)**: User is greeted by the "AI Core" and a bold mission statement. The core reacts to mouse movement, establishing interactivity immediately.
2. **Narrative (About)**: As the user scrolls, the camera dives deeper into the scene. Text reveals character-by-character, mimicking a cinematic intro.
3. **Expertise (Capabilities)**: Interactive glass cards showcase services. Hovering triggers 3D tilt and glow effects.
4. **Showcase (Work)**: A horizontal scroll transition breaks the vertical rhythm, focusing the user's attention on high-fidelity visual case studies.
5. **Experimentation (The Lab)**: A custom GLSL shader plane appears, reacting to mouse proximity with distortion and chromatic aberration.
6. **Conversion (CTA)**: Massive typography and a liquid-distortion button invite the user to start a project.

---

## ⚙️ Technical Architecture
- **Framework**: React 18 + Vite (for lightning-fast HMR and build times).
- **3D Engine**: `@react-three/fiber` & `@react-three/drei`.
- **Animation Engine**: `GSAP` (ScrollTrigger) for complex scroll-sync and `Framer Motion` for UI-level transitions.
- **Smooth Scroll**: `Lenis` for consistent, high-performance scrolling across all browsers.
- **Styling**: `Tailwind CSS` for rapid, utility-first layout and theme management.
- **Shaders**: Custom GLSL via `shaderMaterial` for high-performance visual effects.

---

## 📂 Folder Structure
```text
/src
  /components
    CustomCursor.tsx   # Magnetic cursor logic
    Scene3D.tsx        # Main WebGL scene orchestration
    LabShader.tsx      # Custom GLSL distortion plane
  /lib
    utils.ts           # Tailwind merging & helper functions
  App.tsx              # Main entry point & scroll orchestration
  index.css            # Global theme & grain overlay
  main.tsx             # React root
```

---

## 🎬 Animation Logic
- **Scroll Velocity Mapping**: Lenis provides smooth delta values that we map to 3D rotations and camera positions.
- **Easing Standards**: We use `[0.22, 1, 0.36, 1]` (Quintic Out) for most UI transitions to ensure a "premium" feel.
- **Depth Scaling**: Objects in the 3D scene scale and move at different rates relative to scroll to create a parallax depth illusion.

---

## 🚀 Performance Checklist
- [x] **Lazy Loading**: 3D components are modular.
- [x] **Frame Rate Optimization**: `useFrame` is used for all 3D updates to sync with the browser's refresh rate.
- [x] **Shader Efficiency**: GLSL code is kept minimal to ensure compatibility with mid-range GPUs.
- [x] **Asset Compression**: Use `.webp` for images and compressed `.glb` for 3D models (if any).
- [x] **Event Throttling**: Scroll and mouse events are handled via Motion Values or GSAP to avoid main-thread blocking.

---

## 🌐 Deployment Recommendations
- **Edge Hosting**: Deploy to Vercel or Netlify for global low-latency.
- **CDN**: Use a CDN for all high-fidelity images to ensure fast initial loads.
- **Fallback**: For devices without WebGL support, the app gracefully degrades to a high-contrast static layout.
