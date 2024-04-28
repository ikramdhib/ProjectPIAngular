import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ForumService } from '../forum.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { MyUploadAdapter } from '../UploadAdapter';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-reponse',
  templateUrl: './reponse.component.html',
  styleUrls: ['./reponse.component.scss'],
  providers: [ForumService]
})
export class ReponseComponent  {
  breadCrumbItems: Array<{}>;
  success = false;
  public Editor = ClassicEditor;
  @Input() questionId: string;
  @Output() responseAdded: EventEmitter<void> = new EventEmitter<void>();
  editingResponse: any = null;
  public editorInstance: any;
  currentUser:any;
  userId:any;

 constructor(private forumService: ForumService , private http :HttpClient) { }

 ngOnInit() {
   this.breadCrumbItems = [{ label: 'Forms' }, { label: 'Form Editor', active: true }];
   this.currentUser=JSON.parse(localStorage.getItem("currentUser"));
    if(this.currentUser){
      this.userId=this.currentUser.id;
    }
 }
 onReady(editor:ClassicEditor):void{
  editor.plugins.get( 'FileRepository' ).createUploadAdapter = ( loader ) => {
    return new MyUploadAdapter( loader,this.http );
};
this.editorInstance = editor}
 
 formResponse : FormGroup = new FormGroup({
  content: new FormControl('',[Validators.required,Validators.minLength(150)])
 })

 
 onSubmit() {
  if (this.formResponse.invalid) return;
  this.confirm();
}

confirm() {
  Swal.fire({
    title: 'Are you sure?',
    text: this.editingResponse ? 'Do you want to update this response?' : 'Do you want to add this response?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#34c38f',
    cancelButtonColor: '#f46a6a',
    confirmButtonText: 'Yes'
  }).then(result => {
    if (result.isConfirmed) {
      if (this.editingResponse) {
        this.updateResponse(); // Appelez la méthode de mise à jour si vous êtes en mode édition
      } else {
        this.addResponse(); // Sinon, appelez la méthode pour ajouter une nouvelle réponse
      }
    }
  });
}

updateResponse() {
  const responseContent = this.formResponse.get('content').value;
  this.forumService.updateResponse(this.editingResponse.id, responseContent)
    .subscribe({
      next: (updatedResponse) => {
        // Gestion du succès de la mise à jour
        this.resetForm();
        this.responseAdded.emit();
      },
      error: (error) => {
        console.error('Error updating the response: ', error);
      }
    });
    console.log("modification");
}

resetForm() {
  this.editingResponse = null;
  this.formResponse.reset();
  if (this.editorInstance) {
    this.editorInstance.setData(''); // Réinitialisez le contenu de l'instance de CKEditor
  }
}

addResponse() {
  const answerData = {
    questionId: this.questionId,
    content: this.formResponse.value.content
  };

  this.forumService.postAnswer(answerData , this.userId).subscribe((response) => {
    console.log('Answer créée avec succès !', response);
    this.success = true;
    this.formResponse.reset();
    this.responseAdded.emit();
  }, (error) => {
    console.error('Erreur lors de la création de la réponse : ', error);
  });
}
startEdit(response: any) {
  this.editingResponse = response; // Stockez la réponse à éditer
  this.formResponse.patchValue({
    content: response.content // Préremplissez le formulaire avec le contenu de la réponse
  });
  if (this.editorInstance) {
    this.editorInstance.setData(response.content); // Mettez à jour l'éditeur CKEditor avec le contenu de la réponse
  }
}

}
