import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'

const OrderPages = () => {
  const [data,setData]=useState([])

    const fetchOrderDetails =async()=>{
      const response =await fetch(SummaryApi.getOrder.url,{
        method:SummaryApi.getOrder.method,
        credentials:'include'
      })

      const responseData =await response.json()

      console.log("order list ",responseData)
      
    }

    useEffect(()=>{
      fetchOrderDetails()
    })
  

  return (
    <div>
      OrderPages
    </div>
  )
}

export default OrderPages
