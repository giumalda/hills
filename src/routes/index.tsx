import { useEffect } from 'react'

export default function Home() {
  
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then(() => console.log('Service Worker registrato'))
        .catch((err) => console.error('Errore Service Worker:', err));
    }
  }, []);

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold">Il Nostro Menu</h1>
      <p>Hamburger e patatine fresche.</p>
    </main>
  )
}
