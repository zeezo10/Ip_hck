import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import RequestRecipe from '../../helper/RequestRecipe'
import Swal from 'sweetalert2'
import RequestAPI from '../../helper/RequestAPI'
import { data } from 'autoprefixer'


export default function DetailAPI() {

    let {id} = useParams()

    const [ourRecipe, setOurRecipe] = useState([]);
    const [ingredients, setIngredients] = useState("");
    const [image , setImage] =useState("")
    
    const getRecipeById = async () => {
        try {
            let {data} = await RequestAPI({
                url: `/recipes/${id}/information`,
                method : "GET",
                headers: {
                    "x-api-key": "240398cbe8b54192903dadbe27ad54e5",
                },
            })
                        
           
            console.log(data);
            
            setImage(data.image)
            setOurRecipe(data.title)
            let ingredients = data.extendedIngredients
           
      
            ingredients = ingredients.map((el) => {
              return el.original;
            });
           setIngredients(ingredients.join(" "));

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
        <h1 className="text-2xl">{ourRecipe}</h1>
  <div className=" font-cool">
   
  </div>
      </div>

    <div className='h-screen flex justify-center p-10 font-cool'>

        <div className='shadow-2xl p-10 rounded-xl flex flex-col justify-between items-center'>
        <img src={`${image}`} className='h-60'/>
            <p>

            {ingredients}
            </p>

        <Link to={"/our-recipes"}>Back</Link>
            
        </div>


    </div>
    </>
  )
}
