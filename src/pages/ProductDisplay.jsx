import React, { useEffect, useState } from 'react';
import supabase from '../assets/config/SupabaseClient.js';

const ProductDetails = () => {
    const [productDetails, setProductDetails] = useState(null);
    
    useEffect(() => {
        const fetchProductDetails = async () => {
            const { data, error } = await supabase
                .from('DisplayProducts')
                .select('*')
                .eq('id', productDetails.id) 
                .single();
    
            if (error) {
                console.error(error);
            }
            if (data) {
                setProductDetails(data);
            }
        };
        fetchProductDetails();
    }, [productDetails]);
    
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
