import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UsersListService } from 'src/app/UserServices/UsersList/usersServiceservice';
@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss']
})
export class AddStudentComponent {
  StudentForm: UntypedFormGroup; // bootstrap validation form

  constructor(public formBuilder: UntypedFormBuilder , public userService : UsersListService ,public toastr:ToastrService) { }
  // bread crumb items
  breadCrumbItems: Array<{}>;

  // Form submition
  submit: boolean;

  ngOnInit() {

    this.breadCrumbItems = [{ label: 'User' }, { label: 'Add Student', active: true }];

    /**
     * Bootstrap validation form data
     */
    this.StudentForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      address: ['', [Validators.required]],
      cin: ['', [Validators.required]],
      login: ['', [Validators.required]],
      unId: ['', [Validators.required]],
      level: ['', [Validators.required]],
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
      formData.append('password', this.form.unId.value);
      formData.append('lastName', this.form.lastName.value);
      formData.append('firstName', this.form.firstName.value);
      formData.append('phoneNumber', this.form.phoneNumber.value);
      formData.append('address', this.form.address.value);
      formData.append('cin', this.form.cin.value);
      formData.append('level', this.form.level.value.toUpperCase());
      formData.append('unvId', this.form.unId.value);
      
    this.userService.addStudent(formData).subscribe({
      next:(res:any)=>{
        console.log(res);
      },
      error:(err:any)=>{
        console.log(err);
        this.toastr.error('Something went wrong , try again','ERROR')
      },
      complete:()=>{
        console.log("sucess");
        this.toastr.success('Student added with success','SUCCESS')
        this.StudentForm.reset();
      }
    })

  }
  }

 

}
