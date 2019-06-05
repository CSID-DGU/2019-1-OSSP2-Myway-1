import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})
export class Tab4Page {
  
  constructor(public fs:AngularFirestore,public af:AngularFireAuth, public nav:NavController ){

  }
  select(){
    this.nav.navigateRoot('/chat-view');
  }
}
