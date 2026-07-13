import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  LayoutDashboard,
  Settings,
  Users,
  ArrowRight,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { validateLoginForm, getApiErrorMessage } from "../../utils/validators";

const FLOATING_ICONS = [
  { Icon: LayoutDashboard, top: "12%", left: "18%", delay: "0s", size: 26 },
  { Icon: Settings, top: "68%", left: "12%", delay: "0.8s", size: 22 },
  { Icon: ShieldCheck, top: "22%", left: "78%", delay: "1.4s", size: 28 },
  { Icon: Users, top: "74%", left: "72%", delay: "0.4s", size: 22 },
];

function AdminLogin() {
  const navigate = useNavigate();
  const { login, logout } = useAuth(); 

  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });

  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field) => (e) => {
    const value = e.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));

    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
    if (apiError) setApiError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    const validationErrors = validateLoginForm(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setApiError("");
    setIsSubmitting(true);

    try {
      // Server sets an httpOnly cookie on success and returns the user object
      const res = await login({ email: form.email, password: form.password });

      // Role check happens client-side after the cookie is set — if the
      // account isn't an admin, immediately clear the session again.
      if (res?.user?.role?.toLowerCase() !== "admin") {
        await logout();
        setApiError("This account does not have admin access.");
        return;
      }

      navigate("/admin/dashboard");
    } catch (err) {
      setApiError(getApiErrorMessage(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  const fieldClasses = (field) =>
    [
      "w-full rounded-xl border bg-white py-2.5 pl-10 pr-3 text-sm text-[#2B3327]",
      "placeholder:text-[#AAB4A3] focus:outline-none focus:ring-4",
      errors[field]
        ? "border-[#C0524A] focus:border-[#C0524A] focus:ring-[#C0524A]/15"
        : "border-[#DCE5D6] focus:border-[#648855] focus:ring-[#648855]/15",
    ].join(" ");

  return (
    <div className="flex min-h-screen w-full bg-white">
      <style>{`
        @keyframes blobFloat {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(20px, -25px) scale(1.06); }
          66% { transform: translate(-15px, 15px) scale(0.96); }
        }
        @keyframes iconFloat {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-14px) rotate(4deg); }
        }
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-blob { animation: blobFloat 9s ease-in-out infinite; }
        .animate-icon-float { animation: iconFloat 5s ease-in-out infinite; }
        .animate-fade-slide { animation: fadeSlideIn 0.45s ease-out; }
      `}</style>

      {/* Left — brand / illustration panel */}
      <div className="relative hidden w-1/2 items-center justify-center overflow-hidden bg-[#648855] lg:flex">
        <svg
          className="absolute -left-24 -top-20 h-96 w-96 animate-blob text-[#557248] opacity-70"
          style={{ animationDelay: "0s" }}
          viewBox="0 0 200 200"
          fill="currentColor"
        >
          <path
            d="M45.3,-58.5C58.6,-49.7,69.2,-35.7,73.4,-19.9C77.6,-4.2,75.4,13.4,67.5,28.1C59.6,42.9,46,54.7,30.6,62.1C15.2,69.6,-1.9,72.6,-18.5,69.1C-35.1,65.6,-51.1,55.6,-61.8,41.2C-72.5,26.9,-77.8,8.2,-74.9,-9.1C-72,-26.4,-60.9,-42.4,-46.5,-51.4C-32.1,-60.5,-16.1,-62.7,0.7,-63.6C17.4,-64.6,34.9,-64.3,45.3,-58.5Z"
            transform="translate(100 100)"
          />
        </svg>
        <svg
          className="absolute -bottom-24 -right-16 h-[28rem] w-[28rem] animate-blob text-[#729764] opacity-60"
          style={{ animationDelay: "3s" }}
          viewBox="0 0 200 200"
          fill="currentColor"
        >
          <path
            d="M42.8,-55.6C54.3,-47.4,61.2,-32.1,64.8,-16C68.4,0.1,68.7,17,62.1,30.9C55.6,44.8,42.2,55.7,27.1,62.3C12.1,68.9,-4.7,71.2,-20.6,67.4C-36.5,63.6,-51.6,53.7,-60.9,39.6C-70.1,25.5,-73.5,7.2,-70.5,-9.6C-67.5,-26.4,-58.1,-41.7,-45.1,-50C-32.1,-58.3,-16.1,-59.6,0.4,-60.2C16.9,-60.8,33.4,-63.8,42.8,-55.6Z"
            transform="translate(100 100)"
          />
        </svg>

        {FLOATING_ICONS.map(({ Icon, top, left, delay, size }, i) => (
          <div
            key={i}
            className="absolute animate-icon-float rounded-2xl bg-white/15 p-3 backdrop-blur-sm"
            style={{ top, left, animationDelay: delay }}
          >
            <Icon size={size} className="text-white" strokeWidth={1.8} />
          </div>
        ))}

        <div className="relative z-10 max-w-sm px-10 text-center text-white">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-sm">
            <ShieldCheck size={30} strokeWidth={1.8} />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Console</h1>
          <p className="mt-3 text-sm leading-relaxed text-white/85">
            Manage events, users, and platform settings from one secure
            dashboard.
          </p>

          <div className="mt-10 flex items-center justify-center gap-2 text-xs text-white/70">
            <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
            Access is restricted to authorized administrators
          </div>
        </div>
      </div>

      {/* Right — form panel */}
      <div className="flex w-full items-center justify-center px-6 py-12 sm:px-10 lg:w-1/2">
        <div className="w-full max-w-sm">
          <div className="mb-8 flex items-center gap-2.5 lg:hidden">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#648855]">
              <ShieldCheck size={18} className="text-white" />
            </div>
            <span className="text-xl font-bold text-[#2B3327]">
              Admin Console
            </span>
          </div>

          <div className="animate-fade-slide">
            <h2 className="text-2xl font-bold text-[#2B3327]">Admin sign in</h2>
            <p className="mt-1.5 text-sm text-[#6B7566]">
              Sign in with your administrator credentials to continue.
            </p>

            {apiError && (
              <div className="mt-5 flex items-start gap-2 rounded-xl border border-[#F1C6C1] bg-[#FDF1EF] px-3.5 py-3 text-sm text-[#A83F37]">
                <AlertCircle size={16} className="mt-0.5 shrink-0" />
                <span>{apiError}</span>
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              noValidate
              className="mt-7 flex flex-col gap-4"
            >
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-[#4F6D44]">
                  Email address
                </label>
                <div className="relative">
                  <Mail
                    size={17}
                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9AAB90]"
                  />
                  <input
                    type="email"
                    value={form.email}
                    onChange={handleChange("email")}
                    placeholder="admin@example.com"
                    disabled={isSubmitting}
                    aria-invalid={!!errors.email}
                    autoComplete="username"
                    className={fieldClasses("email")}
                  />
                </div>
                {errors.email && (
                  <p className="mt-1.5 text-xs font-medium text-[#C0524A]">
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <div className="mb-1.5 flex items-center justify-between">
                  <label className="block text-xs font-semibold text-[#4F6D44]">
                    Password
                  </label>
                  <button
                    type="button"
                    className="text-xs font-medium text-[#648855] hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <Lock
                    size={17}
                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9AAB90]"
                  />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={handleChange("password")}
                    placeholder="••••••••"
                    disabled={isSubmitting}
                    aria-invalid={!!errors.password}
                    autoComplete="current-password"
                    className={fieldClasses("password").replace(
                      "pr-3",
                      "pr-10",
                    )}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    tabIndex={-1}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#9AAB90] hover:text-[#648855]"
                  >
                    {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1.5 text-xs font-medium text-[#C0524A]">
                    {errors.password}
                  </p>
                )}
              </div>

              <label className="mt-1 flex items-center gap-2 text-sm text-[#4F6D44]">
                <input
                  type="checkbox"
                  disabled={isSubmitting}
                  className="h-4 w-4 rounded border-[#DCE5D6] text-[#648855] focus:ring-[#648855]"
                />
                Remember me for 30 days
              </label>

              <button
                type="submit"
                disabled={isSubmitting}
                aria-busy={isSubmitting}
                className="group mt-2 flex items-center justify-center gap-2 rounded-xl bg-[#648855] py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#557248] hover:shadow-md active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:bg-[#648855] disabled:active:scale-100"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Logging in...
                  </>
                ) : (
                  <>
                    Log in
                    <ArrowRight
                      size={16}
                      className="transition-transform duration-200 group-hover:translate-x-1"
                    />
                  </>
                )}
              </button>
            </form>

            <p className="mt-6 text-center text-xs text-[#8B9884]">
              Protected admin area · Access is logged and monitored
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;