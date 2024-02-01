import { Component, OnInit } from '@angular/core';

import { CandidateListModel } from './candidate-list.model';
import { CandidateList } from './data';

@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.scss']
})

/**
 * Candidate List Component
 */
export class CandidateListComponent implements OnInit {

  breadCrumbItems: Array<{}>;
  CandidateList: CandidateListModel[];
  public isCollapsed: boolean = true;

  constructor() { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Jobs' }, { label: 'Candidate List', active: true }];

    this.CandidateList = CandidateList;
  }

  /**
   * Active Toggle navbar
   */
   activeMenu(id:any) {            
    document.querySelector('.active_'+id)?.classList.toggle('active');
  }

}
