import React from 'react'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { Typography } from '@mui/material';
import {LiaShippingFastSolid} from 'react-icons/lia'
import {GiConfirmed} from 'react-icons/gi'
import {BiSolidBank} from 'react-icons/bi'


const steps = [
    {
        label : <Typography>Shipping Details</Typography>,
        icon : <LiaShippingFastSolid/>
    },
    {
        label : <Typography>Confirm Order</Typography>,
        icon : <GiConfirmed/>
    },
    {
        label : <Typography>Payment</Typography>,
        icon : <BiSolidBank/>
    }
]

const stepStyles = {
    boxSizing : "border-box"
}

const ShippingStepper = ({activeStep}) => {
  return (
    <>
        <div className="hidden md:block mt-8">
            <Stepper alternativeLabel activeStep={activeStep} style={stepStyles} >
                {steps.map((item,index)=>{
                    return <Step key={index}
                     active={activeStep===index ? true : false}
                     completed={activeStep >= index ? true : false}
                     ><StepLabel icon={item.icon}>{item.label}</StepLabel></Step>
                })}
            </Stepper>
        </div>
    </>
    
  )
}

export default ShippingStepper