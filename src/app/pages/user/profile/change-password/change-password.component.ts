import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Lightbox } from 'ngx-lightbox';
import { UsersListService } from 'src/app/UserServices/UsersList/usersServiceservice';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent  implements OnInit{
  @ViewChild('myButton') myButton: ElementRef;
  modalRef?: BsModalRef;

  // bread crumb items
  breadCrumbItems: Array<{}>;

  verifForm: UntypedFormGroup;
  submitted:any = false;
  submit:any = false;

  codeVerification:string;

  userId:string ;
  codeVerificationinput: string="";
  codeForm: UntypedFormGroup;
  newPasswordin:string;
  bl:boolean=false;

  constructor(private lightbox: Lightbox, private modalService: BsModalService,
    private formBuilder: UntypedFormBuilder, private route: ActivatedRoute, private router: Router ,
    public userService : UsersListService
  ) {

  }
  
  config:any = {
    allowNumbersOnly: true,
    length: 6,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
      'width': '80px',
      'height': '50px'
    }
  }
  
  ngOnInit(): void {
    this.userId = this.route.snapshot.params['id'];
    document.body.classList.remove('auth-body-bg')
    this.breadCrumbItems = [{ label: 'UI Elements' }, { label: 'Lightbox', active: true }];

    this.verifForm = this.formBuilder.group({
      oldPass: ['', [Validators.required]],
      newPass: ['', [Validators.required]],
    });
    this.codeForm = this.formBuilder.group({
      code1: ['', [Validators.required]],
      code2: ['', [Validators.required]],
      code3: ['', [Validators.required]],
      code4: ['', [Validators.required]],
      code5: ['', [Validators.required]],
      code6: ['', [Validators.required]],
    });
  }

  get form() { return this.verifForm.controls; }
  get form1() { return this.codeForm.controls; }

  onSubmit(){
    console.log(this.submitted)
    if(this.verifForm.valid){
      
      this.submitted=true;
      console.log(this.submitted)
      const request ={
        oldPassword:this.form.oldPass.value,
        newPassword:this.form.newPass.value
      }
      console.log(request,'88888888888888888888888888')
      console.log(this.userId,'88888888888888888888888888')
      this.userService.sendEmailVerification(this.userId,request).subscribe({
        next:(res:any)=>{
          this.codeVerification=res.codeSent;
          this.newPasswordin=this.form.newPass.value;
        },
        complete:()=>{
          console.log(this.codeVerification,"zzzzzzzzzzzzzzz");
          this.bl=true;
        }
      });
    }
  }


  onchangePass(){
    if(this.codeForm.valid){
    const request ={
      newPassword:this.newPasswordin,
      codeSent:this.codeVerification,
      codeInput:this.form1.code1.value+''+this.form1.code2.value+''+this.form1.code3.value+''+this.form1.code4.value+''+this.form1.code5.value+''+this.form1.code6.value
    }
    console.log(request);
    this.userService.changePassword(this.userId,request).subscribe({
      next:(res:any)=>{
        console.log(res);
      },
      complete:()=>{
        console.log("sucesss");
      }
    })
  }
  }
  
  ngAfterViewInit() {
    // Vérifiez si bl est true
    if (this.bl) {
      // Déclenchez automatiquement le clic sur le bouton
      this.myButton.nativeElement.click();
    }
  }

  /**
   * Close lightbox
   */
  close(): void {
    // close lightbox programmatically
    this.lightbox.close();
  }

  /**
   * Open modal
   * @param content modal content
   */
  openModal(content: any) {
    this.modalRef = this.modalService.show(content, { class: 'modal-lg'});
  }

 

  /**
   * Google Map Open modal
   * @param googlemap modal content
   */
  openMapModal(content: any) {
    this.modalRef = this.modalService.show(content, { class: 'modal-lg' });
  }


}
