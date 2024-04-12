export interface Pet {
    isActive: boolean;
    animal: string;
    vet: boolean;
    food: {
        kind: string;
        lbs: number;
    };
    name: string;
    age: number;
    description: string;
    weight: string;
    diet: string;
}

export interface Client {
    id: string;
    name: string;
    age: number;
    email: string;
    phone: string;
    address: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    region: string;
    pets: Pet[];
    needsUpdate: boolean;
}
