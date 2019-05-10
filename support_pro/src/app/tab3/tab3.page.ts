import { Component } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { registerContentQuery } from '@angular/core/src/render3';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  public Userid: string;
  UserInput; titleInput ; profInput; sdateInput; edateInput; conInput;
  classInput; majorInput;
  data = {
    user: '',
    title: '',
    major: '',
    classN: '',
    prof: '',
    sdate: '',
    edate: '',
    content: ''
  };
  constructor(public stor: Storage, public db: AngularFireDatabase) {
    this.stor.get('id').then((val) => {
      this.Userid = val;
    });
  }
    isReadonly() {
      return true;
    }
    register() {
      this.data.user = this.Userid;
      this.data.title = this.titleInput;
      this.data.major = this.majorInput;
      this.data.classN = this.classInput;
      this.data.prof = this.profInput;
      this.data.sdate = this.sdateInput;
      this.data.edate = this.edateInput;
      this.data.content = this.conInput;
      alert(this.titleInput);
      this.db.list('data').push(this.data);
    }
}
