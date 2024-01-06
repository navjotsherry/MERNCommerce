import React from 'react'
import SideBar from './Sidebar.jsx'
import { Chart,CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend, ArcElement } from 'chart.js'
import {Doughnut,Line} from 'react-chartjs-2'

const Dashboard = () => {

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

      const doughnutState = {
        labels:["Out of Stock", "In Stock"],
        datasets:[{
            backgroundColor:["#00A6B4","#6800B4"],
            hoverBackgroundColor:["#4B5000","#35014F"],
            data:[2,10]
        }]
      }

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

    const lineState = {
        labels:["Initial Amount","Final Amount"],
        datasets:[{
            label:"Total Amount",
            data:[0,3000],
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        }]
    }

  return (
    <>
    <div className="md:flex min-h-screen w-full">
        <div className="md:flex-[0.4] md:min-h-screen">
            <SideBar />
        </div>
        <div className='w-full'>
        
            <div className="text-2xl flex w-full justify-center">Dashboard</div>
            <div className="text-2xl bg-blue-600 text-white w-[90%] mx-auto my-4 flex flex-col items-center justify-center">
                <p>Total Sale</p>
                <p>$3000</p>
            </div>
            <div className="mx-auto w-full">
                <div className="w-full mx-auto grid pt-4 pr-6 pl-3 place-content-center gap-2 grid-cols-3 grid-rows-2 my-4 md:flex items-center justify-around md:px-14">
                    <div className="flex items-center justify-center">
                        <div className="rounded-full col-start-1 w-32 h-32 flex flex-col text-xl text-white items-center justify-center bg-red-500">
                            <p>Products</p>
                            <p>50</p>
                        </div>
                    </div>
                    <div className="flex items-center col-start-2 row-start-2 justify-center">
                        <div className="rounded-full w-32 h-32 flex flex-col text-xl text-black items-center justify-center bg-yellow-300">
                            <p>Orders</p>
                            <p>50</p>
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
            <div className="mt-16 w-[80%] mx-auto flex items-center justify-center">
                 <Doughnut  data={doughnutState}/>
            </div>
            
        </div>
    </div>
    </>)
}

export default Dashboard