export default function Button({ text }: { text: string }) {
    return (
        <button className="text-white text-center bg-secondary border-2 border-[#017BAF] rounded-[10px] w-[227px] h-[55px] font-secondary font-bold text-[18px] hover:bg-[#017BAF]">{text}</button>
    );
}