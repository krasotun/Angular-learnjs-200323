import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {MatListModule} from '@angular/material/list';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderModule} from './core/header/header.module';
import {PopupHostModule} from './core/popup-host/popup-host.module';
import {SidenavModule} from './core/sidenav/sidenav.module';
import {ProductsListModule} from './pages/products-list/products-list.module';
import {PaginationModule} from './shared/pagination/pagination.module';

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		HeaderModule,
		ProductsListModule,
		SidenavModule,
		MatListModule,
		PopupHostModule,
		PaginationModule,
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
