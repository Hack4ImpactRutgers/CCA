"use client"
import './globals.css'
import {useState} from 'react';
import TextInput from "@/app/components/TextInput";
import Button from "@/app/components/Button";

export default function Home() {
  const [textInput, setTextInput] = useState("");
  

  return (
    <div id="fullPage">
      {/* 
      <TextInput placeholder={"awdad"} value={textInput} onChange={setTextInput} />
      <Button text={"awdad"}></Button>
      */}
      <div id="header">
        will be the header
      </div>


      <div id="mainComps">
        <div id="admvol">
          <div id="admVolButton"></div>
          <div id="admVolButton"></div>
        </div>
        <div id="image">
          <img src="image.png" alt="image"/>
        </div>
        <div><h1>Account Login</h1></div>
        <div id="txtInput">
          <TextInput placeholder={"Username"} value={textInput} onChange={setTextInput}/>
        </div>
        <div id="txtInput">
          <TextInput placeholder={"Password"} value={textInput} onChange={setTextInput}/>
        </div>
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
