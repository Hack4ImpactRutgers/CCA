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
            className="border-0 bg-[#D9D9D9] text-secondary focus:ring-secondary"
        />
    );
}
