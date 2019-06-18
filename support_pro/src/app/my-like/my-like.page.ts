import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-my-like',
  templateUrl: './my-like.page.html',
  styleUrls: ['./my-like.page.scss'],
})
export class MyLikePage implements OnInit {

  userid:string;
  constructor(public stor:Storage) { }

  ngOnInit() {
  }
  ionViewWillEnter(){
    this.stor.get('id').then((val) => {
      this.userid = val;
    });
  }
}
