"use client";
import { Dispatch, SetStateAction, useState } from "react";

interface TextInputProps {
  value: string;
  onChange: Dispatch<SetStateAction<string>>;
  placeholder: string;
  type?: "text" | "password";
}

/**
 * Styled text input for text and password fields.
 */
export default function TextInput(props: TextInputProps) {
  return (
    <input
      onChange={(e) => props.onChange(e.currentTarget.value)}
      value={props.value}
      className="border rounded-lg border-primary h-[49px] w-[395px] font-secondary font-light placeholder-primary text-primary indent-3 text-lg focus:outline-none focus:ring focus:ring-secondary"
      placeholder={props.placeholder}
      type={props.type ?? "text"}
    />
  );
}
