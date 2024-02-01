import { Component, OnInit, ViewChild } from '@angular/core';
import { DndDropEvent } from 'ngx-drag-drop';

import { tasks, memberList } from './data';

import { Task } from './kanabn.model';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-kanbanboard',
  templateUrl: './kanbanboard.component.html',
  styleUrls: ['./kanbanboard.component.scss']
})

/**
 * Kanbanboard Component
 */
export class KanbanboardComponent implements OnInit {

  upcomingTasks: Task[];
  inprogressTasks: Task[];
  completedTasks: Task[];
  memberLists: any;
  status: any;

  // bread crumb items
  breadCrumbItems: Array<{}>;
  taskForm!: UntypedFormGroup;
  submitted = false;

  @ViewChild('modalForm', { static: false }) modalForm?: ModalDirective;
  alltask: ({ id: number; title: string; date: string; task: string; user: string[]; budget: number; status: string; groupId?: undefined; } | { id: number; title: string; date: string; task: string; user: string[]; budget: number; groupId: number; status: string; })[];

  constructor(private formBuilder: UntypedFormBuilder) { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Tasks' }, { label: 'Kanban Board', active: true }];

    this.taskForm = this.formBuilder.group({
      id: [''],
      taskname: ['', [Validators.required]],
      taskdesc: ['', [Validators.required]],
      taskstatus: ['', [Validators.required]],
      taskbudget: ['', [Validators.required]],
      taskassignee: ['']
    })

    this._fetchData();
  }

  /**
   * on dragging task
   * @param item item dragged
   * @param list list from item dragged
   */
  onDragged(item: any, list: any[]) {
    const index = list.indexOf(item);
    list.splice(index, 1);
  }

  /**
   * On task drop event
   */
  onDrop(event: DndDropEvent, filteredList?: any[], targetStatus?: string) {
    if (filteredList && event.dropEffect === 'move') {
      let index = event.index;

      if (typeof index === 'undefined') {
        index = filteredList.length;
      }

      filteredList.splice(index, 0, event.data);
    }
  }

  private _fetchData() {
    // all tasks
    this.alltask = tasks
    this.inprogressTasks = tasks.filter(t => t.status === 'inprogress');
    this.upcomingTasks = tasks.filter(t => t.status === 'upcoming');
    this.completedTasks = tasks.filter(t => t.status === 'completed');
    this.memberLists = memberList
  }

  // Delete Data
  delete(event: any) {
    event.target.closest('.card .task-box')?.remove();
  }

  // Select Member
  selectMember(id: any) {
    this.memberLists[id].checked = true;
    if (this.memberLists[id.checked] == true) {
      this.memberLists[id].checked = false;
    }
  }

  // add new tak  
  addnewTask(status: any) {
    this.status = status
    this.modalForm.show()
  }

  // Save Form
  submitForm() {
    if (this.taskForm.valid) {
      if (this.taskForm.get('id')?.value) {
        this.alltask = tasks.map((data: { id: any; }) => data.id === this.taskForm.get('id')?.value ? { ...data, ...this.taskForm.value } : data)
      } else {
        const title = this.taskForm.get('taskname')?.value;
        const desc = this.taskForm.get('taskdesc')?.value;
        const task = this.taskForm.get('taskstatus')?.value;
        const budget = this.taskForm.get('taskbudget')?.value;
        const user = []
        for (var i = 0; i < this.memberLists.length; i++) {
          if (this.memberLists[i].checked == true) {
            user.push(this.memberLists[i].profile)
          }
        }
        tasks.push({
          id: tasks.length + 1,
          date: '14 Oct, 2019',
          title,
          task,
          user,
          status: this.status,
          budget
        })
    
      }
    }
    this._fetchData();
    this.taskForm.reset();
    this.modalForm.hide()
  }

  // Update Task
  updateTask(id: any) {
    this.submitted = false;
    this.modalForm?.show()

    var updatetitle = document.querySelector('.modal-title') as HTMLAreaElement
    updatetitle.innerHTML = "Update Task";

    var updatebtn = document.getElementById('addtask') as HTMLAreaElement
    updatebtn.innerHTML = "Update Task";

    var data = tasks[id]
    this.taskForm.controls['id'].setValue(data.id);
    this.taskForm.controls['taskname'].setValue(data.title);
    this.taskForm.controls['taskstatus'].setValue(data.task);
    this.taskForm.controls['taskbudget'].setValue(data.budget);
    // Compare data.user profile and memberList profile if same the set checked property to true
    for (var i = 0; i < this.memberLists.length; i++) {
      for (var x = 0; x < data.user.length; x++) {
        if (this.memberLists[i].profile == data.user[x]) {
          this.memberLists[i].checked = true;
          // this.taskForm.controls['taskassignee'].setValue( this.memberLists[i].id);
        }
      }
    }

  }
}
