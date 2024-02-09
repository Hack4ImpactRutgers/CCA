"use client"
import React, {  useEffect, useState  } from 'react'
import {ReactNode} from "react"
import Link from "next/link"
import Client from './Client'
import Pet from './Pet'
import Button from '../components/Button'
import Information from './Information'
import Confirmation from './Confirmation'


export default function InformationForm() { 
    const [formPage, setFormPage] = useState("Client")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [site,setSite] = useState("")
    const [address, setAddress] = useState("")
    const [city, setCity] = useState("")
    const [zipCode, setZipCode] = useState("")
    const [phone, setPhone] = useState("")
    const [secondFirst, setSecondFirst] = useState("")
    const [secondLast, setSecondLast] = useState("")
    const [secondPhone, setSecondPhone] = useState("")

    const [litter, setLitter]=useState(false)
    const [supplies, setSupplies]=useState(false)
    const [petMedication, setPetMedication] = useState(false);
const [vetServices, setVetServices] = useState(false);
const [petTransport, setPetTransport] = useState(false);
const [petWalking, setPetWalking] = useState(false);
const [boarding, setBoarding] = useState(false);
const [other, setOther] = useState(false);


    const [petName1, setPetName1] = useState("")
    const [petType1, setPetType1] = useState("")
    const [breed1, setBreed1] = useState("")
    const [age1, setAge1] = useState("")
    const [weight1, setWeight1] = useState("")
    const [color1, setColor1] = useState("")
    const [howLong1, setHowLong1] = useState("")
    const [spendTime1, setSpendTime1] = useState("")
    const [eats1, setEats1] = useState("")
    const [medications1, setMedications1] = useState("")
    const [health1, setHealth1]=useState("")
    const [extra1,setExtra1]=useState("")
    const [sprayed1, setSprayed1] = useState(false);
const [vaccinated1, setVaccinated1] = useState(false);
const [heartworm1, setHeartworm1] = useState(false);
const [flea1, setFlea1] = useState(false);
const [take1, setTake1] = useState(false);

    

    const [petName2, setPetName2] = useState("");
const [petType2, setPetType2] = useState("");
const [breed2, setBreed2] = useState("");
const [age2, setAge2] = useState("");
const [weight2, setWeight2] = useState("");
const [color2, setColor2] = useState("");
const [howLong2, setHowLong2] = useState("");
const [spendTime2, setSpendTime2] = useState("");
const [eats2, setEats2] = useState("");
const [medications2, setMedications2] = useState("");
const [health2, setHealth2] = useState("");
const [extra2, setExtra2] = useState("");
const [sprayed2, setSprayed2] = useState(false);
const [vaccinated2, setVaccinated2] = useState(false);
const [heartworm2, setHeartworm2] = useState(false);
const [flea2, setFlea2] = useState(false);
const [take2, setTake2] = useState(false);



const [petName3, setPetName3] = useState("");
const [petType3, setPetType3] = useState("");
const [breed3, setBreed3] = useState("");
const [age3, setAge3] = useState("");
const [weight3, setWeight3] = useState("");
const [color3, setColor3] = useState("");
const [howLong3, setHowLong3] = useState("");
const [spendTime3, setSpendTime3] = useState("");
const [eats3, setEats3] = useState("");
const [medications3, setMedications3] = useState("");
const [health3, setHealth3] = useState("");
const [extra3, setExtra3] = useState("");
const [sprayed3, setSprayed3] = useState(false);
const [vaccinated3, setVaccinated3] = useState(false);
const [heartworm3, setHeartworm3] = useState(false);
const [flea3, setFlea3] = useState(false);
const [take3, setTake3] = useState(false);


useEffect(() => {
  window.scrollTo(0, 0)
}, [formPage]);
    

  return (
    <div>
      {formPage !== "Confirm" && (
      <div className="flex h-full ">
        <div className='text-lg flex flex-col  px-8 py-6 w-fit border-r-2 border-black'>
         
            <button className={`text-left ${formPage=="Client" && 'font-bold text-secondary'}`} >Client</button>
            <button className={`text-left ${formPage=="Information" && 'font-bold text-secondary'}`} >Pet Information</button>
            <button className={`text-left ${formPage=="Pet1" && 'font-bold text-secondary'}`}>Pet 1</button>
            <button className={`text-left ${formPage=="Pet2" && 'font-bold text-secondary'}`}>Pet 2</button>
            <button className={`text-left ${formPage=="Pet3" && 'font-bold text-secondary'}`}>Pet 3</button>
            
        
        </div>
        <div className='mx-10 my-5'>
            {formPage=="Client" && <Client first={firstName} setFirst={setFirstName} last = {lastName} setLast={setLastName} site ={site} setSite={setSite} address={address} setAddress={setAddress} city={city} setCity={setCity} zip={zipCode} setZip={setZipCode} phone={phone} setPhone={setPhone} secondFirst={secondFirst} setSecondFirst={setSecondFirst} secondLast={secondLast} setSecondLast={setSecondLast} secondPhone={secondPhone} setSecondPhone={setSecondPhone} setFormPage={setFormPage}/>}
            {formPage === "Information" && <Information litter={litter} setLitter={setLitter} supplies={supplies} setSupplies={setSupplies} petMedication={petMedication} setPetMedication={setPetMedication} vetServices={vetServices} setVetServices={setVetServices} petTransport={petTransport} setPetTransport={setPetTransport} petWalking={petWalking} setPetWalking={setPetWalking} boarding={boarding} setBoarding={setBoarding} other={other} setOther={setOther} setFormPage={setFormPage} />}

            {formPage === "Pet1" && <Pet petName={petName1} setPetName={setPetName1} petType={petType1} setPetType={setPetType1} breed={breed1} setBreed={setBreed1} age={age1} setAge={setAge1} weight={weight1} setWeight={setWeight1} color={color1} setColor={setColor1} howLong={howLong1} setHowLong={setHowLong1} spendTime={spendTime1} setSpendTime={setSpendTime1} eats={eats1} setEats={setEats1} medications={medications1} setMedications={setMedications1} health={health1} setHealth={setHealth1} extra={extra1} setExtra={setExtra1} sprayed={sprayed1} setSprayed={setSprayed1} vaccinated={vaccinated1} setVaccinated={setVaccinated1} heartworm={heartworm1} setHeartworm={setHeartworm1} flea={flea1} setFlea={setFlea1} take={take1} setTake={setTake1} setFormPage={setFormPage} num={1} />}

            {formPage === "Pet2" && <Pet petName={petName2} setPetName={setPetName2} petType={petType2} setPetType={setPetType2} breed={breed2} setBreed={setBreed2} age={age2} setAge={setAge2} weight={weight2} setWeight={setWeight2} color={color2} setColor={setColor2} howLong={howLong2} setHowLong={setHowLong2} spendTime={spendTime2} setSpendTime={setSpendTime2} eats={eats2} setEats={setEats2} medications={medications2} setMedications={setMedications2} health={health2} setHealth={setHealth2} extra={extra2} setExtra={setExtra2} sprayed={sprayed2} setSprayed={setSprayed2} vaccinated={vaccinated2} setVaccinated={setVaccinated2} heartworm={heartworm2} setHeartworm={setHeartworm2} flea={flea2} setFlea={setFlea2} take={take2} setTake={setTake2} setFormPage={setFormPage} num={2} />}

            {formPage === "Pet3" && <Pet petName={petName3} setPetName={setPetName3} petType={petType3} setPetType={setPetType3} breed={breed3} setBreed={setBreed3} age={age3} setAge={setAge3} weight={weight3} setWeight={setWeight3} color={color3} setColor={setColor3} howLong={howLong3} setHowLong={setHowLong3} spendTime={spendTime3} setSpendTime={setSpendTime3} eats={eats3} setEats={setEats3} medications={medications3} setMedications={setMedications3} health={health3} setHealth={setHealth3} extra={extra3} setExtra={setExtra3} sprayed={sprayed3} setSprayed={setSprayed3} vaccinated={vaccinated3} setVaccinated={setVaccinated3} heartworm={heartworm3} setHeartworm={setHeartworm3} flea={flea3} setFlea={setFlea3} take={take3} setTake={setTake3} setFormPage={setFormPage} num={3} />}

      
        </div>
        
        
        
       </div>
      )}
      {formPage=="Confirm"&& <Confirmation/>}
       </div>

  )
}


