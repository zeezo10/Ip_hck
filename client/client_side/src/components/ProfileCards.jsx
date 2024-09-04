import React from 'react'
import { Link } from 'react-router-dom'
import RequestRecipe from '../../helper/RequestRecipe'

export default function ProfileCards(props) {

    const {recipe , HandleDelete } = props


   

  return (

    <div className="flex flex-wrap justify-center gap-2 mt-10">
        <div className=" flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96 h-96 justify-between">
          <div className="p-6 ">
            <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
              {recipe? (recipe.title) :<>edef</>}
            </h5>
            <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
              {recipe? (recipe.ingredients) : <>hhh</>}
            </p>
          </div>
          <div className="p-6 flex gap-2 pt-0">
            <Link
              className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
              to={`/add-edit/${recipe.id}`}
            >
              Edit
            </Link>
            <button
              className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
              type="button"
              onClick={() => HandleDelete(recipe.id)}
            >
              Delete
            </button>
          </div>
        </div>
    </div>

)
}
