import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight, Flame } from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";
import { MenuCard } from "@/components/MenuCard";
import {
  allergeni,
  burgers,
  combos,
  specials,
  piadine,
  fritture,
  piattiCarne,
  insalate,
  type MenuItem,
} from "../data/menu";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Menu completo | Hill's Burger & Chips" },
      {
        name: "description",
        content:
          "Tutti i panini Hill's: burger numerati, gli special, i menu combo a 10€, piadine, fritture, piatti di carne e insalate.",
      },
    ],
  }),
  component: MenuPage,
});

const tabs = [
  { id: "burger", label: "Burger" },
  { id: "special", label: "Special Burger" },
  { id: "combo", label: "Menu Combo" },
  { id: "piadine", label: "Piadine" },
  { id: "fritture", label: "Fritture & Chips" },
  { id: "carne", label: "Piatti di carne" },
  { id: "insalate", label: "Insalate" },
] as const;

function MenuPage() {
  useReveal();
  const [tab, setTab] = useState<string>("burger");
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollTabs = (direction: "left" | "right") => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -180 : 180,
        behavior: "smooth",
      });
    }
  };

  const specialsItems: MenuItem[] = specials.map((s, i) => ({
    n: 1 + i,
    name: s.name,
    desc: "ingredients" in s ? (s as any).ingredients : (s as any).desc,
    price: s.price,
  }));

  const piadineItems: MenuItem[] = piadine.map((p, i) => ({
    n: i + 1,
    name: p.name,
    desc: p.ingredients,
    price: p.price,
  }));

  let fCount = 1;
  const frittureNormali: MenuItem[] = fritture.items.map((str) => {
    const match = str.match(/\(/);
    const name = match ? str.substring(0, match.index).trim() : str;
    const desc = match ? str.substring(match.index).trim() : "";
    return { n: fCount++, name, desc, price: 6.0 };
  });

  const chipsItems: MenuItem[] = fritture.chips.map((chip) => {
    let name = chip.name;
    const upper = name.toUpperCase();
    if (upper.includes("DIPPER") && (upper.includes("CHEDDAR") || upper.includes("BACON"))) {
      name = "Dippers C&B";
    }
    const match = name.match(/\(/);
    const mainName = match ? name.substring(0, match.index).trim() : name;
    const desc = match ? name.substring(match.index).trim() : "Porzione croccante";
    return { n: fCount++, name: mainName, desc, price: 5.0 };
  });

  const maxiTagliereAlette: Omit<MenuItem, "n"> & { n?: number } = {
    name: "MAXI TAGLIERE ALETTE SPEZIATE FRITTE + CHIPS",
    desc: "20 pz",
    price: 25.0,
  };

  const carneItems: MenuItem[] = piattiCarne.map((c, i) => {
    let mainName = c.name;
    let desc = "";
    const match = c.name.match(/( 150g| 200g| 250g| 300| 600g|\(| \+ | CONDITA CON )/i);
    if (match) {
      mainName = c.name.substring(0, match.index).trim();
      desc = c.name.substring(match.index).trim();
      if (desc.startsWith("+")) desc = desc.substring(1).trim();
    }
    return { n: i + 1, name: mainName, desc, price: c.price };
  });

  const insalateItems: MenuItem[] = insalate.map((ins, i) => ({
    n: 1 + i,
    name: "INSALATA",
    desc: ins.ingredients,
    price: ins.price,
  }));

  return (
    <main
      className="relative min-h-screen overflow-hidden bg-sun pb-32 pt-28"
      style={{
        backgroundImage: `radial-gradient(rgba(30, 20, 10, 0.08) 1px, transparent 1px)`,
        backgroundSize: "16px 16px",
      }}
    >
      <div className="blob blob-a" aria-hidden="true" />
      <div className="blob blob-b" aria-hidden="true" />

      <div className="relative mx-auto max-w-6xl px-4 md:px-6">
        <header className="text-center">
          <h1 className="font-display text-4xl uppercase text-paper text-stroke-ink md:text-6xl">
            Il Menu
          </h1>

          <div className="mx-auto mt-6 max-w-3xl rounded-2xl border border-ink/10 bg-paper/50 p-5 text-center shadow-sm">
            <p className="font-display text-lg uppercase text-ink md:text-xl">
              Coperto € 2,00
              <span className="mt-1 block font-sans text-sm font-semibold normal-case text-ink/80 md:ml-2 md:mt-0 md:inline">
                (Aggiunte e varianti calcolate a parte)
              </span>
            </p>
            <div className="mt-3 flex flex-col gap-0.5">
              <p className="text-sm font-medium text-ink/70">
                Numeri originali della carta.
              </p>
              <p className="text-xs text-ink/50">
                *prodotto a temperatura -20°.
              </p>
            </div>
          </div>
        </header>

        <div className="sticky top-20 z-30 mx-auto mt-8 flex w-full max-w-lg items-center gap-1.5 px-2">
          <button
            type="button"
            onClick={() => scrollTabs("left")}
            aria-label="Scorri sinistra"
            className="glass flex size-8 shrink-0 items-center justify-center rounded-full text-ink transition-transform hover:scale-105 active:scale-95"
          >
            <ChevronLeft className="size-4" />
          </button>

          <div
            ref={scrollRef}
            className="glass flex flex-1 items-center gap-1 overflow-x-auto rounded-full p-1 scrollbar-none"
          >
            {tabs.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                className={`whitespace-nowrap rounded-full px-3 py-1.5 font-display text-xs uppercase transition-colors md:text-sm ${
                  tab === t.id
                    ? "bg-ink text-sun shadow-sm"
                    : "text-ink/70 hover:bg-paper/60"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => scrollTabs("right")}
            aria-label="Scorri destra"
            className="glass flex size-8 shrink-0 items-center justify-center rounded-full text-ink transition-transform hover:scale-105 active:scale-95"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>

        <div className="relative z-30 mt-4 flex justify-center">
          <button
            type="button"
            onClick={() => setTab("allergeni")}
            className={`rounded-full border-2 px-6 py-2 font-display text-sm uppercase transition-colors md:text-base ${
              tab === "allergeni"
                ? "border-ink bg-ink text-sun"
                : "border-ink/20 text-ink/70 hover:border-ink hover:text-ink"
            }`}
          >
            Tabella Allergeni
          </button>
        </div>

        <div className="mt-10">
          {tab === "burger" ? (
            <div className="space-y-6">
              <div className="glass-card reveal rounded-3xl border-2 border-primary/70 p-6">
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                  <div className="flex items-start sm:items-center gap-4">
                    <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm">
                      <Flame className="size-6" />
                    </div>
                    <div>
                      <span className="inline-block rounded-full bg-primary/15 px-3 py-1 font-display text-xs uppercase text-primary font-bold">
                        Challenge · N. 49 Big Simpson
                      </span>
                      <h3 className="mt-1 font-display text-xl uppercase text-ink">
                        Il Panino Sfida Hill&apos;s
                      </h3>
                      <p className="mt-1 text-sm font-semibold text-ink/75">
                        Chiudi la griglia in 20 minuti o non lo paghi. Porzioni da record, zero scuse.
                      </p>
                    </div>
                  </div>
                  <div className="shrink-0 rounded-full bg-primary/20 border border-primary/40 px-5 py-2.5 font-display text-xs uppercase text-primary font-bold shadow-sm">
                    N. 49 in basso ↓
                  </div>
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 [&>*]:flex [&>*]:flex-col [&>*]:justify-between">
                {burgers.map((b, i) => (
                  <MenuCard
                    key={b.name}
                    item={b}
                    index={i}
                    className={b.n === 49 ? "sm:col-span-2 lg:col-span-3" : ""}
                  />
                ))}
              </div>
            </div>
          ) : null}

          {tab === "special" ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 [&>*]:flex [&>*]:flex-col [&>*]:justify-between">
              {specialsItems.map((s, i) => (
                <MenuCard key={`${s.name}-${i}`} item={s} index={i} />
              ))}
            </div>
          ) : null}

          {tab === "combo" ? (
            <>
              <p className="reveal mb-8 text-center font-display text-2xl text-ink">
                Ogni menu combo costa <span className="text-primary">€ 10</span>. Tutto compreso.
              </p>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 [&>*]:flex [&>*]:flex-col [&>*]:justify-between">
                {combos.map((c, i) => (
                  <MenuCard key={c.name} item={c} index={i} />
                ))}
              </div>
            </>
          ) : null}

          {tab === "piadine" ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 [&>*]:flex [&>*]:flex-col [&>*]:justify-between">
              {piadineItems.map((p, i) => (
                <MenuCard key={p.name} item={p} index={i} />
              ))}
            </div>
          ) : null}

          {tab === "fritture" ? (
            <div className="space-y-12">
              <div>
                <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-primary">
                  Speciale in evidenza
                </h3>
                <div className="max-w-md">
                  <MenuCard
                    item={maxiTagliereAlette as MenuItem}
                    index={0}
                    className="border-2 border-primary bg-primary/5"
                  />
                </div>
              </div>

              <div>
                <div className="mb-4 flex items-center justify-between px-1">
                  <span className="text-xs font-semibold uppercase text-ink/60">
                    {fritture.note.replace(" (-20°C)", "")}
                  </span>
                </div>
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 [&>*]:flex [&>*]:flex-col [&>*]:justify-between">
                  {frittureNormali.map((f, i) => (
                    <MenuCard key={`${f.name}-${i}`} item={f} index={i} />
                  ))}
                </div>
              </div>

              <div className="my-8 h-px w-full bg-ink/15" />

              <div>
                <h3 className="mb-4 font-display text-lg uppercase text-ink">Patatine & Chips</h3>
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 [&>*]:flex [&>*]:flex-col [&>*]:justify-between">
                  {chipsItems.map((c, i) => (
                    <MenuCard key={`chip-${c.name}-${i}`} item={c} index={i} />
                  ))}
                </div>
              </div>
            </div>
          ) : null}

          {tab === "carne" ? (
            <div className="grid gap-5 sm:grid-cols-2 [&>*]:flex [&>*]:flex-col [&>*]:justify-between">
              {carneItems.map((c, i) => (
                <MenuCard key={`${c.name}-${i}`} item={c} index={i} />
              ))}
            </div>
          ) : null}

          {tab === "insalate" ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 [&>*]:flex [&>*]:flex-col [&>*]:justify-between">
              {insalateItems.map((ins, i) => (
                <MenuCard key={`insalata-${ins.name}-${i}`} item={ins} index={i} />
              ))}
            </div>
          ) : null}

          {tab === "allergeni" ? (
            <div id="allergeni" className="glass-card reveal rounded-3xl p-6 md:p-8">
              <h2 className="font-display text-2xl uppercase text-ink">Tabella allergeni</h2>
              <ul className="mt-5 grid gap-3 md:grid-cols-2">
                {allergeni.map(([, text], i) => (
                  <li key={i} className="flex items-center gap-3">
                    <span className="size-2 shrink-0 rounded-full bg-primary" />
                    <span className="text-sm font-medium text-ink/75">{text}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </div>
    </main>
  );
}
