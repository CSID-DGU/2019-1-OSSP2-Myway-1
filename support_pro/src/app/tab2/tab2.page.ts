import { Component, ViewChild, NgZone } from '@angular/core';
import { IonContent, NavController } from '@ionic/angular';
import {Router} from '@angular/router';
import { Storage } from '@ionic/storage';
declare var ApiAIPromises: any;

@Component ({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  [x: string]: any;
  messages: any[] = [];
  text: string;
  check: number;
  substring = '깃';
  ch: number;
  public gitaddress: string;
  @ViewChild(IonContent) content: IonContent;
  title: any;
  public userid: string;
  constructor(public navCtrl: NavController, public ngZone: NgZone, public router: Router, public stor: Storage) {
    this.messages.push({
      text: '왜 왔는가?',
      sender: 'api',
      createAt: new Date().getTime()
    });
  }


  ask() {
    if (this.text !== '') {
    this.messages.push({
      text: this.text,
      sender: 'me',
      createAt: new Date().getTime()
    });
    setTimeout(() => {
      this.content.scrollToBottom(200);
    });
    this.goToDia(this.text);
    this.text = '';
  }
  }
  goToDia( str: string) {
    if(this.text.includes(this.substring)){ // '깃'이 요청에 있으면
      //this.gitaddress = 'https://www.google.com/'
      this.check = 1; this.ch = 1;
    } else if(this.text.includes('좋아요 수')) {
      this.check = 2;
    } else {
      this.check = 0; this.ch = 0;
    }
    ApiAIPromises.requestText({
      query: this.text
    })
    .then(({result: {fulfillment: {speech}}}) => {
       this.ngZone.run(() => {
        // this.messages = speech;
        this.messages.push({
          text: speech,
          sender : 'api',
          createAt: new Date().getTime()
        });
        if (this.check === 1) { this.gitaddress = 'https://www.google.com/'; }
        setTimeout(() => {
          this.content.scrollToBottom(200);
        });
       });
    });
  }
  goto() {
   this.stor.get('id').then((val) => {
    this.userid = val;
  });
   this.title = '태그 성공 기원';
   this.router.navigate(['post', this.title, this.userid]);
  }
 
}


