import Image from "next/image";
import InfoCard from "@/app/components/homepage/InfoCard";
import CollapsibleContent from "@/app/components/CollapsibleContent";

// TODO: add HTML semantic elements
export default function Home() {
  return (
    <>
      <section className="h-[515px] w-full relative">
        <Image
          src="/images/animals.jpeg"
          fill={true}
          alt="animals"
          objectFit="cover"
        />
        <div className="shadow-xl z-10 absolute h-[515px] right-0 w-[60%] flex items-center justify-end p-10 bg-gradient-to-l from-[#222524] to-transparent">
          <div className="text-white text-5xl font-bold">
            Help Animals Get Meals
          </div>
        </div>
      </section>
      <section>
        <div className="text-primary text-5xl font-bold text-center">
          Mission statement
        </div>
        <div className="text-center">
          “Assisting low-income people in becoming independent and
          self-sufficient and helping <br /> improve their quality of life by
          transitioning them out of poverty through innovative <br />
          programming and strong community partnerships.”
        </div>
      </section>
      <section className="bg-secondary h-[459px]">
        <div className="text-white text-5xl font-bold text-center">
          We Provide
        </div>
        {/* TODO: add icons */}
      </section>
      <section className="flex justify-between">
        <div className="flex flex-col justify-center">
          <div className="text-5xl text-primary font-bold">
            Volunteers Change Lives
          </div>
          <div className="text-2xl">
            It is simple to volunteer with us in a role that is <br /> right for
            you.
          </div>
        </div>
        <div className="w-[509px] h-[289px] relative">
          <Image src="/images/food-aid.jpeg" alt="food aid" fill />
        </div>
      </section>
      <section className="h-[388px] bg-tertiary">
        <div className="text-4xl text-primary font-bold">
          Joining Us Is Easy
        </div>
        <div className="text-xl">
          Receive the pet products and <br /> support you need right from your
          <br />
          door step.
        </div>
        {/* TODO: add icons */}
      </section>
      <section>
        Eligibility
        <CollapsibleContent title={"awdwad"} content={"awdawd"} />
      </section>
    </>
  );
}
