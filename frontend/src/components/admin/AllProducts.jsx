import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { DataGrid } from '@mui/x-data-grid'
import { adminDeleteProductSlice, adminProductSlice } from '../../store/adminSlice'
import { Link } from 'react-router-dom'
import { BsFillTrashFill } from "react-icons/bs";
import toast from 'react-hot-toast'



const AllProducts = () => {
  const dispatch = useDispatch()
  const products = useSelector(state=>state.admin.adminProducts.allProducts)

  const deleteProductHandler = (id) =>{
    toast.success("Product Deleted Successfully... Please reload.")
    dispatch(adminDeleteProductSlice(id))
  } 
  useEffect(()=>{
    dispatch(adminProductSlice())
  },[dispatch])
  const row = [
  ]
  const column = [
      {field:"id",
      headerName:"Product",
      minWidth:'30',
      flex:0.3,
      renderCell:(params)=>{
              return <Link to={`/order/${params.id}`}>{params.id}</Link>;
            }
      },
      {
          field:"name",
          headerName:"Name",
          minWidth:'15',
          flex:0.6,          
          renderCell:(params)=>{
            return <Link to={`/order/${params.id}`}>{params.row.name}</Link>;
          }
      },
      {
          field:"stock",
          headerName:"Stock",
          type:"number",
          minWidth:'15',
          flex:0.3,
      },
      {
          field:"price",
          headerName:"Price",
          type:"number",
          minWidth:'15',
          flex:0.3,
          renderCell:(params)=>{
              return <Link to={`/order/${params.id}`}>{params.row.price}</Link>;
            }
      },
      {
        field:"delete",
        headerName:"Delete",
        type:"number",
        minWidth:'15',
        flex:0.3,
        renderCell:(params)=>{
            return <button onClick={()=>deleteProductHandler(params.id)}><BsFillTrashFill className='hover:text-primary'/></button>;
          }
    }
  ]

  if(!products) return "Loading.."

  products.forEach(product => {
    row.push(
      {
        id:product._id,
        name:product.name,
        stock:product.Stock,
        price:product.price
      })
  });

  return (
    <>
    {
    products && <DataGrid columns={column} rows={row} pageSizeOptions={[10,20,50,100]} disableRowSelectionOnClick={true}
    initialState={{pagination:{paginationModel:{pageSize:10}}}}/>
    }
    </>
  )
}

export default AllProducts