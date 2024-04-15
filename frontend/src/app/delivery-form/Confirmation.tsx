import React from 'react';
import { Button } from '../../components/core/Button';

interface ConfirmationProps {}

function Confirmation(props: ConfirmationProps) {
    return (
        <div className="flex h-screen flex-col items-center justify-center">
            <img src="/images/confirmation.png" />
            <div className="mt-5 font-bold">Form submitted!</div>
            <div className="mt-5">Thank You!</div>
            <div
                onClick={() => window.location.reload()}
                className="mt-5 content-center"
            >
                <Button text="Fill out another form" />
            </div>
        </div>
    );
}

export default Confirmation;
