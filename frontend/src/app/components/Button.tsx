"use client";

interface ButtonProps {
    text: string;
    onClick: () => void;
  }

export default function Button(props:ButtonProps) {
    const { text, onClick} = props;

    return (
        <button onClick={onClick} className="text-white text-center bg-secondary border-2 border-[#017BAF] rounded-[10px] w-[227px] h-[55px] font-secondary font-bold text-[18px] hover:bg-[#017BAF]">
            {text}
        </button>
    );
}