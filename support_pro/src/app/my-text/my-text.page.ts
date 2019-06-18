import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import {AngularFireDatabase} from 'angularfire2/database';
import { AngularFireAuth } from '@angular/fire/auth';
import {Router} from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-my-text',
  templateUrl: './my-text.page.html',
  styleUrls: ['./my-text.page.scss'],
})
export class MyTextPage implements OnInit {

  items=[];
  userid:string;

  constructor(
    public db:AngularFireDatabase, 
    public af:AngularFireAuth, 
    public router:Router,
    public stor:Storage
    ) { 

    /*this.stor.get('id').then((val) => {
      this.userid = val;
    });*/
    console.log(this.userid);
    let i=0;
    firebase.database().ref().once('value').then((snapshot)=>{
      //const c=snapshot.child('contentCount').val();
        //const temp=snapshot.child('regisTxt/'+j+'/user/').val();
      this.db.list('regisTxt/',ref=>ref.orderByChild('user').equalTo(this.userid)).valueChanges().subscribe(
        data=>{
          console.log(data);
          this.items=data;
       });  
    });
  }
  ionViewWillEnter(){
    this.stor.get('id').then((val) => {
      this.userid = val;
    });
  }
  getPost(item: any) {
    this.router.navigate(['post', item.title, this.userid]);
  }
  ngOnInit() {
  }

}
