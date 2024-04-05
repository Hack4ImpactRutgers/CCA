'use client';

import Image from 'next/image';
import { SectionTitle } from '@/components/home/SectionTitle';
import { InfoCard } from '@/components/home/InfoCard';
import { Button } from '@/components/core/Button';
import { Collapsible } from '@/components/core/Collapsible';
import { FC, useState } from 'react';
import { Client } from '@/types/backend';
import { ClientDetailsPopup } from '@/components/client-dashboard/ClientDetailsPopup/ClientDetailsPopup';

interface PageProps {}

const client: Client = {
    id: 'abc123',
    name: 'John Doe',
    age: 35,
    address: '123 Main St',
    region: 'Urban',
    pets: [
        {
            id: 'p1',
            isActive: true,
            animal: 'Dog',
            vet: true,
            food: {
                kind: 'Dry',
                lbs: 10,
            },
        },
        {
            id: 'p2',
            isActive: true,
            animal: 'Cat',
            vet: false,
            food: {
                kind: 'Wet',
                lbs: 5,
            },
        },
    ],
};

const Page: FC<PageProps> = () => {
    return (
        <>
            <ClientDetailsPopup
                client={client}
                onSubmit={() => {}}
                onClose={() => {}}
            />
            <main
                className="flex flex-col gap-14 leading-10"
                data-testid="main"
            >
                <section className="relative h-[515px] w-full">
                    <Image
                        src="/images/animals.jpeg"
                        fill
                        alt="animals"
                        style={{ objectFit: 'cover' }}
                    />
                    <div className="absolute right-0 z-10 flex h-[515px] w-[60%] items-center justify-end bg-gradient-to-l from-[#222524] to-transparent p-10 shadow-xl">
                        <div className="text-center text-5xl font-bold text-white">
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
                        self-sufficient and helping <br /> improve their quality
                        of life by transitioning them out of poverty through
                        innovative <br />
                        programming and strong community partnerships.”
                    </p>
                </section>
                <section className="h-[459px] bg-secondary p-10">
                    <div className="text-center text-5xl font-bold text-white">
                        We Provide
                    </div>
                    <div className="mt-10 flex justify-center gap-12">
                        <InfoCard title="Pet Food" iconPath="/svgs/bone.svg" />
                        <InfoCard
                            title="Pet Supplies"
                            iconPath="/svgs/tennis-ball.svg"
                        />
                        <InfoCard
                            title="Pet Medical Services"
                            iconPath="/svgs/med-services.svg"
                        />
                    </div>
                </section>
                <section className="flex justify-between p-10">
                    <div className="flex flex-col justify-between">
                        <SectionTitle text={'Volunteers Change Lives'} />
                        <p className="text-2xl leading-10">
                            It is simple to volunteer with us in a role that is{' '}
                            <br /> right for you.
                        </p>
                        <Button text="Contact Us" onClick={() => {}} />
                    </div>
                    <div className="relative h-[289px] w-[509px]">
                        <Image
                            src="/images/food-aid.jpeg"
                            alt="food aid"
                            fill
                            style={{ objectFit: 'cover' }}
                        />
                    </div>
                </section>
                <section className="flex h-[388px] justify-between bg-primary p-10">
                    <div className="flex h-full flex-col justify-around">
                        <div className="text-4xl font-bold text-tertiary">
                            Joining Us Is Easy
                        </div>
                        <p className="text-xl leading-10">
                            Receive the pet products and <br /> support you need
                            right from your
                            <br />
                            door step.
                        </p>
                        <Button text="Learn More" onClick={() => {}} />
                    </div>
                    <div className="me-[105px] mt-4 flex justify-center gap-6">
                        <InfoCard
                            iconPath="/svgs/check.svg"
                            title="1. Eligibility"
                            description="See if you qualify to receive our services"
                        />
                        <InfoCard
                            iconPath="/svgs/form.svg"
                            title="2. Register"
                            description="Fill out our Program Interest Form"
                        />
                        <InfoCard
                            iconPath="/svgs/box.svg"
                            title="3. Connect"
                            description="Get Connected with AniMeals Services"
                        />
                    </div>
                </section>
                <section className="pv-10 flex flex-col gap-5">
                    <SectionTitle text="Eligibility" />
                    <Collapsible
                        title="Congregate Meals"
                        content="Persons must be 60 years of age or older, or the spouse (regardless of age) or an eligible client. Disabled persons under 60, who lives with an eligible client, or lives in within the housing authority we serve, may come to the site with the client and eat."
                    />
                    <Collapsible
                        title="Home Delivered Meals"
                        content="Persons must be 60 years of age or older and be home bound (unable to drive) and be unable to leave home without assistance and not have help in the home with cooking of noon meals. Disabled persons under 60 who are on Medicaid may be eligible to receive meals."
                    />
                    <Collapsible
                        title="Cost of Meals"
                        content="The cost of a meal is a voluntary donation of $2.00. If a person is unable to give the full contribution, they may give what they can afford and will not be denied a meal. All meals are cooked and prepared by Valley Services inc. in Austin, Texas. Hot food is transported in insulated food containers by company vans to the 20 sites: For eligibility and availability, please call Noelia Buck, Senior Nutrition Program Director at (800)333-6325 or (979)540-"
                    />
                </section>

                {/* TODO: Instagram API support. */}
                <section className="p-10">
                    <div className="flex justify-between">
                        <SectionTitle text="Connect with CCA on Instagram" />
                        <Button
                            text="Follow Us"
                            iconPath="/images/instagram.png"
                            onClick={() =>
                                window
                                    ?.open(
                                        'https://www.instagram.com/combinedcommunityaction/',
                                        '_blank'
                                    )
                                    ?.focus()
                            }
                        />
                    </div>
                </section>
            </main>
        </>
    );
};

export default Page;
