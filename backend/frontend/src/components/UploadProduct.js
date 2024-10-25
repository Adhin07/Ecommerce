import React, { useState } from 'react'
import {  MdOutlineClose } from "react-icons/md";
import productCategory from '../helpers/productCategory';
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from '../helpers/uploadImage';
import DisplayImage from './DisplayImage';
import { MdDelete } from "react-icons/md";
import SummaryApi from '../common';
import {toast} from 'react-toastify'

const UploadProduct= ({
    onclose,
    fetchdata
})=>
{
    const [data,setData] =useState({
      productName:"",
      brandName:"",
      category:"",
      productImage:[],
      description:"",
      price:"",
      sellingPrice:"",


    })
    const [openFullScreenImage,setOpenFullScreenImage]=useState(false)

    const [fullScreenImage,setFullScreenImage]=useState("")
  


    const handleOnChange=(e)=>{
      const {name,value}=e.target

      setData((prev)=>{
        return{
          ...prev,
        [name]:value
        }
        })

    }


    const handleUploadProduct=async(e)=>{
      const file=e.target.files[0]
      

      const uploadImageCloudinary = await uploadImage(file)

      setData((prev)=>{
      return{
        ...prev,
        productImage:[...prev.productImage,uploadImageCloudinary.url]
      }
      })
    }
    
    const handleDeleteProductImage= async(index)=>{
      console.log("image index",index)

      const newProductImage=[...data.productImage]
      newProductImage.splice(index,1)

      setData((prev)=>{
        return{
          ...prev,
          productImage:[...newProductImage]
        }
        })

    }

        const handleSubmit=async(e)=>{
          e.preventDefault()
        
          const response=await fetch(SummaryApi.uploadProduct.url,{
            method:SummaryApi.uploadProduct.method,
            credentials:'include',
            headers:{
              "content-type" : "application/json"
            },
            body :JSON.stringify(data)
          })

          const responseData =await response.json()

          if(responseData.success){
            toast.success(responseData?.message)
            onclose()
            fetchdata()
          }

          if(responseData.error)
          {
            toast.error(responseData?.message)
          }
        }

  return (
    <div className='fixed w-full h-full bg-slate-200 bg-opacity-35 top-0 left-0 right-0  bottom-0 flex justify-center items-center'>
      <div className='bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden'>
        <div className='flex justify-between items-center pb-3'>
            <h2 className='font bold text-lg '>Upload Product</h2>
            <div className='w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer' onClick={onclose}>
            <MdOutlineClose />

            </div>
        </div>

          <form className='grid p-4 gap-3 overflow-y-scroll h-full pb-5' onSubmit={handleSubmit}>
            <label htmlFor='productName'>Product Name:</label>
            <input
            type='text'
            id='productName'
            placeholder='enter product name'
            name='productName'
            value={data.productName}
            onChange={handleOnChange}
            className='p-2 bg-slate-100 border rounded'/>


            <label htmlFor='brandName' className='mt-3'>Brand Name: </label>
            <input
            type='text'
            id='brandName'
            placeholder='enter brand name'
            name='brandName'
            value={data.brandName}
            onChange={handleOnChange}
            className='p-2 bg-slate-100 border rounded'/>

            <label htmlFor='category' className='mt-3'>Category : </label>
            <select required value={data.category} name='category' onChange={handleOnChange} className='p-2 bg-slate-100 border rounded'>
            <option value={""} >Select Category</option>
            {
              productCategory.map((el,index)=>{
                return(
                  <option value={el.value} key={el.value+index}>{el.label}</option>
                )
              })
            }
            
              </select> 


              
               
              <label htmlFor='productImage' className='mt-3'>Product Image:</label>
              <label htmlFor='uploadImageInput'>
           <div className='p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center'>
            <div className='text-slate-500 flex justify-center items-center flex-col gap-2 cursor-pointer'>
              <span className='text-4xl'><FaCloudUploadAlt/></span>
              <p className='text-sm'>Upload Product Image</p>
              <input type='file' id='uploadImageInput' className='hidden'onChange={handleUploadProduct} />
            </div>
           </div>
           </label>



              <div>
                {
                  data?.productImage[0] ? (
                    <div className='flex items-center gap-2'>
                      {
                         data.productImage.map((el,index)=>{
                          return(
                            <div className='relative group'>
                              <img src={el} 
                            alt={el} 
                            width={80}
                             height={80} 
                             className='bg-slate-100 border cursor-pointer'
                            onClick={()=>{
                              setOpenFullScreenImage(true)
                              setFullScreenImage(el)
                            }}/>
                            
                            <div className='absolute right-0 bottom-0 p-1 text-white bg-red-600 rounded-full hidden group-hover:block cursor-pointer' onClick={()=>handleDeleteProductImage(index)}>
                              <MdDelete/>
                              </div>
                              </div>
                          )
                        })
                      }
                    </div>
                   
                  ):(
                    <p className='text-red-600 text-xs'>*Please Upload product image</p>
                  )
                }
                
              </div>

            <label htmlFor='price' className='mt-3'>Price: </label>
            <input
            type='Number'
            id='price'
            placeholder='enter price'
            name='price'
            value={data.price}
            onChange={handleOnChange}
            className='p-2 bg-slate-100 border rounded '
            required/>

            <label htmlFor='sellingPrice' className='mt-3'>Selling Price: </label>
            <input
            type='Number'
            id='sellingPrice'
            placeholder='enter Selling Price'
            name='sellingPrice'
            value={data.sellingPrice}
            onChange={handleOnChange}
            className='p-2 bg-slate-100 border rounded '
            required/>

            <label htmlFor='description' className='mt-3'>Description: </label>
            <textarea className='h-28 bg-slate-100 border resize-none p-1 ' 
            placeholder='Enter product description'
            rows={3}
            name='description'
            value={data.description}
            onChange={handleOnChange}>
               
            </textarea>


                <button className='px-3 py-2 bg-red-600 text-white mb-10 hover:bg-red-700'>Upload Product</button>
           </form>


      </div>


      {/*display image full screen */}

      {
        openFullScreenImage &&(
          <DisplayImage onclose={()=>setOpenFullScreenImage(false)} imgUrl={fullScreenImage}/>

        )
      }

      
    </div>
  )
}

export default UploadProduct
