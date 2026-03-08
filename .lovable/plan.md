

# Desktop-Responsive Layout Plan

**Goal:** Add desktop-only styles using Tailwind `lg:` breakpoints without touching any existing mobile styles. Also fix the LibraryScreen build error.

---

## Changes

### 1. Fix Build Error — `LibraryScreen.tsx` (line 24)
Widen the icon type to accept `number | string` for the `size` prop (matching Lucide's actual type). Change the `TABS` type annotation to use `React.ComponentType<any>` or `LucideIcon` from lucide-react.

### 2. `BottomTabBar.tsx` — Hide on Desktop
Add `lg:hidden` to the outermost container div so the tab bar disappears on large screens.

### 3. `AppSidebar.tsx` — Permanent Sidebar on Desktop
The current sidebar is an overlay drawer (AnimatePresence, motion). For desktop, we need a **permanently visible** sidebar. The approach:
- Add a new static `<div>` **outside** the `AnimatePresence` block that renders the same nav links but is only visible on `lg:` screens (`hidden lg:flex lg:fixed lg:inset-y-0 lg:w-64 lg:flex-col`).
- The existing mobile drawer remains untouched — it still works via hamburger toggle on mobile.
- On desktop, hide the backdrop and drawer overlay by adding `lg:hidden` to both the backdrop and the motion drawer.

### 4. `App.tsx` — `MainLayout` Content Shift
Update the `MainLayout` wrapper div:
- Current: `<div className="max-w-lg mx-auto min-h-screen relative">`
- Desktop: add `lg:ml-64 lg:max-w-5xl lg:mx-auto` so content shifts right of the fixed sidebar and expands.

### 5. `AppHeader.tsx` — Align with Content
- Add `lg:ml-64` to the sticky header's outer div so it doesn't overlap the sidebar.
- On desktop, widen the inner container: add `lg:max-w-5xl` alongside the existing `max-w-lg`.
- Hide the hamburger menu button on desktop: add `lg:hidden` to the menu button (since the sidebar is always visible).

### 6. Pages with `max-w-lg` Containers
Several pages (HomeFeed, BrowseScreen, TrendingScreen, LearnScreen, LibraryScreen, ProfileScreen, VideosScreen) have inner `max-w-lg mx-auto` containers. Add `lg:max-w-5xl` to each so content fills the wider desktop area.

---

## Files to Edit
| File | Change |
|---|---|
| `src/pages/LibraryScreen.tsx` | Fix icon type (line 24) |
| `src/components/BottomTabBar.tsx` | Add `lg:hidden` |
| `src/components/AppSidebar.tsx` | Add permanent desktop sidebar div, hide mobile drawer on `lg:` |
| `src/App.tsx` | Add `lg:ml-64 lg:max-w-5xl` to MainLayout |
| `src/components/AppHeader.tsx` | Add `lg:ml-64 lg:max-w-5xl`, hide hamburger on `lg:` |
| All page files | Add `lg:max-w-5xl` to inner containers |

No mobile styles will be altered. All changes use `lg:` prefix only.

