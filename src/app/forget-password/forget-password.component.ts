import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ForgetPasswordService } from '../UserServices/ForgetPassServices/forget-password.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent {
// set the currenr year
year: number = new Date().getFullYear();

resetForm: UntypedFormGroup;
submitted:any = false;
error:any = '';
success:any = '';
loading:any = false;

constructor(private formBuilder: UntypedFormBuilder, private route: ActivatedRoute, private router: Router, private forgePassService : ForgetPasswordService ) { }

ngOnInit(): void {
 this.resetForm = this.formBuilder.group({
   email: ['', [Validators.required, Validators.email]],
 });
}

// convenience getter for easy access to form fields
get f() { return this.resetForm.controls; }

/**
* On submit form
*/
onSubmit() {
 this.success = '';
 this.submitted = true;

 if (!this.resetForm.invalid) {
  const request ={
    login : this.f.email.value
  }
  this.forgePassService.userResetPassword(request).subscribe({
    next : (res:any)=>{
      console.log(res);
       localStorage.setItem("passReset_user",JSON.stringify(res))
    },
    error:(err:any)=>{
      this.error="User not fount try again !"
      console.log(err)
    },
    complete:()=>{
      this.router.navigate(['/email-verification'])
    }
  })
 }
 
}

}
