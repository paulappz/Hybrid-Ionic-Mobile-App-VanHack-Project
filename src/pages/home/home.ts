import { Component, ViewChild } from '@angular/core';
import { AlertController, App, FabContainer, PopoverController, ItemSliding, List, ModalController, NavController, Searchbar, ToastController, LoadingController, Refresher } from 'ionic-angular';
import { JobsProvider } from '../../providers/jobs/jobs';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  searchstring: string = '';
  excludeTracks: any = [];
  excludeTracksCountry: any = [];
  temparr = [];
  Jobs = [];
  page: any;
  moreJobs: any[];
  filtered: boolean = false;



  constructor(public alertCtrl: AlertController,
    public app: App,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public Data: JobsProvider) {
    // Load up data for the first time
    this.loadmoreJobs(null);
    
    // data for filterpage
    this.Data.getCountry().subscribe((trackCountry: string[]) => {});
  }

  ionViewDidEnter() {
    console.log("Yes Did Enter")

  }
  ionViewDidLoad() {
    console.log("Yes Did Load")
  }

  presentFilter() {
    // Opens up Job filter page and passes in some data

    let modal = this.modalCtrl.create('JobFilterPage', this.excludeTracks);
    modal.present();

    // passes in selected filter as Job filter closes
    modal.onWillDismiss((data: any[]) => {
      console.log(data);
      if (data) {
        this.excludeTracks = data;
        this.filterJobs();
      }

    });
  }

  filterJobs() {
    // Check if data as been collected from filterPage
    if (this.excludeTracks.length > 0) {
      var that = this;
      if (this.excludeTracks.length > 1 && this.filtered) {
        this.Jobs = this.temparr;
      }
      // Filter job based on country name sellected 
      this.Jobs = this.Jobs.filter(function (el) {
        return that.excludeTracks.indexOf(el.country) !== -1;
      });
      // this.Jobs = this.Jobs.filter((f)=>
      // !index.includes(f.country))
      this.filtered = true;
    } else {

      // If no data was passed or no country selected
      //Check if the first array temparr is equal to the array undergoing filteration
      if (this.temparr.length !== this.Jobs.length) {
        this.Jobs = this.temparr;
        this.searchstring = '';
      }
    }

  }

  loadmoreJobs(event) {
    if (event == null) {
      // first time data loading with event equals null
      console.log("Yes");
      this.Data.getJobs(null).subscribe((data: any) => {
        this.Jobs = data;
        console.log(data);

        // assign the last id in the job array to page for loading next set of data 

        this.page = this.Jobs[this.Jobs.length - 1].id;
        this.temparr = data;
      });
    }
    else
      // infinite data loading with event not equals null
      this.Data.getJobs(this.page).subscribe((data1: any) => {
        //concatenate the previous data the newly loaded data set
        this.Jobs = this.Jobs.concat(data1);



        // assign the last id in the job array to page for loading next set of data 
        this.page = this.Jobs[this.Jobs.length - 1].id;
        this.temparr = this.temparr.concat(data1);

        // complete the infinite load event if its a subsequent data call
        if (event != null) {
          event.complete();
        }

        //  Check if the new data array is empty, if yes disable event and create a toast to notify 
        //that there are not more job data to load
        if (data1.length == 0) {
          event.enable(false);

          this.toastCtrl.create({
            message: "No more Jobs!",
            duration: 5000
          }).present();

        }
      }, (err) => {
        console.log(err)
      })
    this.filterJobs();
  }


  searchjob(searchbar) {
    //reset the filter if a fresh search is able to take place
    this.excludeTracks = [];

    if (this.searchstring == '' && this.excludeTracks.length < 0) { }

    this.Jobs = this.temparr;

    var q = searchbar.target.value;
    if (q.trim() == '') {
      return true;
    }

    // filter off with job role
    this.Jobs = this.Jobs.filter((v) => {
      if (v.job_role.toLowerCase().indexOf(q) > -1) {
        return true;
      }
      return false;
    })
  }

  openModal(data) {
    // Pass in data and send itg to details page created as a modal
    this.modalCtrl.create('DetailspopsPage', data, { cssClass: 'inset-modal' })
      .present();
  }
}

