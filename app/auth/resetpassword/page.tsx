/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from '@/components/ui/button';
import { API_URL } from '@/server';
import { setAuthUser } from '@/store/authSlice';
import axios from 'axios';
import { Loader } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';

const ResetPassword = () => {
    const searchParams = useSearchParams();
    const email = searchParams.get("email");

    const[otp,setOtp] = useState("");
    const[password,setPassword] = useState("");
    const[passwordConfirm,setPasswordConfirm] = useState("");
    const[loading,setLoading]=useState(false);
    const dispatch = useDispatch();
    const router = useRouter();

    const handleSubmit = async()=>{
        if(!otp || !email || !password || !passwordConfirm) return;
        setLoading(true);
        try {
            const data ={email,otp,password,passwordConfirm};
            const response = await axios.post(`${API_URL}/users/reset-password`,data,{withCredentials:true});
            dispatch(setAuthUser(response.data.data.user));
            toast.success("Password reset successful");
            router.push('/auth/login');

        } catch (error:any) {
            toast.error(error.response.data.message);
        }finally{
            setLoading(false);
        }
    }

  return (
    <div className='h-screen flex items-center justify-center flex-col'>
        <input 
        type="number" 
        placeholder='Enter Otp'
        value={otp}
        onChange={(e)=>setOtp(e.target.value)}
        className='block w-[30%] mx-auto px-6 py-3 bg-gray-300 rounded-lg no-spinner outline-none'>
        </input>
        <input 
        type="password" 
        placeholder='Enter password'
        value={password}
        onChange={(e)=>setPassword(e.target.value)} 
        className='block w-[30%] mx-auto px-6 py-3 bg-gray-300 rounded-lg mb-4 mt-4 outline-none'>
        </input>
        <input 
        type="password" 
        placeholder='Confirm password'
        value={passwordConfirm}
        onChange={(e)=>setPasswordConfirm(e.target.value)} 
        className='block w-[30%] mx-auto px-6 py-3 bg-gray-300 rounded-lg mb-4 outline-none'>
        </input>

        <div className='flex items-center space-x-4 mt-6'>
            {!loading && <Button onClick={handleSubmit}>Change password</Button>}
            {loading && 
            <Button>
                <Loader className='animate-spin'></Loader>
            </Button>}
            {<Button variant={"ghost"}>
                 <Link href="/auth/forgetpassword"> Go Back</Link>
            </Button>}
            
             
        </div>

    </div>
  );
};

export default ResetPassword;