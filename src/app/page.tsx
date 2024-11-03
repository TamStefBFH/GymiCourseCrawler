import { useState, useEffect } from "react";

interface Provider {
  Name: string;
  Standort: string;
  Qualitaetsbewertung: number;
  Nachholmoeglichkeiten: boolean;
  score?: number;
}

export default function Home() {
  const [providers, setProviders] = useState<Provider[]>([]);

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const res = await fetch("/api/providers");
        if (!res.ok) throw new Error("Fehler beim Abrufen der Anbieter-Daten.");
        const data: Provider[] = await res.json();
        setProviders(data);
      } catch (err) {
        console.error((err as Error).message);
      }
    };

    fetchProviders();
  }, []);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1>Willkommen zur Gymi-Vergleichsanwendung!</h1>
        <p>Diese Seite zeigt Anbieter für Gymi-Vorbereitungskurse und deren Details.</p>

        <div className="provider-list">
          {providers.length === 0 ? (
            <p>Keine Daten verfügbar...</p>
          ) : (
            providers.map((provider, index) => (
              <div key={index} className="provider-card border p-4 rounded-md shadow-md mb-4 w-full sm:w-2/3">
                <h3 className="text-lg font-bold">{provider.Name}</h3>
                <p><strong>Preis-Leistungs-Verhältnis:</strong> {provider.score}</p>
                <p><strong>Standort:</strong> {provider.Standort}</p>
                <p><strong>Qualitätsbewertung:</strong> {provider.Qualitaetsbewertung}</p>
                <p><strong>Nachholmöglichkeiten:</strong> {provider.Nachholmoeglichkeiten ? 'Ja' : 'Nein'}</p>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
