import { Component, OnInit } from '@angular/core';
import { ForumService } from '../forum.service';

@Component({
  selector: 'app-listforum',
  templateUrl: './listforum.component.html',
  styleUrls: ['./listforum.component.scss'],
  providers: [ ForumService]
})
export class ListforumComponent implements OnInit {
  questions : Object
  breadCrumbItems: Array<{}>;
  constructor(private forumService:ForumService) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Invoices' }, { label: 'Detail', active: true }];
    console.log('On init .....')
    this.forumService.getQuestions().subscribe((datas)=>{
    this.questions = datas;
  })
 }

}
