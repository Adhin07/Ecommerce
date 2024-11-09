import './App.css';
import { Outlet } from 'react-router-dom';
import  Header from './components/Header';
import Footer from './components/Footer.js';
import { ToastContainer, } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import Context from './context/index.js';
import { fetchUserDetails } from './apis/fetching.js';
import { useDispatch } from 'react-redux';
import SummaryApi from './common/index.js';



function App() {

  const dispatch = useDispatch()

  const [cartProductCount,setCartProductCount]=useState(0)

  const fetchUserAddToCart =async()=>{
    const dataResponse = await fetch(SummaryApi.addToCartProductCount.url, {
      method: SummaryApi.addToCartProductCount.method,
      credentials: "include", // Include cookies in the request
      headers: {
          'Content-Type': 'application/json',
          // Add other headers if necessary
      }
  });

  const data =await dataResponse.json()

  setCartProductCount(data?.data?.count)
  }
  


  useEffect(()=>{
    fetchUserDetails({dispatch,setCartProductCount})
    fetchUserAddToCart()
  },[dispatch])
    



    return (
    <div className='flex flex-col min-h-screen'>
    <>
    <Context.Provider value={{
        fetchUserDetails, //user details fetch
        cartProductCount, //current user add to cart product count
        fetchUserAddToCart
    }}>
    <ToastContainer position='top-center'/>
    <Header/>
    <main className='min-h-[calc(100vh-120px)] pt-16'>
    <Outlet/>
    </main>
    
    <Footer/>
    </Context.Provider>
    </>
    </div>
   
  );
}

export default App;
