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
import { ListFavorisComponent } from './list-favoris/list-favoris.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { FormsModule } from '@angular/forms';
import { HistoriqueComponent } from './historique/historique.component';
import { TagInputModule } from 'ngx-chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';



@NgModule({
  declarations: [AddquestionComponent, ListforumComponent, DetailComponent, ReponseComponent, ListFavorisComponent, HistoriqueComponent],
  imports: [
    MatChipsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
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
    FlatpickrModule.forRoot(),
    TabsModule.forRoot(),
    TooltipModule.forRoot(),
    TagInputModule
  ],
  providers: [provideNgxMask()]
})
export class ForumModule { }
