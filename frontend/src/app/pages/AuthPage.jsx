import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API = "http://localhost:3001";

export default function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState("login"); // login, register, license
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const [form, setForm] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
    name: "",
    licenseCode: "",
  });

  const [licenseInfo, setLicenseInfo] = useState(null);

  function handleChange(field, value) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  async function validateLicense() {
    if (!form.licenseCode.trim()) {
      setErrorMsg("Bitte einen Lizenzcode eingeben.");
      return;
    }

    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch(
        `${API}/auth/validate-license/${form.licenseCode.trim()}`
      );
      const data = await res.json();

      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Lizenzcode ungültig.");
      }

      setLicenseInfo(data.license);
      setSuccessMsg("Lizenzcode gültig! ✅");
    } catch (err) {
      console.error("Lizenzvalidierung Fehler:", err);
      setErrorMsg(err.message || "Lizenzcode konnte nicht validiert werden.");
      setLicenseInfo(null);
    } finally {
      setLoading(false);
    }
  }

  async function handleLogin() {
    if (!form.email || !form.password) {
      setErrorMsg("Email und Passwort sind erforderlich.");
      return;
    }

    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch(`${API}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Login fehlgeschlagen.");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/app/projects");
    } catch (err) {
      console.error("Login Fehler:", err);
      setErrorMsg(err.message || "Login fehlgeschlagen.");
    } finally {
      setLoading(false);
    }
  }

  async function handleRegister() {
    if (!form.email || !form.password || !form.passwordConfirm) {
      setErrorMsg("Alle Felder sind erforderlich.");
      return;
    }

    if (form.password !== form.passwordConfirm) {
      setErrorMsg("Passwörter stimmen nicht überein.");
      return;
    }

    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch(`${API}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
          name: form.name,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Registrierung fehlgeschlagen.");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/app/projects");
    } catch (err) {
      console.error("Registrierung Fehler:", err);
      setErrorMsg(err.message || "Registrierung fehlgeschlagen.");
    } finally {
      setLoading(false);
    }
  }

  async function handleLicenseRegister() {
    if (!form.email || !form.licenseCode || !licenseInfo) {
      setErrorMsg("Bitte alle Felder ausfüllen und Lizenzcode validieren.");
      return;
    }

    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch(`${API}/auth/register-license`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          licenseCode: form.licenseCode,
          name: form.name,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Registrierung fehlgeschlagen.");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/app/projects");
    } catch (err) {
      console.error("Lizenz-Registrierung Fehler:", err);
      setErrorMsg(err.message || "Registrierung fehlgeschlagen.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Shop Designer</h1>
          <p className="text-slate-400">KI-gestützte Shop-Personalisierung</p>
        </div>

        {/* Mode Tabs */}
        <div className="flex gap-2 mb-6 bg-slate-800 p-1 rounded-lg">
          <button
            onClick={() => {
              setMode("login");
              setErrorMsg("");
              setSuccessMsg("");
            }}
            className={`flex-1 py-2 rounded font-medium transition-colors ${
              mode === "login"
                ? "bg-blue-600 text-white"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => {
              setMode("register");
              setErrorMsg("");
              setSuccessMsg("");
            }}
            className={`flex-1 py-2 rounded font-medium transition-colors ${
              mode === "register"
                ? "bg-blue-600 text-white"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Registrieren
          </button>
          <button
            onClick={() => {
              setMode("license");
              setErrorMsg("");
              setSuccessMsg("");
            }}
            className={`flex-1 py-2 rounded font-medium transition-colors ${
              mode === "license"
                ? "bg-blue-600 text-white"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Lizenz
          </button>
        </div>

        {/* Login Form */}
        {mode === "login" && (
          <div className="bg-slate-800 rounded-lg p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Email
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Passwort
              </label>
              <input
                type="password"
                value={form.password}
                onChange={(e) => handleChange("password", e.target.value)}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                placeholder="••••••••"
              />
            </div>

            {errorMsg && (
              <div className="p-3 bg-red-500/10 border border-red-500/30 rounded text-sm text-red-200">
                {errorMsg}
              </div>
            )}

            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 text-white font-medium rounded transition-colors"
            >
              {loading ? "Wird angemeldet..." : "Anmelden"}
            </button>
          </div>
        )}

        {/* Register Form */}
        {mode === "register" && (
          <div className="bg-slate-800 rounded-lg p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Name (optional)
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                placeholder="Ihr Name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Email
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Passwort
              </label>
              <input
                type="password"
                value={form.password}
                onChange={(e) => handleChange("password", e.target.value)}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                placeholder="••••••••"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Passwort wiederholen
              </label>
              <input
                type="password"
                value={form.passwordConfirm}
                onChange={(e) => handleChange("passwordConfirm", e.target.value)}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                placeholder="••••••••"
              />
            </div>

            {errorMsg && (
              <div className="p-3 bg-red-500/10 border border-red-500/30 rounded text-sm text-red-200">
                {errorMsg}
              </div>
            )}

            <button
              onClick={handleRegister}
              disabled={loading}
              className="w-full py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 text-white font-medium rounded transition-colors"
            >
              {loading ? "Wird registriert..." : "Registrieren"}
            </button>

            <p className="text-xs text-slate-400 text-center">
              Starter Plan: 49€/Monat | Professional: 149€/Monat
            </p>
          </div>
        )}

        {/* License Form */}
        {mode === "license" && (
          <div className="bg-slate-800 rounded-lg p-6 space-y-4">
            <div className="bg-blue-500/10 border border-blue-500/30 rounded p-3 text-sm text-blue-200">
              ℹ️ Haben Sie einen Lizenzcode von Mauve? Geben Sie ihn hier ein.
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Lizenzcode
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={form.licenseCode}
                  onChange={(e) => handleChange("licenseCode", e.target.value)}
                  className="flex-1 px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  placeholder="z.B. MAUVE-XXXX-XXXX"
                />
                <button
                  onClick={validateLicense}
                  disabled={loading || !form.licenseCode}
                  className="px-4 py-2 bg-slate-700 hover:bg-slate-600 disabled:bg-slate-800 text-white rounded font-medium transition-colors"
                >
                  ✓
                </button>
              </div>
            </div>

            {licenseInfo && (
              <div className="p-3 bg-green-500/10 border border-green-500/30 rounded text-sm text-green-200">
                ✅ Plan: <strong>{licenseInfo.planName}</strong>
              </div>
            )}

            {licenseInfo && (
              <>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Name (optional)
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    placeholder="Ihr Name"
                  />
                </div>
              </>
            )}

            {errorMsg && (
              <div className="p-3 bg-red-500/10 border border-red-500/30 rounded text-sm text-red-200">
                {errorMsg}
              </div>
            )}

            {successMsg && (
              <div className="p-3 bg-green-500/10 border border-green-500/30 rounded text-sm text-green-200">
                {successMsg}
              </div>
            )}

            <button
              onClick={handleLicenseRegister}
              disabled={loading || !licenseInfo}
              className="w-full py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 text-white font-medium rounded transition-colors"
            >
              {loading ? "Wird registriert..." : "Mit Lizenz registrieren"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
