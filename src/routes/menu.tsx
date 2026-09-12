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
  { id: "allergeni", label: "Allergeni" },
] as const;

function MenuPage() {
  useReveal();
  const [tab, setTab] = useState<(typeof tabs)[number]["id"]>("burger");

  return (
    <main className="relative min-h-screen overflow-hidden bg-sun pb-32 pt-28">
      <div className="blob blob-a" aria-hidden="true" />
      <div className="blob blob-b" aria-hidden="true" />

      <div className="relative mx-auto max-w-6xl px-4 md:px-6">
        <header className="text-center">
          <h1 className="font-display text-4xl uppercase text-paper text-stroke-ink md:text-6xl">
            Il Menu
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm font-semibold text-ink/75 md:text-base">
            Numeri originali della carta. Le immagini sono a scopo illustrativo. *prodotto a
            temperatura -20°. Coperto € 2,00, aggiunte e varianti calcolate a parte.
          </p>
        </header>

        <div className="glass sticky top-20 z-30 mx-auto mt-8 flex w-full max-w-2xl gap-1 overflow-x-auto rounded-full p-1.5">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={`whitespace-nowrap rounded-full px-4 py-2.5 font-display text-sm uppercase transition-colors md:text-base ${
                tab === t.id ? "bg-ink text-sun" : "text-ink/70 hover:bg-paper/60"
              }`}
            >
              {t.label}
            </button>
          ))}
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
                {allergeni.map(([n, text]) => (
                  <li key={n} className="flex gap-3">
                    <span className="glass-chip flex size-7 shrink-0 items-center justify-center rounded-full font-display text-xs text-ink">
                      {n}
                    </span>
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
