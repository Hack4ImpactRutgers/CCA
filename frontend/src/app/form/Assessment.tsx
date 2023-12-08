import React, { Dispatch, SetStateAction } from 'react'
import Button from '../components/Button';
import Checkbox from '../components/Checkbox';
import RadioButton from '../components/RadioButton';
import TextInput from '../components/TextInput';

interface AssessmentProps {
    lasting: boolean
    cup: boolean
    scale: boolean
    comments: string
    supplies: string
    needs: string
    setLasting: Dispatch<SetStateAction<boolean>>;
    setCup: Dispatch<SetStateAction<boolean>>;
    setScale: Dispatch<SetStateAction<boolean>>;
    setComments: Dispatch<SetStateAction<string>>;
    setSupplies: Dispatch<SetStateAction<string>>;
    setNeeds: Dispatch<SetStateAction<string>>;
    setFormPage: Dispatch<SetStateAction<string>>;
}

function Assessment(props: AssessmentProps) {

  const handleCupChange = () => {

    props.setCup(!(props.cup));
    console.log(props.cup)

  };

  const handleScaleChange = () => {

    props.setScale(!(props.scale));

  };

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
      <div className='mr-10'>
      If not, let’s work with the client to learn why.  For example, providing a measuring cup for the pet food and weighing the pet could be helpful:
      </div>

      <div className="flex">
      <Checkbox checked={props.cup} handleChange={handleCupChange }/>
      <div className='ml-1'>
      Measuring Cup
      </div>
      <div className='ml-5'>
      <Checkbox checked={props.scale} handleChange={handleScaleChange }/>
      </div>
      <div className='ml-1'>
      Pet Scale
      </div>
      </div>
      
      <div className='mt-5 after:content-["*"] after:text-[red] after:ml-0.5'>
        Additional Suggestions or comments
      </div>
      <TextInput value={props.comments || ''} placeholder={''} onChange={props.setComments }/>

      <div className='mt-5 after:content-["*"] after:text-[red] after:ml-0.5'>
        Does the client need any other supplies (collars, leashes,bowls, etc)?
      </div>
      <TextInput value={props.supplies || ''} placeholder={''} onChange={props.setSupplies }/>

      <div className='mt-5 after:content-["*"] after:text-[red] after:ml-0.5'>
        Are there any other pet related needs at this time (vet visit/medication)?
      </div>
      <TextInput value={props.needs || ''} placeholder={''} onChange={props.setNeeds }/>



      <div onClick={()=>props.setFormPage("Submit")} className='mt-5 text-right'>
          <Button text="Continue"/>
          </div>

    </form>
  )
}



export default Assessment