import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TabsModule } from 'ngx-bootstrap/tabs';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

import { UIModule } from '../../shared/ui/ui.module';

import { BlogRoutingModule } from './blog-routing.module';

import { BloglistComponent } from '../blog/bloglist/bloglist.component';
import { BloggridComponent } from '../blog/bloggrid/bloggrid.component';
import { DetailComponent } from '../blog/detail/detail.component';

@NgModule({
    declarations: [BloglistComponent, BloggridComponent, DetailComponent],
    imports: [
        CommonModule,
        BlogRoutingModule,
        TabsModule.forRoot(),
        TooltipModule.forRoot(),
        UIModule,
    ]
})

export class BlogModule { }
