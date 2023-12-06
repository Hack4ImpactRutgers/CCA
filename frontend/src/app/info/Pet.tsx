import React, { Dispatch, SetStateAction } from 'react'
import Button from '../components/Button';
import TextInput from '../components/TextInput';

interface PetProps {
  petName: string
  petType: string
  breed: string
  age: string
  weight: string
  color: string
  howLong: string
  spendTime: string
  eats: string
  medications: string
  health: string
  extra: string
  setPetName: Dispatch<SetStateAction<string>>;
  setPetType: Dispatch<SetStateAction<string>>;
  setBreed: Dispatch<SetStateAction<string>>;
  setAge: Dispatch<SetStateAction<string>>;
  setWeight: Dispatch<SetStateAction<string>>;
  setColor: Dispatch<SetStateAction<string>>;
  setHowLong: Dispatch<SetStateAction<string>>;
  setSpendTime: Dispatch<SetStateAction<string>>;
  setEats: Dispatch<SetStateAction<string>>;
  setMedications: Dispatch<SetStateAction<string>>;
  setHealth: Dispatch<SetStateAction<string>>;
  setExtra: Dispatch<SetStateAction<string>>;
  setFormPage: Dispatch<SetStateAction<string>>;
  num: number
}

function Pet(props: PetProps) {
  return (
    <form className="">
   
      <div className='mt-5 after:content-["*"] after:text-[red] after:ml-0.5'>
        Pet Name
      </div>
      <TextInput value={props.petName || ''} placeholder={''} onChange={props.setPetName}/>

  
          <div className='mt-5 after:content-["*"] after:text-[red] after:ml-0.5'>
          Type of Pet
          </div>
          <TextInput value={props.petType || ''} placeholder={''} onChange={props.setPetType}/>


      <div className='mt-5 after:content-["*"] after:text-[red] after:ml-0.5'>
          Breed
          </div>
          <TextInput value={props.breed|| ''} placeholder={''} onChange={props.setBreed}/>

          <div className='mt-5 after:content-["*"] after:text-[red] after:ml-0.5'>
          Age
          </div>
          <TextInput value={props.age|| ''} placeholder={''} onChange={props.setAge}/>

          <div className='mt-5 after:content-["*"] after:text-[red] after:ml-0.5'>
          Weight
          </div>
          <TextInput value={props.weight|| ''} placeholder={''} onChange={props.setWeight}/>

          <div className='mt-5 after:content-["*"] after:text-[red] after:ml-0.5'>
          Color/Description
          </div>
          <TextInput value={props.color|| ''} placeholder={''} onChange={props.setColor}/>

          <div className='mt-5 after:content-["*"] after:text-[red] after:ml-0.5'>
          How long have you had this pet?
          </div>
          <TextInput value={props.howLong|| ''} placeholder={''} onChange={props.setHowLong}/>

          <div className='mt-5 after:content-["*"] after:text-[red] after:ml-0.5'>
          Where does this pet spend most of its time?
          </div>
          <TextInput value={props.spendTime|| ''} placeholder={''} onChange={props.setSpendTime}/>

          <div className='mt-5 after:content-["*"] after:text-[red] after:ml-0.5'>
          What does this pet eat? (examples: dry food, can food, table scraps)
          </div>
          <TextInput value={props.eats|| ''} placeholder={''} onChange={props.setEats}/>

          <div className='mt-5'>
          If yes, please list medications
          </div>
          <TextInput value={props.medications|| ''} placeholder={''} onChange={props.setMedications}/>

          <div className='mt-5 after:content-["*"] after:text-[red] after:ml-0.5'>
          To your knowledge, is your pet in good health today?
          </div>
          <TextInput value={props.health|| ''} placeholder={''} onChange={props.setHealth}/>

          <div className='mt-5 after:content-["*"] after:text-[red] after:ml-0.5'>
          Is there anything else you would like us to know about your pet?
          </div>
          <TextInput value={props.extra|| ''} placeholder={''} onChange={props.setExtra}/>

          {props.num==1 && <div onClick={()=>props.setFormPage("Pet2")} className='mt-5 text-right'>
          <Button text="Continue"/>
          </div>}

          {props.num==2 && <div onClick={()=>props.setFormPage("Pet3")} className='mt-5 text-right'>
          <Button text="Continue"/>
          </div>}

          {props.num==3 && <div onClick={()=>props.setFormPage("Assessment")} className='mt-5 text-right'>
          <Button text="Submit"/>
          </div>}

    </form>
  )
}



export default Pet
