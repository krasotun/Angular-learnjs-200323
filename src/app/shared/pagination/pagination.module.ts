import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {PaginationDirective} from './pagination.directive';

@NgModule({
	declarations: [PaginationDirective],
	imports: [CommonModule],
	exports: [PaginationDirective],
})
export class PaginationModule {}
