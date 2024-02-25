import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MustMatch } from '../edit-profile/validation.mustmatch';
import { UsersListService } from 'src/app/UserServices/UsersList/usersServiceservice';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-supervisor',
  templateUrl: './add-supervisor.component.html',
  styleUrls: ['./add-supervisor.component.scss']
})
export class AddSupervisorComponent {
  StudentForm: UntypedFormGroup; // bootstrap validation form

  constructor(public formBuilder: UntypedFormBuilder , public userService : UsersListService ,public toastr:ToastrService) { }
  // bread crumb items
  breadCrumbItems: Array<{}>;

  // Form submition
  submit: boolean;

  ngOnInit() {

    this.breadCrumbItems = [{ label: 'User' }, { label: 'Add Student', active: true }];
    this.createForm();
    
  }

  createForm() {
    this.StudentForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      address: ['', [Validators.required]],
      cin: ['', [Validators.required]],
      login: ['', [Validators.required]],
      emailPro: ['', [Validators.required]],
      company: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
    });
  }

  /**
   * Returns form
   */
  get form() {
    return this.StudentForm.controls;
  }

  /**
   * Bootsrap validation form submit method
   */
  validSubmit() {

    this.submit = true;
    if(this.StudentForm.valid){
      const formData = new FormData();
      formData.append('login', this.form.login.value);
      formData.append('password', this.form.login.value);
      formData.append('lastName', this.form.lastName.value);
      formData.append('firstName', this.form.firstName.value);
      formData.append('phoneNumber', this.form.phoneNumber.value);
      formData.append('address', this.form.address.value);
      formData.append('cin', this.form.cin.value);
      formData.append('company', this.form.company.value);
      formData.append('emailPro', this.form.emailPro.value);
      
    this.userService.addSupervisor(formData).subscribe({
      next:(res:any)=>{
        console.log(res);
      },
      error:(err:any)=>{
        console.log(err);
        this.toastr.error('Something went wrong , try again !', 'ERRORS');
      },
      complete:()=>{
        console.log("sucess");
        this.toastr.success('Supervisor added with success', 'SUCCESS');
       this.StudentForm.reset();
       
      }
    })

  } else{
    console.log(this.StudentForm.invalid,"################")
  }
  }

 

}
