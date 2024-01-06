import React from 'react'
import { MdExpandMore, MdExpandLess, MdPostAdd,MdAddCircle,MdOutlineListAlt,MdReviews } from "react-icons/md";
import { RiDashboard3Fill } from "react-icons/ri";
import {TreeView} from '@mui/x-tree-view/TreeView'
import {TreeItem} from '@mui/x-tree-view/TreeItem'
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className='min-w-max p-1 h-full'>
       <TreeView
        aria-label="file system navigator"
        defaultCollapseIcon={<MdExpandLess />}
        defaultExpandIcon={<MdExpandMore />}
      >
        <Link to='/admin-dashboard'>
            <TreeItem nodeId="1" style={{padding:"9px", margin:"5px"}} label="Dashboard" icon={<RiDashboard3Fill/>} />
        </Link>
        
        <TreeItem nodeId="2" style={{padding:"9px", margin:"5px"}} label="Products">
          <Link to='/admin-products'><TreeItem nodeId="3" style={{padding:"9px", margin:"5px"}} icon={<MdPostAdd/>} label="All" /></Link>
          <Link to='/admin-product'><TreeItem nodeId="4" style={{padding:"9px", margin:"5px"}} icon={<MdAddCircle />} label="Create New"/></Link>
        </TreeItem>
        <Link to='/admin-orders'><TreeItem nodeId='5' style={{padding:"9px", margin:"5px"}} icon={<MdOutlineListAlt />} label="Orders" /></Link>
        <Link to='/admin-reviews'><TreeItem nodeId='6' style={{padding:"9px", margin:"5px"}} icon={<MdReviews/> } label="Reviews" /></Link>
      </TreeView>
    </div>
  )
}

export default Sidebar