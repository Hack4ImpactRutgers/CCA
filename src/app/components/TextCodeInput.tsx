"use client";
import { useEffect, useRef, useState } from "react";

interface TextCodeInputProps {
    codeLength?: number;
}

export default function TextCodeInput(props: TextCodeInputProps) {
    // Assuming default code length is 5 based on Figma design, but can be changed either by passing in a prop or changing the default value here
    const codeLength = props.codeLength || 5;

    // State for the code input fields
    const [code, setCode] = useState<string[]>(Array(codeLength).fill(""));
    const inputs = useRef<HTMLInputElement[]>([]);

    // Auto focus the first input when the component is mounted
    useEffect(() => {
        inputs.current[0].focus();
    }, []);

    /**
     * Function called when user has completed the code.
     * @param typedCode [string] The code that the user typed/pasted in
     */
    function submitCode(typedCode: string) {
        // Do what you want here with the completed code
        console.log("Submitted code:", typedCode);
    }

    /**
     * Handles user input into the code input fields. 
     * @param e [React.KeyboardEvent<HTMLInputElement>]
     */
    function onCodeChange(e: React.KeyboardEvent<HTMLInputElement>) {
        let newCode = [...code];
        // When user presses backspace, clear the current number and go back one input, if possible
        if (e.key === "Backspace") {
            if (e.currentTarget.tabIndex > 0) {
                newCode[e.currentTarget.tabIndex] = "";
                inputs.current[e.currentTarget.tabIndex - 1].focus();
            } else {
                newCode[e.currentTarget.tabIndex] = "";
            }
        }
        // If user types a number, add it to the code and go to the next input, if possible
        else if (!isNaN(parseInt(e.key)) && e.currentTarget.tabIndex < codeLength ) {
            newCode[e.currentTarget.tabIndex] = e.key;
            if (e.currentTarget.tabIndex < codeLength - 1) 
                inputs.current[e.currentTarget.tabIndex + 1].focus();
        }
        // If code is complete, submit it (you can remove this if you want to submit the code when the user clicks a button instead)
        if (newCode.filter(Boolean).length === codeLength) {
            submitCode(newCode.join(""));
        }
        setCode(newCode);
    }

    /**
     * If the user pastes a code, make sure it's all numbers, the right length, and then (optionally) submit it.
     * @param e [React.ClipboardEvent<HTMLInputElement>]
     */
    function onPaste(e: React.ClipboardEvent<HTMLInputElement>) {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text');
        if (pastedData && pastedData.length <= codeLength) {
            const newCode = pastedData.split('');
            setCode(newCode);
            if (newCode.filter(Boolean).length === codeLength) {
                inputs.current[codeLength - 1].focus();
                // If you want the code to autosubmit when pasted, keep the below line. Otherwise, remove it.
                submitCode(pastedData);
            }
        }
    }

    return (
        <div className="flex gap-[22px]">
            {
                Array.from({ length: codeLength }).map((_, index) => {
                    return (
                        <input
                            className="w-[61px] h-[61px] border-[1px] border-primary rounded-[8px] text-center text-[60px] placeholder:translate-y-3"
                            ref={ref => {
                                if (ref) {
                                    inputs.current[index] = ref;
                                }
                            }}
                            onKeyDown={onCodeChange}
                            onPaste={onPaste}
                            onChange={() => {}}
                            placeholder="*"
                            tabIndex={index}
                            key={index}
                            value={code[index] || ""}
                            type="text"
                            maxLength={1}
                        />
                    );

                })
            }
        </div>
    );
}
