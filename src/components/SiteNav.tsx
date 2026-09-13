import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Receipt } from "lucide-react";
import { useOrder } from "./order/OrderProvider";
import logoBlack from "@/assets/logoblack.png";

const links = [
  { to: "/", label: "Home" },
  { to: "/menu", label: "Menu" },
  { to: "/recensioni", label: "Recensioni" },
  { to: "/contatti", label: "Contatti" },
  { to: "/lavora-con-noi", label: "Lavora con noi" },
] as const;

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const { total, count, setOpen: setOrderOpen } = useOrder();

  const coperto = count > 0 ? 2 : 0;
  const grandTotal = total + coperto;

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-6 md:pt-5">
        <nav className="glass mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-full px-4 py-2.5 md:px-6">
          <Link to="/" className="flex items-center gap-2.5">
            <img
              src={logoBlack}
              alt="Hill's Burger"
              className="size-9 rounded-xl object-cover shadow-sm md:size-10"
            />
            <span className="font-display text-lg uppercase leading-none tracking-tight text-ink md:text-xl">
              Hill&apos;s Burger
            </span>
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                activeOptions={{ exact: l.to === "/" }}
                className="rounded-full px-4 py-2 text-sm font-semibold text-ink/70 transition-colors hover:bg-paper/60 hover:text-ink data-[status=active]:bg-ink data-[status=active]:text-sun"
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setOrderOpen(true)}
              className="glass-chip flex items-center gap-2 rounded-full px-3.5 py-2 text-sm font-bold text-ink"
              aria-label="Apri il blocco ordini"
            >
              <Receipt className="size-4" />
              <span className="tabular-nums">
                {count > 0 ? `€ ${grandTotal.toFixed(2)} + bibite` : "€ 0,00"}
              </span>
            </button>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="glass-chip rounded-full p-2.5 text-ink md:hidden"
              aria-label="Apri il menu di navigazione"
            >
              <Menu className="size-5" />
            </button>
          </div>
        </nav>
      </header>

      {open ? (
        <div className="fixed inset-0 z-[60] flex flex-col bg-ink/40 backdrop-blur-2xl md:hidden">
          <div className="flex justify-end p-5">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="glass-chip rounded-full p-3 text-ink"
              aria-label="Chiudi il menu"
            >
              <X className="size-5" />
            </button>
          </div>
          <div className="flex flex-1 flex-col justify-center gap-4 px-6 pb-24">
            {links.map((l, i) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="glass block rounded-3xl px-6 py-5 font-display text-3xl uppercase text-ink"
                style={{ animation: `spring-in .5s ${i * 0.06}s cubic-bezier(.34,1.56,.64,1) both` }}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
}
