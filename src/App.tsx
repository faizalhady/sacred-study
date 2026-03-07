import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { BottomTabBar } from "@/components/BottomTabBar";
import AuthScreen from "./pages/AuthScreen";
import HomeFeed from "./pages/HomeFeed";
import LearnScreen from "./pages/LearnScreen";
import ELibrary from "./pages/ELibrary";
import VideoPlayer from "./pages/VideoPlayer";
import ReaderScreen from "./pages/ReaderScreen";
import ProfileScreen from "./pages/ProfileScreen";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="max-w-lg mx-auto min-h-screen relative">
          <Routes>
            <Route path="/" element={<AuthScreen />} />
            <Route path="/home" element={<HomeFeed />} />
            <Route path="/learn" element={<LearnScreen />} />
            <Route path="/learn/:subjectId" element={<LearnScreen />} />
            <Route path="/library" element={<ELibrary />} />
            <Route path="/video/:id" element={<VideoPlayer />} />
            <Route path="/reader/:id" element={<ReaderScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <BottomTabBar />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
