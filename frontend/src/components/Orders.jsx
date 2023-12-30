import React, { useEffect} from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { fetchAllOrders } from '../store/Orders';
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'


const Orders = () => {

    const dispatch = useDispatch()
    const orders = useSelector(state=>state.Orders.allOrders)

    const row = [
    ]
    const column = [
        {field:"id",
        headerName:"Order",
        minWidth:'30',
        flex:0.6,
        renderCell:(params)=>{
                return <Link to={`/order/${params.id}`}>{params.id}</Link>;
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
                return <Link to={`/order/${params.id}`}>{params.row.status}</Link>;
              }
        },
        {
            field:"amount",
            headerName:"Total Amount",
            type:"number",
            minWidth:'15',
            flex:0.3,
            renderCell:(params)=>{
                return <Link to={`/order/${params.id}`}>{params.row.amount}</Link>;
              }
        }
    ]

    orders && orders.forEach(order => {
        row.push({
            id:order._id,
            orderQty: order.orderItems.reduce((acc, item)=> acc + item.quantity,0),
            status:order.orderStatus,
            amount:order.totalPrice
        })
    });

    useEffect(()=>{
        dispatch(fetchAllOrders())
    },[])

  return (
    <div className='flex flex-col items-center'>
        <div className="w-[100%] overflow-y-hidden">
            <DataGrid
                rows={row}
                columns={column}
                pageSizeOptions={[10,20,50,100]}
                disableRowSelectionOnClick={true}
                initialState={{pagination:{paginationModel:{pageSize:10}}}}
            />
        </div>
        <div className="">My Orders</div>
       
    </div>
  )
}

export default Orders