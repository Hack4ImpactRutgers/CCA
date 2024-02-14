'use client';
import { FC, useState } from 'react';
import { TextInput } from '@/components/core/TextInput';
import { Button } from '@/components/core/Button';
import { LoginButton } from '@/components/auth/LoginButton';
import { Navbar } from '@/components/core/Navbar';
import Image from 'next/image';
import image1 from '/public/images/logo.png';
import Link from 'next/link';
import { CodeInput } from '@/components/auth/CodeInput';

export default function LoginPage() {
    const [userTextInput, setUserTextInput] = useState('');
    const [passTextInput, setPassTextInput] = useState('');
    const [nameTextInput, setNameTextInput] = useState('');
    const [phoneTextInput, setPhoneTextInput] = useState('');
    const [emailTextInput, setEmailTextInput] = useState('');
    const [selectedOption, setSelectedOption] = useState('admin');

    const handleAdminClick = (): void => {
        setSelectedOption('admin');
    };
    const handleVolunteerClick = (): void => {
        setSelectedOption('volunteer');
    };

    const forgotPassword = (): void => {
        setSelectedOption('forgotPass');
    };
    const volSignUp = (): void => {
        setSelectedOption('volSignUp');
    };

    const admLoginButton = (): void => {
        setSelectedOption('admLoggingIn');
    };

    const volunteerConfirm = (): void => {
        setSelectedOption('volLogInConfirm');
    };
    const volunteerConfirm2 = (): void => {
      setSelectedOption('volLogInConfirm2');
  };

    const volunteerSigningUpConfirm = (): void => {
        setSelectedOption('volSignUpConfirm');
    };

    const handleLoginKey = (
        event: React.KeyboardEvent<HTMLInputElement>
    ): void => {
        if (event.key === 'Enter') {
            // Trigger the click event of the login button
            if (selectedOption == 'admin') {
                admLoginButton();
            }
            if (selectedOption == 'volunteer') {
                volunteerConfirm();
            }
            if (selectedOption == 'volunteer2') {
                volunteerConfirm2();
            }
            if (selectedOption == 'volSignUp') {
                volunteerSigningUpConfirm();
            }
        }
    };

    return (
        <div id="fullPage" className="bg-white">
            {/* 
      <TextInput placeholder={"awdad"} value={textInput} onChange={setTextInput} />
      <Button text={"awdad"}></Button>
      */}
            <div className="h-10 min-h-10 bg-primary-color">
                <Navbar />
            </div>

            <div className="w-auto h-96 m-auto">
                <div className="flex justify-center items-center h-auto w-auto mt-10">
                    <div className="mr-1">
                        <LoginButton
                            text={'Admin'}
                            onClick={handleAdminClick}
                            active={true}
                        />
                    </div>

                    <div className="ml-1">
                        <LoginButton
                            text={'Volunteer'}
                            onClick={handleVolunteerClick}
                            active={true}
                        />
                    </div>
                </div>

                <div className="flex justify-center items-center">
                    <div className="h-239 w-239 mx-auto">
                        <Image
                            src={image1}
                            alt="image"
                            width={239}
                            height={239}
                        />
                    </div>
                </div>

                {selectedOption === 'admin' && (
                    <div  className="flex flex-col justify-center items-center">
                        <div id="adminContent">
                            <div>
                                <h1 className="font-bold font-roboto text-2xl text-center mt-2 mb-2">Account Login</h1>
                            </div>
                            <div
                                className="mt-4 mb-4"
                                id="userInput"
                            >
                                <TextInput
                                    placeholder={'Username'}
                                    value={userTextInput}
                                    onChange={setUserTextInput}
                                />
                            </div>
                            <div
                                className="mt-4 mb-4"
                                id="passwordInput"
                            >
                                <TextInput
                                    placeholder={'Password'}
                                    value={passTextInput}
                                    onChange={setPassTextInput}
                                />
                            </div>
                        </div>

                        <div className="font-bold font-roboto text-xs mx-auto w-full text-center pb-3 text-secondary">
                            <button onClick={forgotPassword}>
                                Forgot Username or Password?
                            </button>
                        </div>

                        <div id="logButton">
                            <Button
                                onClick={admLoginButton}
                                text={'Login'}
                            ></Button>
                        </div>
                    </div>
                )}

                {selectedOption === 'admLoggingIn' && (
                    <div>
                        <div className="flex flex-col justify-center items-center">
                            <h1 className="font-bold font-roboto text-2xl text-center mt-2 mb-2">Confirmed</h1>
                        </div>
                    </div>
                )}

                {selectedOption === 'volunteer' && (
                    <div className="flex flex-col justify-center items-center">
                        <div id="volunteerContent" >
                            <div>
                                <h1 className="font-bold font-roboto text-2xl text-center mt-2 mb-2">Login</h1>
                            </div>

                            <div 
                                className="mt-4 mb-4"
                                id="nameInput"
                            >
                                <TextInput
                                    placeholder={'Name *'}
                                    value={nameTextInput}
                                    onChange={setNameTextInput}
                                />
                            </div>

                            <div
                                className="mt-4 mb-4"
                                id="emailInput"
                            >
                                <TextInput
                                    placeholder={'Email *'}
                                    value={emailTextInput}
                                    onChange={setEmailTextInput}
                                />
                            </div>
                        </div>

                        <div className="font-bold font-roboto text-xs mx-auto w-full text-center pb-3 text-secondary">
                            <button onClick={volSignUp}>Signup</button>
                        </div>

                        <div id="logButton" className="m-auto">
                            <Button
                                onClick={volunteerConfirm}
                                text={'Confirm'}
                            ></Button>
                        </div>
                    </div>
                )}

                {selectedOption === 'volLogInConfirm' && (
                    <div  className="flex flex-col justify-center items-center">
                        <div className="mx-auto text-center mt-4">
                            Enter the code sent to your email
                            <div className="mt-4 mb-4">
                                <CodeInput />
                            </div>
                        </div>
                        <div id="logButton">
                            <Button
                                onClick={volunteerConfirm2}
                                text={'Confirm'}
                            ></Button>
                        </div>
                    </div>
                )}

                {selectedOption === 'volLogInConfirm2' && (
                    <div className="flex flex-col justify-center items-center">
                      <h1 className="font-bold font-roboto text-2xl text-center mt-2 mb-2">Logged In!</h1>
                    </div>
                )}

                {selectedOption === 'forgotPass' && (
                    <div>
                        <div id="forgotPassContent">
                            <div className="flex flex-col justify-center items-center">
                                <h1 className="font-bold font-roboto text-2xl text-center mt-2 mb-2">forgot pass! TBD</h1>
                            </div>
                        </div>
                    </div>
                )}

                {selectedOption === 'volSignUp' && (
                    <div  className="flex flex-col justify-center items-center">
                        <div id="volSignUpContent">
                            <div>
                                <h1 className="font-bold font-roboto text-2xl text-center mt-2 mb-2">Sign Up</h1>
                            </div>

                            <div
                                className="mt-4 mb-4"
                                id="nameInput"
                            >
                                <TextInput
                                    placeholder={'Name *'}
                                    value={nameTextInput}
                                    onChange={setNameTextInput}
                                />
                            </div>

                            <div
                                className="mt-4 mb-4"
                                id="numberInput"
                            >
                                <TextInput
                                    placeholder={'Phone Number *'}
                                    value={phoneTextInput}
                                    onChange={setPhoneTextInput}
                                />
                            </div>

                            <div
                                className="mt-4 mb-4"
                                id="emailInput"
                            >
                                <TextInput
                                    placeholder={'Email *'}
                                    value={emailTextInput}
                                    onChange={setEmailTextInput}
                                />
                            </div>
                        </div>

                        <div id="logButton">
                            <Button
                                onClick={volunteerSigningUpConfirm}
                                text={'Confirm'}
                            ></Button>
                        </div>
                    </div>
                )}

                {selectedOption === 'volSignUpConfirm' && (
                    <div className="flex flex-col justify-center items-center"
                    >
                        <h1 className="font-bold font-roboto text-2xl text-center mt-2 mb-2">Confirmed</h1>
                    </div>
                )}
            </div>
        </div>
    );
}
