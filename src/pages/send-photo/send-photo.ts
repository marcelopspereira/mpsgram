import { Component } from '@angular/core';
import { IonicPage, AlertController, ViewController } from 'ionic-angular';

/**
 * Generated class for the SendPhotoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-send-photo',
  templateUrl: 'send-photo.html',
})
export class SendPhotoPage {
  public location: string = '';
  constructor(public viewCtrl: ViewController, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SendPhotoPage');
  }
  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((data) => {
        this.location = data.coords.latitude + ',' + data.coords.longitude;
      }, (err) => {
        let alert = this.alertCtrl.create({
          title: 'Ops, algo deu errado',
          subTitle: 'Não foi possível obter sua localização.',
          buttons: ['OK']
        });
        alert.present();
      });
    }
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
  changeFilter() {

  }
}
