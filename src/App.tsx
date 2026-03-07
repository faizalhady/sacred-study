import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { BottomTabBar } from "@/components/BottomTabBar";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider } from "@/context/SidebarContext";
import AuthScreen from "./pages/AuthScreen";
import HomeFeed from "./pages/HomeFeed";
import LearnScreen from "./pages/LearnScreen";
import LibraryScreen from "./pages/LibraryScreen";
import BrowseScreen from "./pages/BrowseScreen";
import VideosScreen from "./pages/VideosScreen";
import TrendingScreen from "./pages/TrendingScreen";
import VideoPlayer from "./pages/VideoPlayer";
import ReaderScreen from "./pages/ReaderScreen";
import ProfileScreen from "./pages/ProfileScreen";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function MainLayout() {
  return (
    <>
      <AppSidebar />
      <div className="max-w-lg mx-auto min-h-screen relative">
        <Outlet />
        <BottomTabBar />
      </div>
    </>
  );
}

const App = () => (
  <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <SidebarProvider>
            <Routes>
              {/* Auth - no tab bar, no sidebar */}
              <Route
                path="/"
                element={
                  <div className="max-w-lg mx-auto min-h-screen">
                    <AuthScreen />
                  </div>
                }
              />

              {/* Full-screen players - no tab bar, no sidebar */}
              <Route
                path="/video/:id"
                element={
                  <div className="max-w-lg mx-auto min-h-screen">
                    <VideoPlayer />
                  </div>
                }
              />
              <Route
                path="/reader/:id"
                element={
                  <div className="max-w-lg mx-auto min-h-screen">
                    <ReaderScreen />
                  </div>
                }
              />

              {/* Main app — tab bar + sidebar */}
              <Route element={<MainLayout />}>
                <Route path="/home" element={<HomeFeed />} />
                <Route path="/learn" element={<LearnScreen />} />
                <Route path="/learn/:subjectId" element={<LearnScreen />} />
                <Route path="/library" element={<LibraryScreen />} />
                <Route path="/browse" element={<BrowseScreen />} />
                <Route path="/videos" element={<VideosScreen />} />
                <Route path="/trending" element={<TrendingScreen />} />
                <Route path="/profile" element={<ProfileScreen />} />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
          </SidebarProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
