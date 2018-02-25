import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController, } from 'ionic-angular';

/**
 * Generated class for the DetailspopsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detailspops',
  templateUrl: 'detailspops.html',
})
export class DetailspopsPage {
job : any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController) {
    //Collect data pushed into page by Navcontroller
    this.job = this.navParams.data;
    console.log('Items Page:',this.job);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailspopsPage');
  }

  dismiss() {
    //Leave details pop page
    this.viewCtrl.dismiss();
  }


}
