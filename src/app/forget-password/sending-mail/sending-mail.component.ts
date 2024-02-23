import { Component } from '@angular/core';

@Component({
  selector: 'app-sending-mail',
  templateUrl: './sending-mail.component.html',
  styleUrls: ['./sending-mail.component.scss']
})
export class SendingMailComponent {

  user =null;


  year: number = new Date().getFullYear();

  ngOnInit(): void {
    this.user =JSON.parse( localStorage.getItem("passReset_user"));
    document.body.classList.remove('auth-body-bg')
  }
}
