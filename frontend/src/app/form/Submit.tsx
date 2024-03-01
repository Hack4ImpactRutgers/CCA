import React, { Dispatch, SetStateAction } from 'react'
import Button from '../components/Button';
import Checkbox from '../components/Checkbox';
import RadioButton from '../components/RadioButton';
import TextInput from '../components/TextInput';
import DatePicker from '../components/DatePicker';

interface SubmitProps {
    name: string
    updated: boolean
    selectedDate: Date
    setName: Dispatch<SetStateAction<string>>;
    setUpdated: Dispatch<SetStateAction<boolean>>;
    setSelectedDate: Dispatch<SetStateAction<Date>>;
    setFormPage: Dispatch<SetStateAction<string>>;

}

function Submit(props: SubmitProps) {

 

  return (
    <form className="">
        <div className='after:content-["*"] after:text-[red] after:ml-0.5'>
            Volunteer Name
      </div>
      <TextInput value={props.name || ''} placeholder={''} onChange={props.setName}/>
      
      <div className='after:content-["*"] after:text-[red] after:ml-0.5'>
            Date Delivered
      </div>
      <DatePicker selectedDate={props.selectedDate} onChange={ props.setSelectedDate }  />

      <div className='after:content-["*"] after:text-[red] after:ml-0.5'>
        Is there any information that needs to be updated?
      </div>
      
      <div className="flex">
      <RadioButton truth={true} check={props.updated} change={props.setUpdated} />
      <label className='ml-3'>Yes</label>
        <div className='ml-10'>
      <RadioButton truth={false} check={!props.updated} change={props.setUpdated}/>
      </div>
      <label className='ml-3'>No</label>
      </div>

      <div onClick={()=>props.setFormPage("Confirm")} className='mt-5 text-right'>
          <Button text="Submit"/>
          </div>

    </form>
  )
}



export default Submit