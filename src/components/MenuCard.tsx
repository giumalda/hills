import { useState } from "react";
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

  const nameUpper = item.name.toUpperCase();
  const descUpper = (item.desc || "").toUpperCase();
  const isMaxiTagliere = nameUpper.includes("MAXI TAGLIERE");

  const hasSizes = !isMaxiTagliere && (
    nameUpper.includes("PATATINE") || 
    nameUpper.includes("RIPPLE") || 
    nameUpper.includes("CRISS") ||
    nameUpper.includes("DIPPER") ||
    descUpper.includes("DIPPER") ||
    descUpper.includes("RIPPLE")
  );

  const [size, setSize] = useState<"piccola" | "grande">("piccola");

  const effectivePrice = hasSizes 
    ? (size === "piccola" ? 5.0 : 10.0) 
    : (typeof item.price === "number" ? item.price : parseFloat(String(item.price).replace(/[^0-9,.]/g, "").replace(",", ".")) || 0);

  const effectiveName = hasSizes 
    ? `${item.name} (${size === "piccola" ? "Piccola" : "Grande"})` 
    : item.name;

  const priceStr = `€ ${effectivePrice.toFixed(2).replace(".", ",")}`;

  return (
    <article
      className={`reveal glass-card group relative flex flex-col justify-between overflow-hidden rounded-3xl p-5 ${
        item.isChallenge ? "border-2 border-primary/70 bg-primary/5" : ""
      } ${className}`}
      style={{ transitionDelay: `${(index % 6) * 60}ms` }}
    >
      <div>
        <div className="flex items-start gap-3">
          {item.n !== undefined ? (
            <span className="glass-chip flex size-8 shrink-0 items-center justify-center rounded-full font-display text-sm text-ink mt-0.5 shadow-sm">
              {item.n}
            </span>
          ) : null}
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-display text-xl uppercase leading-tight text-ink">
                {effectiveName}
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

        {hasSizes ? (
          <div className="mt-4 flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setSize("piccola")}
              className={`rounded-full px-3 py-1 font-display text-xs uppercase transition-colors ${
                size === "piccola" ? "bg-ink text-sun shadow-sm" : "bg-paper/80 text-ink/70 hover:bg-paper"
              }`}
            >
              Piccola (5€)
            </button>
            <button
              type="button"
              onClick={() => setSize("grande")}
              className={`rounded-full px-3 py-1 font-display text-xs uppercase transition-colors ${
                size === "grande" ? "bg-ink text-sun shadow-sm" : "bg-paper/80 text-ink/70 hover:bg-paper"
              }`}
            >
              Grande (10€)
            </button>
          </div>
        ) : null}
      </div>

      <div className="mt-5 flex items-center justify-between gap-3 border-t border-ink/10 pt-4">
        <span className="font-display text-xl font-bold text-ink tabular-nums">
          {priceStr}
        </span>
        <button
          type="button"
          onClick={() => {
            add(effectiveName, effectivePrice);
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
