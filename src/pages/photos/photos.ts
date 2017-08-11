import { Component } from '@angular/core';
import { ModalController, LoadingController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';

import { ShowMapPage } from '../show-map/show-map';

/**
 * Generated class for the PhotosPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-photos',
  templateUrl: 'photos.html',
})
export class PhotosPage {
  public photos: any[] = [];

  constructor(
    private db: AngularFireDatabase,
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController) {

    let loader = this.loadingCtrl.create({ content: 'Carregando fotos...' });
    loader.present();
    
    this.db.list('/photos').subscribe(photos => {
     // console.log(photos);
      //if(this.photos !=null)
      this.photos = photos.reverse();
      loader.dismiss();
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PhotosPage');
  }
  showMap(location) {
    let modal = this.modalCtrl.create(ShowMapPage, { location: location });
    //console.log(location);
    modal.present();
  }
}
