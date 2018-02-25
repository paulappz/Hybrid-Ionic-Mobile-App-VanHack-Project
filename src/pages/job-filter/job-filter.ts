import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ViewController} from 'ionic-angular';
import { JobsProvider } from '../../providers/jobs/jobs';

/**
 * Generated class for the JobFilterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-job-filter',
  templateUrl: 'job-filter.html',
})
export class JobFilterPage {

  tracks: Array<{name: string, isChecked: boolean}> = [];
  stripedtrackCountry: Array<{name: string, isChecked: boolean}> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams ,
    public Data: JobsProvider,
    public viewCtrl: ViewController) {
      let excludedTrackNames = this.navParams.data;
      console.log('Items Page:', excludedTrackNames);
      
    // this.Data.getTracks().subscribe((trackNames: string[]) => {
    //         trackNames.forEach(trackName => {

    //           this.tracks.push({
    //             name: trackName,
    //             isChecked: (excludedTrackNames.indexOf(trackName) === -1)
    //           });
    //         });
    //       });

          this.Data.getCountry().subscribe((trackCountry: string[]) => {
            
                        trackCountry.forEach(trackC => {
                          this.stripedtrackCountry.push({
                            name: trackC,
                            isChecked: (excludedTrackNames.indexOf(trackC) === -1)
                          });
                        });
                  
                      });
          
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad JobFilterPage');
  }
  resetFilters() {
    // reset all of the toggles to be checked
    // this.tracks.forEach(track => {
    //   track.isChecked = true;
    // });
    this.stripedtrackCountry.forEach(country => {
      country.isChecked = true;
    });
  }

  applyFilters() {
    // Pass back a new array of track names to exclude
    // let excludedTrackNames = this.tracks.filter(c => !c.isChecked).map(c => c.name);
    let excludedTrackCountry = this.stripedtrackCountry.filter(c => !c.isChecked).map(c => c.name);
    this.dismiss(excludedTrackCountry);
  }

  dismiss(data?: any) {
    // using the injected ViewController this page
    // can "dismiss" itself and pass back data
    this.viewCtrl.dismiss(data);
  }
}
