import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsersListService } from 'src/app/UserServices/UsersList/usersServiceservice';
@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss']
})
export class AddStudentComponent {
  StudentForm: UntypedFormGroup; // bootstrap validation form

  constructor(public formBuilder: UntypedFormBuilder ,private router :Router, public userService : UsersListService ,public toastr:ToastrService) { }
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
      firstName: ['', [Validators.required ,Validators.pattern(/^[a-zA-Z]+$/)]],
      lastName: ['', [Validators.required,Validators.pattern(/^[a-zA-Z]+$/)]],
      address: ['', [Validators.required ,Validators.pattern(/^[a-zA-Z]+$/)]],
      cin: ['', [Validators.required,Validators.pattern(/^[0-9]+$/) ,Validators.minLength(8) ,Validators.maxLength(8) ]],
      login: ['', [Validators.required ,Validators.maxLength(25),  Validators.email]],
      unId: ['', [Validators.required ,Validators.minLength(8) ,Validators.maxLength(12)]],
      level: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required , Validators.pattern(/^[0-9]+$/) , ,Validators.minLength(8) , Validators.maxLength(8)]],
    });

    
  }

  /**
   * Returns form
   */
  get form() {
    return this.StudentForm.controls;
  }

  imageURL: string | undefined;
  file:File;
 fileChange(event: any) {

   let fileList: any = (event.target as HTMLInputElement);
   if(fileList!=null){
   this.file= fileList.files[0];
   const reader = new FileReader();
   reader.onload = () => {
     this.imageURL = reader.result as string;
     document.querySelectorAll('#member-img').forEach((element: any) => {
       element.src = this.imageURL;
     });
     this.StudentForm.controls['img'].setValue(this.imageURL);
   }
   reader.readAsDataURL(this.file)
 }
   else {
     // Si aucun fichier n'a été sélectionné, afficher l'image par défaut
     const defaultImageURL = 'assets/images/users/user-dummy-img.jpg';
     const imgElement = document.getElementById('member-img') as HTMLImageElement;
     if (imgElement) {
         imgElement.src = defaultImageURL;
     }
   }
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
      formData.append('file',this.file);
      
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

        this.router.navigate(['/user/student-users']);
      }
    })

  }
  }

 

}
