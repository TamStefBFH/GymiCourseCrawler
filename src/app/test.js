import { useEffect, useState } from 'react';
import supabase from '../utils/supabaseClient'; // Stelle sicher, dass der Pfad korrekt ist

const Test = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const { data, error } = await supabase
                .from('your_table_name') // Ersetze 'your_table_name' mit dem tatsächlichen Tabellennamen
                .select('*');

            if (error) {
                setError(error);
            } else {
                setData(data);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1>Supabase Test</h1>
            {error && <p>Error: {error.message}</p>}
            {data ? (
                <pre>{JSON.stringify(data, null, 2)}</pre>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Test;


