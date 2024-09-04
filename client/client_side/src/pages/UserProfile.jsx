import React, { useEffect, useState } from 'react'
import RequestRecipe from '../../helper/RequestRecipe'
import Card from '../components/Card'
import ProfileCards from '../components/ProfileCards'
import NavBarProfile from '../components/NavBarProfile'
import Swal from 'sweetalert2'


export default function UserProfile() {

    const [userRecipe , setUserRecipe] =useState ([])

    const getUserRecipes = async () => {
        try {
            let {data} = await RequestRecipe({
                url: "/recipes/user",
                method: "GET",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
            })

            setUserRecipe(data);
            
        } catch (error) {
            console.log(error);
            
        }

    }

    const HandleDelete = async (id) => {
        try {
            let {data} = await RequestRecipe({
                url : `/recipes/${id}`,
                method : "DELETE",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },  
            })

            getUserRecipes()
        } catch (error) {
            console.log(error);
            
        }
    }

    useEffect(() => {
        getUserRecipes()
    },[])
  return (

    <>

    <NavBarProfile/>
    <div className=' bg-orange-50 font-cool'>
        <div className='h-40'></div>

    <div className=' h-24 flex justify-center items-center'>

    <h1 className='text-6xl'>My Recipes</h1>

    </div>

    <div className=' flex flex-wrap gap-4 justify-center '>
        
        {userRecipe.map((el) => (
            <ProfileCards recipe={el} HandleDelete={HandleDelete}/>
        ))}
           </div>

           <div className='h-20'></div>
        </div>
    </>
  )
}
