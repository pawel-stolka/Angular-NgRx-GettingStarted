import { ProductService } from './../product.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ProductActions from "./product.actions";
import { map, mergeMap } from 'rxjs/operators';

@Injectable()
export class ProductEffects {
  constructor(
    private actions$: Actions,
    private productService: ProductService,
  ) { }

  loadProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.loadProducts),
      mergeMap(() => this.productService.getProducts().pipe(
        map(products => ProductActions.loadProductsSuccess({ products }))
      ))
    )
  })

}
