import supabase from '../../utils/supabaseClient'; // Supabase-Client importieren
import { calculateScore } from '../../utils/scoringUtils';  // Die Berechnungsfunktion importieren

// API-Routen-Handler
export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            // Anbieter-Daten aus der Tabelle "Anbieterinfo" abrufen
            const { data: anbieter, error: anbieterError } = await supabase
                .from('Anbieterinfo')
                .select('*');

            if (anbieterError) {
                return res.status(500).json({ error: 'Fehler beim Abrufen der Anbieter-Daten.' });
            }

            // Kurs-Daten aus der Tabelle "KursDetails" abrufen
            const { data: kurse, error: kurseError } = await supabase
                .from('KursDetails')
                .select('*');

            if (kurseError) {
                return res.status(500).json({ error: 'Fehler beim Abrufen der Kurs-Daten.' });
            }

            // Punktzahlen berechnen
            const scoredProviders = anbieter.map(provider => {
                // Suche passende Kurs-Details für den Anbieter
                const kursDetails = kurse.find(kurs => kurs.ID === provider.ID);
                
                if (kursDetails) {
                    // Füge die Kurs-Details dem Anbieter hinzu
                    provider = { ...provider, ...kursDetails };
                }

                // Berechne den Score
                provider.score = calculateScore(provider);
                return provider;
            });

            // Erfolgreiche Antwort mit den berechneten Daten
            res.status(200).json(scoredProviders);
        } catch (err) {
            res.status(500).json({ error: 'Ein unerwarteter Fehler ist aufgetreten.', details: err.message });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
