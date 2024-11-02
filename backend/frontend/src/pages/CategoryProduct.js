import React, { useState } from 'react'
import productCategory from '../helpers/productCategory';
import { useParams } from 'react-router-dom'
import CategoryWiseProductDisplay from '../components/CategoryWiseProductDisplay';
import VerticalCard from '../components/VerticalCard';

const CategoryProduct = () => {
    const params=useParams()
    const [data,setData]=useState([])
    const [loading,setLoading]=useState(false)
    const [selectCategory,setSelectCategory]=useState([])

    const fetchData=async()=>{
      const response =await fetch()

      const dataResponse=await response.json()

      setData(dataResponse?.data || [])

      console.log("category product",dataResponse)
    }
   
    

  return (
    <div className='container mx-auto p-4'>
    
    {/**desktop version */}
    <div className='hidden lg:grid grid-cols-[200px,1fr]'>

    
      
      {/**left side */}
      <div className='bg-white p-2 min-h-[calc(100vh-120px)] overflow-y-scroll'>
        {/*SortBy */}
        <div className=''>
          <h3 className='text-base uppercase font-medium text-slate-500 border-b pb-3 border-slate-300'>sort by</h3>

        <form className='text-sm flex flex-col gap-2 py-2'>
          <div className='flex items-center gap-y-3.5'>
            <input type='radio' name='sortBy'/>
            <label > Price - Low to High</label>
          </div>
          <div className='flex items-center gap-y-3.5'>
            <input type='radio' name='sortBy'/>
            <label > Price - High to Low</label>
          </div>
        </form>

        </div>

      {/*filterd by */}


      <div className=''>
          <h3 className='text-base uppercase font-medium text-slate-500 border-b pb-3 border-slate-300'>filterd by</h3>

        <form className='text-sm flex flex-col gap-2 py-2'>
          {
            productCategory.map((categoryName,index)=>{
              return(
                <div className='flex items-center gap-3'>
                  <input type='checkbox' name={'category'} id={categoryName?.value}/>
                  <label htmlFor={categoryName?.value}>{categoryName?.label}</label>

                </div>
              )
            })
          }
          
        </form>

        </div>



      </div>
      
      {/**right side {product} */}
    
      <div>
        {
          data.length !==0 && !loading &&(
            <VerticalCard data={data} loading={loading}/>
          )
        }
      </div>

      </div>
    </div>
  )
}

export default CategoryProduct
