
import './App.css';
import { Outlet } from 'react-router-dom';
import  Header from './components/Header';
import Footer from './components/Footer.js';
import { ToastContainer, } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import Context from './context/index.js';
import { fetchUserDetails } from './apis/fetching.js';
import { useDispatch } from 'react-redux';



function App() {

  const dispatch = useDispatch()

  useEffect(()=>{
    fetchUserDetails({dispatch})  },[dispatch])
    



    return (
    <div className='flex flex-col min-h-screen'>
    <>
    <Context.Provider value={{
        fetchUserDetails //user details fetch
    }}>
    <ToastContainer/>
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
