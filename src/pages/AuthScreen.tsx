import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";

export default function AuthScreen() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/home");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm"
      >
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="w-20 h-20 rounded-3xl bg-primary mx-auto flex items-center justify-center mb-4 shadow-lg">
            <span className="text-3xl font-arabic text-primary-foreground font-bold">عِلم</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground">'Ilm Platform</h1>
          <p className="text-sm text-muted-foreground mt-1">Your path to Islamic knowledge</p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-3.5">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            className="w-full bg-muted text-foreground rounded-xl px-4 py-3.5 text-sm placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/30 border border-border"
          />
          <div className="relative">
            <input
              type={showPw ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full bg-muted text-foreground rounded-xl px-4 py-3.5 text-sm placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/30 border border-border pr-11"
            />
            <button
              type="button"
              onClick={() => setShowPw(!showPw)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            >
              {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-primary-foreground font-semibold rounded-xl py-3.5 text-sm hover:opacity-90 transition-opacity"
          >
            Sign In
          </button>
        </form>

        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px bg-border" />
          <span className="text-xs text-muted-foreground">or</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        <button
          onClick={() => navigate("/home")}
          className="w-full bg-secondary text-secondary-foreground font-medium rounded-xl py-3.5 text-sm hover:opacity-80 transition-opacity"
        >
          Continue as Guest
        </button>

        <p className="text-center text-xs text-muted-foreground mt-6">
          Don't have an account?{" "}
          <button className="text-primary font-medium">Sign Up</button>
        </p>
      </motion.div>
    </div>
  );
}
