import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, User, Lock, Eye, EyeOff, Check } from "lucide-react";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type SettingsTab = "account" | "password";

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const [tab, setTab] = useState<SettingsTab>("account");
  const [username, setUsername] = useState("Student User");
  const [email, setEmail] = useState("student@example.com");
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 1000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-foreground/40 z-50 lg:left-64"
            onClick={onClose}
          />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-card rounded-t-3xl max-h-[85vh] overflow-hidden flex flex-col lg:max-w-lg lg:mx-auto"
          >
            {/* Handle */}
            <div className="flex justify-center pt-3 pb-1 flex-shrink-0">
              <div className="w-10 h-1 rounded-full bg-muted" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-5 pb-3 flex-shrink-0">
              <h3 className="text-base font-semibold text-card-foreground">
                Settings
              </h3>
              <button
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-muted"
              >
                <X size={18} className="text-muted-foreground" />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 px-5 mb-4 flex-shrink-0">
              {(
                [
                  { key: "account" as SettingsTab, label: "Account", icon: User },
                  { key: "password" as SettingsTab, label: "Password", icon: Lock },
                ] as const
              ).map((t) => (
                <button
                  key={t.key}
                  onClick={() => setTab(t.key)}
                  className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    tab === t.key
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  <t.icon size={12} />
                  {t.label}
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="px-5 pb-8 overflow-y-auto flex-1">
              {tab === "account" && (
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
                      Display Name
                    </label>
                    <input
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full bg-muted text-foreground text-sm rounded-xl px-3.5 py-2.5 outline-none focus:ring-2 focus:ring-primary/30 border border-border"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-muted text-foreground text-sm rounded-xl px-3.5 py-2.5 outline-none focus:ring-2 focus:ring-primary/30 border border-border"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
                      Bio
                    </label>
                    <textarea
                      placeholder="Tell us about yourself..."
                      rows={3}
                      className="w-full bg-muted text-foreground text-sm rounded-xl px-3.5 py-2.5 outline-none focus:ring-2 focus:ring-primary/30 border border-border resize-none placeholder:text-muted-foreground"
                    />
                  </div>
                </div>
              )}

              {tab === "password" && (
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
                      Current Password
                    </label>
                    <div className="relative">
                      <input
                        type={showCurrent ? "text" : "password"}
                        value={currentPw}
                        onChange={(e) => setCurrentPw(e.target.value)}
                        placeholder="••••••••"
                        className="w-full bg-muted text-foreground text-sm rounded-xl px-3.5 py-2.5 pr-10 outline-none focus:ring-2 focus:ring-primary/30 border border-border placeholder:text-muted-foreground"
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrent(!showCurrent)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                      >
                        {showCurrent ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
                      New Password
                    </label>
                    <div className="relative">
                      <input
                        type={showNew ? "text" : "password"}
                        value={newPw}
                        onChange={(e) => setNewPw(e.target.value)}
                        placeholder="••••••••"
                        className="w-full bg-muted text-foreground text-sm rounded-xl px-3.5 py-2.5 pr-10 outline-none focus:ring-2 focus:ring-primary/30 border border-border placeholder:text-muted-foreground"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNew(!showNew)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                      >
                        {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      value={confirmPw}
                      onChange={(e) => setConfirmPw(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-muted text-foreground text-sm rounded-xl px-3.5 py-2.5 outline-none focus:ring-2 focus:ring-primary/30 border border-border placeholder:text-muted-foreground"
                    />
                    {newPw && confirmPw && newPw !== confirmPw && (
                      <p className="text-xs text-destructive mt-1">
                        Passwords do not match
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Save button */}
              <button
                onClick={handleSave}
                disabled={
                  tab === "password" &&
                  (!currentPw || !newPw || newPw !== confirmPw)
                }
                className="w-full mt-6 bg-primary text-primary-foreground font-semibold rounded-xl py-3 text-sm flex items-center justify-center gap-2 disabled:opacity-40 transition-opacity"
              >
                {saved ? (
                  <>
                    <Check size={16} />
                    Saved!
                  </>
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
