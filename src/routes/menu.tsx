import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useReveal } from "@/hooks/use-reveal";
import { MenuCard } from "@/components/MenuCard";
import { allergeni, burgers, combos, specials } from "@/data/menu";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Menu completo | Hill's Burger & Chips" },
      {
        name: "description",
        content:
          "Tutti i panini Hill's: 49 burger numerati, gli special dal 50 al 55, i menu combo a 10€ e la tabella allergeni.",
      },
      { property: "og:title", content: "Menu completo | Hill's Burger & Chips" },
      {
        property: "og:description",
        content: "Burger, special, hot dog e combo a 10€. Aggiungi i panini al tuo blocchetto.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MenuPage,
});

const tabs = [
  { id: "burger", label: "Burger" },
  { id: "special", label: "Special Burger" },
  { id: "combo", label: "Menu Combo" },
] as const;

function MenuPage() {
  useReveal();
  const [tab, setTab] = useState<string>("burger");

  return (
    <main className="relative min-h-screen overflow-hidden bg-sun pb-32 pt-28">
      <div className="blob blob-a" aria-hidden="true" />
      <div className="blob blob-b" aria-hidden="true" />

      <div className="relative mx-auto max-w-6xl px-4 md:px-6">
        <header className="text-center">
          <h1 className="font-display text-4xl uppercase text-paper text-stroke-ink md:text-6xl">
            Il Menu
          </h1>
          
          {/* Box info e costi con gerarchia visiva */}
          <div className="mx-auto mt-6 max-w-3xl rounded-2xl border border-ink/10 bg-paper/50 p-5 text-center shadow-sm">
            {/* LIVELLO 1: Regole di prezzo */}
            <p className="font-display text-lg uppercase text-ink md:text-xl">
              Coperto € 2,00
              <span className="mt-1 block font-sans text-sm font-semibold normal-case text-ink/80 md:ml-2 md:mt-0 md:inline">
                (Aggiunte e varianti calcolate a parte)
              </span>
            </p>
            
            {/* LIVELLO 2 e 3: Info tecniche */}
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

        {/* Barra categorie principali */}
        <div className="glass sticky top-20 z-30 mx-auto mt-8 flex w-full max-w-2xl gap-1 overflow-x-auto rounded-full p-1.5">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={`flex-1 whitespace-nowrap rounded-full px-4 py-2.5 font-display text-sm uppercase transition-colors md:text-base ${
                tab === t.id ? "bg-ink text-sun" : "text-ink/70 hover:bg-paper/60"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Pulsante Allergeni separato */}
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
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {burgers.map((b, i) => (
                <MenuCard key={b.name} item={b} index={i} />
              ))}
            </div>
          ) : null}

          {tab === "special" ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {specials.map((s, i) => (
                <MenuCard key={s.name} item={s} index={i} />
              ))}
            </div>
          ) : null}

          {tab === "combo" ? (
            <>
              <p className="reveal mb-8 text-center font-display text-2xl text-ink">
                Ogni menu combo costa <span className="text-primary">€ 10</span>. Tutto compreso.
              </p>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {combos.map((c, i) => (
                  <MenuCard key={c.name} item={c} index={i} />
                ))}
              </div>
            </>
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
