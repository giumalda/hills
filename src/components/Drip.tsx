/** "Melted sauce" drip divider between sections. */
export function Drip({
  color = "sauce",
  flip = false,
}: {
  color?: "sauce" | "paper" | "sun" | "night";
  flip?: boolean;
}) {
  const fill = {
    sauce: "var(--primary)",
    paper: "var(--paper)",
    sun: "var(--sun)",
    night: "var(--night)",
  }[color];

  return (
    <div
      aria-hidden="true"
      className="relative -mb-px w-full leading-none"
      style={{ transform: flip ? "rotate(180deg)" : undefined }}
    >
      <svg
        viewBox="0 0 1200 70"
        preserveAspectRatio="none"
        className="block h-[46px] w-full md:h-[64px]"
      >
        <path
          fill={fill}
          d="M0 0h1200v18c-22 0-30 22-52 22s-28-14-50-14-30 30-52 30-32-30-54-30-28 18-50 18-30-24-52-24-32 26-54 26-30-22-52-22-30 16-52 16-30-26-52-26-32 28-54 28-30-24-52-24-28 14-50 14-32-22-54-22-30 20-52 20-30-18-52-18-30 24-52 24-30-26-52-26V0z"
        />
      </svg>
    </div>
  );
}
