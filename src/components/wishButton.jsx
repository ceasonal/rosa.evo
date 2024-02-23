import React, { useState, useEffect } from 'react';
import { IconButton } from '@mui/material';
import { Favorite } from '@mui/icons-material';
import supabase from '../assets/config/SupabaseClient';
import { useParams } from 'react-router-dom';

const WishButton = (props) => {
    const { id } = useParams();
    const [productDetails, setProductDetails] = useState(null);
    const [isInWishlist, setIsInWishlist] = useState(false);

    useEffect(() => {
        const getProductInfo = async () => {
            try {
                const { data, error } = await supabase
                    .from('DisplayProducts')
                    .select('*')
                    .eq('id', id)
                    .single();

                if (error) {
                    console.error('Error fetching product info:', error.message);
                    return null;
                }
                if (data) {
                    setProductDetails(data);
                    checkIfInWishlist(data.disp_uuid);
                }
            } catch (error) {
                console.error('Error fetching product info:', error.message);
            }
        };

        getProductInfo();
    }, [id]);

    const checkIfInWishlist = async (displayUuid) => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            const { data: wishData, error: wishError } = await supabase
            .from('wishlist')
            .select('*')
            .eq('user_uuid', user.id)
            .eq('display_uuid', displayUuid)
            .single();
            if (wishData && !wishError) {
                setIsInWishlist(true);
            } else {
                setIsInWishlist(false);
            }
        } catch (e) {
            console.error('Error checking wishlist:', e);
        }
    };

    const toggleWishlist = async () => {
        if (isInWishlist) {
            removeFromWishlist();
        } else {
            addToList();
        }
    };

    const removeFromWishlist = async () => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            await supabase
                .from('wishlist')
                .delete()
                .eq('user_uuid', user.id)
                .eq('display_uuid', productDetails.disp_uuid);
            setIsInWishlist(false);
            console.log('Removed from wishlist');
        } catch (e) {
            console.error('Error removing from wishlist:', e);
        }
    };

    const addToList = async () => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            await supabase
                .from('wishlist')
                .insert([
                    {
                        user_uuid: user.id,
                        // product_info: productDetails,
                        display_uuid: productDetails.disp_uuid
                    }
                ]);
            setIsInWishlist(true);
            console.log('Added to wishlist');
        } catch (e) {
            console.error('Error adding to wishlist:', e);
        }
    };

    return (
        <IconButton onClick={()=>{toggleWishlist(); props.onClick();}}>
            <Favorite sx={{color: isInWishlist ? '#957461' : 'rgb(0,0,0,0.3)'}} />
        </IconButton>
    );
};

export default WishButton;
