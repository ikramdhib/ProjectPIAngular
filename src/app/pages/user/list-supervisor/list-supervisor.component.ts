import { Component, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Observable } from 'rxjs';
import { userListModel } from '../list-students/userlist.model';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NgbdUserListSortableHeader } from '../list-students/userlist-sortable.directive';
import { BsModalService, ModalDirective } from 'ngx-bootstrap/modal';
import { UsersListService } from 'src/app/UserServices/UsersList/usersServiceservice';
import { userListService } from '../list-students/userlist.service';
import { userList } from '../list-students/data';
import { DecimalPipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-supervisor',
  templateUrl: './list-supervisor.component.html',
  styleUrls: ['./list-supervisor.component.scss'],
  providers: [userListService, DecimalPipe]
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

   students:any;
 
   @ViewChildren(NgbdUserListSortableHeader) headers!: QueryList<NgbdUserListSortableHeader>;
   @ViewChild('newContactModal', { static: false }) newContactModal?: ModalDirective;
   @ViewChild('removeItemModal', { static: false }) removeItemModal?: ModalDirective;
   deleteId: any;
 
   // constructor(){}
 
   constructor(private modalService: BsModalService, 
     public userServiseStudents : UsersListService,
     public toastr:ToastrService, 
     public service: userListService, 
     public router : Router,
     private formBuilder: UntypedFormBuilder) {
     
     }
 
   ngOnInit() {
     this.breadCrumbItems = [{ label: 'Contacts' }, { label: 'Users List', active: true }];
 
     setTimeout(() => {

       this.userServiseStudents.getAllSupervisor().subscribe({
         next :(res:any)=>{
           this.students=res;
           console.log(this.students.length,"tttttttttttttttttttt")
         }
       })
     }, 1200);
 
     this.createContactForm = this.formBuilder.group({
       id: [''],
       name: ['', [Validators.required]],
       email: ['', [Validators.required]],
       position: ['', [Validators.required]],
       tags: ['', [Validators.required]],
       img: ['', [Validators.required]],
     })
   }
 
   // File Upload
   imageURL: string | undefined;
   fileChange(event: any) {
     let fileList: any = (event.target as HTMLInputElement);
     let file: File = fileList.files[0];
     const reader = new FileReader();
     reader.onload = () => {
       this.imageURL = reader.result as string;
       document.querySelectorAll('#member-img').forEach((element: any) => {
         element.src = this.imageURL;
       });
       this.createContactForm.controls['img'].setValue(this.imageURL);
     }
     reader.readAsDataURL(file)
   }
 
   // Save User
   saveUser() {
     if (this.createContactForm.valid) {
       if (this.createContactForm.get('id')?.value) {
         this.service.products = userList.map((data: { id: any; }) => data.id === this.createContactForm.get('id')?.value ? { ...data, ...this.createContactForm.value } : data)
       }
       else {
         const name = this.createContactForm.get('name')?.value;
         const email = this.createContactForm.get('email')?.value;
         const position = this.createContactForm.get('position')?.value;
         const tags = this.createContactForm.get('tags')?.value;
         userList.push({
           id: userList.length + 1,
           profile: this.imageURL,
           name,
           email,
           position,
           tags,
           project: "136",
           isSelected: false
         })
       }
       this.createContactForm.reset();
       this.newContactModal.hide()
     }
   }
 
   // Edit User
   editUser(id: any) {
     this.submitted = false;
     this.newContactModal.show();
 
     var modelTitle = document.querySelector('.modal-title') as HTMLAreaElement;
     modelTitle.innerHTML = 'Edit Profile';
     var updateBtn = document.getElementById('addContact-btn') as HTMLAreaElement;
     updateBtn.innerHTML = "Update";
 
     var listData = this.contacts[id];
 
     this.createContactForm.controls['id'].setValue(listData.id);
     this.createContactForm.controls['name'].setValue(listData.name);
     this.createContactForm.controls['email'].setValue(listData.email);
     this.createContactForm.controls['position'].setValue(listData.position);
     this.createContactForm.controls['tags'].setValue(listData.tags);
     this.createContactForm.controls['img'].setValue(listData.profile);
   }
 
   // Delete User
   removeUser(id: any) {
    this.userServiseStudents.blockUser(id).subscribe({
      complete:()=>{
        this.toastr.success('Student added with success','SUCCESS');
        window.location.reload();
      }
    })
   }
 
   confirmDelete() {
     userList.splice(this.deleteId, 1);
     this.removeItemModal.hide();
   }

}
