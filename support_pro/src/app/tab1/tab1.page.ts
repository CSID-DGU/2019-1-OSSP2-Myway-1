import { Component } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';
import {ActivatedRoute} from '@angular/router';
import {AngularFireDatabase,FirebaseListObservable}from 'angularfire2/database';
//import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page {

  //Items:any;
  // constructor(public navCtrl:NavController,public alert:AlertController,private db:AngularFireDatabase){
  //   this.Items = this.db.list('data');
  // }

  // user ={
  //   firstname:"",
  //   secondname:""
  // }
  // add(User){
  //   firebase.database().ref('user').push(User);
  // }
public Items:any;
  public userid: string;
  constructor(
    public plat: Platform,
    public stor: Storage,
    public activatedRoute: ActivatedRoute,
    public navCtrl: NavController,
    public db:AngularFireDatabase
    ) {
      this.userid = this.activatedRoute.snapshot.paramMap.get('userid');
      this.plat.ready().then(() => {
        this.stor.get('id').then((val) => {
          this.userid = val;
        });
      });
      this.Items=this.db.list('data');
    }
  logout() {
    this.userid = null;
    this.stor.set('id', null);
  }
  navigateToPageLogin() {
    this.navCtrl.navigateForward('LoginPage');
  }
  navigateToPageSignUp() {
    this.navCtrl.navigateForward('RegisterPage');
  }
  myPets =[
    {
      num:2,
      kind: 'Cat',
      name: '#아두이노',
      color : 'white'
    }, {
      num:1,
      kind: 'dog',
      name: '#자바',
      color : 'white'
    }
  ]
}
