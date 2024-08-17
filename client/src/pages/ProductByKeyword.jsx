import React, { useEffect } from 'react';
import ProductStore from '../store/ProductStore';
import { useParams } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import ProductList from '../components/product/ProductList';

const ProductByKeyword = () => {
    const { ListByKeywordRequest, isHydrated } = ProductStore(state => ({
        ListByKeywordRequest: state.ListByKeywordRequest,
        isHydrated: state.isHydrated,
    }));

    const { keyword } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            if (isHydrated) {
                console.log('Component re-rendered with keyword:', keyword);
                await ListByKeywordRequest(keyword);
            }
        };

        fetchData();
    }, [keyword, ListByKeywordRequest, isHydrated]);

    return (
        <Layout>
            <ProductList />
        </Layout>
    );
};

export default ProductByKeyword;
