import { Component } from '@angular/core';
import {AngularFireStorage} from 'angularfire2/storage';
import { AngularFireDatabase } from 'angularfire2/database';
import { registerContentQuery } from '@angular/core/src/render3';
import { Storage } from '@ionic/storage';
import {AlertController } from '@ionic/angular';
import {Camera, CameraOptions} from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  contentImg;
  download;
  sPicture;
  imageURI;
  public Userid: string;
  // tslint:disable-next-line:no-inferrable-types
  titleInput: string = '' ; profInput: string = ''; sdateInput: string = ''; edateInput: string = '';
   // tslint:disable-next-line:no-inferrable-types
   conInput: string = ''; hashtag: string = ''; classInput: string = ''; majorInput: string = '';
    regisTxt = {
      user: '',
      title: '',
      major: '',
      classN: '',
      prof: '',
      sdate: '',
      edate: '',
      content: '',
      tag: '',
      img: ''
  };

  constructor(
    public stor: Storage,
    private alertCtrl: AlertController,
    public db: AngularFireDatabase,
    public st: AngularFireStorage,
    private camera: Camera
    ) {
    this.stor.get('id').then((val) => { // 로그인한 user id 받아옴
      this.Userid = val;
    });
  }
    pickPicture() {
      // tslint:disable-next-line:prefer-const
      let options = {
        quality: 100,
        targetWidth: 500,
        targetHeight: 500,
        allowEdit: true,
        destinationType: this.camera.DestinationType.DATA_URL,
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
      };
      this.camera.getPicture(options).then((imageURI) => {
        // tslint:disable-next-line:prefer-const
        let newName = `${new Date().getTime()}.png`;
        this.imageURI = imageURI;
        this.st.ref(`picture/${newName}`).putString(imageURI, 'base64', {contentType: 'image/png'});
      }, (err) => {
        console.log('err:' + JSON.stringify(err));
      });
    }
    isReadonly() {
      return true;
    }
    register() {
      if (this.titleInput === '' || this.majorInput === '' || this.classInput === '' || this.profInput === '' ||
         this.sdateInput === '' || this.edateInput === '' || this.conInput === '' || this.hashtag === '' ) {
          this.alertCtrl.create({
            header: '',
            message: '내용을 전부 입력해주세요',
            buttons: [{
              text: '확인',
              role: 'cancel'
            }]
          }).then(alertEI => {
            alertEI.present();
          });
      } else {
        this.regisTxt.user = this.Userid;
        this.regisTxt.title = this.titleInput;
        this.regisTxt.major = this.majorInput;
        this.regisTxt.classN = this.classInput;
        this.regisTxt.prof = this.profInput;
        this.regisTxt.sdate = this.sdateInput;
        this.regisTxt.edate = this.edateInput;
        this.regisTxt.content = this.conInput;
        this.regisTxt.tag = this.hashtag;
        this.regisTxt.img = '';
        alert('글이 등록되었습니다.');
        this.db.list('regisTxt').push(this.regisTxt);
      }
    }
}
