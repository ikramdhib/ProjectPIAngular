
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationComponent } from '../../authentication/authentication.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UserRoutingModule } from './user-routing.module';
import { ProfileComponent } from './profile/EncadrantProfile/profile.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { PaginationModule } from 'ngx-bootstrap/pagination';

import { NgSelectModule } from '@ng-select/ng-select';

import { WidgetModule } from '../../shared/widget/widget.module';
import { UIModule } from '../../shared/ui/ui.module';
import { ContactsRoutingModule } from '../../pages/contacts/contacts-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { EditProfileComponent } from './profile/edit-profileEncadrant/edit-profile.component';
import { AddStudentComponent } from './add-student/add-student.component';
import { AddSupervisorComponent } from './add-supervisor/add-supervisor.component';
import { ListSupervisorComponent } from './list-supervisor/list-supervisor.component';
import { ListStudentsComponent } from './list-students/list-students.component';
import { EditProfileStudentComponent } from './profile/edit-profile-student/edit-profile-student.component';
import { ChangePasswordComponent } from './profile/change-password/change-password.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ExtrapagesRoutingModule } from 'src/app/extrapages/extrapages-routing.module';
import { NgOtpInputModule } from 'ng-otp-input';
import { ListServicestageComponent } from './list-servicestage/list-servicestage.component';
import { RecaptchaModule } from 'ng-recaptcha';
import { ReclamationComponent } from './reclamation/reclamation.component';




@NgModule({
  declarations: [AuthenticationComponent, ReclamationComponent ,ProfileComponent, EditProfileComponent, AddStudentComponent, AddSupervisorComponent,  ListSupervisorComponent, ListStudentsComponent, EditProfileStudentComponent, ChangePasswordComponent, ListServicestageComponent  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    UserRoutingModule,
    NgxPaginationModule,
    NgSelectModule,
    WidgetModule,
    UIModule,
    RecaptchaModule,
    ContactsRoutingModule,
    ModalModule,
    BsDropdownModule,
    TooltipModule,
    PaginationModule,
    TabsModule,
    CollapseModule,
    NgxDropzoneModule,
    CarouselModule,
    ExtrapagesRoutingModule,
    NgOtpInputModule
  ]
})
export class UserModule {

}
