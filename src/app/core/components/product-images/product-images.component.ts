import { NgbCarousel } from '@ng-bootstrap/ng-bootstrap';
import { FavoritesService } from 'shared/services/favorites.service';
import { Component, Input, ViewChild } from '@angular/core';
import { Product } from 'shared/models/product';


@Component({
  selector: 'product-images',
  templateUrl: './product-images.component.html',
  styleUrls: ['./product-images.component.css']
})
export class ProductImagesComponent {
  @Input() product: Product;
  @Input() favorites: any;
  @Input() slides: any[];
  @ViewChild('slideImages', {static : true}) carousel: NgbCarousel;
  @ViewChild('zoomImages', {static : true}) zoom: NgbCarousel;

  constructor(private favoritesS: FavoritesService) {}

  async addRemoveFavorites(){
    this.favoritesS.addRemoveFavorites(this.product);
  }

  isFavorite() {
    return this.favoritesS.isFavorite(this.favorites, this.product.key);
  }

  goToSlide(slide: any) {
    this.carousel.select(slide);
  }

  // Modal
  openModal(slideId){
    this.zoom.select(slideId);
    const modalF  = document.getElementById('modal-images');
    modalF.classList.remove('d-none');
    modalF.classList.add('d-block');
  }

  closeModal() {
    const modalF  = document.getElementById('modal-images');
    modalF.classList.remove('d-block');
    modalF.classList.add('d-none');
  }

}
