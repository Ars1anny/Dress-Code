import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { REQUEST_URL } from "../../utils/constants/constants";


interface ProductRequest {
    _id: number;

}

interface ProductResponse {
    _id: number;
    name: string;
    photoUrl: string;
    price: string;
    quantity: string;
}


export const inBasketProductsApi = createApi({
    reducerPath: "inBasketProductsApi",
    baseQuery: fetchBaseQuery({ baseUrl: REQUEST_URL }),
    tagTypes: ["InBasketProducts"],
    endpoints: (builder) => {
        return {
            getInBasketProducts: builder.query<ProductResponse[], void>({
                query: () => ({
                    url: "basket",
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
                }),
                providesTags: ["InBasketProducts"]
            }),
            toggleInBasketProduct: builder.mutation<ProductResponse, ProductRequest>({
                query: (id) => ({
                    url: `basket/${id}`,
                    method: "POST",
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }

                }),
                invalidatesTags: ["InBasketProducts"]
            })

        }
    }
})



export const { useGetInBasketProductsQuery, useToggleInBasketProductMutation } = inBasketProductsApi;