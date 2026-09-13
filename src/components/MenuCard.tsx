import { Plus } from "lucide-react";
import type { MenuItem } from "@/data/menu";
import { useOrder } from "./order/OrderProvider";

export function MenuCard({ item, index = 0 }: { item: MenuItem; index?: number }) {
  const { add, setOpen } = useOrder();
  const short = item.name.split(" ")[0] ?? item.name;

  return (
    <article
      className="reveal glass-card group relative flex flex-col overflow-hidden rounded-3xl p-5"
      style={{ transitionDelay: `${(index % 6) * 60}ms` }}
    >
      <div className="flex items-center gap-2">
        {item.n !== undefined ? (
          <span className="glass-chip flex size-8 items-center justify-center rounded-full font-display text-sm text-ink">
            {item.n}
          </span>
        ) : null}
        <h3 className="font-display text-xl uppercase leading-tight text-ink">
          {item.name}
        </h3>
      </div>

      {item.tag ? (
        <span className="mt-2 inline-block self-start rounded-full bg-primary/12 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-primary">
          {item.tag}
        </span>
      ) : null}

      <p className="mt-3 flex-1 text-sm font-medium leading-relaxed text-ink/70">{item.desc}</p>

      <div className="mt-5 flex items-center justify-between gap-3">
        <span className="font-display text-2xl text-ink tabular-nums">
          € {item.price.toFixed(2).replace(".", ",")}
        </span>
        <button
          type="button"
          onClick={() => {
            add(item.name, item.price);
            setOpen(true);
          }}
          className="flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 font-display text-sm uppercase text-sun transition-all hover:bg-primary hover:text-primary-foreground active:scale-95"
        >
          <Plus className="size-4" />
          {short.length <= 10 ? short : "Aggiungi"}
        </button>
      </div>
    </article>
  );
}
