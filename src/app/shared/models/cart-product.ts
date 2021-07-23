
export class CartProduct {
    public key: string;
    public title: string;
    public size: number;
    public price: number;
    public brand: string;
    public color: string;
    public imageUrl: string;
    public quantity: number;

    constructor(init?: Partial<CartProduct>) {
        Object.assign(this, init);
     }

    get totalPrice() {
    return (this.price * this.quantity);
    }

}

