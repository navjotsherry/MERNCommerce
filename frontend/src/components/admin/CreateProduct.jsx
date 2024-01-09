import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { fetchProductConstants } from '../../store/productSlice'
import { MdOutlineAddCircleOutline } from "react-icons/md"
import toast from 'react-hot-toast'
import { adminAddProductSlice } from '../../store/adminSlice'

const CreateProduct = () => {
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(fetchProductConstants())
  },[])

  const {productCategories, isLoading} = useSelector((state)=>state.products)
  const [formState, setFormState] = useState({"name" :'',
  "price": 0,
  "description" : '',
  "category":'',
  "images":[],
  "Stock":1
})

  const handlePhotoSubmit = (e)=>{
    if(!e.target.files[0]){
        return
    }

    let images = []

    for(let i=0;i<e.target.files.length;i++){
    const reader = new FileReader()
    reader.onload = () =>{
          if(reader.readyState === 2){
            images.push(reader.result)
            setFormState({...formState,images})
           }

    }
      reader.readAsDataURL(e.target.files[i])
    }
}

  const changeFormData = (e)=>{
    setFormState({...formState,
    [e.target.name]:e.target.value})
  }

  const submitHandler = (e)=>{
    e.preventDefault()
    if(!formState.name || !formState.price || !formState.description || !formState.category){
      toast.error("Please complete all the details regarging product")
      return
    }
    const myForm  = new FormData()
    myForm.set("name",formState.name)
    myForm.set("price",formState.price)
    myForm.set("description",formState.description)
    myForm.set("category",formState.category)
    myForm.set("Stock",formState.Stock)
    formState.images.forEach(image=>{
      myForm.append("images",image)
    })
    dispatch(adminAddProductSlice(myForm))
    
  }

  if(isLoading) return "Loading"

  return (
    
    <div>
      <form onSubmit={(e)=>submitHandler(e)} className='flex flex-col sm:border-2 w-full my-4 sm:w-11/12 mx-auto border-primary rounded-md'>
          <div className="flex flex-col sm:flex-row mx-auto w-full sm:items-center justify-center mt-6 mb-3">
            <label className='flex-[0.5] mx-2' htmlFor="name">Name : </label>
            <input type="text" id='name' placeholder='Enter Product Name' className='mx-2 outline-none px-4 py-2 border-2 border-black rounded-md  focus-within:border-primary' name='name' value={formState.name} onChange={(e)=>changeFormData(e)} />
          </div>
          <div className="flex flex-col sm:flex-row mx-auto w-full sm:items-center justify-center my-3">
            <label className='flex-[0.5] mx-2' htmlFor="price">Price : </label>
           <input type="number" id='price' placeholder='Enter product price' className='outline-none block mx-2 px-4 py-2 border-2 border-black rounded-md  focus-within:border-primary' name='price' value={formState.price} onChange={(e)=>changeFormData(e)} />  
           </div>
           <div className="flex flex-col sm:flex-row mx-auto w-full sm:items-center justify-center my-3">
            <label className='flex-[0.5] mx-2' htmlFor="stock">Stock : </label>
           <input type="number" id='stock' placeholder='Enter available' className='outline-none block mx-2 px-4 py-2 border-2 border-black rounded-md  focus-within:border-primary' name='Stock' value={formState.Stock} onChange={(e)=>changeFormData(e)} />  
           </div>
           <div className="flex flex-col sm:flex-row mx-auto w-full sm:items-center justify-center my-3">
            <label className='flex-[0.5] mx-2' htmlFor="description">Description : </label>
            <input type="textbox" id='description' name='description' placeholder='Enter a description for the product...' className='outline-none block mx-2 px-4 py-2 border-2 border-black rounded-md  focus-within:border-primary' value={formState.description} onChange={(e)=>changeFormData(e)} />
           </div>
           <div className="flex flex-col sm:flex-row mx-auto w-full sm:items-center justify-center my-3">
            <label className='flex-[0.5] mx-2' htmlFor="category">Product Category  : </label>
            <select type="select" id='category' className='outline-none block mx-2 px-4 py-2 border-2 border-black rounded-md  focus-within:border-primary' name='category' onChange={(e)=>changeFormData(e)}>
                {productCategories?.map((product,index)=> (<option id={product} key={index} value={`${product}`}>{product}</option>))}
            </select>
            </div>
            
            
              {
                formState.images.length === 0 &&
                <div className="flex flex-col sm:flex-row  w-full sm:items-center justify-center my-3">
                  <label className=' flex flex-col mx-auto items-start justify-center' htmlFor="file">
                     <div className="border-2 border-black h-60 w-36 grid place-content-center rounded-lg focus-within:border-primary group hover:cursor-pointer hover:border-primary">
                        <MdOutlineAddCircleOutline className='text-3xl mx-auto group-hover:text-primary'/>
                        <div className='group-hover:text-primary my-2'>Add images</div>
                      </div>
                  </label>
                  <input type="file" id='file' multiple accept='image/*' className='hidden' name='images' onChange={(e)=>handlePhotoSubmit(e)}/>
              </div>
              }
              
           

            { formState.images.length !== 0  && <div className="flex p-4 justify-end">
                <button onClick={()=> setFormState({...formState, images:[]})} className='p-2 text-lg bg-primary rounded-lg hover:bg-black hover:text-primary duration-300'>Clear Images</button>
              </div>}
            
            <div className="flex w-96 mx-auto overflow-x-scroll">
            {formState.images.length !== 0 && formState.images.map((img,index)=>(
              <div key={index} className="content-stretch mx-2">
               <img src={img} style={{ maxWidth: 'none' }} className='w-72 h-60' alt='Images'/>
              </div>
            ))}  
            </div>
            <button type='submit' className='text-3xl mx-auto py-2 px-3 mt-3 mb-6 bg-primary hover:bg-black hover:text-primary duration-300 ease-in-out rounded-xl'>Submit</button>
      </form>
    </div>
  )
}

export default CreateProduct