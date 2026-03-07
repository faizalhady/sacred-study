# ============================================================
# Sacred Study — Session Git Commits (Part 2)
# Run this from the project root:
#   cd C:\Users\Admin\Desktop\cs\sacred-study
#   .\commit-session-part2.ps1
# ============================================================

Set-Location "C:\Users\Admin\Desktop\cs\sacred-study"

# ── 1. Navigation & Library Refactor ─────────────────────────────────────────
git add src/components/BottomTabBar.tsx src/pages/LibraryScreen.tsx
git rm src/pages/ELibrary.tsx --ignore-unmatch

$msg1 = @'
refactor(navigation): replace ELibrary with new LibraryScreen and update BottomTabBar

- Deleted legacy ELibrary.tsx
- Added new LibraryScreen.tsx component
- Updated BottomTabBar to route to the new LibraryScreen instead of the old one
'@
git commit -m $msg1

# ── 2. New Main Screens ──────────────────────────────────────────────────────
git add src/pages/BrowseScreen.tsx src/pages/TrendingScreen.tsx src/pages/VideosScreen.tsx

$msg2 = @'
feat(screens): add Browse, Trending, and Videos screens

- Introduced BrowseScreen for exploring content categories
- Introduced TrendingScreen for popular content discovery
- Introduced VideosScreen for video-specific media playback and browsing
'@
git commit -m $msg2

# ── 3. Context & Data Layer ──────────────────────────────────────────────────
git add src/context/ src/data/mockData.ts src/hooks/useAppData.ts

$msg3 = @'
feat(data): implement new app context, update mock data and hooks

- Added new global state management inside src/context/
- Updated mockData.ts to support the new data structures for Browse/Trending/Videos
- Refactored useAppData.ts hook to interface with the updated context and mock data
'@
git commit -m $msg3

# ── 4. Components & Styles ───────────────────────────────────────────────────
git add src/App.css src/components/FeedCard.tsx src/components/SpotifyRow.tsx src/components/SettingsModal.tsx

$msg4 = @'
feat(components): add SettingsModal and update UI components

- Created new SettingsModal.tsx for user preferences
- Updated FeedCard.tsx and SpotifyRow.tsx to align with the new design system
- Adjusted global styles in App.css to support new layout requirements
'@
git commit -m $msg4

# ── 5. Existing Pages Overhaul ───────────────────────────────────────────────
git add src/pages/HomeFeed.tsx src/pages/LearnScreen.tsx src/pages/ProfileScreen.tsx src/pages/ReaderScreen.tsx src/pages/VideoPlayer.tsx

$msg5 = @'
refactor(pages): update existing screens to integrate new features

- HomeFeed.tsx: Updated feed layout and data fetching
- LearnScreen.tsx: General UI and structural improvements
- ProfileScreen.tsx: Integrated new SettingsModal trigger and layout fixes
- ReaderScreen.tsx & VideoPlayer.tsx: Media playback and reading view refinements
'@
git commit -m $msg5

# ── 6. Dev Tools / Scripts ───────────────────────────────────────────────────
git add commit-session.ps1

$msg6 = @'
chore: save PowerShell commit automation scripts

- Added commit-session.ps1 to source control for future automated, batched Git commits
'@
git commit -m $msg6

# ── Done ──────────────────────────────────────────────────────────────────────
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  All 6 remaining commits created successfully!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
git log --oneline -6
git status