import React from 'react'
import Card from '../components/Card'
import imgSrc from '../assets/3428189_60286.jpg'
import { Link } from 'react-router-dom'
import secondImg from '../assets/top-view-food-ingredients-with-veggies-notebook.jpg'
import leftImg from '../assets/IMG_9895.jpg'
import spoon from '../assets/pngwing.com.png'
import NavBar from '../components/NavBar'
import Swal from 'sweetalert2'


export default function Home_page() {
  return (
    <>
    <NavBar/>
    <div className='flex w-screen'>

        <div className='flex-col w-1/4 '>
    <div className='h-lvh shadow-2xl bg-cover' style={{backgroundImage : `url(${leftImg})`}}> 
      <div className='w-full h-full bg-white bg-opacity-10'></div>
    </div>
      
    <div className='flex flex-col space-y-4 min-h-lvh  w-screen  h-screen bg-cover bg-orange-50' >
  
    <div className='font-cool pl-24 pt-44 h-1/2 space-y-4 '>

    <h1 className='text-5xl'>"Our Mission"</h1>
    <h2>To inspire and empower home cooks with delicious, accessible recipes for every occasion.</h2>

    </div>

    <div className=' w-full h-1/2 pb-5'>
    </div>

      </div>      
        <div className='bg-yellow-950 h-24 w-screen p-10 font-cool text-white'>

        <p>Made by Someone </p>

        </div>
        </div>



{/* left_side */}

      <div className='flex-col font-cool w-screen'>

        <div className='h-lvh w-full flex flex-col shadow-lg '  >
        <div className='h-3/4 ' > 
        <div className='flex justify-center mt-36'>
        <h1 className='text-6xl  '>Discover New Recipes</h1>

        </div>
{/* button  */}
        <div className='flex w-full justify-center gap-5 mt-28 text-white'>
          <Link to={"/add-edit"}>
            <button className='w-32 h-10 border-2 border-black text-black rounded-full bg-lime-200' >Add Recipe</button>
          </Link>
            <Link to={'/all-recipe'}>
            <button className='w-32 h-10 bg-white text-black rounded-full border-2 border-black'>Recipes</button>
            
            </Link>
        </div>

        </div>
        <div className='h-1/4 flex' >
        
            <div className='bg-orange-200 w-1/2 h-full flex justify-center items-center bg-opacity-45 text-2xl'>
                <h2><span className='text-4xl'>+1000 </span>Rcipes form all the world</h2>
            </div>
            <div className='bg-orange-200 w-1/2 h-full flex justify-center items-center bg-opacity-45 text-2xl'>
                <h2>Try to make new recipes using Ai</h2>
            </div>

        </div>

        </div>



      </div>
    </div>
    
    
    </>

  )
}
