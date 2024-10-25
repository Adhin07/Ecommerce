import React from 'react'
import { useState } from 'react'
import loginIcons from '../assest/signin.gif'
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import imageTobase64 from '../helpers/imageTobase64'
import SummaryApi from '../common';
import { toast } from 'react-toastify';




const SignUp = () => {

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
    profilePic: ""
  })

  const navigate =useNavigate()


  const handleOnChange = (e) => {
    const { name, value } = e.target

    setData((prev) => {
      return {
        ...prev,
        [name]: value
      }
    })

  }

  const handleUploadPic = async (e) => {

    const file = e.target.files[0]
    const imagePic = await imageTobase64(file)

    setData((prev) => {
      return {
        ...prev,
        profilePic: imagePic
      }
    }
    )

  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (data.password === data.confirmPassword) {
      const dataResponse = await fetch(SummaryApi.signUP.url, {
        method: SummaryApi.signUP.method,
        headers: {
           "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
      const dataApi = await dataResponse.json()

      if(dataApi.success){
        toast.success(dataApi.message)
        navigate("/login")
      }

      if(dataApi.error){
        toast.error(dataApi.message)
      }
      }
    else {
      toast.error("please check the password  and confirm password")
    }
  }


  console.log("data login", data)


  return (
    <section id="SignUp">
      <div className='mx-auto container p-4'>
      

        <div className='bg-gradient-to-r from-blue-400 to-red-400 p-5 w-full max-w-sm mx-auto rounded-2xl '>

          <div className='w-20 h-20 mx-auto relative overflow-hidden rounded-full'>
            <div><img src={data.profilePic || loginIcons} alt="login icons" /></div>
            <form>
              <label>
                <div className='text-xs bg-slate-200 bg-opacity-80 pb-4 pt-2 text-center cursor-pointer absolute bottom-0 w-full'>
                  Upload Photo
                </div>
                <input type="file" className='hidden' onChange={handleUploadPic} />
              </label>

            </form>
          </div>

          <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>

            <div className='grid'>
              <label>Name:</label>
              <div className='bg-slate-100 p-2 rounded-md'>
                <input type="text"
                  placeholder='enter your name'
                  name='name'
                  onChange={handleOnChange}
                  required
                  value={data.name}
                  className='w-full h-full outline-none bg-transparent' />
              </div>
            </div>

            <div className='grid'>
              <label>Email:</label>
              <div className='bg-slate-100 p-2 rounded-md'>
                <input type="email"
                  placeholder='enter email'
                  name='email'
                  onChange={handleOnChange}
                  required
                  value={data.email}
                  className='w-full h-full outline-none bg-transparent' />
              </div>
            </div>

            <div>
              <label>Password:</label>
              <div className='bg-slate-100 p-2 flex rounded-md'>
                <input type={showPassword ? "text" : "password"}
                  placeholder='enter password'
                  value={data.password}
                  name='password'
                  onChange={handleOnChange}
                  required
                  className='w-full h-full  bg-transparent' />
                <div className='cursor-pointer text-xl' onClick={() => {
                  setShowPassword((prev) => !prev)
                }}>




                  <span>
                    {
                      showPassword ?
                        (
                          <FaEye />
                        )
                        :
                        (
                          <FaEyeSlash />
                        )
                    }


                  </span>
                </div>
              </div>

            </div>

            <div>
              <label>Confirm Password:</label>
              <div className='bg-slate-100 p-2 flex rounded-md'>
                <input type={showConfirmPassword ? "text" : "password"}
                  placeholder='enter confirm password'
                  value={data.confirmPassword}
                  name='confirmPassword'
                  onChange={handleOnChange}
                  required
                  className='w-full h-full  bg-transparent' />
                <div className='cursor-pointer text-xl' onClick={() => {
                  setShowConfirmPassword((prev) => !prev)
                }}>




                  <span>
                    {
                      showConfirmPassword ?
                        (
                          <FaEye /> 
                        )
                        :
                        (
                          <FaEyeSlash />
                        )
                    }


                  </span>
                </div>
              </div>

            </div>

            <button className='bg-red-600 text-white hover:bg-red-700 px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'>SignUp</button>

          </form>

          <p className='my-5'>Already have account ? <Link to={"/Login"} className='text-red-600 hover:text-red-700 hover:underline'>Login</Link></p>

        </div>

      </div>
    </section>
  )
}

export default SignUp
