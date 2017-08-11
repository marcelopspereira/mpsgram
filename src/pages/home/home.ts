import { Component, ViewChild } from '@angular/core';
import { NavController, ModalController, Content } from 'ionic-angular';
import { PhotosPage } from '../photos/photos';
import { TakePicturePage } from '../take-picture/take-picture';
import { ProfilePage } from '../profile/profile';
import { MessagesPage } from '../messages/messages';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
   @ViewChild(Content) content: Content;
  public photosTab: any;
  public profileTab: any;
  public user: string;


  
  constructor(public navCtrl: NavController, private modealCtrl: ModalController) {
    this.photosTab = PhotosPage;
    this.profileTab = ProfilePage;
  }

  showSendPhoto() {
    let modal = this.modealCtrl.create(TakePicturePage);
    modal.present();
  }

  goMessages() {
    this.navCtrl.push(MessagesPage);
  }

  scrollToTop(){
    this.content.scrollToTop();
  }
}
