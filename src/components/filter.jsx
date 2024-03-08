import { useState, useEffect } from 'react';
import supabase  from '../assets/config/SupabaseClient';

const Filter = () => {
    const [createdAt, setCreatedAt] = useState('');
    const [earing, setEaring] = useState(false);
    const [necklace, setNecklace] = useState(false);
    const [customizable, setCustomizable] = useState(false);
    const [price, setPrice] = useState('');

        useEffect(() => {
            const fetchData = async () => {
                let query = supabase
                    .from('DisplayProducts')
                    .select('*')
                    .eq('customizable', customizable)
                    .gte('price', price)
                    .order('created_at', { ascending: createdAt === 'asc' });
    
                const { data, error } = await query;

                if (error) {
                    console.error('Error fetching data:', error);
                } else {
                    console.log('Filtered data:', data);
                    // Update your component state or do something with the filtered data
                }
            };

            fetchData();
        }, [createdAt, earing, necklace, customizable, price]);

    return (
        <div>
            <label>
                Created At:
                <select value={createdAt} onChange={(e) => setCreatedAt(e.target.value)}>
                    <option value="">All</option>
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>
            </label>
            <label>
                Earing:
                <input type="checkbox" checked={earing} onChange={(e) => setEaring(e.target.checked)} />
            </label>
            <label>
                Necklace:
                <input type="checkbox" checked={necklace} onChange={(e) => setNecklace(e.target.checked)} />
            </label>
            <label>
                Customizable:
                <input type="checkbox" checked={customizable} onChange={(e) => setCustomizable(e.target.checked)} />
            </label>
            <label>
                Price:
                <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} />
            </label>
        </div>
    );
};

export default Filter;
