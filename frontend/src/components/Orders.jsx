import React from 'react'
import { DataGrid } from '@mui/x-data-grid';


const Orders = () => {
    const row = []
    const column = [
        {field:"id",
        headerName:"Order",
        minWidth:'300',
        flex:1
        },
        {
            field:"orderQty",
            headerName:"Order Quantity",
            type:"number",
            minWidth:'150',
            flex:0.3
        },
        {
            field:"status",
            headerName:"Status",
            minWidth:'150',
            flex:0.3
        },
        {
            field:"amount",
            headerName:"Total Amount",
            type:"number",
            minWidth:'150',
            flex:0.5
        }
    ]

  return (
    <div>
        <div className="">
            <DataGrid
                rows={row}
                columns={column}
                pageSizeOptions={25}
                disableRowSelectionOnClick={true}
            />
        </div>
        <div className="">My Orders</div>
       
    </div>
  )
}

export default Orders