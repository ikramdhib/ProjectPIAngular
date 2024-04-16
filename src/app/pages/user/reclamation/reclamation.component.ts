import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReclamationService } from './reclamationConf/reclamation.service';
import { WebSocketService } from './reclamationConf/web-socket.service';

import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import { FormBuilder, FormGroup ,Validators  } from '@angular/forms';
@Component({
  selector: 'app-reclamation',
  templateUrl: './reclamation.component.html',
  styleUrl: './reclamation.component.scss'
})
export class ReclamationComponent {

  reclamationForm: FormGroup;
  submitted:any = false;

  constructor( private formBuilder: FormBuilder,
    private reclamationService: ReclamationService,
    private webSocketService : WebSocketService
  ){}


  ngOnInit(): void {
    this.reclamationForm = this.formBuilder.group({
      from: ['', [Validators.required]],
      to: ['', [Validators.required]],
    });

  }

  get f() { return this.reclamationForm.controls; }

  onSubmit(){
    this.submitted = true;
    var request : any =
    {
      "to":this.f.from.value ,
      "from": this.f.to.value
    }
    if(this.reclamationForm.valid){
      this.reclamationService.AddReclamation(request).subscribe({
        next :(res :any) =>{
          
        
          console.log("nexxxxxt" ,res)
        },
        complete:()=>{
          const notificationMessage = {
            userId: "65d5faf88ecbf72fd4d359f2",
            message: 'New application received for your offer'
          };
          this.webSocketService.sendMessageToCandiatureOwner(notificationMessage);
        console.log("DONE")
        }
      })
     }
  }
  

}
