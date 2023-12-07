interface RadioButtonProps {
  value: string;
}

export default function RadioButton(props: RadioButtonProps) {
  const { value } = props;

  return (
    <input
      type="radio"
      value={value}
      className="bg-[#D9D9D9] focus:ring-secondary text-secondary"
    />
  );
}
