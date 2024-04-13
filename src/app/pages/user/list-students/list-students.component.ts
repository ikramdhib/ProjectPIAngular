import { Component, QueryList, ViewChildren, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { BsModalService, BsModalRef, ModalDirective } from 'ngx-bootstrap/modal';
import { UntypedFormBuilder, UntypedFormGroup, UntypedFormArray, UntypedFormControl, Validators } from '@angular/forms';
import { DecimalPipe } from '@angular/common';

import { UsersListService } from 'src/app/UserServices/UsersList/usersServiceservice';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-list-students',
  templateUrl: './list-students.component.html',
  styleUrls: ['./list-students.component.scss'],
  providers: [DecimalPipe]
})
export class ListStudentsComponent {
    // bread crumb items
    breadCrumbItems: Array<{}>;


    // Table data
    total: Observable<number>;
    createContactForm!: UntypedFormGroup;
    submitted = false;
    contacts: any;
    files: File[] = [];
    currentUser:any=null;
    userId:any;
    user:any;
    totalCount: number = 0;
    pageSize: number = 5;
    currentPage: number = 1;
    API_RL=environment.API_URL;

    students:any;
  
    @ViewChild('newContactModal', { static: false }) newContactModal?: ModalDirective;
    @ViewChild('updateUser', { static: false }) updateUser?: ModalDirective;
    @ViewChild('removeItemModal', { static: false }) removeItemModal?: ModalDirective;
    deleteId: any;
  
    // constructor(){}
  
    constructor(private modalService: BsModalService, 
      public userServiseStudents : UsersListService,
      private formBuilder: UntypedFormBuilder,
      private http:HttpClient ,
      public toastr:ToastrService,) {
      
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
        unvId: ['', [Validators.required]],
        level: ['', [Validators.required]],
      })
    }

    loadUsers(){
      this.http.get(`${this.API_RL}api/v1/user/users/ETUDIANT`,{
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
      formData.append('unvId', this.form.unvId.value);
      formData.append('cin', this.form.cin.value);
      formData.append('login', this.form.login.value);
      formData.append('level', this.form.level.value.toUpperCase());

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
    get form() {
      return this.createContactForm.controls;
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
          this.createContactForm.controls['unvId'].setValue(this.user.unvId);
          this.createContactForm.controls['level'].setValue(this.user.level);
          
        }
      })
     
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
          this.toastr.success('Student deleted with success', 'SUCCESS');
        }
      })
    }

    showProfile(id:any){

      this.userServiseStudents.getUser(id).subscribe({
        next:(res:any)=>{
          this.currentUser=res;
        },
        complete:()=>{
          this.newContactModal.show();
        }
      })

    }
}
