import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersListService } from 'src/app/UserServices/UsersList/usersServiceservice';
import { retry } from 'rxjs';
import { User } from 'src/app/UserServices/UsersList/UserModel.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit{

  
  validationform: UntypedFormGroup; // bootstrap validation form
 
  constructor(public formBuilder: UntypedFormBuilder , 
    private router :Router,
    public toastr:ToastrService,
    private route: ActivatedRoute , public userService : UsersListService ) { }
  // bread crumb items
  breadCrumbItems: Array<{}>;
  files: File[] = [];
  // Form submition
  submit: boolean;
  formsubmit: boolean;
  typesubmit: boolean;
  rangesubmit: boolean;
   userToUpdate: User = new User();
  userId:string;
  isDisabled:boolean;

  ngOnInit() {

    this.breadCrumbItems = [{ label: 'User Profile' }, { label: 'Edit Profile', active: true }];

    this.userId = this.route.snapshot.params['id'];

    this.validationform = this.createUpdateForm();
    
    this.userService.getUser(this.userId).subscribe({
    next : (data :User)=>{
      this.userToUpdate=data
      },
      complete:()=>{
        if(this.userToUpdate){
          console.log(this.userToUpdate!=null)
          this.validationform = this.createUpdateForm(this.userToUpdate);
        }
      }
    }
      );

    this.submit = false;
    this.formsubmit = false;
    this.typesubmit = false;
    this.rangesubmit = false;
    this.isDisabled=true;
  }


  createUpdateForm(data?:any){
      return this.formBuilder.group({
        fullName: [data && data.firstName ? data.firstName+''+data.lastName :'',[Validators.required]],
        login: [data && data.login ? data.login :'',[Validators.required]],
        address: [data && data.address ? data.address: '',[Validators.required]],
        phoneNumber: [data && data.phoneNumber ? data.phoneNumber :'',[Validators.required]],
        emailPro: [data && data.emailPro ? data.emailPro :'', [Validators.required]],
        cin: [data && data.cin ? data.cin: '',[Validators.required]],
      });
  }

  get form() {
    return this.validationform.controls;
  }


  validSubmit() {
    if(this.validationform.valid){
      this.submit = true;
      console.log(this.file,"777777777777777")
      const formData = new FormData();
      formData.append('phoneNumber', this.form.phoneNumber.value);
      formData.append('address', this.form.address.value);
      formData.append('cin', this.form.cin.value);
      formData.append('emailPro', this.form.emailPro.value);
      formData.append('file',this.file);


      this.userService.updateUser(this.userId,formData).subscribe({
        error:(err:any)=>{
          this.toastr.warning('Something went wrong', 'WARNING');
        },
        complete:()=>{
          this.toastr.success('Supervisor updated with success', 'SUCCESS');
          this.router.navigate(['/user/profile']);
        }
      }
      );
    }
   
  }
  imageURL: string | undefined;
  file:File;
 fileChange(event: any) {

   let fileList: any = (event.target as HTMLInputElement);
   this.file= fileList.files[0];
   const reader = new FileReader();
   reader.onload = () => {
     this.imageURL = reader.result as string;
     document.querySelectorAll('#member-img').forEach((element: any) => {
       element.src = this.imageURL;
     });
     this.validationform.controls['img'].setValue(this.imageURL);
   }
   reader.readAsDataURL(this.file)
 
 }



}
