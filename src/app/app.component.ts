import { Component , OnInit} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {Observable, Subject, Subscription} from 'rxjs';
import {RxStomp} from "@stomp/rx-stomp";
import SockJS from "sockjs-client"
import { Stomp } from "@stomp/stompjs";
import { WebSocketService } from './pages/user/reclamation/reclamationConf/web-socket.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit  {
  messages: any[] = [];
  message:any;
  messageSubscription: Subscription;

  constructor(private toastr: ToastrService,private webSocketService: WebSocketService,)
  {
    //this.webSocketService.connect();
    ////this.messageSubscription = this.webSocketService.receiveMessages().subscribe(message => {
     /* this.toastr.info(message.body)
      console.log(this.messageSubscription)*/
   // });
  }

  ngOnInit() {
    // document.getElementsByTagName("html")[0].setAttribute("dir", "rtl");
  }
}
