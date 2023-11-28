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
  const [userTextInput, setUserTextInput] = useState("");
  const [passTextInput, setPassTextInput] = useState("");
  const [nameTextInput, setNameTextInput] = useState("");
  const [phoneTextInput, setPhoneTextInput] = useState("");
  const [emailTextInput, setEmailTextInput] = useState("");
  const [selectedOption, setSelectedOption] = useState("admin");

  const handleAdminClick = (): void =>{
    setSelectedOption("admin");
  }
  const handleVolunteerClick = (): void =>{
    setSelectedOption("volunteer");
  }
  
  const forgotPassword = (): void =>{
    setSelectedOption("forgotPass")
  }
  const volSignUp = (): void =>{
    setSelectedOption("volSignUp")
  }

  const admLoginButton = (): void =>{
    setSelectedOption("admLoggingIn")
  }

  const volunteerConfirm = (): void =>{
    setSelectedOption("volLogInConfirm")
  }

  const volunteerSigningUpConfirm = (): void =>{
    setSelectedOption("volSignUpConfirm")
  }

    const handleLoginKey = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter') {
      // Trigger the click event of the login button
      if (selectedOption == 'admin') {
        admLoginButton();
      }
      if (selectedOption == 'volunteer') {
        volunteerConfirm();
      }
      if (selectedOption == 'volSignUp') {
        volunteerSigningUpConfirm();
      }

    }
  };

  
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
          <div>


          <div id="adminContent">
            <div style={{margin: 'auto', height:"fit-content", width:"fit-content"}}><h1>Account Login</h1></div>
              <div style={{width:'fit-content', margin:'auto', marginTop:'4%', marginBottom:'4%'}} id="userInput">
                <TextInput placeholder={"Username"} value={userTextInput} onChange={setUserTextInput}/>
              </div>
              <div style={{width:'fit-content', margin:'auto', marginTop:'4%', marginBottom:'4%'}} id="passwordInput">
                <TextInput placeholder={"Password"} value={passTextInput} onChange={setPassTextInput}/>
            </div>
          </div>

          <div id="smallLinks" >
            <button onClick={forgotPassword}>
              Forgot Username or Password?
            </button>
          </div>

          <div id="logButton">
            <Button onClick={admLoginButton} text={"Login"}></Button>
          </div>


          </div>
        )}


        {selectedOption === "admLoggingIn" && (
          <div>


          admLoggingIn TBD


          </div>
        )}








        {selectedOption === "volunteer" && (
          <div>


          <div id="volunteerContent">
            <div style={{margin: 'auto', height:"fit-content", width:"fit-content"}}><h1>Login</h1></div>
              
            <div style={{width:'fit-content', margin:'auto', marginTop:'4%', marginBottom:'4%'}} id="nameInput">
              <TextInput placeholder={"Name *"} value={nameTextInput} onChange={setNameTextInput}/>
            </div>

            <div style={{width:'fit-content', margin:'auto', marginTop:'4%', marginBottom:'4%'}} id="emailInput">
              <TextInput placeholder={"Email *"} value={emailTextInput} onChange={setEmailTextInput}/>
            </div>

          </div>

          <div id="smallLinks" >
            <button onClick={volSignUp}>
              Signup
            </button>
          </div>

          <div id="logButton">
            <Button onClick={volunteerConfirm} text={"Confirm"}></Button>
          </div>


        </div>
        )}

        {selectedOption === "volLogInConfirm" && (
          <div>


          volLogInConfirm TBD


          </div>
        )}






        {selectedOption === "forgotPass" && (
          <div>

            
          <div id="forgotPassContent">
            forgot pass! TBD

          </div>


          </div>
        )}







        {selectedOption === "volSignUp" && (
          <div>


          <div id="volSignUpContent">
            <div style={{margin: 'auto', height:"fit-content", width:"fit-content"}}><h1>Sign Up</h1></div>
            
            <div style={{width:'fit-content', margin:'auto', marginTop:'4%', marginBottom:'4%'}} id="nameInput">
              <TextInput placeholder={"Name *"} value={nameTextInput} onChange={setNameTextInput}/>
            </div>

            <div style={{width:'fit-content', margin:'auto', marginTop:'4%', marginBottom:'4%'}} id="numberInput">
              <TextInput placeholder={"Phone Number *"} value={phoneTextInput} onChange={setPhoneTextInput}/>
            </div>

            <div style={{width:'fit-content', margin:'auto', marginTop:'4%', marginBottom:'4%'}} id="emailInput">
              <TextInput placeholder={"Email *"} value={emailTextInput} onChange={setEmailTextInput}/>
            </div>
          </div>

          <div id="logButton">
            <Button onClick={volunteerSigningUpConfirm} text={"Confirm"}></Button>
          </div>


          </div>
        )}

        {selectedOption === "volSignUpConfirm" && (
          <div style={{margin: 'auto', height:"fit-content", width:"100%", float:"left", marginTop:"50px"}}>
            <h1>Confirmed</h1>
          </div>
        )}

        
        
        
      </div>

    </div>
    
  )
}