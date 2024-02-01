import { BrowserModule } from '@angular/platform-browser';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { UIModule } from '../../shared/ui/ui.module';

import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { AlertModule } from 'ngx-bootstrap/alert';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { RatingModule } from 'ngx-bootstrap/rating';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { TabsModule } from 'ngx-bootstrap/tabs';
// import { ToastrModule } from 'ngx-toastr';

import { NgxSliderModule } from 'ngx-slider-v2';
import { ImageCropperModule } from 'ngx-image-cropper';

// Masonry
import { NgxMasonryModule } from 'ngx-masonry';

import { UiRoutingModule } from './ui-routing.module';
import { AlertsComponent } from './alerts/alerts.component';
import { ButtonsComponent } from './buttons/buttons.component';
import { CardsComponent } from './cards/cards.component';
import { CarouselComponent } from './carousel/carousel.component';
import { DropdownsComponent } from './dropdowns/dropdowns.component';
import { GridComponent } from './grid/grid.component';
import { ImagesComponent } from './images/images.component';
import { ModalsComponent } from './modals/modals.component';
import { ProgressbarComponent } from './progressbar/progressbar.component';
import { TypographyComponent } from './typography/typography.component';
import { GeneralComponent } from './general/general.component';
import { ColorsComponent } from './colors/colors.component';
import { VideoComponent } from './video/video.component';
import { TabsComponent } from './tabs/tabs.component';
import { SweetalertComponent } from './sweetalert/sweetalert.component';
import { RangesliderComponent } from './rangeslider/rangeslider.component';
import { ImagecropperComponent } from './imagecropper/imagecropper.component';
import { LightboxComponent } from './lightbox/lightbox.component';
// import { NgxYoutubePlayerModule } from 'ngx-youtube-player';
// import { AgmCoreModule } from '@agm/core';
import { PlaceholderComponent } from './placeholder/placeholder.component';
import { ToastsComponent } from './toasts/toasts.component';
import { RatingComponent } from './rating/rating.component';
import { NotificationComponent } from './notification/notification.component';

// import { ToastsContainer } from './notification/toasts-container.component';
import { UtilitiesComponent } from './utilities/utilities.component';

@NgModule({
  // tslint:disable-next-line: max-line-length
  declarations: [AlertsComponent, ButtonsComponent, CardsComponent, CarouselComponent, DropdownsComponent, GridComponent, ImagesComponent, 
    ModalsComponent, ProgressbarComponent, TypographyComponent, GeneralComponent, ColorsComponent, VideoComponent, TabsComponent, SweetalertComponent, 
    RangesliderComponent, ImagecropperComponent, LightboxComponent, PlaceholderComponent, ToastsComponent, RatingComponent, NotificationComponent,
    // ToastsContainer,
    UtilitiesComponent],
  imports: [
    CommonModule,
    UiRoutingModule,
    UIModule,
    FormsModule,
    NgxSliderModule,
    AlertModule.forRoot(),
    CarouselModule.forRoot(),
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    ProgressbarModule.forRoot(),
    TooltipModule.forRoot(),
    PopoverModule.forRoot(),
    PaginationModule.forRoot(),
    TabsModule.forRoot(),
    AccordionModule.forRoot(),
    CollapseModule.forRoot(),
    RatingModule.forRoot(),
    ImageCropperModule,
    NgxMasonryModule,
    ReactiveFormsModule
    // BrowserAnimationsModule, // required animations module
    // ToastrModule.forRoot(), // ToastrModule added
    // NgxYoutubePlayerModule,
    // AgmCoreModule.forRoot({
    //   apiKey: 'AIzaSyAbvyBxmMbFhrzP9Z8moyYr6dCr-pzjhBE'
    // }),
  ]
})
export class UiModule { }
