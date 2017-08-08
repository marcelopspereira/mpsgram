import { Component } from '@angular/core';
import { IonicPage, NavController} from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoginPage } from "../login/login";
/**
 * Generated class for the ProfilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  public user: string = '';

  constructor(public navCtrl: NavController, public authFire: AngularFireAuth) {
    authFire.authState.subscribe(user => {
      if (user) {
        this.user = user.email;
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }
  submit() {
    this.authFire.auth.signOut();
    this.navCtrl.setRoot(LoginPage);  
  }
}
