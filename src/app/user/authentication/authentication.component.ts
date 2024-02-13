import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Authenticationrequest } from 'src/app/UserServices/AuthenticationRequest';

import { AuthenticationService } from '../../UserServices/authentication.service';
@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent {

  constructor(private formBuilder: UntypedFormBuilder, private route: ActivatedRoute, private router: Router,private authServ : AuthenticationService,
  ) { }
  loginForm: UntypedFormGroup;
  submitted:any = false;
  error:any = '';
  returnUrl: string;

  // set the currenr year
  year: number = new Date().getFullYear();

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
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
      this.authServ.userLogin(request)
      .then(()=>{
        this.router.navigate(['/'])
      },
      error => {
        this.error = error ? error : '';
      })
     }
    }
  }

