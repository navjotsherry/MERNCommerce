import React, { useEffect } from 'react'
import { Chart,CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend, ArcElement } from 'chart.js'
import {Doughnut,Line} from 'react-chartjs-2'
import { useDispatch, useSelector } from 'react-redux'
import { adminAllOrders, adminProductSlice } from '../../store/adminSlice'

const Dashboard = () => {

    const dispatch = useDispatch()
    const products = useSelector(state => state.admin.adminProducts.allProducts)
    const orders = useSelector(state=> state.admin.allOrders?.order)

    useEffect(()=>{
        dispatch(adminProductSlice())
        dispatch(adminAllOrders())
    },[dispatch])


    Chart.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        ArcElement,
        Title,
        Tooltip,
        Legend
      )

      

      const lineOptions = {
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Chart.js Line Chart',
          },
        },
      };

      let lineInitialLabels = []
      let lineInitialData = []

    const lineState = {
        labels:lineInitialLabels,
        datasets:[{
            label:"Total Amount",
            data:lineInitialData,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        }]
    }
    let outOfStock = 0
    let inStock = 0

    

    if(!products || !orders) return "Loading..."


    const totalSale = orders.reduce((acc,order)=> {
        const nextOrder = acc + order.totalPrice
        lineInitialLabels.push(order.createdAt)
        lineInitialData.push(nextOrder)
        return nextOrder
    },0)
    

    products.forEach((product)=>{
        if(product.Stock <= 0){
            outOfStock += 1
        }else{
            inStock += 1
        }
    })

    const doughnutState = {
        labels:["Out of Stock", "In Stock"],
        datasets:[{
            backgroundColor:["#00A6B4","#6800B4"],
            hoverBackgroundColor:["#4B5000","#35014F"],
            data:[outOfStock,inStock]
        }]
      }
    

  return (
    <>
    
        <div className='w-full'>
        
            <div className="text-2xl flex w-full justify-center">Dashboard</div>
            <div className="text-2xl bg-blue-600 text-white w-[90%] mx-auto my-4 flex flex-col items-center justify-center">
                <p>Total Sale</p>
                <p>${totalSale}</p>
            </div>
            <div className="mx-auto w-full">
                <div className="w-full mx-auto grid pt-4 pr-6 pl-3 place-content-center gap-2 grid-cols-3 grid-rows-2 my-4 md:flex items-center justify-around md:px-14">
                    <div className="flex items-center justify-center">
                        <div className="rounded-full col-start-1 w-32 h-32 flex flex-col text-xl text-white items-center justify-center bg-red-500">
                            <p>Products</p>
                            <p>{products.length}</p>
                        </div>
                    </div>
                    <div className="flex items-center col-start-2 row-start-2 justify-center">
                        <div className="rounded-full w-32 h-32 flex flex-col text-xl text-black items-center justify-center bg-yellow-300">
                            <p>Orders</p>
                            <p>{orders.length}</p>
                        </div>
                    </div>
                    <div className="flex items-center col-start-3 justify-center">
                        <div className="rounded-full  w-32 h-32 flex flex-col text-xl text-white items-center justify-center bg-blue-gray-900">
                            <p>Users</p>
                            <p>50</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-16 w-[80%] mx-auto flex items-center justify-center">
                <Line data={lineState} options={lineOptions}/>
            </div>
            <div className="mt-16 w-[70%] mx-auto flex items-center justify-center">
                 <Doughnut  data={doughnutState}/>
            </div>
            
        </div>
    </>)
}

export default Dashboard