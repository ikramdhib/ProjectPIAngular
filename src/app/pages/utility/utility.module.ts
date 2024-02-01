import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UtiliytRoutingModule } from './utility-routing.module';
import { UIModule } from '../../shared/ui/ui.module';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { CarouselModule } from 'ngx-owl-carousel-o';

import { StarterComponent } from './starter/starter.component';
import { TimelineComponent } from './timeline/timeline.component';
import { FaqsComponent } from './faqs/faqs.component';
import { PricingComponent } from './pricing/pricing.component';


@NgModule({
  declarations: [StarterComponent, TimelineComponent, FaqsComponent, PricingComponent],
  imports: [
    CommonModule,
    UtiliytRoutingModule,
    UIModule,
    TabsModule.forRoot(),
    CarouselModule
  ]
})
export class UtilityModule { }
