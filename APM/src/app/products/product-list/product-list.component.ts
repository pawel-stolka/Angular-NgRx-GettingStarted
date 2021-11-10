import { getShowProductCode, getCurrentProduct, getProducts } from './../state/product.reducer';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';

import { Subscription, Observable } from 'rxjs';

import { Product } from '../product';
import { ProductService } from '../product.service';
import { State } from '../state/product.reducer';
import * as ProductActions from "../state/product.actions";

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  pageTitle = 'Products';
  errorMessage: string;

  displayCode: boolean;

  // products: Product[];

  // Used to highlight the selected product in the list
  selectedProduct: Product | null;
  products$: Observable<Product[]>;

  constructor(
    private productService: ProductService,
    private store: Store<State>
    ) { }

  ngOnInit(): void {
    // TODO: subscribe
    this.store.select(getCurrentProduct).subscribe(
      currentProduct => this.selectedProduct = currentProduct
    );

    this.products$ = this.store.select(getProducts);

    this.store.dispatch(ProductActions.loadProducts());

    // TODO: unsubscribe
    this.store.select(getShowProductCode).subscribe(
      showProductCode => this.displayCode = showProductCode
    )
  }

  checkChanged(): void {
    this.store.dispatch(ProductActions.toggleProductCode());
  }

  newProduct(): void {
    this.store.dispatch(ProductActions.initCurrentProduct());
  }

  productSelected(product: Product): void {
    this.store.dispatch(ProductActions.setCurrentProduct({ product }));
  }

}
