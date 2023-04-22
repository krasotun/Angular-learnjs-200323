import {Component, OnInit} from '@angular/core';
import {IProduct} from '../../shared/products/product.interface';
import {productsMock} from '../../shared/products/products.mock';
import {LOAD_DIRECTION} from 'src/app/shared/scroll-with-loading/load-direction.const.';

@Component({
	selector: 'app-products-list',
	templateUrl: './products-list.component.html',
	styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent implements OnInit {
	products: IProduct[] | undefined = undefined;

	ngOnInit() {
		setTimeout(() => {
			this.products = productsMock;
		}, 3000);
	}

	onScroll(event: LOAD_DIRECTION) {
		console.log(`scrolled ${event}`);
	}

	get calculateProducts(): IProduct[] | undefined {
		return this.products;
	}

	onBuy(id: IProduct['_id']) {
		console.log(`Buy product ${id}`);
	}
}
