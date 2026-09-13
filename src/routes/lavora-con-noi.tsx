import { createFileRoute, Link } from "@tanstack/react-router";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { BriefcaseBusiness, CheckCircle2, Loader2, Upload } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useReveal } from "@/hooks/use-reveal";

export const Route = createFileRoute("/lavora-con-noi")({
  head: () => ({
    meta: [
      { title: "Lavora con noi | Hill's Burger & Chips" },
      {
        name: "description",
        content:
          "Vuoi entrare nella squadra di Hill's Burger & Chips a Mottola (TA)? Invia la tua candidatura: griglia, cucina, sala e consegne.",
      },
      { property: "og:title", content: "Lavora con noi | Hill's Burger & Chips" },
      {
        property: "og:description",
        content: "Invia la tua candidatura alla paninoteca Hill's Burger & Chips.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: JobsPage,
});

const schema = z.object({
  full_name: z.string().trim().min(2, "Inserisci nome e cognome").max(100),
  email: z.string().trim().email("Email non valida").max(255),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  role_wanted: z.string().trim().min(2, "Scegli un ruolo").max(60),
  experience: z.string().trim().max(500).optional().or(z.literal("")),
  message: z.string().trim().max(1000).optional().or(z.literal("")),
});

const roles = ["Griglia / Cucina", "Preparazione panini", "Sala e cassa", "Consegne", "Altro"];

function JobsPage() {
  useReveal();
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [cvFile, setCvFile] = useState<File | null>(null);

  const settings = useQuery({
    queryKey: ["site_settings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_settings")
        .select("hiring_open, hiring_note")
        .eq("id", "main")
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });

  const hiringOpen = settings.data?.hiring_open ?? true;

  const submit = useMutation({
    mutationFn: async (values: z.infer<typeof schema>) => {
      let cvUrl: string | null = null;

      if (cvFile) {
        const fileExt = cvFile.name.split(".").pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("cvs") // Assicurati di avere un bucket Supabase chiamato 'cvs'
          .upload(filePath, cvFile);

        if (uploadError) throw uploadError;

        const { data: publicUrlData } = supabase.storage.from("cvs").getPublicUrl(filePath);
        cvUrl = publicUrlData.publicUrl;
      }

      const { error } = await supabase.from("job_applications").insert({
        full_name: values.full_name,
        email: values.email,
        phone: values.phone || null,
        role_wanted: values.role_wanted,
        experience: values.experience || null,
        message: values.message || null,
        cv_url: cvUrl,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      setSent(true);
      toast.success("Candidatura inviata! Ti ricontattiamo presto.");
    },
    onError: () => toast.error("Invio non riuscito, riprova tra poco."),
  });

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const raw = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    const parsed = schema.safeParse(raw);
    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) next[String(issue.path[0])] = issue.message;
      setErrors(next);
      return;
    }
    setErrors({});
    submit.mutate(parsed.data);
  }

  const field =
    "mt-1 w-full rounded-2xl border border-ink/15 bg-paper/70 px-4 py-3 text-sm font-semibold text-ink outline-none transition focus:border-ink/40 focus:ring-2 focus:ring-primary/40";

  return (
    <main className="relative min-h-screen overflow-hidden bg-sun pb-32 pt-28">
      <div className="blob blob-a" aria-hidden="true" />
      <div className="blob blob-b" aria-hidden="true" />

      <div className="relative mx-auto max-w-3xl px-4 md:px-6">
        <header className="text-center">
          <span className="glass-chip inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wide text-ink">
            <BriefcaseBusiness className="size-4" /> Unisciti alla squadra
          </span>
          <h1 className="mt-4 font-display text-4xl uppercase text-paper text-stroke-ink md:text-6xl">
            Lavora con noi
          </h1>
          <div className="glass mx-auto mt-6 max-w-xl rounded-3xl p-5">
            {settings.isLoading ? (
              <p className="text-sm font-semibold text-ink/60">Verifico le posizioni aperte…</p>
            ) : hiringOpen ? (
              <>
                <p className="font-display text-xl uppercase text-ink">Stiamo cercando personale</p>
                <p className="mt-1 text-sm font-semibold text-ink/70">
                  {settings.data?.hiring_note || "Manda la tua candidatura, la leggiamo tutta."}
                </p>
              </>
            ) : (
              <>
                <p className="font-display text-xl uppercase text-ink">Squadra al completo</p>
                <p className="mt-1 text-sm font-semibold text-ink/70">
                  {settings.data?.hiring_note ||
                    "Al momento non cerchiamo personale, ma puoi lasciarci i tuoi dati per il futuro."}
                </p>
              </>
            )}
          </div>
        </header>

        {sent ? (
          <div className="glass-card mt-10 rounded-3xl p-8 text-center">
            <CheckCircle2 className="mx-auto size-12 text-primary" />
            <h2 className="mt-4 font-display text-2xl uppercase text-ink">Candidatura ricevuta</h2>
            <p className="mt-2 text-sm font-semibold text-ink/70">
              Grazie! Ti contatteremo all&apos;indirizzo che ci hai lasciato.
            </p>
            <Link
              to="/menu"
              className="mt-6 inline-block rounded-full bg-ink px-7 py-4 font-display text-lg uppercase text-sun transition-transform hover:scale-105"
            >
              Intanto guarda il menu
            </Link>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="reveal glass-card mt-10 rounded-3xl p-6 md:p-8">
            <div className="grid gap-4 md:grid-cols-2">
              <label className="block text-sm font-bold uppercase text-ink/80">
                Nome e cognome
                <input name="full_name" className={field} maxLength={100} required />
                {errors["full_name"] ? (
                  <span className="text-xs font-semibold text-primary">{errors["full_name"]}</span>
                ) : null}
              </label>
              <label className="block text-sm font-bold uppercase text-ink/80">
                Email
                <input name="email" type="email" className={field} maxLength={255} required />
                {errors["email"] ? (
                  <span className="text-xs font-semibold text-primary">{errors["email"]}</span>
                ) : null}
              </label>
              <label className="block text-sm font-bold uppercase text-ink/80">
                Telefono
                <input name="phone" className={field} maxLength={30} />
              </label>
              <label className="block text-sm font-bold uppercase text-ink/80">
                Ruolo
                <select name="role_wanted" className={field} defaultValue={roles[0]}>
                  {roles.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <label className="mt-4 block text-sm font-bold uppercase text-ink/80">
              Esperienza
              <input
                name="experience"
                className={field}
                maxLength={500}
                placeholder="Es. 2 anni in pizzeria"
              />
            </label>

            <label className="mt-4 block text-sm font-bold uppercase text-ink/80">
              Carica CV (PDF)
              <div className="mt-1 flex items-center justify-center rounded-2xl border-2 border-dashed border-ink/20 bg-paper/50 px-4 py-5 transition hover:border-ink/40">
                <label className="flex cursor-pointer items-center gap-2 text-sm font-semibold text-ink/75">
                  <Upload className="size-5 text-primary" />
                  <span>{cvFile ? cvFile.name : "Scegli file PDF (max 5MB)"}</span>
                  <input
                    type="file"
                    accept="application/pdf"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file && file.size <= 5 * 1024 * 1024) {
                        setCvFile(file);
                      } else if (file) {
                        toast.error("Il file supera i 5MB");
                      }
                    }}
                  />
                </label>
              </div>
            </label>

            <label className="mt-4 block text-sm font-bold uppercase text-ink/80">
              Messaggio
              <textarea
                name="message"
                rows={4}
                maxLength={1000}
                className={field}
                placeholder="Raccontaci qualcosa di te e le tue disponibilità"
              />
            </label>

            <button
              type="submit"
              disabled={submit.isPending}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink px-7 py-4 font-display text-lg uppercase text-sun transition-transform hover:scale-[1.02] disabled:opacity-60"
            >
              {submit.isPending ? <Loader2 className="size-5 animate-spin" /> : null}
              Invia candidatura
            </button>
            <p className="mt-3 text-center text-xs font-semibold text-ink/55">
              I dati inviati vengono usati solo per valutare la candidatura.
            </p>
          </form>
        )}
      </div>
    </main>
  );
}
