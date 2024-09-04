import React, { useEffect, useState } from "react";
import RequestRecipe from "../../helper/RequestRecipe";
import NavBar from "../components/NavBar";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2'


export default function AllRecipe() {
  const [allRecipes, setAllRecipes] = useState([]);

  const getAllRecipe = async () => {
    try {
      const { data } = await RequestRecipe({
        url: "/recipes",
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      console.log(data);
      
      setAllRecipes(data);
    } catch (error) {
        // Swal.fire({
        //     title: 'Error!',
        //     text: error.response.data.message,
        //     icon: 'error',
        //     confirmButtonText: 'OK'
        //   })
    }
  };

//   const [user ,setUser] = useState("")

//   const getUserById()

  useEffect(() => {
    getAllRecipe();
  }, []);

  return (
    <>

<div className="bg-amber-200 h-52 flex justify-center items-center pt-28 gap-3 font-cool w-screen"> 
  <div className="w-96 font-cool text-4xl">
            <h1>- Share and Explore -</h1>
  </div>
      </div>
   

      <div className=" p-10 pt-20">
        <div className="h-1/4 bg-red-400"></div>
        <div className="flex flex-wrap justify-center gap-2">
          {allRecipes.map((el) => (
            <div className=" flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96">
              <div className="p-6 ">
                <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                  {el.title}
                </h5>
                <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
                  {el.ingredients.slice(20)}
                </p>
              </div>
              <div className="p-6 pt-0">
                <Link
                  className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                  type="button"
                  to={`/detail/${el.id}`}
                >
                  Read More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
