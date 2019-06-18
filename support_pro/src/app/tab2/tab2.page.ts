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
  textTmp: string;
  check: number;
  checkmajor: number;
  substring = '깃';
  ch = 0; // 싫어요 체크
  decomstr;
  public gitaddress: string;
  ppp = 0; // 어느 대답에 대한 버튼인지 구분하기 위해
  @ViewChild(IonContent) content: IonContent;
  title: any;
  public userid: string;
// tslint:disable-next-line: max-line-length
  constructor(public navCtrl: NavController, public ngZone: NgZone, public router: Router, public stor: Storage) {
    this.check = -1;
    this.messages.push({
      text: '무엇이 궁금한가? \n 직접 물어봐도 되고, 아래 버튼을 눌러보고 싶으면 눌러보게..',
      sender: 'api',
      createAt: new Date().getTime()
    });
  }
  async reload() {
             window.location.href = '/tabs/tab2';
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
   // this.check = 0;
    ApiAIPromises.requestText({
      query: this.text
    })
    .then(({result: {fulfillment: {speech}}}) => {
       this.ngZone.run(() => {
        // this.messages = speech;
        this.textTmp = speech;
        this.messages.push({
          text: speech,
          sender : 'api',
          createAt: new Date().getTime()
        });
        // 쿼리: 제일 인기있는 게시글 // 쿼리: 깃 주소와 게시글
        if (this.textTmp.includes('제일 인기있는')) {
          this.decomstr = this.textTmp.split('\'');
          this.gitaddress = this.decomstr[3]; // 깃 주소
          this.title = this.decomstr[1]; // 글 제목
          this.check = 1;
        } else if (this.textTmp.includes('우리 앱은')) { // 쿼리: 앱 설명
           this.check = 3;
        } else if (this.textTmp.includes('좋아요 수')) { // 쿼리: 제일 인기있는 게시글?
          this.check = 2;
        } else if (this.textTmp.includes('어떤 전공의')) {
          this.check = 4;
        } else if (this.textTmp.includes('전공이 뭐야?')) {  // 프로젝트 추천
          this.check = 5; this.ppp = 1;
        } else if (this.textTmp.includes('이건 어떤가')) {
          this.decomstr = this.textTmp.split('\'');
          this.gitaddress = this.decomstr[3]; // 깃 주소
          this.title = this.decomstr[1]; // 글 제목
          this.check = 6;
        } else if (this.textTmp.includes('좋다')) { // 게시글 추천
          this.check = 7;
        } else {
          this.check = 0;
          this.checkmajor = 0;
          this.ppp = 0;
        }
        setTimeout(() => {
          this.content.scrollToBottom(200);
        });
       });
    });
    this.check = 0;
  }
  goto() {
   this.stor.get('id').then((val) => {
    this.userid = val;
  });
   this.router.navigate(['post', this.title, this.userid]);
  }
  manual() {
      this.text = '앱 설명';
      this.ask();
      //this.check = 3;
  }
 yes() {
      this.text = '네!!';
      this.ask();
      //this.check = 0;
 }
 no() {
      this.text = '아니요..';
      this.ask();
     // this.check = 0;
 }
 popularContent() {
   this.text = '인기 많은 게시글';
   this.ask();
 }
 compu() {
   if ( this.ppp === 1 ) {
      this.text = '컴퓨터공학과 프로젝트 추천';
      this.ask();
      this.ppp = 0;
      this.checkmajor = 0;
   } else {
    this.text = '컴퓨터공학과의 인기 많은 게시글';
    this.ask();
   }
 }
 elec() {
   if ( this.ppp === 1 ) {
     this.text = '멀티미디어공학과 프로젝트 추천';
     this.ask();
     this.ppp = 0;
     this.checkmajor = 1;
   } else {
    this.text = '멀티미디어공학과의 인기 많은 게시글';
    this.ask();
   }
 }
 info() {
   if ( this.ppp === 1) {
    this.text = '정보통신공학과 프로젝트 추천';
    this.ask();
    this.ppp = 0;
    this.checkmajor = 2;
   } else {
    this.text = '정보통신공학과의 인기 많은 게시글';
    this.ask();
   }
 }
 allgood() {
    this.text = '전체 게시글 중 인기 많은 게시글';
    this.ask();
 }
 recommand() {
    this.text = '프로젝트 추천';
    this.ask();
 }
 many() {
  this.text = '관심 많습니다!!';
  this.ask();
 }
 good() {
  this.text = '좋은 생각이에요!';
  this.ask();
 }
 bad() {
   if (this.ch === 2) {
    this.text = '지금까지 다 싫어요';
    this.ask();
    this.ch = 0;
   } else {
     if ( this.checkmajor === 0) {
      this.text = '컴퓨터공학과 프로젝트 추천';
      this.ask();
     } else if (this.checkmajor === 1 ) {
       this.text = '멀티미디어공학과 프로젝트 추천';
       this.ask();
     } else {
        this.text = '정보통신공학과 프로젝트 추천';
        this.ask();
     }
     this.ch = this.ch + 1;
   }
 }
}


