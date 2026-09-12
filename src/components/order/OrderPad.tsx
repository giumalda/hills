import { Minus, Trash2, X } from "lucide-react";
import { useOrder } from "./OrderProvider";

/** Post-it style order pad, docked on the side (desktop) or as a sheet (mobile). */
export function OrderPad() {
  const { lines, remove, clear, total, count, open, setOpen } = useOrder();

  return (
    <>
      {open ? (
        <button
          type="button"
          aria-label="Chiudi il blocco ordini"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[70] bg-ink/30 backdrop-blur-sm"
        />
      ) : null}

      <aside
        aria-label="Il tuo ordine"
        className={`postit fixed z-[80] flex max-h-[80vh] flex-col transition-transform duration-300 ${
          open ? "translate-x-0 translate-y-0" : "translate-y-[130%] md:translate-x-[130%] md:translate-y-0"
        } inset-x-3 bottom-3 md:inset-x-auto md:bottom-auto md:right-5 md:top-24 md:w-80`}
      >
        <div className="flex items-start justify-between gap-2 border-b-2 border-dashed border-ink/30 pb-3">
          <div>
            <h2 className="font-display text-2xl uppercase leading-none text-ink">
              Il mio ordine
            </h2>
            <p className="text-xs font-semibold text-ink/60">
              {count === 0 ? "Blocchetto vuoto" : `${count} pezzi segnati`}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="rounded-full p-1.5 text-ink/70 hover:bg-ink/10"
            aria-label="Chiudi"
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="-mr-1 flex-1 overflow-y-auto py-3 pr-1">
          {lines.length === 0 ? (
            <p className="py-6 text-center text-sm font-medium text-ink/60">
              Premi <span className="font-bold">Aggiungi</span> su un panino e finirà qui,
              come sul blocchetto del cameriere.
            </p>
          ) : (
            <ul className="space-y-2">
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
                    className="rounded-full p-1 text-ink/50 hover:bg-ink/10 hover:text-primary"
                    aria-label={`Togli un ${l.name}`}
                  >
                    <Minus className="size-4" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="border-t-2 border-dashed border-ink/30 pt-3">
          <div className="flex items-baseline justify-between font-display text-xl uppercase text-ink">
            <span>Totale</span>
            <span className="text-primary tabular-nums">€ {total.toFixed(2)}</span>
          </div>
          <p className="mt-1 text-[11px] font-medium text-ink/55">
            Coperto € 2,00 escluso. Aggiunte e varianti a parte.
          </p>
          <div className="mt-3 flex gap-2">
            <a
              href="tel:+393332968401"
              className="flex-1 rounded-full bg-ink px-4 py-2.5 text-center font-display text-sm uppercase text-sun transition-transform hover:scale-[1.03]"
            >
              Chiama subito
            </a>
            <button
              type="button"
              onClick={clear}
              className="rounded-full border-2 border-ink/20 p-2.5 text-ink/60 hover:border-primary hover:text-primary"
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
