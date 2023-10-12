import {useParams} from 'react-router-dom'
import { fetchProductDetail } from '../store/productDetailSlice'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'

const ProductDetails = ()=>{
    const dispatch=useDispatch()
    const {_id} = useParams()

    useEffect(()=>{
        console.log(_id)
        dispatch(fetchProductDetail(_id))
    },[dispatch,_id])
    
    return (
        <div>{_id}</div>
    )
}

export default ProductDetails