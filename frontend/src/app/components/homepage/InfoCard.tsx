interface InfoCardProps {
    /** Name of icon to display, e.g. "tennis-ball" from the public/svg folder */
    icon: string;
    /** Title of the card */
    title: string;
    /** Description of the card. Optional, if passed this will be displayed below the title like in the "Joining us is easy" section.\
     * Otherwise, the description will be displayed below the icon like in the "We Provide" section.
    */
    description?: string;
}

export default function InfoCard(props: InfoCardProps) {
    return (
        <div className={`flex flex-col items-center justify-center w-[250px] h-[250px] bg-white rounded-[10px]`}>
            {
                props.description
                ?
                <>
                    <div className="flex items-center justify-center w-16 h-16 mt-4 bg-white rounded-full">
                        <img src={`/svg/${props.icon}.svg`} alt={props.icon}/>
                    </div>
                    <div className={`flex flex-col items-center justify-center mt-4`}>
                        <h2 className="text-[25px] font-bold text-center text-[#005071]">{props.title}</h2>
                        <p className="mt-2 text-[17px] text-center">{props.description}</p>
                    </div>
                </>
                :
                <>
                    <h2 className="text-[25px] font-bold text-center text-[#005071] mb-8">{props.title}</h2>
                    <div className="flex items-center justify-center w-16 h-16 mt-4 bg-white rounded-full">
                        <img src={`/svg/${props.icon}.svg`} alt={props.icon}/>
                    </div>
                </>
            }
        </div>
    );
}