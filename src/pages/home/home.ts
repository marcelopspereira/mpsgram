import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { PhotosPage } from '../photos/photos';
import { TakePicturePage } from '../take-picture/take-picture';
import { ProfilePage } from '../profile/profile';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public photosTab: any;
  public profileTab: any;

  constructor(public navCtrl: NavController, private modealCtrl: ModalController) {
    this.photosTab = PhotosPage;
    this.profileTab = ProfilePage;
  }

  showSendPhoto() {
    let modal = this.modealCtrl.create(TakePicturePage);
    modal.present();
  }
}
