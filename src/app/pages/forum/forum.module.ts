import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddquestionComponent } from './addquestion/addquestion.component';
import { ListforumComponent } from './listforum/listforum.component';
import { ForumRoutingModule } from './forum-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { UIModule } from 'src/app/shared/ui/ui.module';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { NgStepperModule } from 'angular-ng-stepper';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { NgSelectModule } from '@ng-select/ng-select';
import { UiSwitchModule } from 'ngx-ui-switch';
import { ColorPickerModule } from 'ngx-color-picker';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { FlatpickrModule } from 'angularx-flatpickr';
import { DetailComponent } from './detail/detail.component';
import { ReponseComponent } from './reponse/reponse.component';



@NgModule({
  declarations: [AddquestionComponent, ListforumComponent, DetailComponent, ReponseComponent],
  imports: [
    CommonModule,
    ForumRoutingModule,
    ReactiveFormsModule,
    UIModule,
    CKEditorModule,
    NgStepperModule,
    CdkStepperModule,
    NgxMaskDirective,
    NgxMaskPipe,
    NgSelectModule,
    UiSwitchModule,
    ColorPickerModule,
    BsDatepickerModule.forRoot(),
    NgxDropzoneModule,
    FlatpickrModule.forRoot()
  ],
  providers: [provideNgxMask()]
})
export class ForumModule { }
