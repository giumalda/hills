const WA_LINK =
  "https://wa.me/393332968401?text=Ciao%20Hill's!%20Vorrei%20ordinare%20un%20panino";

/** Persistent circular WhatsApp button, always visible bottom-right. */
export function WhatsAppFab() {
  return (
    <a
      href={WA_LINK}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Scrivici su WhatsApp"
      className="fixed bottom-5 right-4 z-[95] flex size-14 items-center justify-center rounded-full bg-[#25D366] shadow-[0_10px_24px_-6px_rgba(0,0,0,.45)] ring-4 ring-paper/70 transition-transform hover:scale-110"
    >
      <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366]/40" aria-hidden="true" />
      <svg viewBox="0 0 32 32" className="relative size-8 fill-white" aria-hidden="true">
        <path d="M16.04 3.2c-7.06 0-12.8 5.73-12.8 12.79 0 2.25.59 4.45 1.71 6.39L3.2 28.8l6.6-1.73a12.78 12.78 0 0 0 6.24 1.6h.01c7.06 0 12.8-5.74 12.8-12.8 0-3.42-1.33-6.63-3.75-9.04a12.7 12.7 0 0 0-9.06-3.63Zm0 23.03h-.01a10.6 10.6 0 0 1-5.4-1.48l-.39-.23-4.02 1.05 1.08-3.92-.25-.4a10.57 10.57 0 0 1-1.62-5.65c0-5.86 4.77-10.63 10.63-10.63 2.84 0 5.5 1.11 7.5 3.12a10.55 10.55 0 0 1 3.11 7.52c0 5.86-4.77 10.62-10.63 10.62Zm5.83-7.96c-.32-.16-1.97-.97-2.27-1.08-.31-.11-.53-.17-.75.16-.22.32-.86 1.08-1.06 1.3-.19.22-.39.24-.71.08-.32-.16-1.36-.5-2.58-1.6-.96-.85-1.6-1.9-1.79-2.22-.19-.32-.02-.5.14-.66.15-.15.32-.39.48-.58.16-.19.21-.32.32-.54.11-.22.05-.4-.03-.56-.08-.16-.72-1.81-.98-2.47-.26-.65-.52-.56-.71-.57h-.64c-.22 0-.58.08-.88.4-.3.32-1.15 1.13-1.15 2.75s1.18 3.19 1.34 3.41c.16.22 2.32 3.54 5.62 4.96.79.34 1.4.54 1.88.7.8.25 1.52.22 2.09.13.64-.1 1.97-.8 2.25-1.58.28-.78.28-1.45.2-1.59-.08-.14-.29-.22-.61-.38Z" />
      </svg>
    </a>
  );
}
