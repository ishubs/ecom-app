import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Product } from '../types';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://fakerapi.it/api/v2/products' }),
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], { page: number; sort?: string; category?: string }>({
      query: ({ page, sort, category }) => ({
        url: '',
        params: {
          _page: page,
          _limit: 12,
          _sort: sort,
          category,
        },
      }),
      transformResponse: (response: { data: Product[] }) => response.data, // Extract the `data` array
    }),
    getProductById: builder.query<Product, number>({
      query: (id) => `/${id}`,
      transformResponse: (response: { data: Product }) => response.data, // Extract the `data` object
    }),
  }),
});

export const { useGetProductsQuery, useGetProductByIdQuery } = productsApi;