import React, { Dispatch, SetStateAction } from 'react';
import { Button } from '../../components/core/Button';
import Checkbox from '../../components/core/Checkbox';
import RadioButton from '../../components/core/RadioButton';
import { TextInput } from '../../components/core/TextInput';
import DatePicker from '@/components/core/DatePicker';

interface SubmitProps {
    name: string;
    updated: boolean;
    clientId: string;
    selectedDate: Date;
    submitted: boolean;
    setName: Dispatch<SetStateAction<string>>;
    setUpdated: Dispatch<SetStateAction<boolean>>;
    setSelectedDate: Dispatch<SetStateAction<Date>>;
    setFormPage: Dispatch<SetStateAction<string>>;
    setSubmitted: Dispatch<SetStateAction<boolean>>;
}

function Submit(props: SubmitProps) {
    return (
        <form className="">
            <div className='after:ml-0.5 after:text-[red] after:content-["*"]'>
                Volunteer Name
            </div>
            <TextInput
                value={props.name || ''}
                placeholder={''}
                onChange={props.setName}
            />

            <div className='after:ml-0.5 after:text-[red] after:content-["*"]'>
                Date Delivered
            </div>
            <DatePicker
                selectedDate={props.selectedDate}
                onChange={props.setSelectedDate}
            />

            <div className='after:ml-0.5 after:text-[red] after:content-["*"]'>
                Is there any information that needs to be updated?
            </div>

            <div className="flex">
                <RadioButton
                    truth={true}
                    check={props.updated}
                    change={props.setUpdated}
                />
                <label className="ml-3">Yes</label>
                <div className="ml-10">
                    <RadioButton
                        truth={false}
                        check={!props.updated}
                        change={props.setUpdated}
                    />
                </div>
                <label className="ml-3">No</label>
            </div>

            <div
                onClick={() => props.setFormPage('Confirm')}
                className="mt-5 text-right"
            >
                <Button text="Submit" />
            </div>
        </form>
    );
}

export default Submit;
