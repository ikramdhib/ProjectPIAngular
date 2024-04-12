import { Component, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Observable } from 'rxjs';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { BsModalService, ModalDirective } from 'ngx-bootstrap/modal';
import { UsersListService } from 'src/app/UserServices/UsersList/usersServiceservice';
import { DecimalPipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-list-supervisor',
  templateUrl: './list-supervisor.component.html',
  styleUrls: ['./list-supervisor.component.scss'],
  providers: [DecimalPipe]
})
export class ListSupervisorComponent {
   // bread crumb items
   breadCrumbItems: Array<{}>;


   // Table data
   contactsList!: Observable<any[]>;
   total: Observable<number>;
   createContactForm!: UntypedFormGroup;
   submitted = false;
   contacts: any;
   files: File[] = [];
   userId:any;
   user:any;
   totalCount: number = 0;
   pageSize: number = 5;
   currentPage: number = 1;
   API_RL=environment.API_URL;
   students:any;
 
   @ViewChild('updateUser', { static: false }) updateUser?: ModalDirective;
   @ViewChild('removeItemModal', { static: false }) removeItemModal?: ModalDirective;
   deleteId: any;
 
   // constructor(){}
 
   constructor(private modalService: BsModalService, 
     public userServiseStudents : UsersListService,
     public toastr:ToastrService, 
     public router : Router,
     private http:HttpClient ,
     private formBuilder: UntypedFormBuilder) {
     
     }
 
   ngOnInit() {
     this.breadCrumbItems = [{ label: 'Contacts' }, { label: 'Users List', active: true }];

     this.loadUsers();
 
     this.createContactForm = this.formBuilder.group({
      firstName: ['',[Validators.required]],
      lastName: ['', [Validators.required]],
      login: ['', [Validators.required]],
      cin: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      address: ['', [Validators.required]],
      company: ['', [Validators.required]],
      emailPro: ['', [Validators.required]],
    })
   }

   loadUsers(){
    this.http.get(`${this.API_RL}api/v1/user/users/ENCADRANT`,{
      params: {
        page: (this.currentPage - 1),
        size: this.pageSize
      }
    }).subscribe({
      next :(res:any)=>{
        this.students=res.content;
        this.totalCount = res.totalCount;
      }
    });
  }

 
   pageChanged(event: any): void {
    console.log(this.currentPage,"@@@@@@@@@@");
    this.currentPage = event;
    console.log(event,"@@@@@@@@@@");
    this.loadUsers();
  }
 
     // Save User
     saveUser() {
      this.submitted=true;
      if (this.createContactForm.valid) {
        const formData = new FormData();
      formData.append('phoneNumber', this.form.phoneNumber.value);
      formData.append('firstName', this.form.firstName.value);
      formData.append('lastName', this.form.lastName.value);
      formData.append('address', this.form.address.value);
      formData.append('company', this.form.company.value);
      formData.append('cin', this.form.cin.value);
      formData.append('emailPro', this.form.emailPro.value);

     this.userServiseStudents.updateUser(this.userId,formData).subscribe({
      error:()=>{
        this.toastr.warning('Something went wrong', 'WARNING');
      },
          complete:()=>{
        this.createContactForm.reset();
        this.updateUser.hide()
        window.location.reload();
        this.toastr.success('Student deleted with success', 'SUCCESS');
          }
        })
      
      }
    }
 
   // Edit User
   editUser(id: any) {
    this.submitted = false;
    this.userId=id;
    this.userServiseStudents.getUser(id).subscribe({
      next:(res:any)=>{
        this.user=res;
      },
      complete:()=>{
        this.updateUser.show();

        var modelTitle = document.querySelector('.modal-title') as HTMLAreaElement;
        modelTitle.innerHTML = 'Edit Profile';
        var updateBtn = document.getElementById('addContact-btn') as HTMLAreaElement;
        updateBtn.innerHTML = "Update";
    
        this.createContactForm.controls['firstName'].setValue(this.user.firstName);
        this.createContactForm.controls['lastName'].setValue(this.user.lastName);
        this.createContactForm.controls['login'].setValue(this.user.login);
        this.createContactForm.controls['phoneNumber'].setValue(this.user.phoneNumber);
        this.createContactForm.controls['cin'].setValue(this.user.cin);
        this.createContactForm.controls['address'].setValue(this.user.address);
        this.createContactForm.controls['company'].setValue(this.user.company);
        this.createContactForm.controls['emailPro'].setValue(this.user.emailPro);
        
      }
    })
   
  }
 

   blockUser(id: any) {
    this.userServiseStudents.blockUser(id).subscribe({
      complete:()=>{
        this.toastr.success('Supervisor BLOCKED with success','SUCCESS');
        window.location.reload();
      }
    })
   }
   unblockUser(id: any) {
    this.userServiseStudents.unblockUser(id).subscribe({
      complete:()=>{
        this.toastr.success('Supervisor UnBLOCKED with success','SUCCESS');
        window.location.reload();
      }
    })
   }
   get form() {
    return this.createContactForm.controls;
  }

   // Delete User
   removeUser(id: any) {
    this.deleteId=id
    this.removeItemModal.show();
   }
 
   confirmDelete() {
    console.log('this user is ',this.deleteId);
      this.userServiseStudents.deleteUser(this.deleteId).subscribe({
        complete:()=>{
          this.removeItemModal.hide();
          window.location.reload();
        }
      })
    }

}
