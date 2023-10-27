"use client"
import {useState} from 'react';
import TextInput from "@/app/components/TextInput";

export default function Home() {
  const [textInput, setTextInput] = useState("");

  return (
    <TextInput placeholder={"awdad"} value={textInput} onChange={setTextInput} />
  )
}
