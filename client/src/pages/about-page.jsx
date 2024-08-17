import React, { useEffect } from 'react';
import FeatureStore from '../store/FeatureStore';
import Layout from '../components/layout/Layout';
import LegalContents from '../components/features/LegalContents';

const AboutPage = () => {
    const {LegalDetailsRequest} = FeatureStore();

    useEffect(() => {
        (async () => {
            await LegalDetailsRequest("about");
        })();
    }, []);

    return (
        <Layout>
            <LegalContents />
        </Layout>
    );
};

export default AboutPage;