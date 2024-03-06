import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';

import { environment } from '../environments/environment';

import { TabsModule } from 'ngx-bootstrap/tabs';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { AccordionModule } from 'ngx-bootstrap/accordion';

import { CarouselModule } from 'ngx-owl-carousel-o';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';


import { SharedModule } from './cyptolanding/shared/shared.module';

import { ExtrapagesModule } from './extrapages/extrapages.module';

import { LayoutsModule } from './layouts/layouts.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initFirebaseBackend } from './authUtils';
import { CyptolandingComponent } from './cyptolanding/cyptolanding.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { ErrorInterceptor } from './core/helpers/error.interceptor';
import { JwtInterceptor } from './core/helpers/jwt.interceptor';
import { FakeBackendInterceptor } from './core/helpers/fake-backend';
import { ToastrModule } from 'ngx-toastr';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OffreComponent } from './pages/offrestage/offrestage.component';
import { ListeoffreencadrantComponent } from './pages/listeoffreencadrant/listeoffreencadrant.component';
import { ListeoffreetudiantComponent } from './pages/listeoffreetudiant/listeoffreetudiant.component';
import { NgxStarRatingModule } from 'ngx-star-rating';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { ChatComponentComponent } from './pages/chat-component/chat-component.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { AdminchatComponent } from './pages/adminchat/adminchat.component';
import { CommentFormComponentComponent } from './comment-form-component/comment-form-component.component';
import { LinkedInScraperComponentComponent } from './pages/linked-in-scraper-component/linked-in-scraper-component.component';


if (environment.defaultauth === 'firebase') {
  initFirebaseBackend(environment.firebaseConfig);
} else {
  // tslint:disable-next-line: no-unused-expression
  FakeBackendInterceptor;
}

const config: SocketIoConfig = { url: 'http://localhost:8081', options: {} };
export function createTranslateLoader(http: HttpClient): any {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    CyptolandingComponent,
    ListeoffreetudiantComponent,
    OffreComponent,
    ListeoffreencadrantComponent,
    ChatComponentComponent,
    AdminchatComponent,
    CommentFormComponentComponent,
    LinkedInScraperComponentComponent
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    NgxStarRatingModule,
    
    MatFormFieldModule,
    MatIconModule,
    
    
    
    
    


    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    LayoutsModule,
    AppRoutingModule,
    ExtrapagesModule,
    CarouselModule,
    AccordionModule.forRoot(),
    TabsModule.forRoot(),
    TooltipModule.forRoot(),
    SharedModule,
    ScrollToModule.forRoot(),
    ToastrModule.forRoot(),
    SocketIoModule.forRoot(config),

  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: FakeBackendInterceptor, multi: true },
    // LoaderService,
    // { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptorService, multi: true },
  ],
})
export class AppModule { }
