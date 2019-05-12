import { Component } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { registerContentQuery } from '@angular/core/src/render3';
import { Storage } from '@ionic/storage';
import {AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  public Userid: string; 
  titleInput :string='' ; profInput:string=''; sdateInput:string=''; edateInput:string='';
   conInput:string=''; hashtag:string=''; classInput:string=''; majorInput:string='';
    regisTxt = {
      user:'',
      title: '',
      major: '',
      classN: '',
      prof: '',
      sdate: '',
      edate: '',
      content: '',
      tag:''
  };

  constructor(public stor:Storage, private alertCtrl:AlertController,public db: AngularFireDatabase) {
    this.stor.get('id').then((val)=>{ // 로그인한 user id 받아옴
      this.Userid = val;
    });
  }

    isReadonly(){
      return true;
    }  
    register() {
      
      if(this.titleInput==='' || this.majorInput==='' || this.classInput==='' || this.profInput==='' ||
         this.sdateInput==='' || this.edateInput==='' || this.conInput==='' || this.hashtag==='' ){
          this.alertCtrl.create({
            header:'',
            message:'내용을 전부 입력해주세요',
            buttons:[{
              text:'확인',
              role:'cancel'
            }]
          }).then(alertEI=>{
            alertEI.present();
          });
      }
      else{
        this.regisTxt.user=this.Userid;
        this.regisTxt.title = this.titleInput;
        this.regisTxt.major = this.majorInput;
        this.regisTxt.classN = this.classInput;
        this.regisTxt.prof = this.profInput;
        this.regisTxt.sdate = this.sdateInput;
        this.regisTxt.edate = this.edateInput;
        this.regisTxt.content = this.conInput;
        this.regisTxt.tag=this.hashtag;
        alert("글이 등록되었습니다.");
        this.db.list('regisTxt').push(this.regisTxt);
        return;
      }
    }
}
