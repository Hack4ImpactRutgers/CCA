import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface DatePickerComponentProps {
  selectedDate: Date | null;
  onChange: (date: Date ) => void;
}

const DatePickerComponent: React.FC<DatePickerComponentProps> = (props) => {
  return (
    <DatePicker
      selected={props.selectedDate}
      onChange={props.onChange}
      dateFormat="MM/dd/yyyy" // You can adjust the date format as needed
    />
  );
}

export default DatePickerComponent;