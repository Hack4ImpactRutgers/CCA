interface ButtonProps {
    text: string;
    icon?: string;
}

export default function Button(props: ButtonProps) {
    if (props.icon) {
        return (
            <button className="text-white flex place-items-center justify-around text-center bg-secondary border-2 border-[#017BAF] rounded-[10px] w-[227px] h-[55px] font-secondary font-bold text-[18px]">
                <span>{props.text}</span>
                <img className="w-[38px] h-[38px]" src={`/images/${props.icon}`}/>
            </button>
        )
    }
    return <button className="text-white text-center bg-secondary border-2 border-[#017BAF] rounded-[10px] w-[227px] h-[55px] font-secondary font-bold text-[18px]">{props.text}</button>;
}