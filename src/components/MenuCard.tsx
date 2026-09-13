import { Plus } from "lucide-react";
import type { MenuItem } from "@/data/menu";
import { useOrder } from "./order/OrderProvider";

interface MenuCardProps {
  item: MenuItem;
  index?: number;
  className?: string;
}

export function MenuCard({ item, index = 0, className = "" }: MenuCardProps) {
  const { add, setOpen } = useOrder();

  // Se il prezzo è una stringa (es. per le patatine doppie), lo stampa com'è, altrimenti lo formatta
  const priceStr =
    typeof item.price === "number"
      ? `€ ${item.price.toFixed(2).replace(".", ",")}`
      : item.price;

  // Estrae il primo numero utile per il carrello nel caso di prezzi stringa
  const numericPrice =
    typeof item.price === "number"
      ? item.price
      : parseFloat(String(item.price).replace(/[^0-9,.]/g, "").replace(",", ".")) || 0;

  return (
    <article
      className={`reveal glass-card group relative flex flex-col overflow-hidden rounded-3xl p-5 ${
        item.isChallenge ? "border-2 border-primary/70 bg-primary/5" : ""
      } ${className}`}
      style={{ transitionDelay: `${(index % 6) * 60}ms` }}
    >
      <div className="flex items-start gap-3">
        {item.n !== undefined ? (
          <span className="glass-chip flex size-8 shrink-0 items-center justify-center rounded-full font-display text-sm text-ink mt-0.5 shadow-sm">
            {item.n}
          </span>
        ) : null}
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-display text-xl uppercase leading-tight text-ink">
              {item.name}
            </h3>
            {item.tag ? (
              <span className="mt-1 inline-block rounded-full bg-primary/12 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-primary">
                {item.tag}
              </span>
            ) : null}
          </div>
          {item.desc ? (
            <p className="mt-3 text-sm font-medium leading-relaxed text-ink/75">
              {item.desc}
            </p>
          ) : null}
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between gap-3 border-t border-ink/10 pt-4">
        <span className="font-display text-xl font-bold text-ink tabular-nums">
          {priceStr}
        </span>
        <button
          type="button"
          onClick={() => {
            add(item.name, numericPrice);
            setOpen(true);
          }}
          className="group/btn relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink text-sun transition-all duration-300 hover:w-[110px] active:scale-95"
          title="Aggiungi"
        >
          <Plus className="size-5 shrink-0" />
          <span className="max-w-0 overflow-hidden whitespace-nowrap font-display text-xs uppercase transition-all duration-300 group-hover/btn:max-w-full group-hover/btn:pl-1.5 group-hover/btn:pr-3">
            Aggiungi
          </span>
        </button>
      </div>
    </article>
  );
}
