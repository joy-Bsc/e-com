import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import ProductStore from '../store/ProductStore';
import Details from '../components/product/Details';

const ProductDetails = () => {
    const {BrandList,DetailsRequest,ReviewListRequest,BrandListRequest,} = ProductStore(
        state => ({
            BrandList: state.BrandList,
            DetailsRequest: state.DetailsRequest,
            ReviewListRequest: state.ReviewListRequest,
            BrandListRequest: state.BrandListRequest,

    }));    

    const {id} = useParams();

    useEffect(() => {
        (async () => {
            await DetailsRequest(id);
            await ReviewListRequest(id);
            BrandList === null? await BrandListRequest():null;
        })();
    }, []);
    return (
        <Layout>
           <Details />
            
        </Layout>
    );
};

export default ProductDetails;