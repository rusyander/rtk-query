import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const goodsApi = createApi({
  reducerPath: "goodsApi",
  tagTypes: ["Products"],
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001/" }),
  endpoints: (builder: any) => ({
    getGoods: builder.query({
      query: (limit = "") => `goods?${limit && `_limit=${limit}`}`,
      //   providesTags: ["Products"],
      providesTags: (result: any) =>
        result
          ? [
              ...result.map(({ id }: any) => ({ type: "Products", id })),
              { type: "Products", id: "LIST" },
            ]
          : [{ type: "Products", id: "LIST" }],
    }),
    addProduct: builder.mutation({
      query: (body: any) => ({
        url: "goods",
        method: "POST",
        body,
      }),
      //   invalidatesTags: ["Products"],
      invalidatesTags: [{ type: "Products", id: "LIST" }],
    }),
    deleteProducts: builder.mutation({
      query: (id: any) => ({
        url: `goods/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),
  }),
});

export const {
  useGetGoodsQuery,
  useAddProductMutation,
  useDeleteProductsMutation,
} = goodsApi;
