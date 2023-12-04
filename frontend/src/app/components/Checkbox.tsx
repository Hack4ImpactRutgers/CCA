interface CheckboxProps {
  checked: boolean;
  handleChange: () => void;
}

export default function Checkbox(props: CheckboxProps) {
  const { checked, handleChange } = props;

  return (
    <input
      type="checkbox"
      value=""
      checked={checked}
      onChange={handleChange}
      className="bg-[#D9D9D9] border-0 focus:ring-secondary text-secondary"
    />
  );
}
