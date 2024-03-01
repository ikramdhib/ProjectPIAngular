import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { UsersListService } from 'src/app/UserServices/UsersList/usersServiceservice';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-supervisor',
  templateUrl: './add-supervisor.component.html',
  styleUrls: ['./add-supervisor.component.scss']
})
export class AddSupervisorComponent {
  StudentForm: UntypedFormGroup; // bootstrap validation form

  constructor(public formBuilder: UntypedFormBuilder, private router: Router , 
    public userService : UsersListService ,public toastr:ToastrService) { }
  // bread crumb items
  breadCrumbItems: Array<{}>;

  // Form submition
  submit: boolean;
  defaultImageFile: File;

  ngOnInit() {

    this.breadCrumbItems = [{ label: 'User' }, { label: 'Add Student', active: true }];
    this.createForm();

    this.defaultImageFile = new File(['defaultImage'], 'assets/images/users/user-dummy-img.jpg', { type: 'image/jpeg' });
    
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
      img: ['',[Validators.required]],
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
      formData.append('password', this.form.login.value);
      formData.append('lastName', this.form.lastName.value);
      formData.append('firstName', this.form.firstName.value);
      formData.append('phoneNumber', this.form.phoneNumber.value);
      formData.append('address', this.form.address.value);
      formData.append('cin', this.form.cin.value);
      formData.append('company', this.form.company.value);
      formData.append('emailPro', this.form.emailPro.value);
      formData.append('file',this.file);
      console.log(this.imageURL,"+++++++++++++++++++++++++++++++++++++++")
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

       this.router.navigate(['/user/supervisor-users']);
       
      }
    })

  } else{
    console.log(this.StudentForm.invalid,"################")
  }
  }

 

}
