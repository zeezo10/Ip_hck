import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import GoogleLogin from "../components/GoogleLogin";
import RequestRecipe from "../../helper/RequestRecipe";


export default function RegisterPage() {

    const navigate = useNavigate()

    const [name , setName] = useState("")
    const [email , setEmail] = useState("")
    const [password , setPassword] = useState()  

    const HandleRegister = async () => {
        try {
            let {data} = await RequestRecipe({
                url : "/register",
                method :"POST",
                data : {
                    name :name,
                    email : email,
                    password :password
                }
            })

            console.log(data);
            
            navigate("/")
        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: error.response.data.message,
                icon: 'error',
                confirmButtonText: 'OK'
              })
        }
    }

  return (
    <>
        <div className="font-[sans-serif] flex justify-center">

            
        <div className="grid lg:grid-cols-2 gap-4 max-lg:gap-12 bg-gradient-to-r from-blue-500 to-blue-700 px-8 py-12 h-[320px]">
          <div className="bg-slate-500 flex flex-col p-5 font-cool justify-center items-center text-center">
            <h1 className="text-6xl  text-white">Tasetful</h1>
            <div className="max-w-lg mt-16 max-lg:hidden">
              <h3 className="text-3xl font-bold text-white">Sign in</h3>
              <p className="text-sm mt-4 text-white">
              "Discover the secret ingredients and techniques to elevate your cooking. Join us today!"
              </p>
            </div>
          </div>
          <div className="bg-white rounded-xl sm:px-6 px-4 py-8 max-w-md w-full h-max shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] max-lg:mx-auto">
            <form onSubmit={HandleRegister} >
              <div className="mb-8">
                <h3 className="text-3xl font-extrabold text-gray-800">
                  Register
                </h3>
              </div>
              <div className="sm:flex sm:items-start space-x-4 max-sm:space-y-4 mb-8">
              <GoogleLogin/>
              </div>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">
                  Name
                </label>
                <div className="relative flex items-center">
                  <input
                    type="text"
                    required=""
                    className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                    placeholder="Enter user Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#bbb"
                    stroke="#bbb"
                    className="w-[18px] h-[18px] absolute right-4"
                    viewBox="0 0 24 24"
                  >
                    <circle cx={10} cy={7} r={6} data-original="#000000" />
                    <path
                      d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
                      data-original="#000000"
                    />
                  </svg>
                </div>
              </div>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">
                  Email
                </label>
                <div className="relative flex items-center">
                  <input
                    type="email"
                    required=""
                    className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                    placeholder="Enter user Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#bbb"
                    stroke="#bbb"
                    className="w-[18px] h-[18px] absolute right-4"
                    viewBox="0 0 24 24"
                  >
                    <circle cx={10} cy={7} r={6} data-original="#000000" />
                    <path
                      d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
                      data-original="#000000"
                    />
                  </svg>
                </div>
              </div>
              <div className="mt-4">
                <label className="text-gray-800 text-sm mb-2 block">
                  Password
                </label>
                <div className="relative flex items-center">
                  <input
                    name="password"
                    type="password"
                    required=""
                    className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#bbb"
                    stroke="#bbb"
                    className="w-[18px] h-[18px] absolute right-4 cursor-pointer"
                    viewBox="0 0 128 128"
                  >
                    <path
                      d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
                      data-original="#000000"
                    />
                  </svg>
                </div>
              </div>
            
              <div className="mt-8">
                <button
                  type="submit"
                  className="w-full shadow-xl py-3 px-6 text-sm font-semibold rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                >
                  register
                </button>
              </div>
              <p className="text-sm mt-8 text-center text-gray-800">
                you have an account{" "}
                <Link
                  href="javascript:void(0);"
                  className="text-blue-600 font-semibold hover:underline ml-1 whitespace-nowrap"
                  to={"/login"}
                >
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
