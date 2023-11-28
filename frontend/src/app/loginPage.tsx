"use client"
import './globals.css'
import {useState} from 'react';
import TextInput from "@/app/components/TextInput";
import Button from "@/app/components/Button";
import LoginButton from "@/app/components/LoginButton";
import Header from './components/Header';
import Image from 'next/image';
import image1 from '/public/svg/image1.png';



export default function LoginPage() {
  const [textInput, setTextInput] = useState("");
  const [selectedOption, setSelectedOption] = useState("");

  const handleAdminClick = (): void =>{
    setSelectedOption("admin");
  }
  const handleVolunteerClick = (): void =>{
    setSelectedOption("volunteer");
  }

  return (
    <div id="fullPage">
      {/* 
      <TextInput placeholder={"awdad"} value={textInput} onChange={setTextInput} />
      <Button text={"awdad"}></Button>
      */}
      <div id="header">
        <Header/>
      </div>


      <div id="mainComps">
        <div id="admvol">


          <div style={{width: "fit-content", height:"fit-content", float:"left", margin:"auto", marginRight:"20px"}}>
            <LoginButton text={'Admin'} onClick={handleAdminClick} active={true}/>
          </div>

          <div style={{width: "fit-content", height:"fit-content", float:"left", margin:"auto"}}>
            <LoginButton text={'Volunteer'} onClick={handleVolunteerClick} active={true}/>
          </div>

          
        </div>
        <div style={{height:"fit-content", width:"100%", float:"left"}}>
          <div id="image">
            <Image src={image1} alt="image" layout="responsive" width={300} height={300} />
          </div>
        </div>

        {selectedOption === "admin" && (
          <div id="adminContent">
            {/* Content specific to the Admin option */}
            <div style={{margin: 'auto', height:"fit-content", width:"fit-content"}}><h1>Account Login</h1></div>
              <div style={{width:'fit-content', margin:'auto', marginTop:'4%', marginBottom:'4%'}} id="userInput">
                <TextInput placeholder={"Username"} value={textInput} onChange={setTextInput}/>
              </div>
              <div style={{width:'fit-content', margin:'auto', marginTop:'4%', marginBottom:'4%'}} id="passwordInput">
                <TextInput placeholder={"Password"} value={textInput} onChange={setTextInput}/>
            </div>
          </div>
        )}

        {selectedOption === "volunteer" && (
          <div id="volunteerContent">
            {/* Content specific to the Volunteer option */}
            <div style={{margin: 'auto', height:"fit-content", width:"fit-content"}}><h1>Account Login</h1></div>
              <div style={{width:'fit-content', margin:'auto', marginTop:'4%', marginBottom:'4%'}} id="passwordInput">
                <TextInput placeholder={"Password"} value={textInput} onChange={setTextInput}/>
            </div>
          </div>
        )}

        
        <div id="forPass">
          Forgot Username or Password?
        </div>
        <div id="logButton">
          <Button text={"Login"}></Button>
        </div>
        
      </div>

    </div>
    
  )
}