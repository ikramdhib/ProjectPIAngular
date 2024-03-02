import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ForumService } from '../forum.service';
import Swal from 'sweetalert2';
import { MyUploadAdapter } from '../UploadAdapter';

import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable, map, startWith } from 'rxjs';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-addquestion',
  templateUrl: './addquestion.component.html',
  styleUrls: ['./addquestion.component.scss'],
  providers: [ ForumService]
})
export class AddquestionComponent implements OnInit {
 // bread crumb items
 breadCrumbItems: Array<{}>;
 public Editor = ClassicEditor;
 success = false;
 selectedTags: string[] = [];
  tagCtrl = new FormControl();
  filteredTags: Observable<string[]>;
  allTags: string[] = [];
 @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;

 constructor(private forumService: ForumService) {}

 ngOnInit(): void {
  this.breadCrumbItems = [{ label: 'Forum' }, { label: 'AddForum', active: true }];
  this.forumService.getTags().subscribe(tags => {
    this.allTags = tags;
    this.filteredTags = this.tagCtrl.valueChanges
      .pipe(
        startWith(null),
        map((tag: string | null) => tag ? this._filter(tag) : this.allTags.slice())
      );
  });
}

onReady(editor:ClassicEditor): void {
  editor.plugins.get( 'FileRepository' ).createUploadAdapter = ( loader ) => {
      return new MyUploadAdapter( loader );
  };}

 formQuestion : FormGroup = new FormGroup({
    titre: new FormControl('',[Validators.required,Validators.minLength(15)]),
    content: new FormControl('',[Validators.required,Validators.minLength(150)])
  })

  onSubmit() {
    if (this.formQuestion.valid) {
      const formData = new FormData();
      formData.append('titre', this.formQuestion.get('titre').value);
      formData.append('content', this.formQuestion.get('content').value);
      formData.append('tags', JSON.stringify(this.selectedTags));
  
      this.forumService.createQuestion(formData).subscribe((response) => {
        console.log('Question créée avec succès !', response);
        this.success = true;
        this.successmsg();
      }, (error) => {
        console.error('Erreur lors de la création de la question : ', error);
      });
    }
  }
  successmsg() {
    Swal.fire('Good job!', 'Ajout avec succès!', 'success');
    
  }

  separatorKeysCodes: number[] = [ENTER, COMMA];

add(event: MatChipInputEvent): void {
  const input = event.input;
  const value = event.value;

  // Ajoutez le tag uniquement s'il a une valeur et n'est pas déjà présent
  if ((value || '').trim() && !this.selectedTags.includes(value.trim())) {
    this.selectedTags.push(value.trim());
  }

  // Réinitialiser l'input
  if (input) {
    input.value = '';
  }

  this.tagCtrl.setValue(null);
}

remove(tag: string): void {
  const index = this.selectedTags.indexOf(tag);

  if (index >= 0) {
    this.selectedTags.splice(index, 1);
  }
}

selected(event: MatAutocompleteSelectedEvent): void {
  if (!this.selectedTags.includes(event.option.viewValue)) {
    this.selectedTags.push(event.option.viewValue);
  }
  this.tagInput.nativeElement.value = '';
  this.tagCtrl.setValue(null);
}

private _filter(value: string): string[] {
  const filterValue = value.toLowerCase();

  return this.allTags.filter(tag => tag.toLowerCase().includes(filterValue));
}
 
}
