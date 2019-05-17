import { Component, ViewChild, NgZone } from '@angular/core';
import { IonContent, NavController } from '@ionic/angular';

declare var ApiAIPromises: any;
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  messages: any[] = [];
  text: string;

  @ViewChild(IonContent) content: IonContent;
  //@ViewChild(Content) contentArea: Content;

  constructor(public navCtrl: NavController, public ngZone: NgZone) {
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
        setTimeout(() => {
          this.content.scrollToBottom(200);
        });
       });
    });
  }
}
