import { CartProduct } from './cart-product';
import { Product } from './product';

export class ShoppingCart {
    items: CartProduct[] = [];

    constructor(private itemsMap: { [productId: string]: CartProduct}){
     this.itemsMap = this.itemsMap || {};

     for (const productId of Object.keys(this.itemsMap)){
        const firebaseProduct = itemsMap[productId];
        const cartProduct = new CartProduct({ ...firebaseProduct, key: productId});
        this.items.push(cartProduct);
       }
    }

    get totalPrice(){
        let price = 0;
        for (const productId of Object.keys(this.items)) {
        price += this.items[productId].totalPrice;
        }

        return price;
    }

    get totalItemsCount(){
        let count = 0;
        for (const productId of Object.keys(this.items)) {
            count += this.items[productId].quantity;
        }

        return count;
    }

    getQuantity(product: Product){
        const item = this.itemsMap[product.key];
        return (item) ? item.quantity : 0;
    }

}
