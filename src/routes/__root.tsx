import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  useLocation,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { MapPin, Phone, Clock } from "lucide-react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { OrderPad } from "../components/order/OrderPad";
import { OrderProvider } from "../components/order/OrderProvider";
import { SiteNav } from "../components/SiteNav";
import { WhatsAppFab } from "../components/WhatsAppFab";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Pagina non trovata</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          La pagina che cerchi non esiste o è stata spostata.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Torna alla home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          Errore di caricamento
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Qualcosa è andato storto. Riprova o torna alla home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Riprova
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Torna alla home
          </a>
        </div>
      </div>
    </div>
  );
}

function SiteFooter() {
  const location = useLocation();
  if (location.pathname === "/contatti") return null;

  return (
    <footer className="w-full border-t border-ink/10 bg-paper/80 px-4 py-10 text-ink/75 md:px-6">
      <div className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-2 md:grid-cols-3">
        <div>
          <p className="font-display text-lg uppercase text-ink">Hill's Burger & Chips</p>
          <p className="mt-2 text-sm">
            Il regno del panino fatto come comanda la griglia. A Mottola (TA) da sempre.
          </p>
        </div>
        <div>
          <p className="font-display text-base uppercase text-ink">Dove e quando</p>
          <ul className="mt-2 space-y-1.5 text-sm">
            <li className="flex items-center gap-2">
              <MapPin className="size-4 shrink-0 text-primary" />
              Corso Vittorio Emanuele, Mottola (TA)
            </li>
            <li className="flex items-center gap-2">
              <Clock className="size-4 shrink-0 text-primary" />
              Mar–Dom: 18:00 – 00:30
            </li>
          </ul>
        </div>
        <div>
          <p className="font-display text-base uppercase text-ink">Contatti Rapidi</p>
          <ul className="mt-2 space-y-1.5 text-sm">
            <li className="flex items-center gap-2">
              <Phone className="size-4 shrink-0 text-primary" />
              <a href="tel:+393332968401" className="hover:underline">
                +39 333 296 8401
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-8 max-w-6xl border-t border-ink/10 pt-6 text-center text-xs text-ink/50">
        © {new Date().getFullYear()} Hill's Burger. Tutti i diritti riservati.
      </div>
    </footer>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" },
      { title: "Hill's Burger" },
      { name: "apple-mobile-web-app-title", content: "Hill's Burger" },
      { name: "application-name", content: "Hill's Burger" },
      {
        name: "description",
        content: "Hill's Burger: panini, combo e special burger in stile Springfield a Mottola (TA).",
      },
      { name: "theme-color", content: "#fef39e" },
      { name: "apple-mobile-web-app-capable", content: "yes" },
      { name: "mobile-web-app-capable", content: "yes" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Baloo+2:wght@600;700;800&family=Poppins:wght@400;500;600;800&display=swap",
      },
      { rel: "manifest", href: "/manifest-v2.json" },
      { rel: "apple-touch-icon", href: "/logo-192.png" },
      { rel: "icon", href: "/logo.png", type: "image/png" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <OrderProvider>
        <div className="relative min-h-screen bg-sun text-ink selection:bg-primary selection:text-primary-foreground">
          {/* Overlay texture stile puntinato carta/fumetto */}
          <div
            className="fixed inset-0 pointer-events-none z-0"
            style={{
              backgroundImage: `radial-gradient(rgba(45, 27, 14, 0.12) 1px, transparent 1px)`,
              backgroundSize: "20px 20px",
            }}
          />
          <div className="relative z-10 flex min-h-screen flex-col">
            <SiteNav />
            <div className="flex-1">
              <Outlet />
            </div>
            <SiteFooter />
            <OrderPad />
            <WhatsAppFab />
          </div>
        </div>
      </OrderProvider>
    </QueryClientProvider>
  );
}

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="it">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <title>Hill's Burger</title>
        <meta name="apple-mobile-web-app-title" content="Hill's Burger" />
        <meta name="application-name" content="Hill's Burger" />
        <meta name="theme-color" content="#fef39e" />
        <link rel="stylesheet" href={appCss} />
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}
