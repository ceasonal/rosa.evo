import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; 
import supabase from '../assets/config/SupabaseClient.js';

const ProductDetails = () => {
    const { id } = useParams();
    console.log(useParams())
    const [productDetails, setProductDetails] = useState(null);

    useEffect(() => {
        const fetchProductDetails = async () => {
            if (!id) {
                console.error("Product ID is undefined");
                return;
            }

            const { data, error } = await supabase
                .from('DisplayProducts')
                .select('*')
                .eq('id', id)
                .single();

            if (error) {
                console.error(error);
            }
            if (data) {
                setProductDetails(data);
            }
        };

        fetchProductDetails();
    }, [id]);

    return (
        <>
            {productDetails && (
                <>
                    <h1>{productDetails.name}</h1>
                    <p>{productDetails.price}</p>
                    <p>{productDetails.image}</p>
                </>
            )}
        </>
    );
}

export default ProductDetails;
