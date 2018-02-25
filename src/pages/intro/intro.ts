import { Component, ViewChild } from '@angular/core';
import { IonicPage,MenuController, NavController, NavParams , Slides} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HomePage } from '../../pages/home/home';
@IonicPage()
@Component({
  selector: 'page-intro',
  templateUrl: 'intro.html',
})
export class IntroPage {
  
  @ViewChild('slider') slider: Slides;
  slideIndex = 0;

  //declearing an array object to hold slide data
  slides = [
    {
      title: 'Welcome to <b>VanHack<b>',
      imageUrl: 'assets/img/background/background-1.jpg',
      description: 'VanHack is a community of over 100,000 Software Developers, Designers and Digital Marketers who are ready to <b>relocate</b>.',
    },
    {
      title: 'Who is VanHack for?',
      imageUrl: 'assets/img/background/background-2.jpg',
      description: 'VanHack is for technology professionals who are interested in working abroad or employing top talent.</p>',
    },
    {
      title: 'Jobs without borders',
      imageUrl: 'assets/img/background/background-3.jpg',
      description: 'VanHack shows you great jobs that are open to hiring from abroad. Our jobs board is constantly updated with opportunities for you to move to a new city and work in tech job. Join now for free and get hired.',
    },
    {
      title: 'Apply for jobs abroad',
      imageUrl: 'assets/img/background/background-4.jpg',
      description: 'Take a look at our Listings',
    }
  ];

  constructor(
    public navCtrl: NavController,
    public menu: MenuController,
    public storage: Storage
  ) { }

  onSlideChanged() {
    //Keep tracjk of acitve slide index 
    this.slideIndex = this.slider.getActiveIndex();
    console.log('Slide changed! Current index is', this.slideIndex);
  }

  skip(){
  //  Go to app home page without seeing introduction page.
    console.log('Go to App clicked');
    this.navCtrl.push(HomePage);
  }

  
  goToApp() {
    console.log('Skip clicked');
     //  Go to app home page after introduction has been seen and save session
    this.navCtrl.push(HomePage).then(() => {
      this.storage.set('hasSeenIntro', 'true');
    })
  }
}
