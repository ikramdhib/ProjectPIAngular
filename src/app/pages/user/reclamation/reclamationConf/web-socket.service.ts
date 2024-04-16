import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { RxStomp } from '@stomp/rx-stomp';
import {ToastrService} from "ngx-toastr";
@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  private rxStomp: RxStomp;
  private readonly baseUrl = 'ws://localhost:8081/ws';
  private messageSubject: Subject<any> = new Subject<any>();
  private userId: any;
  currentUser:any;
  constructor( private toastr: ToastrService) { 

    this.rxStomp = new RxStomp();

  }


  connect(): void {
    this.rxStomp.configure({
      brokerURL: this.baseUrl,
      connectHeaders: {},
      heartbeatIncoming: 0,
      heartbeatOutgoing: 20000,
      reconnectDelay: 200,
      debug: (msg: string) => {
        console.log(msg); // Log WebSocket debug messages
      }
    });
    this.currentUser=JSON.parse(localStorage.getItem("currentUser"));
    if(this.currentUser){
      this.userId=this.currentUser.id;
    }
    this.rxStomp.activate();
    this.rxStomp.watch(`/specific/user/${(this.userId)}`).subscribe((message) => {
      this.toastr.info(message.body);
    });


    this.rxStomp.watch('/all/messages').subscribe((message) => {
      console.log('Received message:', message.body);
      this.messageSubject.next(JSON.parse(message.body));
    });

  }

  sendMessage(message: any): void {
    if (!this.rxStomp.connected()) {
      console.error('WebSocket not connected!');
      return;
    }

    const messageText = JSON.stringify(message);
    console.log('Sending message:', messageText); // Log sent message
    this.rxStomp.publish({
      destination: '/app/application',
      body: messageText
    });
  }


  sendMessageToCandiatureOwner(message: any): void {
    if (!this.rxStomp.connected()) {
      console.error('WebSocket not connected!');
      return;
    }

    const messageText = JSON.stringify(message);
    console.log('Sending message:', messageText); // Log sent message
    this.rxStomp.publish({
      destination: '/app/applications',
      body: messageText
    });
  }

  receiveMessages(): Observable<any> {
    return this.messageSubject.asObservable();
  }

  disconnect(): void {
    this.rxStomp.deactivate();
  }


}
