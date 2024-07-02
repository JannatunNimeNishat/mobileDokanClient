import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
    endpoints:(builder)=>({
        register:builder.mutation({
            query:(userData)=>({
                url:'/user/create-user',
                method:'POST',
                body:userData
            })
        }),
        login:builder.mutation({
            query:(userData)=>({
                url:'/auth/login',
                method:'POST',
                body:userData
            })
        }),
    })
});

export const {useRegisterMutation,useLoginMutation} = authApi