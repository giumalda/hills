import { useState } from "react";
import { Minus, Plus, Trash2, X } from "lucide-react";
import { useOrder } from "./OrderProvider";

/** Post-it style order pad, docked on the side (desktop) or as a sheet (mobile). */
export function OrderPad() {
  const { lines, remove, clear, total, count, open, setOpen } = useOrder();
  const [guests, setGuests] = useState(1);

  // Calcolo dinamico: (Costo dei piatti) + (Coperti * 2 euro)
  const copertoCosto = guests * 2.0;
  const totalWithCoperto = total + copertoCosto;

  return (
    <>
      {open ? (
        <button
          type="button"
          aria-label="Chiudi il blocco ordini"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[70] bg-ink/10 backdrop-blur-[1px] transition-all"
        />
      ) : null}

      <aside
        aria-label="Il tuo ordine"
        className={`fixed z-[80] flex max-h-[85vh] flex-col transition-all duration-300 bg-[#fef39e] p-5 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)] border border-[#e6dc85] rounded-sm rounded-br-3xl ${
          open ? "translate-x-0 translate-y-0" : "translate-y-[130%] md:translate-x-[130%] md:translate-y-0"
        } inset-x-3 bottom-3 md:inset-x-auto md:bottom-auto md:right-8 md:top-24 md:w-[340px] md:rotate-2`}
      >
        <div className="flex items-start justify-between gap-2 border-b-2 border-dashed border-ink/20 pb-3">
          <div>
            <h2 className="font-display text-2xl uppercase leading-none text-ink">
              Il mio ordine
            </h2>
            <p className="mt-1 text-xs font-semibold text-ink/60">
              {count === 0 ? "Blocchetto vuoto" : `${count} pezzi segnati`}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="rounded-full p-1.5 text-ink/70 hover:bg-ink/10 transition-colors"
            aria-label="Chiudi"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="-mr-1 flex-1 overflow-y-auto py-4 pr-1">
          {lines.length === 0 ? (
            <p className="py-6 text-center text-sm font-medium text-ink/60">
              Premi <span className="font-bold">Aggiungi</span> su un panino e finirà qui,
              come sul blocchetto del cameriere.
            </p>
          ) : (
            <ul className="space-y-3">
              {lines.map((l) => (
                <li key={l.name} className="flex items-start gap-2">
                  <span className="font-display text-base text-primary">{l.qty}×</span>
                  <span className="flex-1 text-sm font-semibold leading-snug text-ink">
                    {l.name}
                  </span>
                  <span className="text-sm font-bold tabular-nums text-ink">
                    € {(l.price * l.qty).toFixed(2)}
                  </span>
                  <button
                    type="button"
                    onClick={() => remove(l.name)}
                    className="rounded-full p-1 text-ink/50 hover:bg-ink/10 hover:text-primary transition-colors"
                    aria-label={`Togli un ${l.name}`}
                  >
                    <Minus className="size-4" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="border-t-2 border-dashed border-ink/20 pt-4">
          {/* Sezione Coperto (Gestione Persone) */}
          <div className="mb-3 flex items-center justify-between rounded-xl bg-ink/5 p-2.5">
            <div className="flex flex-col">
              <span className="font-display text-sm uppercase text-ink">Persone al tavolo</span>
              <span className="text-[10px] font-semibold text-ink/60">Coperto € 2,00 a persona</span>
            </div>
            
            <div className="flex items-center gap-3 rounded-full border border-ink/10 bg-white/50 px-2 py-1 shadow-sm">
              <button
                type="button"
                onClick={() => setGuests(Math.max(1, guests - 1))}
                className="rounded-full p-1 text-ink/70 hover:bg-ink/10 hover:text-primary transition-colors disabled:opacity-30"
                disabled={guests <= 1}
              >
                <Minus className="size-3.5" />
              </button>
              <span className="font-display text-sm font-bold w-3 text-center text-ink">{guests}</span>
              <button
                type="button"
                onClick={() => setGuests(guests + 1)}
                className="rounded-full p-1 text-ink/70 hover:bg-ink/10 hover:text-primary transition-colors"
              >
                <Plus className="size-3.5" />
              </button>
            </div>
          </div>

          {/* Totale Finale */}
          <div className="flex items-baseline justify-between font-display text-2xl uppercase text-ink">
            <span>Totale</span>
            <span className="text-primary tabular-nums">€ {totalWithCoperto.toFixed(2)}</span>
          </div>

          <div className="mt-4 flex gap-2">
            <a
              href="tel:+393332968401"
              className="flex-1 rounded-full bg-ink px-4 py-2.5 text-center font-display text-sm uppercase text-sun transition-transform hover:scale-[1.03]"
            >
              Chiama subito
            </a>
            <button
              type="button"
              onClick={() => {
                clear();
                setGuests(1);
              }}
              className="rounded-full border-2 border-ink/20 p-2.5 text-ink/60 hover:border-primary hover:text-primary transition-colors"
              aria-label="Svuota l'ordine"
            >
              <Trash2 className="size-4" />
            </button>
          </div>
        </div>
      </aside>

      {!open ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="fixed bottom-5 left-4 z-[90] flex items-center gap-2 rounded-2xl border-2 border-ink bg-sun px-4 py-3 font-display text-base uppercase text-ink shadow-[0_8px_20px_-6px_rgba(0,0,0,.5)] transition-transform hover:scale-105 md:bottom-auto md:left-0 md:top-1/2 md:-translate-y-1/2 md:rounded-l-none"
        >
          Ordine
          <span className="rounded-full bg-primary px-2 py-0.5 text-sm text-primary-foreground tabular-nums">
            {count}
          </span>
        </button>
      ) : null}
    </>
  );
}
