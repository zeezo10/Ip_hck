import React, { useEffect, useState } from 'react'
import RequestRecipe from '../../helper/RequestRecipe'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'


export default function AddRecipe(props) {

    const location = useLocation()
    const {answer} = location.state || ""
    
    const {id} = useParams()
    

    const [title , setTitle] = useState("")
    const [ingredients , setIngredients] = useState("")

    const navigate = useNavigate()


    const HandelAddRecipe = async (e) => {
        e.preventDefault()

        try {
            let {data} = await RequestRecipe({
                url : "/recipes",
                method : "POST",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
                data : {
                    title ,
                    ingredients
                }
            })
            
            navigate("/profile")
                            
        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: error.response.data.message,
                icon: 'error',
                confirmButtonText: 'OK'
              })
        }
    }


    const getRecipeById = async () => {
        try {
            let {data} = await RequestRecipe({
                url: `/recipes/${id}`,
                method : "GET",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
            })
            console.log(data);
            
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


    const HandelEdit = async (e) =>{
        e.preventDefault()
        try {
            
            let {data} = await RequestRecipe({
                url : `/recipes/${id}`,
                method : "PUT",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
                data : {
                    title ,
                    ingredients
                }
            })
                    
            navigate("/profile")
            
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
        if(id){
            getRecipeById()
        }
        setIngredients(answer)
    },[])


  return (
    <>
    <div className='bg-green-600 h-lvh w-lvw'>

   <section className="bg-white pt-14 font-cool">
  <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
    <h2 className="mb-4 text-4xl tracking-tight  text-center text-black">
      {id? <>Edit Recipe</> : <>Add New Recipe</>}
    </h2>
    <p className="mb-8  text-center text-black">
      try to make the recipe detailed as possible
    </p>
    <form onSubmit={id? HandelEdit : HandelAddRecipe}>
      <div>
        <label
          className="block mb-2 text-sm  text-black "
        >
          Title
        </label>
        <input
     
          className="shadow-lg bg-white border  text-black text-sm rounded-sm block w-full p-2.5"
          placeholder="title"
          required=""
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
   
      <div className="sm:col-span-2">
        <label
          className="block mb-2 text-sm  text-black"
        >
          ingredients
        </label>
        <textarea
          id="message"
          rows={6}
          className="block p-2.5 w-full text-sm text-black bg-gray-50 rounded-sm shadow-lg"
          placeholder="the ingeredients ..."
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
        />
      </div>
      <button
        type="submit"
        className="bg-lime-200 px-5 mt-10 text-center text-black rounded-xl bg-primary-700   hover:bg-white  focus:ring-4 focus:outline-none "
      >
        Save
      </button>
    </form>
  </div>
</section>

    </div>

    </>
  )
}



