import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ForumService } from '../forum.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reponse',
  templateUrl: './reponse.component.html',
  styleUrls: ['./reponse.component.scss']
})
export class ReponseComponent  {
  breadCrumbItems: Array<{}>;
  success = false;
  public Editor = ClassicEditor;
  @Input() questionId: string;
  @Output() responseAdded: EventEmitter<void> = new EventEmitter<void>();
 constructor(private forumService: ForumService) { }

 ngOnInit() {
   this.breadCrumbItems = [{ label: 'Forms' }, { label: 'Form Editor', active: true }];
 }
 formResponse : FormGroup = new FormGroup({
  content: new FormControl('',[Validators.required,Validators.minLength(150)])
 })
 onSubmit() {
  if (this.formResponse.valid) {
    this.confirm();
  }
}
confirm() {
  Swal.fire({
    title: 'Are you sure?',
    text: 'You like to add this response',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#34c38f',
    cancelButtonColor: '#f46a6a',
    confirmButtonText: 'Yes'
  }).then(result => {
    if (result.isConfirmed) {
      this.addResponse();
    }
  });
}
addResponse() {
  const answerData = {
    questionId: this.questionId,
    content: this.formResponse.value.content
  };

  this.forumService.postAnswer(answerData).subscribe((response) => {
    console.log('Answer créée avec succès !', response);
    this.success = true;
    this.formResponse.reset();
    this.responseAdded.emit();
  }, (error) => {
    console.error('Erreur lors de la création de la réponse : ', error);
  });
}

}

