import create from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';

const ProductStore = create(
  persist(
    (set, get) => ({
      // Initial state
      BrandList: [],
      isBrandListLoaded: false,
      CategoryList: [],
      isCategoryListLoaded: false,
      SliderList: null,
      isSliderListLoaded: false,
      ListByRemark: null,
      isListByRemarkLoaded: false,
      ListProduct: [],
      isListByBrandLoaded: false,    // Separate flag for ListByBrandRequest
      isListByCategoryLoaded: false, // Separate flag for ListByCategoryRequest
      isListByKeywordLoaded: false,  // Separate flag for ListByKeywordRequest
      isHydrated: false, // Hydration flag

      // Actions
      afterHydration: () => {
        // Re-fetch data if not loaded
        if (!get().isBrandListLoaded) get().BrandListRequest();
        if (!get().isCategoryListLoaded) get().CategoryListRequest();
        if (!get().isSliderListLoaded) get().SliderListRequest();
        if (!get().isListByRemarkLoaded) get().ListByRemarkRequest();
      },

      BrandListRequest: async () => {
        if (get().isBrandListLoaded) return;
        try {
          let res = await axios.get(`/api/v1/ProductBrandList`);
          if (res.data['status'] === 'success') {
            set({ BrandList: res.data['data'], isBrandListLoaded: true });
          } else {
            console.error('Failed to fetch BrandList:', res.data);
            set({ BrandList: [] });
          }
        } catch (error) {
          console.error('Error fetching BrandList:', error);
          set({ BrandList: [] });
        }
      },

      CategoryListRequest: async () => {
        if (get().isCategoryListLoaded) return;
        try {
          let res = await axios.get(`/api/v1/ProductCategoryList`);
          if (res.data['status'] === 'success') {
            set({ CategoryList: res.data['data'], isCategoryListLoaded: true });
          } else {
            console.error('Failed to fetch CategoryList:', res.data);
            set({ CategoryList: [] });
          }
        } catch (error) {
          console.error('Error fetching CategoryList:', error);
          set({ CategoryList: [] });
        }
      },

      SliderListRequest: async () => {
        if (get().isSliderListLoaded) return;
        try {
          let res = await axios.get(`/api/v1/ProductSliderList`);
          if (res.data['status'] === 'success') {
            set({ SliderList: res.data['data'], isSliderListLoaded: true });
          } else {
            console.error('Failed to fetch SliderList:', res.data);
            set({ SliderList: [] });
          }
        } catch (error) {
          console.error('Error fetching SliderList:', error);
          set({ SliderList: [] });
        }
      },

      ListByRemarkRequest: async (Remark) => {
        if (get().isListByRemarkLoaded) return;
        try {
          let res = await axios.get(`/api/v1/ProductListByRemark/${Remark}`);
          if (res.data['status'] === 'success') {
            set({ ListByRemark: res.data['data'], isListByRemarkLoaded: true });
          } else {
            console.error('Failed to fetch ListByRemark:', res.data);
            set({ ListByRemark: [] });
          }
        } catch (error) {
          console.error('Error fetching ListByRemark:', error);
          set({ ListByRemark: [] });
        }
      },

      ListByBrandRequest: async (BrandID) => {
        set({ isListProductLoaded: false });
        try {
          let res = await axios.get(`/api/v1/ProductListByBrand/${BrandID}`);
          if (res.data['status'] === 'success') {
            set({ ListProduct: res.data['data'], isListByBrandLoaded: true });
          } else {
            console.error('Failed to fetch ListProduct:', res.data);
            set({ ListProduct: [] });
          }
        } catch (error) {
          console.error('Error fetching ListProduct:', error);
          set({ ListProduct: [] });
        }
      },

      ListByCategoryRequest: async (CategoryID) => {
        set({ isListProductLoaded: false });
        try {
          let res = await axios.get(`/api/v1/ProductListByCategory/${CategoryID}`);
          if (res.data['status'] === 'success') {
            set({ ListProduct: res.data['data'], isListByCategoryLoaded: true });
          } else {
            console.error('Failed to fetch ListProduct:', res.data);
            set({ ListProduct: [] });
          }
        } catch (error) {
          console.error('Error fetching ListProduct:', error);
          set({ ListProduct: [] });
        }
      },

      ListByKeywordRequest: async (Keyword) => {
        const currentKeyword = get().SearchKeyword;
        console.log('Current Keyword:', currentKeyword, 'New Keyword:', Keyword);
    
        if (currentKeyword !== Keyword) {
            console.log('Keyword changed. Resetting isListByKeywordLoaded.');
            set({ isListByKeywordLoaded: false, SearchKeyword: Keyword });
        }
    
        if (!get().isListByKeywordLoaded) {
            try {
                console.log('Fetching data for keyword:', Keyword);
                let res = await axios.get(`/api/v1/ProductListByKeyword/${Keyword}`);
                if (res.data['status'] === 'success') {
                    set({ ListProduct: res.data['data'], isListByKeywordLoaded: true });
                } else {
                    console.error('Failed to fetch ListProduct:', res.data);
                    set({ ListProduct: [], isListByKeywordLoaded: false });
                }
            } catch (error) {
                console.error('Error fetching ListProduct:', error);
                set({ ListProduct: [], isListByKeywordLoaded: false });
            }
        }
    },
    setSearchKeyword: async (keyword) => set({ SearchKeyword: keyword }),

    ListByFilterRequest: async (postBody) => {
      try {
          let res = await axios.post(`/api/v1/ProductListByFilter`, postBody);
  
          console.log('Full Response from API:', res);
          console.log('Response data:', res.data);
  
          if (res.data && res.data.status === 'success') {
              set({ ListProduct: res.data.data });
              
          } else if (res.data && res.data.status === 'fail') {
              
              if (res.data.message) {
                  console.error('Failure Reason:', res.data.message);
              } else {
                  console.error('Unknown error occurred with status "fail".');
              }
  
              
              set({ ListProduct: [] });
          } else {
              
              set({ ListProduct: [] });
          }
      } catch (error) {
         
          set({ ListProduct: [] });
      }
  },
  
  Details:null,
  DetailsRequest: async (id) => {
    set({ Details: null });
    try {
        let res = await axios.get(`/api/v1/ProductDetail/${id}`);
        if (res.data['status'] === 'success') {
            set({ Details: res.data['data'] });
        } else {
            console.error('Failed to fetch Details:', res.data);
            set({ Details: null });
        }
    } catch (error) {
        console.error('Error fetching Details:', error);
        set({ Details: null });
    
    }
  },

ReviewList: null,
ReviewListRequest: async (id) => {
  set({ ReviewList: null });
  try {
      let res = await axios.get(`/api/v1/ProductReview/${id}`);
      if (res.data['status'] === 'success') {
          set({ ReviewList: res.data['data'] });
      } else {
          console.error('Failed to fetch ReviewList:', res.data);
          set({ ReviewList: null });
      }
  } catch (error) {
      console.error('Error fetching ReviewList:', error);
      set({ ReviewList: null });
  }
},
    }),



    {
      name: 'product-store',
      getStorage: () => localStorage,
      onRehydrateStorage: () => (state) => {
        state.isHydrated = true;
        state.afterHydration(); // Re-fetch data after hydration if needed
      },
    }
  )
);


export default ProductStore;
