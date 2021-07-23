import { ShoppingCart } from './shopping-cart';

export class Order {
datePlaced: string;
items: any[];
totalPrice: number;

constructor(
  public userId: string,
  public shipping: any,
  public payment: string,
  shoppingCart: ShoppingCart){

    this.datePlaced = new Date().toLocaleString();

    this.items = shoppingCart.items.map(item => {
      return {
        title: item.title,
        brand: item.brand,
        color: item.color,
        size: item.size,
        imageUrl: item.imageUrl,
        price: item.price,
        quantity: item.quantity,
        totalPrice: item.totalPrice
    };
  });

    this.totalPrice = shoppingCart.totalPrice;
}

}
