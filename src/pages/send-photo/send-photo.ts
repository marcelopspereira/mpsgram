import { Component, ViewChild } from '@angular/core';
import { Slides, NavParams, ViewController, LoadingController, NavController, AlertController, ToastController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { HomePage } from '../home/home';
import * as firebase from 'firebase';
/**
 * Generated class for the SendPhotoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-send-photo',
  templateUrl: 'send-photo.html',
})
export class SendPhotoPage {
  @ViewChild(Slides) slides: Slides;

  public user: string = '';
  public photos: FirebaseListObservable<any>;
  public form: FormGroup;
  public photo: string = '';
  public location: string = '';
  public filter: string = 'original';
  public filters: string[] = [
    "original",
    "_1977",
    "aden",
    "brannan",
    "brooklyn",
    "clarendon",
    "earlybird",
    "gingham",
    "hudson",
    "inkwell",
    "kelvin",
    "lark",
    "lofi",
    "maven",
    "mayfair",
    "moon",
    "nashville",
    "perpetua",
    "reyes",
    "rise",
    "slumber",
    "stinson",
    "toaster",
    "valencia",
    "walden",
    "willow",
    "xpro2"
  ];

  constructor(private fb: FormBuilder,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private viewCtrl: ViewController,
    private navParams: NavParams,
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth) {
    this.photos = this.db.list('/photos');
    this.photo = this.navParams.get('photo');
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.user = user.email
      }
    });

    this.form = this.fb.group({
      title: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(40),
        Validators.required
      ])],
      message: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(255),
        Validators.required
      ])]
    });
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
    let currentIndex = this.slides.getActiveIndex();
    this.filter = this.filters[currentIndex];
  }

  submit() {
    let loader = this.loadingCtrl.create({ content: "Enviando..." });
    loader.present();

    if (!navigator.onLine) {
      let data = JSON.parse(localStorage.getItem('photos'));
      if (!data) {
        data = [];
      }

      data
        .push({
          user: this.user,
          image: this.photo,
          filter: this.filter,
          location: this.location,
          title: this.form.controls['title'].value,
          message: this.form.controls['message'].value,
          date: firebase.database.ServerValue.TIMESTAMP
        })
        .then(() => {
          loader.dismiss();
          let toast = this.toastCtrl.create({
            message: 'Imagem salva para ser enviada depois',
            duration: 3000
          });

          toast.present();

          this.navCtrl.setRoot(HomePage);
        })
        .catch(() => {
          loader.dismiss();
          let alert = this.alertCtrl.create({
            title: 'Ops, algo deu errado',
            subTitle: 'Não foi possível enviar sua imagem.',
            buttons: ['OK']
          });
          alert.present();
        });
      localStorage.setItem('photos', JSON.stringify(data));
      return;
    }

    this.photos
      .push({
        user: this.user,
        image: this.photo,
        filter: this.filter,
        location: this.location,
        title: this.form.controls['title'].value,
        message: this.form.controls['message'].value,
        date: firebase.database.ServerValue.TIMESTAMP
      })
      .then(() => {
        loader.dismiss();
        this.navCtrl.setRoot(HomePage);
      })
      .catch(() => {
        loader.dismiss();
        let alert = this.alertCtrl.create({
          title: 'Ops, algo deu errado',
          subTitle: 'Não foi possível enviar sua imagem.',
          buttons: ['OK']
        });
        alert.present();
      });
  }
}
