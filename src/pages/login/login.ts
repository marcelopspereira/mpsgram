import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, AlertController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { HomePage } from '../home/home';
import { SignupPage } from "../signup/signup";

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public form: FormGroup;
  constructor(private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    private alertCtrl: AlertController) {
    this.form = this.fb.group({
      email: ['', Validators.compose([
        Validators.minLength(5),
        Validators.maxLength(160),
        Validators.required
      ])],
      password: ['', Validators.compose([
        Validators.minLength(6),
        Validators.maxLength(20),
        Validators.required
      ])]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }


  submit() {
    let loader = this.loadingCtrl.create({ content: 'Autenticando' });
    loader.present();

    this.afAuth.auth
      .signInWithEmailAndPassword(
      this.form.controls['email'].value,
      this.form.controls['password'].value)
      .then(() => {
        loader.dismiss();
        this.navCtrl.setRoot(HomePage);
      })
      .catch(() => {
        loader.dismiss();
        let alert = this.alertCtrl.create({
          title: 'Ops algo deu errado!',
          subTitle: 'Não foi possível realizar seu cadastro',
          buttons: ['OK']
        });
        alert.present();
      });
  }


  goToSignup() {
    this.navCtrl.setRoot(SignupPage);
  }
}