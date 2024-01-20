import React from 'react';
import Prodcomp from '../components/prodmini';
import Productdata from '../assets/config/prodata';
const Prod = () => {
    // Sample product data

    return (
        <>
            <h1>Product Mini Page</h1>
            <Prodcomp products={Productdata}/>
        </>
    );
};

export default Prod;
