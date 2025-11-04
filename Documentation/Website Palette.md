# 🎨 Portfolio Design System

This document defines the **color palettes**, **typography hierarchy**, and **usage guidelines** for your personal developer portfolio website.  
It ensures consistency, accessibility, and modern aesthetics across both **Light** and **Dark** modes.

---

## 🌞 Light Mode Palette

| Role | Hex Code | Description |
|------|-----------|-------------|
| **Background** | `#ECECF1` | Primary background for app and pages |
| **Surface / Card** | `#FFFFFF` | Elevated cards, modals, or sections |
| **Surface Hover** | `#F6F6F9` | Hovered card or button states |
| **Divider / Border** | `#DADAE0` | Subtle separation between elements |
| **Shadow Tint / Overlay** | `rgba(0,0,0,0.08)` | Used for shadows and overlays |

### **Text Colors**

| Role | Hex Code | Description |
|------|-----------|-------------|
| **Primary Text** | `#0E0E16` | Main headings, readable body text |
| **Secondary Text** | `#5B5B66` | Subtext, secondary labels |
| **Tertiary / Disabled Text** | `#9C9CA6` | Low-priority or disabled elements |
| **Text on Accent** | `#FFFFFF` | Text shown over accent backgrounds |

### **Accent Colors**

| Role | Hex Code | Description |
|------|-----------|-------------|
| **Primary Accent** | `#3D5AFE` | Primary brand color, links, CTAs |
| **Accent Hover** | `#304FFE` | Hover state for buttons and links |
| **Accent Subtle Background** | `#E7E9FF` | Background for accent sections or tags |
| **Accent Outline** | `#B4BAFF` | Border accents for emphasis |

### **Semantic Colors**

| Meaning | Hex Code | Usage |
|----------|-----------|--------|
| **Success** | `#00C853` | Successful actions or states |
| **Warning** | `#FFB300` | Warnings, caution indicators |
| **Error** | `#D32F2F` | Errors, validation fails |
| **Info** | `#0288D1` | Informational highlights |

### **Interactive Elements**

| Element | Hex Code | Description |
|----------|-----------|-------------|
| **Link Color** | `#3D5AFE` | Links and navigation |
| **Button BG** | `#3D5AFE` | Primary call-to-action buttons |
| **Button Hover** | `#304FFE` | Hovered button state |
| **Button Text** | `#FFFFFF` | Text over buttons |
| **Input BG** | `#F9F9FB` | Form and input background |
| **Input Border** | `#D1D1D6` | Input outline border |
| **Focus Ring** | `#3D5AFE` | Focused element glow |

### **Highlight & Decorative**

| Role | Hex Code | Description |
|------|-----------|-------------|
| **Code Highlight** | `#263238` | Background for code blocks |
| **Selection BG** | `#C9D1FF` | Text selection color |
| **Scroll Thumb** | `#BFC2D1` | Scrollbar thumb |
| **Hero Gradient** | `linear-gradient(135deg, #3D5AFE, #00B0FF)` | Used in hero backgrounds |

---

## 🌚 Dark Mode Palette

| Role | Hex Code | Description |
|------|-----------|-------------|
| **Background** | `#05000F` | Primary app background |
| **Surface / Card** | `#0A0815` | Card and modal background |
| **Surface Hover** | `#100D20` | Hovered surface state |
| **Divider / Border** | `#2A273A` | Divider and low-contrast lines |
| **Shadow Tint / Overlay** | `rgba(255,255,255,0.06)` | Depth and light overlay effect |

### **Text Colors**

| Role | Hex Code | Description |
|------|-----------|-------------|
| **Primary Text** | `#F5F5F7` | Main headings and readable content |
| **Secondary Text** | `#C3C3CC` | Muted or secondary text |
| **Tertiary / Disabled** | `#777788` | Disabled or placeholder text |
| **Text on Accent** | `#FFFFFF` | Text over accent buttons and links |

### **Accent Colors**

| Role | Hex Code | Description |
|------|-----------|-------------|
| **Primary Accent** | `#7486FF` | Accent color for dark theme |
| **Accent Hover** | `#A4B1FF` | Hover and focus states |
| **Accent Subtle Background** | `#1E2145` | Subtle background for accents |
| **Accent Outline** | `#5C6CFF` | Border outlines for accent UI |

### **Semantic Colors**

| Meaning | Hex Code | Usage |
|----------|-----------|--------|
| **Success** | `#00E676` | Success and confirmation states |
| **Warning** | `#FFD54F` | Warning or cautionary states |
| **Error** | `#EF5350` | Error or danger alerts |
| **Info** | `#4FC3F7` | Informational messages |

### **Interactive Elements**

| Element | Hex Code | Description |
|----------|-----------|-------------|
| **Link Color** | `#AAB6FF` | Hyperlinks and navigation |
| **Button BG** | `#7486FF` | Main call-to-action button |
| **Button Hover** | `#A4B1FF` | Hovered button |
| **Button Text** | `#FFFFFF` | Text over buttons |
| **Input BG** | `#0F0C1D` | Background for form fields |
| **Input Border** | `#2E2A3D` | Input field outlines |
| **Focus Ring** | `#7486FF` | Keyboard focus rings |

### **Highlight & Decorative**

| Role | Hex Code | Description |
|------|-----------|-------------|
| **Code Highlight** | `#E0E0E0` | Code block background |
| **Selection BG** | `#2B3566` | Text selection highlight |
| **Scroll Thumb** | `#2F2A4B` | Scrollbar thumb color |
| **Hero Gradient** | `linear-gradient(135deg, #7486FF, #00C4FF)` | Hero backgrounds |

---

## 🧱 Elevation System

| Layer | Light Mode Shadow | Dark Mode Shadow |
|--------|--------------------|------------------|
| **Low Elevation** | `0 1px 3px rgba(0,0,0,0.08)` | `0 1px 3px rgba(255,255,255,0.04)` |
| **Medium Elevation** | `0 4px 6px rgba(0,0,0,0.10)` | `0 4px 6px rgba(0,0,0,0.25)` |
| **High Elevation** | `0 8px 16px rgba(0,0,0,0.12)` | `0 8px 16px rgba(0,0,0,0.35)` |

---

## ✒️ Typography System

### **Font Hierarchy**

| Tier | Font Family | Weight Range | Usage | Description |
|------|--------------|---------------|--------|--------------|
| **Header Font** | `Bricolage Grotesque` | `700–800` | `h1`, `h2`, hero text | Bold, geometric, creative — defines personality |
| **Subheader & Link Font** | `Figtree` | `600` | `h3`, navigation, buttons, links | Rounded geometric — friendly and approachable |
| **Body Font** | `Inter` | `400` | Paragraphs, descriptions, blogs | Neutral and readable for long-form text |

### **Import Location**

All fonts are stored in: 'Source\Frontend\Assets\Fonts'



### **Usage Notes**

- **Bricolage Grotesque**: Use for **hero titles** and section headers; pairs beautifully with subtle gradients or overlays.
- **Figtree**: Ideal for **interactive elements** (buttons, nav links) to maintain personality and warmth.
- **Inter**: Perfect for **content-heavy sections**, ensuring legibility across all devices.

---

## 📘 Summary

| Mode | Background | Text | Accent | Success | Warning | Error |
|------|-------------|------|--------|----------|----------|--------|
| **Light Mode** | `#ECECF1` | `#0E0E16` | `#3D5AFE` | `#00C853` | `#FFB300` | `#D32F2F` |
| **Dark Mode** | `#05000F` | `#F5F5F7` | `#7486FF` | `#00E676` | `#FFD54F` | `#EF5350` |

---

## ✅ Accessibility & Design Principles

- All text colors pass **WCAG AA contrast ratios**.
- Accent hues are **color-blind–safe (Deuteranopia tested)**.
- Palette aligns with **Apple’s Human Interface Guidelines** — clean, balanced, and functional.
- System supports both **light** and **dark** modes dynamically.

---

**Designed by:** Omar Abu Jafar  
**Version:** 1.0.0  
**Date:** 2025-11-03
