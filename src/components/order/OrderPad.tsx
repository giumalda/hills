import { useState } from "react";
import { Minus, Plus, Trash2, X, MessageCircle, Clock } from "lucide-react";
import { useOrder } from "./OrderProvider";

/** Post-it style order pad, docked on the side (desktop) or as a sheet (mobile). */
export function OrderPad() {
  const { lines, add, remove, clear, total, count, open, setOpen } = useOrder();
  const [guests, setGuests] = useState(1);
  const [pickupTime, setPickupTime] = useState("20:30");

  // Calcolo dinamico: (Costo dei piatti) + (Coperti * 2 euro)
  const copertoCosto = guests * 2.0;
  const totalWithCoperto = total + copertoCosto;

  // Costruisce il messaggio per WhatsApp
  const handleWhatsAppOrder = () => {
    const phoneNumber = "393332968401"; // Inserisci il numero reale di Hill's Burger se diverso
    const itemsText =
      lines.length > 0
        ? lines.map((l) => `• ${l.qty}x ${l.name} — € ${(l.price * l.qty).toFixed(2)}`).join("\n")
        : "Nessun piatto selezionato";

    const message = `🍔 *NUOVO ORDINE DA RITIRO IN NEGOZIO* — Hill's Burger & Chips\n\n` +
      `🕒 *Orario ritiro:* ${pickupTime}\n` +
      `👥 *Persone (coperto €2.00/uno):* ${guests} (tavolo/coperto: € ${copertoCosto.toFixed(2)})\n\n` +
      `🛒 *Riepilogo Piatti:*\n${itemsText}\n\n` +
      `ℹ️ _Note: Le bibite si calcolano a parte._\n` +
      `💰 *TOTALE ESTIMATIVO:* € ${totalWithCoperto.toFixed(2)}`;

    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

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
        className={`fixed z-[80] flex max-h-[88vh] flex-col transition-all duration-300 bg-[#fef39e] p-5 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)] border border-[#e6dc85] rounded-sm rounded-br-3xl ${
          open ? "translate-x-0 translate-y-0" : "translate-y-[130%] md:translate-x-[130%] md:translate-y-0"
        } inset-x-3 bottom-3 md:inset-x-auto md:bottom-auto md:right-8 md:top-20 md:w-[350px] md:rotate-2`}
      >
        <div className="flex items-start justify-between gap-2 border-b-2 border-dashed border-ink/20 pb-3">
          <div>
            <h2 className="font-display text-2xl uppercase leading-none text-ink">
              Il mio ordine
            </h2>
            <p className="mt-1 text-xs font-semibold text-ink/60">
              {count === 0 ? "Blocchetto vuoto" : `${count} pezzi segnati`}
            </p>
            <p className="mt-1 text-[10px] font-bold uppercase text-primary">
              * Le bibite si calcolano a parte
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

        <div className="-mr-1 flex-1 overflow-y-auto py-3 pr-1">
          {lines.length === 0 ? (
            <p className="py-6 text-center text-sm font-medium text-ink/60">
              Premi <span className="font-bold">Aggiungi</span> su un panino e finirà qui,
              come sul blocchetto del cameriere.
            </p>
          ) : (
            <ul className="space-y-2">
              {lines.map((l) => (
                <li
                  key={l.name}
                  className="flex items-center justify-between gap-2 border-b border-ink/5 py-1.5 last:border-0"
                >
                  <span className="flex-1 text-xs font-semibold leading-tight text-ink line-clamp-1">
                    {l.name}
                  </span>

                  <div className="flex items-center gap-2 shrink-0">
                    {/* Tasti compatti +/- */}
                    <div className="flex items-center gap-1 rounded-full border border-ink/15 bg-white/60 px-1.5 py-0.5 shadow-2xs">
                      <button
                        type="button"
                        onClick={() => remove(l.name)}
                        className="rounded-full p-0.5 text-ink/70 hover:bg-ink/10 hover:text-primary transition-colors"
                        aria-label={`Rimuovi un ${l.name}`}
                      >
                        <Minus className="size-3" />
                      </button>
                      <span className="font-display text-xs font-bold w-4 text-center text-ink">
                        {l.qty}
                      </span>
                      <button
                        type="button"
                        onClick={() => add(l.name, l.price)}
                        className="rounded-full p-0.5 text-ink/70 hover:bg-ink/10 hover:text-primary transition-colors"
                        aria-label={`Aggiungi un ${l.name}`}
                      >
                        <Plus className="size-3" />
                      </button>
                    </div>

                    <span className="w-14 text-right text-xs font-bold tabular-nums text-ink">
                      € {(l.price * l.qty).toFixed(2)}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="border-t-2 border-dashed border-ink/20 pt-3">
          {/* Orario ritiro */}
          <div className="mb-2.5 flex items-center justify-between rounded-xl bg-ink/5 px-3 py-2">
            <div className="flex items-center gap-1.5 text-ink">
              <Clock className="size-3.5 text-primary" />
              <span className="font-display text-xs uppercase">Ritiro ore</span>
            </div>
            <input
              type="time"
              value={pickupTime}
              onChange={(e) => setPickupTime(e.target.value)}
              className="rounded-lg border border-ink/15 bg-white/80 px-2 py-1 font-display text-xs font-bold text-ink focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          {/* Sezione Coperto (Gestione Persone) */}
          <div className="mb-2.5 flex items-center justify-between rounded-xl bg-ink/5 px-3 py-2">
            <div className="flex flex-col">
              <span className="font-display text-xs uppercase text-ink">Persone (Ritiro/Tavolo)</span>
              <span className="text-[10px] font-semibold text-ink/60">Coperto € 2,00 / p.</span>
            </div>
            
            <div className="flex items-center gap-2 rounded-full border border-ink/10 bg-white/60 px-2 py-0.5 shadow-2xs">
              <button
                type="button"
                onClick={() => setGuests(Math.max(1, guests - 1))}
                className="rounded-full p-0.5 text-ink/70 hover:bg-ink/10 hover:text-primary transition-colors disabled:opacity-30"
                disabled={guests <= 1}
              >
                <Minus className="size-3" />
              </button>
              <span className="font-display text-xs font-bold w-3 text-center text-ink">{guests}</span>
              <button
                type="button"
                onClick={() => setGuests(guests + 1)}
                className="rounded-full p-0.5 text-ink/70 hover:bg-ink/10 hover:text-primary transition-colors"
              >
                <Plus className="size-3" />
              </button>
            </div>
          </div>

          {/* Totale Finale */}
          <div className="flex items-baseline justify-between font-display text-xl uppercase text-ink">
            <span>Totale</span>
            <span className="text-primary tabular-nums">€ {totalWithCoperto.toFixed(2)}</span>
          </div>

          <div className="mt-3 flex gap-2">
            <button
              type="button"
              onClick={handleWhatsAppOrder}
              disabled={lines.length === 0}
              className="flex-1 flex items-center justify-center gap-1.5 rounded-full bg-[#25D366] px-4 py-2.5 text-center font-display text-xs uppercase text-white shadow-sm transition-transform hover:scale-[1.03] disabled:opacity-50"
            >
              <MessageCircle className="size-4" />
              Invia su WhatsApp
            </button>
            <button
              type="button"
              onClick={() => {
                clear();
                setGuests(1);
              }}
              className="rounded-full border-2 border-ink/20 p-2 text-ink/60 hover:border-primary hover:text-primary transition-colors"
              aria-label="Svuota l'ordine"
            >
              <Trash2 className="size-3.5" />
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
