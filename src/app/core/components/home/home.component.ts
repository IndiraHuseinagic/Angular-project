import { Subscription } from 'rxjs';
import { Component, HostListener, OnDestroy, ViewChild } from '@angular/core';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import { Product } from 'shared/models/product';
import { ProductService } from 'shared/services/product.service';


@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnDestroy {
 saleProducts: Product [];
 slides: any [] = [];
 slideResolution: number;

 paused = false;
 unpauseOnArrow = false;
 pauseOnIndicator = false;
 pauseOnHover = true;
 pauseOnFocus = true;
 subscription: Subscription;

 @ViewChild('carousel', {static : true}) carousel: NgbCarousel;

  constructor(private productS: ProductService) {
    this.subscription =  this.productS.getAll().subscribe(products => {
     this.saleProducts = products.filter(product => product.price !== product.salePrice);
     this.calculateSlideSize();
  });
}

@HostListener('window:resize', ['$event'])
onResize() {
  this.slides = [];
  this.calculateSlideSize();
}

private calculateSlideSize(){
    if (window.innerWidth < 768) {
       this.slideResolution = 2;
    }
    else {
      this.slideResolution = 4;
    }

    let j = -1;
    for (let i = 0; i < this.saleProducts.length; i++) {
            if (i % this.slideResolution === 0) {
                j++;
                this.slides[j] = [];
                this.slides[j].push(this.saleProducts[i]);
            }
            else { this.slides[j].push(this.saleProducts[i]); }
        }
  }


  togglePaused() {
    if (this.paused) {  this.carousel.cycle(); }
    else { this.carousel.pause(); }

    this.paused = !this.paused;
  }

  onSlide(slideEvent: NgbSlideEvent) {
    if (this.unpauseOnArrow && slideEvent.paused &&
      (slideEvent.source === NgbSlideEventSource.ARROW_LEFT || slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)) {
      this.togglePaused();
    }
    if (this.pauseOnIndicator && !slideEvent.paused && slideEvent.source === NgbSlideEventSource.INDICATOR) {
      this.togglePaused();
    }
  }

  ngOnDestroy() {
   this.subscription.unsubscribe();
  }


}
