import { Component } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject,takeUntil } from 'rxjs';
import { ForgetPasswordService } from 'src/app/UserServices/ForgetPassServices/forget-password.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {

submitted:any = false;
error:any = '';
success:any = '';
resetPassToken="";

  constructor(private formBuilder: FormBuilder , private route: ActivatedRoute, private router: Router, private forgePassService : ForgetPasswordService ) { }
  // set the currenr year
  year: number = new Date().getFullYear();

  passChange: FormGroup;


  ngOnInit(): void { 

    this.passChange = this.formBuilder.group({
      newPassword: ['', Validators.required]
    });

    this.resetPassToken = this.route.snapshot.queryParamMap.get('token');

    console.log(typeof(this.resetPassToken))
  }
   unsubscribeAll : Subject<any> = new Subject()

  get f() { return this.passChange.controls; }
 
  onSubmit(){
    this.success="";
    this.submitted=true;
  if(!this.f.invalid){
      console.log(this.f.newPassword.value)
      const request ={
        newPassword : this.f.newPassword.value
      }
      this.forgePassService.changePasswordOfUser(request,this.resetPassToken).subscribe({
        next:(res:any)=>{
         console.log("sucess") 
        },
        complete:()=>{
          localStorage.removeItem("passReset_user");
          this.router.navigate(['/authentication'])
        }
      })
      
   /*   this.forgePassService.changePasswordOfUser(request,this.resetPassToken).pipe(takeUntil(this.unsubscribeAll)).subscribe({
        next:(res:any)=>{
         console.log(res) 
         
         this.router.navigate(['/authentication'])
        },
        complete:()=>{
          localStorage.removeItem("passReset_user");
        }
      })*/
    
    }
  }

 /* ngOnDestroy() {
    this.unsubscribeAll.next(null);
    this.unsubscribeAll.complete();
  }*/
  
}
