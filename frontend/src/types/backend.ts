export interface Pet {
    id: string;
    isActive: boolean;
    animal: string;
    vet: boolean;
    food: {
        kind: string;
        lbs: number;
    };
}

export interface Client {
    id: string;
    name: string;
    age: number;
    address: string;
    region: string;
    pets: Pet[];
}
