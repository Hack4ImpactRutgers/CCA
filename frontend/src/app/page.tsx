"use client";

import Image from "next/image";
import CollapsibleContent from "@/app/components/CollapsibleContent";
import LoginButton from "@/app/components/LoginButton";
import { useState } from "react";
import SectionTitle from "@/app/components/SectionTitle";
import LoginPage from "@/app/loginPage"

// TODO: add HTML semantic elements.
export default function Home() {
  return (
    <div className="flex flex-col gap-14 leading-10">
      <LoginButton text="hello" onClick={LoginPage} active={true}/>
      <section className="h-[515px] w-full relative">
        <Image
          src="/images/animals.jpeg"
          fill
          alt="animals"
          style={{ objectFit: "cover" }}
        />
        <div className="shadow-xl z-10 absolute h-[515px] right-0 w-[60%] flex items-center justify-end p-10 bg-gradient-to-l from-[#222524] to-transparent">
          <div className="text-white text-5xl font-bold text-center">
            Help Animals Get Meals
          </div>
        </div>
      </section>
      <section className="p-10">
        <div className="text-center">
          <SectionTitle text="Mission statement" />
        </div>
        <p className="text-center">
          “Assisting low-income people in becoming independent and
          self-sufficient and helping <br /> improve their quality of life by
          transitioning them out of poverty through innovative <br />
          programming and strong community partnerships.”
        </p>
      </section>
      <section className="bg-secondary h-[459px] p-10">
        <div className="text-white text-5xl font-bold text-center">
          We Provide
        </div>
        {/* TODO: add icons */}
      </section>
      <section className="flex justify-between p-10">
        <div className="flex flex-col justify-center">
          <SectionTitle text={"Volunteers Change Lives"} />
          <p className="text-2xl leading-10">
            It is simple to volunteer with us in a role that is <br /> right for
            you.
          </p>
        </div>
        <div className="w-[509px] h-[289px] relative">
          <Image
            src="/images/food-aid.jpeg"
            alt="food aid"
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
      </section>
      <section className="h-[388px] bg-tertiary p-10">
        <div className="text-4xl text-primary font-bold">
          Joining Us Is Easy
        </div>
        <p className="text-xl leading-10">
          Receive the pet products and <br /> support you need right from your
          <br />
          door step.
        </p>
        {/* TODO: add icons */}
      </section>
      <section className="pv-10 flex gap-5 flex-col">
        <SectionTitle text="Eligibility" />
        <CollapsibleContent
          title="Congregate Meals"
          content="Persons must be 60 years of age or older, or the spouse (regardless of age) or an eligible client. Disabled persons under 60, who lives with an eligible client, or lives in within the housing authority we serve, may come to the site with the client and eat."
        />
        <CollapsibleContent
          title="Home Delivered Meals"
          content="Persons must be 60 years of age or older and be home bound (unable to drive) and be unable to leave home without assistance and not have help in the home with cooking of noon meals. Disabled persons under 60 who are on Medicaid may be eligible to receive meals."
        />
        <CollapsibleContent
          title="Cost of Meals"
          content="The cost of a meal is a voluntary donation of $2.00. If a person is unable to give the full contribution, they may give what they can afford and will not be denied a meal. All meals are cooked and prepared by Valley Services inc. in Austin, Texas. Hot food is transported in insulated food containers by company vans to the 20 sites: For eligibility and availability, please call Noelia Buck, Senior Nutrition Program Director at (800)333-6325 or (979)540-"
        />
      </section>

      {/* TODO: Instagram API support.*/ }
      <section className="p-10">
        <SectionTitle text="Connect with CCA on Instagram" />
      </section>
    </div>
  );
} 
