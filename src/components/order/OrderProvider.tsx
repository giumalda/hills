import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type OrderLine = { name: string; price: number; qty: number };

type OrderCtx = {
  lines: OrderLine[];
  add: (name: string, price: number) => void;
  remove: (name: string) => void;
  clear: () => void;
  total: number;
  count: number;
  open: boolean;
  setOpen: (v: boolean) => void;
};

const Ctx = createContext<OrderCtx | null>(null);
const KEY = "hills-order";

export function OrderProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<OrderLine[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setLines(JSON.parse(raw));
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(lines));
    } catch {
      /* ignore */
    }
  }, [lines]);

  const add = useCallback((name: string, price: number) => {
    setLines((prev) => {
      const found = prev.find((l) => l.name === name);
      if (found) return prev.map((l) => (l.name === name ? { ...l, qty: l.qty + 1 } : l));
      return [...prev, { name, price, qty: 1 }];
    });
  }, []);

  const remove = useCallback((name: string) => {
    setLines((prev) =>
      prev.flatMap((l) =>
        l.name === name ? (l.qty > 1 ? [{ ...l, qty: l.qty - 1 }] : []) : [l],
      ),
    );
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const value = useMemo(() => {
    const total = lines.reduce((s, l) => s + l.price * l.qty, 0);
    const count = lines.reduce((s, l) => s + l.qty, 0);
    return { lines, add, remove, clear, total, count, open, setOpen };
  }, [lines, add, remove, clear, open]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useOrder() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useOrder must be used inside OrderProvider");
  return ctx;
}
