import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ForumService } from '../forum.service';


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
 
 constructor(private forumService: ForumService) { }
 ngOnInit(): void {
  this.breadCrumbItems = [{ label: 'Forum' }, { label: 'List Forum', active: true }];
}
 formQuestion : FormGroup = new FormGroup({
    titre: new FormControl('',[Validators.required,Validators.minLength(15)]),
    content: new FormControl('',[Validators.required,Validators.minLength(150)])
  })

  onSubmit() {
    if (this.formQuestion.valid) {
      const questionData = this.formQuestion.value;
      this.forumService.createQuestion(questionData).subscribe((response) => {
        console.log('Question créée avec succès !', response);
        // Rediriger vers la page principale du forum ou effectuer d'autres actions si nécessaire
      }, (error) => {
        console.error('Erreur lors de la création de la question : ', error);
      });
    }
  }
  


}
