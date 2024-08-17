import React, { useEffect } from 'react';
import useProductStore from '../store/ProductStore'; // Use the hook to access the store
import { useParams } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import ProductList from '../components/product/ProductList';

const ProductByBrand = () => {
    const { id } = useParams();
    const { ListByBrandRequest, isListByBrandLoaded, isHydrated } = useProductStore(state => ({
        ListByBrandRequest: state.ListByBrandRequest,
        isListByBrandLoaded: state.isListByBrandLoaded, // Use the specific flag
        isHydrated: state.isHydrated,
    }));

    useEffect(() => {
        (async () => {
            if (isHydrated) {
                await ListByBrandRequest(id); // Make the request whenever `id` changes
            }
        })();
    }, [ListByBrandRequest, isHydrated, id]);

    return (
        <Layout>
            <ProductList />
        </Layout>
    );
};

export default ProductByBrand;
