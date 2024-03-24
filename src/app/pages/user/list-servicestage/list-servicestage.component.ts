import { Component, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService, ModalDirective } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';


import { DecimalPipe } from '@angular/common';
import { UsersListService } from 'src/app/UserServices/UsersList/usersServiceservice';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-list-servicestage',
  templateUrl: './list-servicestage.component.html',
  styleUrls: ['./list-servicestage.component.scss'],
  providers: [DecimalPipe]
})
export class ListServicestageComponent {
  modalRef?: BsModalRef;

  // bread crumb items
  breadCrumbItems: Array<{}>;
  jobListForm!: UntypedFormGroup;
  submitted: boolean = false;
  deleteId:any;
  updateId:any;
  listData:any;
  isUpdate:boolean=false;

  // Table data
  content?: any;
  lists: any;
  jobList:any;
  total: Observable<number>;
  @ViewChild('removeItemModal', { static: false }) removeItemModal?: ModalDirective;

  totalCount: number = 0;
  pageSize: number = 5;
  currentPage: number = 1;
  API_RL=environment.API_URL; 

  constructor(private modalService: BsModalService, 
     private formBuilder: UntypedFormBuilder,
     private http:HttpClient ,
     public userServiseStudents:UsersListService) {
  }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Intership Service' }, { label: 'Intership Service user list', active: true }];

    this.loadUsers();

    /**
     * Form Validation
     */
    this.jobListForm = this.formBuilder.group({
      firstName: ['',[Validators.required]],
      lastName: ['', [Validators.required]],
      login: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      cin: ['', [Validators.required]],
      address: ['', [Validators.required]],
    });
  }

  /**
  * Open modal
  * @param content modal content
  */
  openViewModal(content: any) {
    this.modalRef = this.modalService.show(content);
  }

  // The master checkbox will check/ uncheck all items
  checkUncheckAll(ev: any) {
    this.lists.forEach((x: { state: any; }) => x.state = ev.target.checked)
  }

  
  loadUsers(){
    this.http.get(`${this.API_RL}api/v1/user/users/SERVICE_STAGE`,{
      params: {
        page: (this.currentPage - 1),
        size: this.pageSize
      }
    }).subscribe({
      next :(res:any)=>{
        this.lists=res.content;
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


  /**
   * Open modal
   * @param content modal content
   */
  openModal(content: any) {
    this.submitted = false;
    this.modalRef = this.modalService.show(content, { class: 'modal-md' });
  }

  /**
   * Form data get
   */
  get form() {
    return this.jobListForm.controls;
  }

  /**
  * Save user
  */
  saveUser() {
 
    if(this.setUpdated()!=true){
      this.submitted = true
    if (this.jobListForm.valid) {
    var  request:any={
        firstName:this.form.firstName.value,
        lastName:this.form.lastName.value,
        login:this.form.login.value,
        phoneNumber:this.form.phoneNumber.value,
        password:this.form.phoneNumber.value,
        cin:this.form.cin.value,
        address:this.form.address.value
      }
      console.log(request,"my req");
      this.userServiseStudents.addIntershipServiceUser(request).subscribe({
        complete:()=>{
          this.modalService.hide();
          setTimeout(() => {
            this.jobListForm.reset();
          }, 2000);
          window.location.reload();
        }
      })
    }
    }
  else if(this.setUpdated()){
    this.submitted = true
    if(this.jobListForm.valid){
      var  request:any={
        firstName:this.form.firstName.value,
        lastName:this.form.lastName.value,
        login:this.form.login.value,
        phoneNumber:this.form.phoneNumber.value,
        password:this.form.phoneNumber.value,
        cin:this.form.cin.value,
        address:this.form.address.value
      }
      this.userServiseStudents.updateIntershipService(this.updateId,request).subscribe({
        complete:()=>{
          setTimeout(() => {
            this.jobListForm.reset();
          }, 2000);
          window.location.reload();
        }
      })
    }
  }
  }

  /**
   * Open Edit modal
   * @param content modal content
   */
  editDataGet(id: any, content: any) {
    this.submitted = false;
    this.updateId=id;
    this.setUpdated();
    this.userServiseStudents.getUser(id).subscribe({
      next:(res:any)=>{
        this.listData=res;
      },
      complete:()=>{
        this.modalRef = this.modalService.show(content, { class: 'modal-md' });
        var modelTitle = document.querySelector('.modal-title') as HTMLAreaElement;
        modelTitle.innerHTML = 'Edit user';
        var updateBtn = document.getElementById('add-btn') as HTMLAreaElement;
        updateBtn.innerHTML = "Update";
        this.jobListForm.controls['firstName'].setValue(this.listData.firstName);
        this.jobListForm.controls['lastName'].setValue(this.listData.lastName);
        this.jobListForm.controls['login'].setValue(this.listData.login);
        this.jobListForm.controls['phoneNumber'].setValue(this.listData.phoneNumber);
        this.jobListForm.controls['cin'].setValue(this.listData.cin);
        this.jobListForm.controls['address'].setValue(this.listData.address);
      }
      
    });
   console.log(this.isUpdate,"00000000000000000000000000")
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

  setUpdated():boolean{
    return this.isUpdate=true;
  }
  closeModal(){
    this.removeItemModal.hide();
    console.log("hide");
  }

}
