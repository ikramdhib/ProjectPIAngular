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
      const tagObjects = this.selectedTags.map(tagName => ({ name: tagName }));
      const questionData = {
        titre: this.formQuestion.get('titre').value,
        content: this.formQuestion.get('content').value,
        tags: tagObjects
      };
  
      this.forumService.createQuestion(questionData).subscribe({
        next: (response) => {
          if (!response.toxic) { // Vérifiez si la propriété `toxic` est false, indiquant une réponse non toxique
            console.log('Question créée avec succès !', response);
            this.success = true;
            this.successmsg(); // Afficher le message de réussite
          } else {
            // Si `toxic` est true, cela signifie que la création a échoué à cause du contenu
            console.error('La création de la question a échoué : ', response.message);
            alert(response.message); // Afficher le message d'erreur du serveur
          }
        },
        error: (error) => {
          console.error('Erreur lors de la communication avec le serveur : ', error);
          if (error.status === 400) {
            // Vérifiez si la réponse du serveur est dans error.error et si elle contient un message.
            const errorMessage = error.error ? error.error.message : null;
            if(errorMessage === 'Le contenu de la question n\'est pas lié à la programmation informatique.') {
              this.basicMessage(); // Affiche un message spécifique pour l'erreur liée au contenu
            } else {
              this.basicMessage2(); // Affiche un message différent pour les autres types d'erreurs 400
            }
          } else {
            // Pour toutes les autres erreurs HTTP, affichez une alerte générique
            alert('Une erreur est survenue lors de l\'envoi de votre question.');
          }
        }
      });
    }}
  successmsg() {
    Swal.fire('Good job!', 'Ajout avec succès!', 'success');
    
  }
  basicMessage() {
    Swal.fire('votre contenu nest pas lié a linformatique');
  }
  basicMessage2() {
    Swal.fire('Votre contenu contient des mots toxiques');
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