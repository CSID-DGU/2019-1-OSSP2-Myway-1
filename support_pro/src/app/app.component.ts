import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
declare var window;
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      window.ApiAIPlugin.init(
        {
            clientAccessToken: '52789103d0e941aa863af61d4938a331', // insert your client access key here
            lang: 'ko' // set lang tag from list of supported languages
        },
// tslint:disable-next-line: only-arrow-functions
        function(result) {
          alert(result);
         },
// tslint:disable-next-line: only-arrow-functions
        function(error) {
          alert(error);
          }
    );
    });
  }
}
