import { Component,OnInit,QueryList,ViewChildren } from '@angular/core';
import { PopoverDirective } from 'ngx-bootstrap/popover';


@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})

/**
 * UI-general component
 */
export class GeneralComponent implements OnInit {
  // bread crumb items
  breadCrumbItems: Array<{}>;

  page:number = 1;
  pages:number = 2;
  largepage:number = 1;
  smallpage:number = 2;
  alignpage1:number = 1;
  alignpage2:number = 2;

  constructor() { }
  @ViewChildren(PopoverDirective) popovers: QueryList<PopoverDirective>;
varArr=[1,2,3,4]
  ngAfterViewInit() {
    this.popovers.forEach((popover: PopoverDirective) => {
      popover.onShown.subscribe(() => {
        this.popovers
        .filter(p => p !== popover)
        .forEach(p => p.hide());
      });
    });
  }

onFinish(items)
{
  this.popovers=(items);
}

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'UI Elements' }, { label: 'General', active: true }];
  }

}
