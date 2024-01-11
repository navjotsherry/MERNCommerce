import React, {useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {DataGrid} from '@mui/x-data-grid'
import { adminAllOrders } from '../../store/adminSlice'

const AllOrders = () => {
  const dispatch = useDispatch()
    const orders = useSelector(state=>state.admin?.allOrders?.order)

    useEffect(()=>{
      if(!orders){
        dispatch(adminAllOrders())
      }
    },[dispatch,orders])

    if(!orders) return "Loading..."

    const row = [
    ]
    const column = [
        {field:"id",
        headerName:"Order",
        minWidth:'30',
        flex:0.6,
        renderCell:(params)=>{
                return <Link to={`/admin-order/${params.id}`}>{params.id}</Link>;
              }
        },
        {
            field:"orderQty",
            headerName:"Order Quantity",
            type:"number",
            minWidth:'15',
            flex:0.3
        },
        {
            field:"status",
            headerName:"Status",
            minWidth:'15',
            flex:0.3,
            renderCell:(params)=>{
                return <Link to={`/admin-order/${params.id}`}>{params.row.status}</Link>;
              }
        },
        {
          field:"customer",
          headerName:"Customer",
          minWidth:'15',
          flex:0.4,
          renderCell:(params)=>{
              return <Link to={`/admin-order/${params.id}`}>{params.row.customer}</Link>;
            }
      },
        {
            field:"amount",
            headerName:"Total Amount",
            type:"number",
            minWidth:'15',
            flex:0.3,
            renderCell:(params)=>{
                return <Link to={`/admin-order/${params.id}`}>{params.row.amount}</Link>;
              }
        }
    ]

    orders && orders.forEach(order => {
        row.push({
            id:order._id,
            orderQty: order.orderItems.reduce((acc, item)=> acc + item.quantity,0),
            status:order.orderStatus,
            customer:order.user,
            amount:order.totalPrice
        })
    });

  return (
    <div className='flex flex-col items-center'>
        <div className="text-4xl">All Orders</div>
        <div className="w-[100%] overflow-y-hidden">
            <DataGrid
                rows={row}
                columns={column}
                pageSizeOptions={[10,20,50,100]}
                disableRowSelectionOnClick={true}
                initialState={{pagination:{paginationModel:{pageSize:10}}}}
            />
        </div>
        
       
    </div>
  )
}

export default AllOrders