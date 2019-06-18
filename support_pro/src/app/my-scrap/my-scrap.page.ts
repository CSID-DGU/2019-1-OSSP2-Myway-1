import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-my-scrap',
  templateUrl: './my-scrap.page.html',
  styleUrls: ['./my-scrap.page.scss'],
})
export class MyScrapPage implements OnInit {

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
