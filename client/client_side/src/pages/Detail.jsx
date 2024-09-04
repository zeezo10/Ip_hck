import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import RequestRecipe from '../../helper/RequestRecipe'
import Swal from 'sweetalert2'


export default function Detail() {

    let {id} = useParams()

    const [title ,setTitle] = useState("")
    const [ingeredients , setIngredients] = useState("")
    
    const getRecipeById = async () => {
        try {
            let {data} = await RequestRecipe({
                url: `/recipes/${id}`,
                method : "GET",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
            })
                        
            setTitle(`${data.title}`)
            setIngredients(`${data.ingredients}`)

        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: error.response.data.message,
                icon: 'error',
                confirmButtonText: 'OK'
              })
            
        }
    }

    useEffect(() => {
        getRecipeById()
    },[])


  return (
    <>
    
    <div className="bg-lime-200 h-52 flex flex-col items-center pt-28 gap-3 font-cool w-screen"> 
        <h1 className="text-2xl">{title}</h1>
  <div className="w-96 font-cool">
   
  </div>
      </div>

    <div className='h-screen w-screen flex justify-center p-10 font-cool'>

        <div className='w-2/3 h-2/3 shadow-2xl p-10 rounded-xl flex flex-col justify-between items-center '>
            <p>

            {ingeredients}
            </p>

        <Link to={"/all-recipe"}>Back</Link>
            
        </div>


    </div>
    </>
  )
}
