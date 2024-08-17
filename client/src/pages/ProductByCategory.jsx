import React, { useEffect } from 'react';
import ProductStore from '../store/ProductStore';
import { useParams } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import ProductList from '../components/product/ProductList';
const ProductByCategory = () => {
    const {id} = useParams();
        const {ListByCategoryRequest,isListByCategoryLoaded,isHydrated} = ProductStore(state=>({
            ListByCategoryRequest:state.ListByCategoryRequest,
            isListByCategoryLoaded:state.isListByCategoryLoaded,
            isHydrated:state.isHydrated
        }));
   
    useEffect(() => {
        (async () => {
            if (isHydrated) {
                await ListByCategoryRequest(id); // Make the request whenever `id` changes
            }
        })();
    }, [ListByCategoryRequest, isHydrated, id]);
    return (
        <Layout>
           <ProductList/> 
        </Layout>
    );
    
};

export default ProductByCategory;