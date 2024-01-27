import { FC } from 'react';

interface InfoCardProps {
    /** Path of icon to display, e.g. "tennis-ball" from the public/svg folder */
    iconPath: string;
    /** Title of the card */
    title: string;
    /** Description of the card. Optional, if passed this will be displayed below the title like in the "Joining us is easy" section.\
     * Otherwise, the description will be displayed below the icon like in the "We Provide" section.
     */
    description?: string;
}

export const InfoCard: FC<InfoCardProps> = ({
    iconPath,
    title,
    description,
}) => {
    return (
        <div
            className={`flex h-[250px] w-[250px] flex-col items-center justify-center rounded-[10px] bg-white`}
        >
            {description ? (
                <>
                    <div className="mt-4 flex h-16 w-16 items-center justify-center rounded-full bg-white">
                        <img src={iconPath} />
                    </div>
                    <div
                        className={`mt-4 flex flex-col items-center justify-center`}
                    >
                        <h2 className="text-center text-[25px] font-bold text-[#005071]">
                            {title}
                        </h2>
                        <p className="mt-2 text-center text-[17px]">
                            {description}
                        </p>
                    </div>
                </>
            ) : (
                <>
                    <h2 className="mb-8 text-center text-[25px] font-bold text-[#005071]">
                        {title}
                    </h2>
                    <div className="mt-4 flex h-16 w-16 items-center justify-center rounded-full bg-white">
                        <img src={iconPath} />
                    </div>
                </>
            )}
        </div>
    );
};
