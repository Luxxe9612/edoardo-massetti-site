import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { onAuthStateChanged } from "firebase/auth"
import { Menu, Search, UserRound, X } from "lucide-react"
import { auth } from "../firebase"

export default function Navbar() {
  const ADMIN_EMAIL = "massetti.edoardo@libero.it"
  const [user, setUser] = useState(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const isAdmin = user?.email === ADMIN_EMAIL

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser)
    return () => unsubscribe()
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  const linkClass = (path) =>
    `fd-glass-link ${location.pathname === path ? "fd-glass-active" : ""}`

  return (
    <header className="fd-glass-header sticky top-0 z-50">
      <style>{`
        .fd-glass-header {
          background: rgba(14, 14, 16, .42);
          -webkit-backdrop-filter: blur(28px) saturate(145%);
          backdrop-filter: blur(28px) saturate(145%);
          border-bottom: 1px solid rgba(255,255,255,.13);
          box-shadow: inset 0 1px 0 rgba(255,255,255,.08), 0 10px 32px rgba(0,0,0,.12);
          isolation: isolate;
        }
        .fd-glass-header::before {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: linear-gradient(180deg,rgba(255,255,255,.065),transparent 85%);
          z-index: -1;
        }
        .fd-glass-link {
          position: relative;
          display: inline-flex;
          justify-content: center;
          align-items: center;
          min-height: 39px;
          padding: 0 16px;
          border: 1px solid transparent;
          border-radius: 9999px;
          color: rgba(255,255,255,.72);
          transition: background .22s ease, border-color .22s ease, box-shadow .22s ease, color .22s ease, transform .22s ease;
        }
        .fd-glass-link:hover, .fd-glass-link:focus-visible {
          color: #fff;
          background: rgba(255,255,255,.14);
          border-color: rgba(255,255,255,.24);
          box-shadow: inset 0 1px 0 rgba(255,255,255,.18), 0 4px 18px rgba(0,0,0,.14);
          -webkit-backdrop-filter: blur(16px);
          backdrop-filter: blur(16px);
          transform: translateY(-1px);
          outline: none;
        }
        .fd-glass-active {
          color: #fff;
          background: rgba(255,255,255,.095);
          border-color: rgba(255,255,255,.12);
          box-shadow: inset 0 1px 0 rgba(255,255,255,.10);
        }
        .fd-glass-icon {
          background: rgba(255,255,255,.055);
          border: 1px solid rgba(255,255,255,.15);
          -webkit-backdrop-filter: blur(14px);
          backdrop-filter: blur(14px);
          transition: background .2s ease, border-color .2s ease, box-shadow .2s ease;
        }
        .fd-glass-icon:hover, .fd-glass-icon:focus-visible {
          background: rgba(255,255,255,.18);
          border-color: rgba(255,255,255,.32);
          box-shadow: inset 0 1px 0 rgba(255,255,255,.16);
        }
        .fd-glass-mobile {
          background: rgba(17,17,19,.68);
          -webkit-backdrop-filter: blur(28px) saturate(140%);
          backdrop-filter: blur(28px) saturate(140%);
          border-top: 1px solid rgba(255,255,255,.12);
        }
        .fd-glass-mobile-link {
          border-radius: 13px;
          padding: 12px 14px;
          transition: background .2s ease;
        }
        .fd-glass-mobile-link:active, .fd-glass-mobile-link:focus-visible {
          background: rgba(255,255,255,.15);
          outline: none;
        }
        @media (prefers-reduced-motion: reduce) {
          .fd-glass-link, .fd-glass-icon, .fd-glass-mobile-link { transition: none; }
          .fd-glass-link:hover { transform: none; }
        }
        @supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {
          .fd-glass-header { background: rgba(15,15,16,.94); }
          .fd-glass-mobile { background: rgba(15,15,16,.97); }
        }
      `}</style>
      <div className="fd-container flex h-[74px] items-center justify-between gap-5">
        <Link to="/" className="group flex items-center gap-2.5" aria-label="FattiDiretti Home">
          <span className="grid h-8 w-8 place-items-center rounded-[9px] bg-red-600 text-[11px] font-black tracking-[-.04em] text-white shadow-[0_0_26px_rgba(220,38,38,.2)]">
            FD
          </span>
          <span className="text-[24px] font-black tracking-[-0.055em] text-white sm:text-[28px]">
            Fatti<span className="text-red-600">Diretti</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 text-[13px] font-bold md:flex">
          <Link to="/" className={linkClass("/")}>Home</Link>
          <Link to="/articles" className={linkClass("/articles")}>Articoli</Link>
          <Link to="/podcasts" className={linkClass("/podcasts")}>Podcast</Link>
          <Link to="/chi-siamo" className={linkClass("/chi-siamo")}>Chi siamo</Link>
        </nav>

        <div className="hidden items-center gap-2.5 md:flex">
          <Link
            to="/search"
            aria-label="Cerca"
            className="fd-glass-icon grid h-10 w-10 place-items-center rounded-full text-white/80"
          >
            <Search size={17} />
          </Link>

          {isAdmin && (
            <Link
              to="/admin"
              className="rounded-full border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-[11px] font-black tracking-[.08em] text-red-400 transition hover:bg-red-600 hover:text-white"
            >
              ADMIN
            </Link>
          )}

          <Link
            to={user ? "/profile" : "/login"}
            className="inline-flex min-w-[96px] items-center justify-center gap-2 rounded-full bg-red-600 px-4 py-2.5 text-xs font-black text-white shadow-[0_8px_24px_rgba(220,38,38,.16)] transition hover:bg-red-500"
          >
            <UserRound size={15} />
            <span>{user ? "Profilo" : "Accedi"}</span>
          </Link>
        </div>

        <button
          onClick={() => setMobileOpen((value) => !value)}
          className="fd-glass-icon grid h-11 w-11 place-items-center rounded-full text-white md:hidden"
          aria-label="Menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="fd-glass-mobile md:hidden">
          <div className="fd-container flex flex-col py-4 text-base font-bold text-white">
            <Link to="/" className="fd-glass-mobile-link">Home</Link>
            <Link to="/articles" className="fd-glass-mobile-link">Articoli</Link>
            <Link to="/podcasts" className="fd-glass-mobile-link">Podcast</Link>
            <Link to="/search" className="fd-glass-mobile-link">Cerca</Link>
            <Link to="/chi-siamo" className="fd-glass-mobile-link">Chi siamo</Link>
            {isAdmin && <Link to="/admin" className="fd-glass-mobile-link text-red-400">Admin</Link>}

            <Link
              to={user ? "/profile" : "/login"}
              className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-3 text-white"
            >
              <UserRound size={17} />
              {user ? "Profilo" : "Accedi"}
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
