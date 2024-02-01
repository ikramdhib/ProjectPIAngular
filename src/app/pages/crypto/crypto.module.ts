import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UIModule } from '../../shared/ui/ui.module';

import { NgApexchartsModule } from 'ng-apexcharts';


import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import {CdkStepperModule} from '@angular/cdk/stepper';
import { NgStepperModule } from 'angular-ng-stepper';
// dropzone
import { NgxDropzoneModule } from 'ngx-dropzone';
import { SimplebarAngularModule } from 'simplebar-angular';

import { CryptoRoutingModule } from './crypto-routing.module';

import { WalletComponent } from './wallet/wallet.component';
import { BuysellComponent } from './buysell/buysell.component';
import { ExchangeComponent } from './exchange/exchange.component';
import { LendingComponent } from './lending/lending.component';
import { KycapplicationComponent } from './kycapplication/kycapplication.component';

import { WalletSortableService } from './wallet/wallet-sortable.directive';
import { OrderSortableService } from './orders/orders-sortable.directive'

import { OrdersComponent } from './orders/orders.component';


@NgModule({
  declarations: [WalletComponent, BuysellComponent, ExchangeComponent, LendingComponent, KycapplicationComponent, WalletSortableService, OrdersComponent, OrderSortableService],
  imports: [
    CommonModule,
    UIModule,
    CryptoRoutingModule,
    BsDropdownModule.forRoot(),
    NgApexchartsModule,
    FormsModule,
    ReactiveFormsModule,
    PaginationModule.forRoot(),
    TabsModule.forRoot(),
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    CdkStepperModule,
    NgStepperModule,
    NgxDropzoneModule,
    SimplebarAngularModule
  ]
})
export class CryptoModule { }
