import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';
import { setAuthUser } from '../features/authSlice'

export const updateProfile=createAsyncThunk("user/updateProfile",async(data,{dispatch,rejectWithValue})=>{
    try{
        console.log(data);
        const res=await axiosInstance.put('/user/update',data);
        
        dispatch(setAuthUser(res.data.user));
        toast.success("Profile updated successfully");
        return res.data.user;
    }catch(error){
        toast.error(error.response?.data?.message || "Something went wrong");
        return rejectWithValue(error.response?.data?.message || "Something went wrong");
   
    }
   
});


const userSlice=createSlice({
    name:'user',
    initialState:{
        loading:false,
    },reducers:{

    },
    extraReducers:(builder)=>{
        builder.addCase(updateProfile.pending,(state)=>{
            state.loading=true;
        }).addCase(updateProfile.fulfilled,(state)=>{
            state.loading=false;
        }).addCase(updateProfile.rejected,(state)=>{
            state.loading=false;
        });
    },
});

export default userSlice.reducer;