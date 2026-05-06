import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import bgLogin from "../assets/brand/bg-login.png";
import logo from "../assets/brand/logo.png";
import googleLogo from "../assets/brand/logo-google.png";

export default function Login() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Email dan kata sandi wajib diisi");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password
        })
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Login gagal");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("isLogin", "true");
      localStorage.setItem("currentUser", JSON.stringify(data.user));

      navigate("/home");
    } catch (err) {
      setError("Gagal terhubung ke server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="page" style={{ ["--bg"]: `url(${bgLogin})` }}>
      <div className="overlay"></div>

      <section className="card">
        <div className="brand">
          <img src={logo} alt="Chill" className="brand__logo" />
        </div>

        <h1 className="title">Masuk</h1>
        <p className="subtitle">Selamat datang kembali!</p>

        <form className="form" onSubmit={handleLogin}>
          <label className="field">
            <span className="label">Email</span>
            <input
              className="input"
              type="email"
              placeholder="Masukkan email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label className="field">
            <span className="label">Kata Sandi</span>
            <input
              className="input"
              type={show ? "text" : "password"}
              placeholder="Masukkan kata sandi"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <label className="pwToggle">
              <input
                type="checkbox"
                checked={show}
                onChange={(e) => setShow(e.target.checked)}
              />
              Tampilkan kata sandi
            </label>
          </label>

          {error && (
            <p style={{ color: "#ff6b6b", fontSize: "13px" }}>
              {error}
            </p>
          )}

          <div className="row">
            <Link className="link" to="/register">
              Belum punya akun? <b>Daftar</b>
            </Link>
            <a className="link" href="#">Lupa kata sandi?</a>
          </div>

          <button className="btnPrimary" type="submit" disabled={loading}>
            {loading ? "Memproses..." : "Masuk"}
          </button>

          <div className="divider"><span>Atau</span></div>

          <button className="btnGhost" type="button">
            <img src={googleLogo} className="gIcon" />
            Masuk dengan Google
          </button>
        </form>
      </section>
    </main>
  );
}