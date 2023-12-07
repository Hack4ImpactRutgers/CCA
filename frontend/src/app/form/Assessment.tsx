import React, { Dispatch, SetStateAction } from 'react'
import Button from '../components/Button';
import Checkbox from '../components/Checkbox';
import RadioButton from '../components/RadioButton';
import TextInput from '../components/TextInput';

interface AssessmentProps {
    lasting: boolean
    setLasting: Dispatch<SetStateAction<boolean>>;
    setFormPage: Dispatch<SetStateAction<string>>;
}

function Assessment(props: AssessmentProps) {



  return (
    <form className="">
        <div className='after:content-["*"] after:text-[red] after:ml-0.5'>
        Is the amount of food lasting the whole month?
      </div>

      <div className="flex">
      <RadioButton truth={true} check={props.lasting} change={props.setLasting} />
      <label className='ml-3'>Yes</label>
        <div className='ml-10'>
      <RadioButton truth={false} check={props.lasting} change={props.setLasting}/>
      </div>
      <label className='ml-3'>No</label>
      </div>

      <div onClick={()=>props.setFormPage("Submit")} className='mt-5 text-right'>
          <Button text="Continue"/>
          </div>

    </form>
  )
}



export default Assessment