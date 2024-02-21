import { baseApi } from './baseApi'
import { tagTypes } from '../tag-types'

const SHOPPER_URL = '/users/create-shopper'

export const shopperApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addShopperWithFormData: build.mutation({
      query: (data) => ({
        url: SHOPPER_URL,
        method: 'POST',
        data,
        contentType: 'multipart/form-data',
      }),
      invalidatesTags: [tagTypes.shopper],
    }),
  }),
})

export const { useAddShopperWithFormDataMutation } = shopperApi
