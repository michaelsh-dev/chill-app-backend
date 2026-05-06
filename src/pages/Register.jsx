import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import bgDaftar from "../assets/brand/bg-daftar.png";
import logo from "../assets/brand/logo.png";
import googleLogo from "../assets/brand/logo-google.png";

export default function Register() {
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);

  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (!fullname || !username || !email || !password || !confirmPassword) {
      setError("Semua field wajib diisi");
      return;
    }

    if (password !== confirmPassword) {
      setError("Konfirmasi password tidak cocok");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          fullname,
          username,
          email,
          password
        })
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Register gagal");
        return;
      }

      alert("Register berhasil, silakan login");
      navigate("/");
    } catch (err) {
      setError("Gagal terhubung ke server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="page" style={{ ["--bg"]: `url(${bgDaftar})` }}>
      <div className="overlay"></div>

      <section className="card">
        <div className="brand">
          <img src={logo} alt="Chill" className="brand__logo" />
        </div>

        <h1 className="title">Daftar</h1>
        <p className="subtitle">Selamat datang!</p>

        <form className="form" onSubmit={handleRegister}>
          <label className="field">
            <span className="label">Nama Lengkap</span>
            <input
              className="input"
              placeholder="Masukkan nama lengkap"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
            />
          </label>

          <label className="field">
            <span className="label">Username</span>
            <input
              className="input"
              placeholder="Masukkan username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>

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
              type={show1 ? "text" : "password"}
              placeholder="Masukkan kata sandi"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label className="pwToggle">
              <input
                type="checkbox"
                checked={show1}
                onChange={(e) => setShow1(e.target.checked)}
              />
              Tampilkan kata sandi
            </label>
          </label>

          <label className="field">
            <span className="label">Konfirmasi Kata Sandi</span>
            <input
              className="input"
              type={show2 ? "text" : "password"}
              placeholder="Masukkan kata sandi"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <label className="pwToggle">
              <input
                type="checkbox"
                checked={show2}
                onChange={(e) => setShow2(e.target.checked)}
              />
              Tampilkan kata sandi
            </label>
          </label>

          {error && (
            <p style={{ color: "#ff6b6b", fontSize: "13px" }}>
              {error}
            </p>
          )}

          <div className="row row--single">
            <Link className="link" to="/">
              Sudah punya akun? <b>Masuk</b>
            </Link>
          </div>

          <button className="btnPrimary" disabled={loading}>
            {loading ? "Memproses..." : "Daftar"}
          </button>

          <div className="divider"><span>Atau</span></div>

          <button className="btnGhost" type="button">
            <img src={googleLogo} className="gIcon" />
            Daftar dengan Google
          </button>
        </form>
      </section>
    </main>
  );
}