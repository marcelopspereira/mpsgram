import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController, ModalController } from 'ionic-angular';
import { SendPhotoPage } from '../send-photo/send-photo'
/**
 * Generated class for the TakePicturePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-take-picture',
  templateUrl: 'take-picture.html',
})
export class TakePicturePage {

  constructor(public viewCtrl: ViewController, public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TakePicturePage');
  }

  takePicture() {
    let modal = this.modalCtrl.create(SendPhotoPage);
    modal.present();

  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
}
