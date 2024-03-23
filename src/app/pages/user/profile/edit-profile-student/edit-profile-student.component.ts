import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/UserServices/UsersList/UserModel.model';
import { UsersListService } from 'src/app/UserServices/UsersList/usersServiceservice';

@Component({
  selector: 'app-edit-profile-student',
  templateUrl: './edit-profile-student.component.html',
  styleUrls: ['./edit-profile-student.component.scss']
})
export class EditProfileStudentComponent {

  
  
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
        unvId: [data && data.unvId ? data.unvId :'', [Validators.required]],
        cin: [data && data.cin ? data.cin: '',[Validators.required]],
      });
      
  }

  get form() {
    return this.validationform.controls;
  }

 
  validSubmit() {
    console.log(this.validationform.valid);
    if(this.validationform.valid){
      this.submit = true;
      console.log(this.file,"777777777777777")
      const formData = new FormData();
      formData.append('phoneNumber', this.form.phoneNumber.value);
      formData.append('address', this.form.address.value);
      formData.append('cin', this.form.cin.value);
      if(this.file){formData.append('file',this.file);}
      else{formData.append('file', this.imageURL);}
      


      this.userService.updateUser(this.userId,formData).subscribe({
        
        complete:()=>{
          this.toastr.success('Supervisor updated with success', 'SUCCESS');
          this.router.navigate(['/user/profile']);
        }
      }
      );
    }
   
  }

  imageURL: any =this.userToUpdate.pic;
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
