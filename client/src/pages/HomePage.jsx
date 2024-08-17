import React, { useEffect } from 'react';
import Layout from '../components/layout/Layout';
import ProductStore from '../store/ProductStore';
import FeatureStore from '../store/FeatureStore';
//import SliderSkeleton from '../skeleton/SliderSkeleton';
//import FeaturesSkeleton from '../skeleton/FeaturesSkeleton';
//import ProductsSkeleton from '../skeleton/ProductsSkeleton';
import Slider from './../components/product/Slider';
import Features from './../components/features/Features';
import Categories from './../components/product/Categories';
import Products from './../components/product/Products';
import Brands from './../components/product/Brands';


const HomePage = () => {
 const {BrandListRequest,CategoryListRequest,SliderListRequest,ListByRemarkRequest} = ProductStore();
 const {FeatureListRequest} = FeatureStore();

 useEffect(() => {
    (async () => {
        await BrandListRequest();
        await CategoryListRequest();
        await SliderListRequest();
        await ListByRemarkRequest('new');
        await FeatureListRequest();
    })()});

    return (
        <Layout>
           
           <Slider/>
            <Features/>
            <Categories/>
            <Products/>
            <Brands/>
            
        </Layout>
    );
};

export default HomePage;