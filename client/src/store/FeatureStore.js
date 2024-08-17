import create from 'zustand';
import axios from 'axios';

const FeatureStore = create((set,get) => ({
    FeatureList: [], // Initialize BrandList as an empty array
    isFeatureListLoaded: false,
    FeatureListRequest: async () => {
        if (get().isFeatureListLoaded) {
            // If data is already loaded, do not make the request
            return;
        }
        try {
            let res = await axios.get(`/api/v1/FeaturesList`);
            if (res.data['status'] === 'success') {
                set({ FeatureList: res.data['data'], isFeatureListLoaded: true });
            } else {
                // Handle the case where the status is not 'success'
                console.error('Failed to fetch BrandList:', res.data);
                set({ FeatureList: [], }); // Reset BrandList to an empty array on failure
            }
        } catch (error) {
            // Handle any errors that occur during the API request
            console.error('Error fetching BrandList:', error);
            set({ FeatureList: [] }); // Reset BrandList to an empty array on error
        }
    },

    LegalDetails: null,
    LegalDetailsRequest: async (type) => {
        set({ LegalDetails: null });
        let res = await axios.get(`/api/v1/LegalDetails/${type}`);
        if (res.data['status'] === 'success') {
            set({ LegalDetails: res.data['data'] });
        } else {
            console.error('Failed to fetch LegalDetails:', res.data);
            set({ LegalDetails: null });
        }
    }

}));

export default FeatureStore;
