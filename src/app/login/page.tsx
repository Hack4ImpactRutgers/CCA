'use client';
import './login.css';
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
                <Navbar />
            </div>

            <div id="mainComps">
                <div id="admvol">
                    <div
                        style={{
                            width: 'fit-content',
                            height: 'fit-content',
                            float: 'left',
                            margin: 'auto',
                            marginBottom: '15%',
                            marginRight: '20px',
                        }}
                    >
                        <LoginButton
                            text={'Admin'}
                            onClick={handleAdminClick}
                            active={true}
                        />
                    </div>

                    <div
                        style={{
                            width: 'fit-content',
                            height: 'fit-content',
                            float: 'left',
                            margin: 'auto',
                        }}
                    >
                        <LoginButton
                            text={'Volunteer'}
                            onClick={handleVolunteerClick}
                            active={true}
                        />
                    </div>
                </div>

                <div
                    style={{
                        height: 'fit-content',
                        width: '100%',
                        float: 'left',
                    }}
                >
                    <div id="image">
                        <Image
                            src={image1}
                            alt="image"
                            width={239}
                            height={239}
                        />
                    </div>
                </div>

                {selectedOption === 'admin' && (
                    <div>
                        <div id="adminContent">
                            <div
                                style={{
                                    margin: 'auto',
                                    height: 'fit-content',
                                    width: 'fit-content',
                                }}
                            >
                                <h1>Account Login</h1>
                            </div>
                            <div
                                style={{
                                    width: 'fit-content',
                                    margin: 'auto',
                                    marginTop: '4%',
                                    marginBottom: '4%',
                                }}
                                id="userInput"
                            >
                                <TextInput
                                    placeholder={'Username'}
                                    value={userTextInput}
                                    onChange={setUserTextInput}
                                />
                            </div>
                            <div
                                style={{
                                    width: 'fit-content',
                                    margin: 'auto',
                                    marginTop: '4%',
                                    marginBottom: '4%',
                                }}
                                id="passwordInput"
                            >
                                <TextInput
                                    placeholder={'Password'}
                                    value={passTextInput}
                                    onChange={setPassTextInput}
                                />
                            </div>
                        </div>

                        <div id="smallLinks">
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
                        <div
                            style={{
                                margin: 'auto',
                                height: 'fit-content',
                                width: '100%',
                                float: 'left',
                                marginTop: '50px',
                            }}
                        >
                            <h1>Confirmed</h1>
                        </div>
                    </div>
                )}

                {selectedOption === 'volunteer' && (
                    <div>
                        <div id="volunteerContent">
                            <div
                                style={{
                                    margin: 'auto',
                                    height: 'fit-content',
                                    width: 'fit-content',
                                }}
                            >
                                <h1>Login</h1>
                            </div>

                            <div
                                style={{
                                    width: 'fit-content',
                                    margin: 'auto',
                                    marginTop: '4%',
                                    marginBottom: '4%',
                                }}
                                id="nameInput"
                            >
                                <TextInput
                                    placeholder={'Name *'}
                                    value={nameTextInput}
                                    onChange={setNameTextInput}
                                />
                            </div>

                            <div
                                style={{
                                    width: 'fit-content',
                                    margin: 'auto',
                                    marginTop: '4%',
                                    marginBottom: '4%',
                                }}
                                id="emailInput"
                            >
                                <TextInput
                                    placeholder={'Email *'}
                                    value={emailTextInput}
                                    onChange={setEmailTextInput}
                                />
                            </div>
                        </div>

                        <div id="smallLinks">
                            <button onClick={volSignUp}>Signup</button>
                        </div>

                        <div id="logButton">
                            <Button
                                onClick={volunteerConfirm}
                                text={'Confirm'}
                            ></Button>
                        </div>
                    </div>
                )}

                {selectedOption === 'volLogInConfirm' && (
                    <div>
                        <div
                            style={{
                                margin: 'auto',
                                height: 'fit-content',
                                width: '100%',
                                float: 'left',
                                marginTop: '50px',
                                textAlign: 'center',
                            }}
                        >
                            Enter the code sent to your email
                            <div
                                style={{
                                    width: '1%',
                                    marginTop: '4%',
                                    marginBottom: '4%',
                                }}
                            >
                                <CodeInput />
                            </div>
                        </div>
                        <div id="logButton">
                            <Button
                                onClick={volunteerConfirm}
                                text={'Confirm'}
                            ></Button>
                        </div>
                    </div>
                )}

                {selectedOption === 'forgotPass' && (
                    <div>
                        <div id="forgotPassContent">
                            <div
                                style={{
                                    margin: 'auto',
                                    height: 'fit-content',
                                    width: '100%',
                                    float: 'left',
                                    marginTop: '50px',
                                }}
                            >
                                <h1>forgot pass! TBD</h1>
                            </div>
                        </div>
                    </div>
                )}

                {selectedOption === 'volSignUp' && (
                    <div>
                        <div id="volSignUpContent">
                            <div
                                style={{
                                    margin: 'auto',
                                    height: 'fit-content',
                                    width: 'fit-content',
                                }}
                            >
                                <h1>Sign Up</h1>
                            </div>

                            <div
                                style={{
                                    width: 'fit-content',
                                    margin: 'auto',
                                    marginTop: '4%',
                                    marginBottom: '4%',
                                }}
                                id="nameInput"
                            >
                                <TextInput
                                    placeholder={'Name *'}
                                    value={nameTextInput}
                                    onChange={setNameTextInput}
                                />
                            </div>

                            <div
                                style={{
                                    width: 'fit-content',
                                    margin: 'auto',
                                    marginTop: '4%',
                                    marginBottom: '4%',
                                }}
                                id="numberInput"
                            >
                                <TextInput
                                    placeholder={'Phone Number *'}
                                    value={phoneTextInput}
                                    onChange={setPhoneTextInput}
                                />
                            </div>

                            <div
                                style={{
                                    width: 'fit-content',
                                    margin: 'auto',
                                    marginTop: '4%',
                                    marginBottom: '4%',
                                }}
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
                    <div
                        style={{
                            margin: 'auto',
                            height: 'fit-content',
                            width: '100%',
                            float: 'left',
                            marginTop: '50px',
                        }}
                    >
                        <h1>Confirmed</h1>
                    </div>
                )}
            </div>
        </div>
    );
}
