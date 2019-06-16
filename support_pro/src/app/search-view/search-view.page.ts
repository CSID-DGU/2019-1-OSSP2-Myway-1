import { Component,OnInit } from '@angular/core';
import { NavController , AlertController} from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';
import {ActivatedRoute} from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import {Router} from '@angular/router';
@Component({
  selector: 'app-search-view',
  templateUrl: './search-view.page.html',
  styleUrls: ['./search-view.page.scss'],
})
export class SearchViewPage implements OnInit {
  queryText:string;
titles:any;
  constructor( public plat: Platform,
    public stor: Storage,
    public activatedRoute: ActivatedRoute,
    public navCtrl: NavController,
    public db: AngularFireDatabase,
    public router: Router,
    public atrCtrl:AlertController) {
      // this.generateTopics();
     }

  ngOnInit() {
  }


  generateTopics(){
    this.titles= [
        '공개sw','종합설계1','창의적공학설계','객체지향설계와패턴',
          '알고리즘','심화프로그래밍','로봇프로그래밍','기계설계','특화설계','트랙별설계프로젝트',
          '철근콘크리트구조설계','건축공학종합설계1','건축설계1'
            
          ];

    }
    
     getTopics(ev:any){
       this.generateTopics();
        let serVal = ev.target.value;
        // this.generateTopics(serVal);
        
        if(serVal &&serVal.trim()!=''){
          this.titles= this.titles.filter((topic)=>{
            return (topic.toLowerCase().indexOf(serVal.toLowerCase())> -1);
            // return this.titles;
          })
        }
      }
      gotoSearchList(title){
        this.router.navigate(['search-list', title]);
}
    

}
