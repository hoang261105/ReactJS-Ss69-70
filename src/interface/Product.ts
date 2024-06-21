export interface Products {
    id: number;
    name: string;
    img: string;
    price: number;
    describe: string;
    quantity: number;
}

export interface ActionProducts {
    type: string;
    payload: any
}