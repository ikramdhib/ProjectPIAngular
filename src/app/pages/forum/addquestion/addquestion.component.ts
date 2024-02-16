import { Component, OnInit } from '@angular/core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ForumService } from '../forum.service';
import Swal from 'sweetalert2';
import { MyUploadAdapter } from '../UploadAdapter';



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


 constructor(private forumService: ForumService) {}

 ngOnInit(): void {
  this.breadCrumbItems = [{ label: 'Forum' }, { label: 'AddForum', active: true }];
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
      const questionData = this.formQuestion.value;
     
      this.forumService.createQuestion(questionData).subscribe((response) => {
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
 
}
