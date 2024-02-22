
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationComponent } from '../../authentication/authentication.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UserRoutingModule } from './user-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { NgxDropzoneModule } from 'ngx-dropzone';

import { TabsModule } from 'ngx-bootstrap/tabs';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { NgApexchartsModule } from 'ng-apexcharts';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { PaginationModule } from 'ngx-bootstrap/pagination';

import { NgSelectModule } from '@ng-select/ng-select';

import { WidgetModule } from '../../shared/widget/widget.module';
import { UIModule } from '../../shared/ui/ui.module';
import { ContactsRoutingModule } from '../../pages/contacts/contacts-routing.module';

import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { AddStudentComponent } from './add-student/add-student.component';
import { AddSupervisorComponent } from './add-supervisor/add-supervisor.component';



@NgModule({
  declarations: [AuthenticationComponent, ProfileComponent, EditProfileComponent, AddStudentComponent, AddSupervisorComponent  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    UserRoutingModule,
    NgApexchartsModule,
    NgSelectModule,
    WidgetModule,
    UIModule,
    ContactsRoutingModule,
    ModalModule,
    BsDropdownModule,
    TooltipModule,
    PaginationModule,
    TabsModule,
    CollapseModule,
    NgxDropzoneModule
  ]
})
export class UserModule {

}
