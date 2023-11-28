// Importing necessary modules and components
import React from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { Typography } from '@mui/material';
import { LiaShippingFastSolid } from 'react-icons/lia';
import { GiConfirmed } from 'react-icons/gi';
import { BiSolidBank } from 'react-icons/bi';

// Array of steps for the stepper
const steps = [
  {
    label: <Typography>Shipping Details</Typography>,
    icon: <LiaShippingFastSolid />,
  },
  {
    label: <Typography>Confirm Order</Typography>,
    icon: <GiConfirmed />,
  },
  {
    label: <Typography>Payment</Typography>,
    icon: <BiSolidBank />,
  },
];

// Styles for the stepper
const stepStyles = {
  boxSizing: "border-box",
};

// Functional component for rendering the Shipping Stepper
const ShippingStepper = ({ activeStep }) => {
  return (
    <>
      {/* Stepper component for displaying shipping steps */}
      <div className="hidden md:block mt-8">
        <Stepper alternativeLabel activeStep={activeStep} style={stepStyles}>
          {/* Mapping through the steps array to create each step in the stepper */}
          {steps.map((item, index) => (
            <Step
              key={index}
              active={activeStep === index ? true : false}
              completed={activeStep >= index ? true : false}
            >
              <StepLabel icon={item.icon}>{item.label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </div>
    </>
  );
}

// Exporting the ShippingStepper component
export default ShippingStepper;