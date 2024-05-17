import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Authenticationrequest } from 'src/app/UserServices/AuthenticationServices/AuthenticationRequest';

import { AuthenticationService } from '../UserServices/AuthenticationServices/authenticationUser.service';
@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent  implements OnInit {




  constructor(private formBuilder: UntypedFormBuilder, private route: ActivatedRoute, private router: Router,private authServ : AuthenticationService,
  ) { }
  loginForm: UntypedFormGroup;
  submitted:any = false;
  returnUrl: string;
  isError :boolean=false;
  isHumen=true;
  changeType : boolean=true;

  viewPasswor(){
    this.changeType=!this.changeType;
  }

  // set the currenr year
  year: number = new Date().getFullYear();
  captcha: string; 
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });

  }

  resolved(captchaResponse: string) {
    this.captcha = captchaResponse;
    this.isHumen=false;
}

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  /**
   * Form submit
   */
  onSubmit() {

    this.submitted = true;
    var request : Authenticationrequest = new Authenticationrequest(
      this.f.email.value , this.f.password.value
     )
     if(this.loginForm.valid){
      this.authServ.userLogin(request).subscribe({
        next :(res :any) =>{
          console.log("token",res?.acesstoken);
          if(res?.acesstoken !=null && res?.refreshToken!=null ){
            
            localStorage.setItem('token',res?.acesstoken);
            localStorage.setItem('reresh-Token',res?.refreshToken);
          }
        },
        complete:()=>{
          this.router.navigate(['/user/profile'])
        }
      })
     }
    }

  }

