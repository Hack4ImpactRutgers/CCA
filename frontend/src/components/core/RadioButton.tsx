import React from 'react';

interface RadioButtonProps {
  truth: boolean;
  check: boolean;
  change: (newValue: boolean) => void;
}

export default function RadioButton(props: RadioButtonProps) {
  const { truth, check, change } = props;

  const handleChange = () => {
    change(truth); // On change, pass the truth value to the change function
  };

  return (
    <input
      type="radio"
      checked={check} // Check if this radio button is checked based on the check prop
      onChange={handleChange} // Call handleChange function on change
      className="bg-[#D9D9D9] focus:ring-secondary text-secondary"
    />
  );
}