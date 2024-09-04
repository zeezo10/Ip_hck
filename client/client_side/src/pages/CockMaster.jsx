import React, { useState } from 'react'
import RequestRecipe from '../../helper/RequestRecipe'
import AddRecipe from './AddRecipe'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'


export default function CockMaster() {

    const [prompt , setPrompet] = useState("")
    const [answer , setAnswer ] = useState("")
    

    const CockAi = async (e) =>{
        e.preventDefault()
        try {
            
            const {data} = await RequestRecipe({
                url : "/ai",
                method : "POST",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
                data : {
                    promp : prompt
                }
            })

            setAnswer(data)          
                                        

        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: error.response.data.message,
                icon: 'error',
                confirmButtonText: 'OK'
              });
            
        }
    }
  return (
    <>
    
    <div className="bg-lime-200 h-52 flex flex-col items-center pt-20 gap-3 font-cool w-screen"> 
        <h1 className="text-2xl">search for recipe</h1>
  <div className="w-96 font-cool">
    <form onSubmit={CockAi}>
    <div className="flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
      <div className="grid place-items-center h-full w-12 text-gray-300">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      <input
        className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
        type="text"
        id="search"
        placeholder="Search something.."
        value={prompt}
        onChange={(e) => setPrompet(e.target.value)}
      />
      
    </div>
    </form>
  </div>
      </div>

    <div className='h-screen w-screen flex justify-center p-10 font-cool'>

        <div className='w-2/3 h-2/3 shadow-2xl p-10 rounded-xl flex flex-col justify-between items-center '>
            <p>

                {answer}
            </p>
            {answer !== "" ? <Link className='bg-black w-44 text-white h-10 rounded-full'  to={"/add-edit"} state={{answer:answer}}  >add to my recipe</Link> : ""}
        
            
        </div>


    </div>
    
    
    </>
  )
}
