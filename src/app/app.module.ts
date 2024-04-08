import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import {
  HttpClientModule,
  HTTP_INTERCEPTORS,
  HttpClient,
} from "@angular/common/http";

import { environment } from '../environments/environment';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { AccordionModule } from 'ngx-bootstrap/accordion';


import { CarouselModule } from "ngx-owl-carousel-o";
import { ScrollToModule } from "@nicky-lenaers/ngx-scroll-to";

import { SharedModule } from "./cyptolanding/shared/shared.module";

import { ExtrapagesModule } from "./extrapages/extrapages.module";

import { LayoutsModule } from "./layouts/layouts.module";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { initFirebaseBackend } from "./authUtils";
import { CyptolandingComponent } from "./cyptolanding/cyptolanding.component";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";

import { ErrorInterceptor } from "./core/helpers/error.interceptor";
import { JwtInterceptor } from "./core/helpers/jwt.interceptor";
import { FakeBackendInterceptor } from "./core/helpers/fake-backend";
import { ToastrModule } from "ngx-toastr";
import { StageetudiantComponent } from "./pages/stageetudiant/stageetudiant.component";
import { ProcessusstageetudiantComponent } from './pages/processusstageetudiant/processusstageetudiant.component';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {NgStepperModule} from 'angular-ng-stepper';




import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthenticationInterceptor } from './helpers_User/authentication.interceptor';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { SendingMailComponent } from './forget-password/sending-mail/sending-mail.component';
import { ChangePasswordComponent } from './forget-password/change-password/change-password.component';

import { StageListComponent } from './stage-list/stage-list.component';
import { NourComponent } from './pages/nour/nour.component';
import { UserListComponent } from './pages/user-list/user-list.component';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';


if (environment.defaultauth === "firebase") {
  initFirebaseBackend(environment.firebaseConfig);
} else {
  // tslint:disable-next-line: no-unused-expression
  FakeBackendInterceptor;
}

export function createTranslateLoader(http: HttpClient): any {
  return new TranslateHttpLoader(http, "assets/i18n/", ".json");
}

@NgModule({
  declarations: [
    AppComponent,
    CyptolandingComponent,
    ForgetPasswordComponent,
    SendingMailComponent,
    ChangePasswordComponent,
    CyptolandingComponent,
    AppComponent, CyptolandingComponent, StageetudiantComponent, ProcessusstageetudiantComponent,
  UserListComponent,
    StageListComponent,
        NourComponent,
        //StageListtComponent,
       // ReasonModalComponent
        
  ],

  imports: [
    CdkStepperModule,
    NgStepperModule,
    FormsModule,
    ToastrModule.forRoot(), // Ajoutez ToastrModule.forRoot() dans les imports
    MatDialogModule,
    RouterModule,
    FormsModule,
    BrowserModule,
    CdkStepperModule,
    NgStepperModule,
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
    LayoutsModule,
    AppRoutingModule,
    ExtrapagesModule,
    FormsModule,
    CarouselModule,
    AccordionModule.forRoot(),
    TabsModule.forRoot(),
    TooltipModule.forRoot(),
    SharedModule,
    ScrollToModule.forRoot(),
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    JwtModule.forRoot({
      config: {

        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:8081"]
      },
    }),
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: FakeBackendInterceptor, multi: true },
    {
      provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true
    },
    // LoaderService,
    // { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptorService, multi: true },
  ],
})
export class AppModule {
  
 }

 export function tokenGetter() {
  return localStorage.getItem("token");
}
