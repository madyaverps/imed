import Image from 'next/image'
import React from 'react'

const page = () => {
    return (
        <div className='overflow-hidden bg-[#0E1E3A] h-[100vh] max-h-screen relative'>
            <div className='absolute px-20 py-10'>
                <a href="/" className="flex items-center">
                    <span className="text-iPrimary text-title-lg font-bold ">i</span>
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">MED</span>
                </a>
            </div>
            <div className='flex'>
                <Image 
                 src="/images/vector.png" alt="" />
                <Image src="/images/vector_1.png" alt="" />
            </div>
            <div className="w-full  absolute top-40">
                <div className=" grid grid-flow-col-1 md:grid-cols-2 ">
                    <div className="w-auto md:px-20 bg-[#1B3C74] hidden md:block rounded-lg">
                        <Image className='md:h-[460px]' src="/images/doctor_01.png" alt="" />
                    </div>
                    <div className="w-full bg-transparent md:p-5 rounded-lg lg:rounded-l-none">
                        <h3 className="pt-4 text-2xl text-center">Welcome Back!</h3>
                        <form className="px-5 pt-6 pb-8 mb-4 bg-transparent rounded">
                            <div className="mb-4">
                                <label className="block mb-2 text-sm font-bold text-white" htmlFor="username">
                                    Email
                                </label>
                                <input className="w-full px-3 py-2 text-sm leading-tight text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Email Address" />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2 text-sm font-bold text-white" htmlFor="password">
                                    Password
                                </label>
                                <input className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border border-red-500 rounded shadow appearance-none focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Password" />
                                <p className="text-xs italic text-white">Please choose a password.</p>
                            </div>
    
                            <div className="mb-6 text-center">
                                <button className="w-full px-4 py-2 font-bold text-white bg-iPrimary rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline" type="button">
                                    Login
                                </button>
                            </div>
                            <hr className="mb-6 border-t" />
                            <div className="text-center">
                                <a className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800" href="#">
                                Dont Have an Account? <span className='cursor-pointer text-iPrimary'>Register</span> With Us Today
                                </a>
                            </div>
                            {/* <div className="text-center">
                                <a className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800" href="#">
                                    Forgot Password?
                                </a>
                            </div> */}
                        </form>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default page