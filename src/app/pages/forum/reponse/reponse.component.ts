import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ForumService } from '../forum.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { MyUploadAdapter } from '../UploadAdapter';

@Component({
  selector: 'app-reponse',
  templateUrl: './reponse.component.html',
  styleUrls: ['./reponse.component.scss'],
  providers: [ForumService]
})
export class ReponseComponent  {
  breadCrumbItems: Array<{}>;
  success = false;
  currentUser:any;
  userId:string;
  public Editor = ClassicEditor;
  @Input() questionId: string;
  @Output() responseAdded: EventEmitter<void> = new EventEmitter<void>();
  @Input() editingResponse: any;

 constructor(private forumService: ForumService) { }

 ngOnInit() {
  this.currentUser=JSON.parse(localStorage.getItem("currentUser"));
  if(this.currentUser){
    this.userId=this.currentUser.id;
  }
   this.breadCrumbItems = [{ label: 'Forms' }, { label: 'Form Editor', active: true }];
   if (this.editingResponse) {
    this.formResponse.patchValue({
      content: this.editingResponse.content
    });
  }
 }
 onReady(editor:ClassicEditor):void{
  editor.plugins.get( 'FileRepository' ).createUploadAdapter = ( loader ) => {
    return new MyUploadAdapter( loader );
};}
 
 formResponse : FormGroup = new FormGroup({
  content: new FormControl('',[Validators.required,Validators.minLength(150)])
 })

 
 onSubmit() {
  if (this.formResponse.valid) {
    this.confirm();
  }
  if (this.formResponse.invalid) return;

  const content = this.formResponse.get('content').value;

  if (this.editingResponse) {
    // Mise à jour de la réponse
    this.forumService.updateResponse(this.editingResponse.id, content).subscribe(() => {
      this.responseAdded.emit(); // Notifiez le composant parent de la mise à jour
    });
  } else {
    // Ajout d'une nouvelle réponse
    // ... Votre logique existante pour ajouter une réponse
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

  this.forumService.postAnswer(answerData,this.userId).subscribe((response) => {
    console.log('Answer créée avec succès !', response);
    this.success = true;
    this.formResponse.reset();
    this.responseAdded.emit();
  }, (error) => {
    console.error('Erreur lors de la création de la réponse : ', error);
  });
}

}

