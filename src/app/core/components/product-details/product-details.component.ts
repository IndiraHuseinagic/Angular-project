import { ActivatedRoute } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from 'shared/services/product.service';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { FavoritesService } from 'shared/services/favorites.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  productId: string;
  product: any = {};
  sizes: number[];
  selectedSize: number;
  slides: any[];
  favorites: any;
  subscription: Subscription;
  closeResult = '';

  constructor(private productS: ProductService,
              private route: ActivatedRoute,
              private cartS: ShoppingCartService,
              private favoritesS: FavoritesService,
              private modalService: NgbModal) {

    this.productId = this.route.snapshot.paramMap.get('id');

    if (this.productId){
      this.productS.get(this.productId).pipe(take(1)).subscribe(product => {
          this.product = product;
          this.selectedSize = this.product.minSize;
          this.sizes = Array.from({length: this.product.maxSize - this.product.minSize + 1}, (_, i) => i + this.product.minSize);
          const url1 = this.product.imageUrl;

          // 2 images for accessories products
          if (this.product.category === 'accessories'){
            this.slides = [
              {id: 'slide1', url: url1},
              {id: 'slide2', url: url1.replace('.jpg', '_2.jpg')}];
          }
          // 4 images for shoes products
          else {
          this.slides = [
              {id: 'slide1', url: url1},
              {id: 'slide2', url: url1.replace('.jpg', '_2.jpg')},
              {id: 'slide3', url: url1.replace('.jpg', '_3.jpg')},
              {id: 'slide4', url: url1.replace('.jpg', '_4.jpg')}];
            }
        });
    }
   }

 async ngOnInit() {
   this.subscription = (await this.favoritesS.getFavorites())
    .subscribe(favorites => {this.favorites = favorites; });
 }

 async addRemoveFavorites(){
   this.favoritesS.addRemoveFavorites(this.product);
 }

 isFavorite() {
   return this.favoritesS.isFavorite(this.favorites, this.product.key);
 }

 sizeSelect(size: number) {
   this.selectedSize = size;
 }

 addToCart() {
   this.cartS.addToCart(this.product, this.productId, this.selectedSize);
 }

 ngOnDestroy() {
   this.subscription.unsubscribe();
 }

 // Modal
 open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
 }

 private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
 }

}
