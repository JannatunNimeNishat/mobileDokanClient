import { baseApi } from "../../api/baseApi";

const saleApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    allSales: builder.query({
      query:(interval) =>({
        url:`sale/sales-history/${interval}`,
        method:'GET'
      }),

      providesTags: ["saleTag"] as any ,
    }),
    
    getTotalSale:builder.query({
      query:()=>({
        url:'sale/total-sell',
        method:'GET'
      }),
      providesTags:["totalSale"] as any,
    }),
    getSingleDayTotalSale:builder.query({
      query:()=>({
        url:'sale/todays-total-sell',
        method:'GET'
      }),
      providesTags: ["singleDayTotalSale"] as any,
    }),
    getTopSellingProducts:builder.query({
      query:()=>({
        url:'sale/top-selling-products',
        method:'GET'
      }),
      providesTags: ["topSellingProducts"] as any,
    }),
    getDayWiseWeeklySells:builder.query({
      query:()=>({
        url:'sale/day-wise-weekly-sell',
        method:'GET'
      }),
      providesTags: ["dayWiseWeeklySell"] as any,
    }),

    createSale: builder.mutation({
      query: (saleData) => ({
        url: "sale/create-sale",
        method: "POST",
        body: saleData,
      }),
      invalidatesTags: [ "product","saleTag", "singleDayTotalSale", "totalSale","topSellingProducts","dayWiseWeeklySell","saleAlert"] as any,
    }),

  }),
});

export const { useCreateSaleMutation,useAllSalesQuery,useGetTotalSaleQuery,useGetSingleDayTotalSaleQuery,useGetTopSellingProductsQuery, useGetDayWiseWeeklySellsQuery  } = saleApi;
