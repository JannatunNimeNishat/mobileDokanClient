import { baseApi } from "../../api/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: (queryParm) => {
        const params = new URLSearchParams();

        if (queryParm) {
          Object.keys(queryParm).forEach(function (key) {
            if (queryParm[key]) {
              params.append(key, queryParm[key]);
            }
          });


        }
        let finalResponse: any = {};
        finalResponse.url = "/product";
        finalResponse.method = "GET";
        if (queryParm) {
          finalResponse.params = params;
        }
        return finalResponse;
      },
      // providesTags: (result,error,id) => [{type:"product",id}as ProductTag],
      providesTags: () => ["product"] as any,
    }),
    getSingleProduct: builder.query({
      query: (id) => ({
        url: `/product/${id}`,
        method: "GET",
      }),
      invalidatesTags: ["product"] as any,
    }),
    createProduct: builder.mutation({
      query: (productData) => ({
        url: "product/create-product",
        method: "POST",
        body: productData,
      }),
      invalidatesTags: ["product"] as any,
    }),

    deleteProduct: builder.mutation({
      query: (productId: string) => ({
        url: `/product/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["product"] as any,
    }),
    deleteMultipleProducts: builder.mutation({
      query: (ids) => {
        return {
          url: `/product/deleteMultipleProduct`,
          method: "DELETE",
          body:  {ids} 
        }
      },
      invalidatesTags: ["product"] as any,
    }),

    updateProduct: builder.mutation({
      query: ({ id, updatedData }) => {
        return {
          url: `product/${id}`,
          method: "PATCH",
          body: updatedData,
        };
      },
      invalidatesTags: ["product"] as any,
    }),
    getSaleAlert: builder.query({
      query:()=>({
        url:'product/stock-alert',
        method:'GET',
      }),
      providesTags: () => ["product"] as any,
    })

  }),
});

export const {
  useCreateProductMutation,
  useGetAllProductsQuery,
  useDeleteProductMutation,
  useGetSingleProductQuery,
  useUpdateProductMutation,
  useDeleteMultipleProductsMutation,
  useGetSaleAlertQuery
} = productApi;
