import { Component,OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import {ActivatedRoute} from '@angular/router';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import {FavoriteService} from '../../favorite.service';
import { AngularFireDatabase } from 'angularfire2/database';
@Component({
  selector: 'app-my-scrap',
  templateUrl: './my-scrap.page.html',
  styleUrls: ['./my-scrap.page.scss'],
})
export class MyScrapPage implements OnInit {
  items:any;
  test=[];
  temp=[];
  temp2=[];
  userid;
    constructor( public plat: Platform,
      public stor: Storage,
      public activatedRoute: ActivatedRoute,
      public navCtrl: NavController,
      public router: Router,
      public atrCtrl: AlertController,
      public db : AngularFireDatabase,
      public favoriteProvider:FavoriteService) { 
        favoriteProvider.getAllScrapPost().then(result=>{
          this.temp=result;
          console.log(result);
          let cnt=0;
          for(let i=0;i<this.temp.length;i++){
          this.db.list('regisTxt/',ref=>ref.orderByChild('title').equalTo(this.temp[i])).valueChanges().subscribe(data=>
            {
              this.items=data;
              this.temp2[cnt++]=this.items[0];
            }
            )
          }
        });
              
              
     
        }

        ionViewWillEnter(){
          this.stor.get('id').then((val)=>{
            this.userid=val;
          })
        }


        getPost(item: any) {
          this.router.navigate(['post', item.title, this.userid]);
        }

  
    ngOnInit() {
    }
}

