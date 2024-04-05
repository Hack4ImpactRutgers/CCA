"use client"
import React, {  useEffect, useState  } from 'react'
import {ReactNode} from "react"
import Link from "next/link"
import Client from './client'
import Pet from './Pet'
import {Button} from '../../components/core/Button'
import Assessment from './Assessment'
import Submit from './Submit'
import Confirmation from './Confirmation'
import { API_BASE_URL } from '../globals';



export default function DeliveryReportForm() { 
    const [formPage, setFormPage] = useState("Client")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [address, setAddress] = useState("")
    const [city, setCity] = useState("")
    const [zipCode, setZipCode] = useState("")
    const [phone, setPhone] = useState("")
    const [instructions, setInstructions] = useState("")
    const [petName1, setPetName1] = useState("")
    const [foodType1, setFoodType1] = useState("")
    const [foodAmount1, setFoodAmount1] = useState("")
    const [petName2, setPetName2] = useState("")
    const [foodType2, setFoodType2] = useState("")
    const [foodAmount2, setFoodAmount2] = useState("")

    const [petName3, setPetName3] = useState("")
    const [foodType3, setFoodType3] = useState("")
    const [foodAmount3, setFoodAmount3] = useState("")

    const [lasting, setLasting]=useState(false)
    const [cup, setCup]=useState(false)
    const [scale, setScale]=useState(false)
    const [comments, setComments] = useState("")
    const [supplies, setSupplies] = useState("")
    const [needs, setNeeds] = useState("")


    const [name,setName]=useState("")
    const [selectedDate,setSelectedDate] = useState(new Date())
    const [updated, setUpdated]=useState(false)
    const [submitted, setSubmitted] = useState(false)

    const [orderId, setOrderId] = useState(null);
    const [volunteerId, setVolunteerId] = useState(null);


const fetchOrderId = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/orders/all`);
      if (response.ok) {
        const orders = await response.json();

        return orders[0]._id;
      } else {
        console.error('Failed to fetch orders');
        return null;
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      return null;
    }
  };
  

  const fetchVolunteerId = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/volunteers`);
      if (response.ok) {
        const volunteers = await response.json();

        return volunteers[0]._id;
      } else {
        console.error('Failed to fetch volunteers');
        return null;
      }
    } catch (error) {
      console.error('Error fetching volunteers:', error);
      return null;
    }
  };
  

    const handleAddDeliveryReport = async () => {
        const deliveryReportData = {
          firstName: firstName,
          lastName: lastName,
          address: address,
          city: city,
          zipCode: zipCode,
          phone: phone,
          instructions: instructions,
          pets: [
            {
              petName: petName1,
              foodType: foodType1,
              foodAmount: foodAmount1
            }
          ],
          lasting: lasting,
          cup: cup,
          scale: scale,
          comments: comments,
          supplies: supplies,
          needs: needs,
          name: name,
          updated: updated,
          selectedDate: selectedDate,
          orderId: orderId, 
          volunteerId: volunteerId, 
        };
      
        // Conditionally add pet 2
        if (petName2.trim() !== "") {
          deliveryReportData.pets.push({
            petName: petName2,
            foodType: foodType2,
            foodAmount: foodAmount2
          });
        }
      

        if (petName3.trim() !== "") {
          deliveryReportData.pets.push({
            petName: petName3,
            foodType: foodType3,
            foodAmount: foodAmount3
          });
        }
      
        try {
          const response = await fetch(`${API_BASE_URL}/delivery`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(deliveryReportData),
          });
      
          if (response.ok) {
            const data = await response.json();

            console.log('Delivery report added successfully:', data);
          } else {

            console.error('Failed to add delivery report:', response.statusText);
          }
        } catch (error) {

          console.error('Error adding delivery report:', error);
        }
      };

      useEffect(() => {
        const fetchOrder = async () => {
            const id = await fetchOrderId();
            setOrderId(id);
          };
          fetchOrder()

          const fetchVolunteer = async () => {
            const id = await fetchVolunteerId();
            setVolunteerId(id);
          };
          fetchVolunteer()
    }, []);


    useEffect(() => {
        if(formPage=="Confirm"){
            handleAddDeliveryReport()
          }
        window.scrollTo(0, 0)
    }, [formPage]);


    
    return (
      <div>
        {formPage !== "Confirm" && (
          <div>
        <div className="font-bold flex items-center justify-center border-b-2 border-black">
          <h1>Delivery Report </h1>
        </div>
        <div className="flex h-screen ">
          <div className='flex flex-col  px-8 py-6 w-fit border-r-2 border-black'>
           
              <button className={`text-left ${formPage=="Client" && 'font-bold text-secondary'}`} >Client</button>
              <button className={`text-left ${formPage=="Pet1" && 'font-bold text-secondary'}`}>Pet 1</button>
              <button className={`text-left ${formPage=="Pet2" && 'font-bold text-secondary'}`}>Pet 2</button>
              <button className={`text-left ${formPage=="Pet3" && 'font-bold text-secondary'}`}>Pet 3</button>
              <button className={`text-left ${formPage=="Assessment" && 'font-bold text-secondary'}`}>Needs Assessment</button>
              <button className={`text-left ${formPage=="Submit" && 'font-bold text-secondary'}`}>Submit</button>
          
          </div>
          <div className='mx-10 my-5'>
              {formPage=="Client" && <Client first={firstName} setFirst={setFirstName} last = {lastName} setLast={setLastName} address={address} setAddress={setAddress} city={city} setCity={setCity} zip={zipCode} setZip={setZipCode} phone={phone} setPhone={setPhone} instructions={instructions} setInstructions={setInstructions} setFormPage={setFormPage}/>}
              {formPage=="Pet1" && <Pet petName={petName1} setPetName={setPetName1} foodType={foodType1} setFoodType={setFoodType1} foodAmount={foodAmount1} setFoodAmount={setFoodAmount1}  setFormPage={setFormPage} num={1}/>}
              {formPage=="Pet2" && <Pet petName={petName2} setPetName={setPetName2} foodType={foodType2} setFoodType={setFoodType2} foodAmount={foodAmount2} setFoodAmount={setFoodAmount2}  setFormPage={setFormPage} num={2}/>}
              {formPage=="Pet3" && <Pet petName={petName3} setPetName={setPetName3} foodType={foodType3} setFoodType={setFoodType3} foodAmount={foodAmount3} setFoodAmount={setFoodAmount3}  setFormPage={setFormPage} num={3}/>}
              {formPage === "Assessment" && < Assessment lasting={lasting} setLasting={setLasting} comments={comments} setComments={setComments} supplies={supplies} setSupplies={setSupplies} needs={needs} setNeeds={setNeeds} cup={cup} setCup={setCup} scale={scale} setScale={setScale} setFormPage={setFormPage} />}
              {formPage=="Submit" && < Submit name={name} setName={setName} selectedDate={selectedDate} setSelectedDate={setSelectedDate} updated={updated} setUpdated={setUpdated} setFormPage={setFormPage} submitted={submitted} setSubmitted={setSubmitted}/>}
        
          </div>
          
          
          
         </div>
         </div>
        )}
        {formPage=="Confirm"&& <Confirmation/>}
         </div>
  
    )

    
    
}