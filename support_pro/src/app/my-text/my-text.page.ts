import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import {AngularFireDatabase} from 'angularfire2/database';
import { AngularFireAuth } from '@angular/fire/auth';
import {Router} from '@angular/router';
@Component({
  selector: 'app-my-text',
  templateUrl: './my-text.page.html',
  styleUrls: ['./my-text.page.scss'],
})
export class MyTextPage implements OnInit {

  items=[];
  userid:string;

  constructor(public db:AngularFireDatabase, public af:AngularFireAuth, public router:Router) { 

    this.userid=this.af.auth.currentUser.email;
    console.log(this.userid);
    let i=0;
    firebase.database().ref().once('value').then((snapshot)=>{
      const c=snapshot.child('contentCount').val();
      console.log(c);
        //const temp=snapshot.child('regisTxt/'+j+'/user/').val();
      this.db.list('regisTxt/',ref=>ref.orderByChild('user').equalTo(this.userid)).valueChanges().subscribe(
        data=>{
          console.log(data);
          this.items=data;
       });  
    });
  }
  getPost(item: any) {
    this.router.navigate(['post', item.title, this.userid]);
  }
  ngOnInit() {
  }

}
