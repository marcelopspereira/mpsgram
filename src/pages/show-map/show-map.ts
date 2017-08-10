import { Component } from '@angular/core';
import {  NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the ShowMapPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */


@Component({
  selector: 'page-show-map',
  templateUrl: 'show-map.html',
})
export class ShowMapPage {
  public location: string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    this.location = this.navParams.get('location');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShowMapPage location:'+this.location);
    var html = '<iframe style="height: 90vh;" width="100%" height="99%" frameborder="0" style="border:0" src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBaWxHBl3luHpBRohymU39ayA0uP3KW258&q=' + this.location + '" allowfullscreen></iframe>';
    document.getElementById('map').innerHTML = html;
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
