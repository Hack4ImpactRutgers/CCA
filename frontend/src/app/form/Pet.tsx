import React, { Dispatch, SetStateAction } from 'react'
import {Button} from '../../components/core/Button';
import {TextInput} from '../../components/core/TextInput';

interface PetProps {
  petName: string
  foodType: string
  foodAmount: string
  setPetName: Dispatch<SetStateAction<string>>;
  setFoodType: Dispatch<SetStateAction<string>>;
  setFoodAmount: Dispatch<SetStateAction<string>>;
  setFormPage: Dispatch<SetStateAction<string>>;
  num: number
}

function Pet(props: PetProps) {
  return (
    <form className="">
   
      <div className='mt-5'>
        Pet Name
      </div>
      <TextInput value={props.petName || ''} placeholder={''} onChange={props.setPetName}/>

  
          <div className='mt-5 '>
          Type of Food
          </div>
          <TextInput value={props.foodType || ''} placeholder={''} onChange={props.setFoodType}/>
      

      <div className='mt-5 '>
          Amount of Food Per Month
          </div>

          <TextInput value={props.foodAmount || ''} placeholder={''} onChange={props.setFoodAmount}/>
        <div className='flex flex-row'>
          {<div onClick={()=>props.setFormPage("Assessment")} className='mt-5'>
          <Button text="Continue"/>
          </div>}

          {props.num==1 && <div onClick={()=>props.setFormPage("Pet2")} className='mt-5 ml-5 text-right'>
          <Button text="Add Pet"/>
          </div>}

          {props.num==2 && <div onClick={()=>props.setFormPage("Pet3")} className='mt-5 ml-5 text-right'>
          <Button text="Add Pet"/>
          </div>}
          </div>

    </form>
  )
}



export default Pet