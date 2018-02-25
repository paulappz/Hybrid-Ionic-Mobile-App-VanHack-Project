import { Injectable } from '@angular/core';;
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
/*
Generated class for the JobsProvider provider.


See https://angular.io/guide/dependency-injection for more info on providers
and Angular DI.
*/
@Injectable()
export class JobsProvider {

  data: any;
  datafilter: any;
  dataurl = 'https://vanhack-job-listing-api.herokuapp.com/public/api/vanhackjobs';
  dataurlfilter = 'https://vanhack-job-listing-api.herokuapp.com/public/api/vanhackjobsfilter';
  constructor(public http: Http) {
    console.log('Hello JobsProvider Provider');
  }

  Load(more): any {
    //load data for the first time 
    if (more == null) {
      if (this.data) {
        return Observable.of(this.data);
      } else {
        return this.http.get(this.dataurl)
          .map(this.processData, this);
      }
    }
    else
      // subsequent time to load data
      return this.http.get(this.dataurl + '/' + more)
        .map(this.processData, this);

  }

  FilterLoad(): any {
    // Loading array for filter
    if (this.datafilter) {
      return Observable.of(this.datafilter);
    } else {
      return this.http.get(this.dataurlfilter)
        .map(this.processDataFilter, this);
    }
  }


  processDataFilter(data: any) {
    // Proceesing data collected as json 
    this.datafilter = data.json();

    //calling prepared function to convert string of words to array of string
    this.prepareData(this.datafilter);
    var jobtypes = [];
    var jobcountry = [];
    this.datafilter.stripedjobtypes = [];
    this.datafilter.stripedjobCountry = [];

    //Looping though all job type object and pushing to an array 
    this.datafilter.forEach((session: any) => {

      if (session.job_type) {
        session.job_type.forEach((type: any) => {
          if (jobtypes.indexOf(type) < 0) {
            jobtypes.push(type);

            //Removing job type duplicate
            this.datafilter.stripedjobtypes = jobtypes.filter(function (item, pos, self) {
              return self.indexOf(item) == pos;
            })
          }
        });
      }


      if (session.country) {
        //get country and pushing to an array 
        jobcountry.push(session.country);
        //Removing job country duplicate
        this.datafilter.stripedjobCountry = jobcountry.filter(function (item, pos, self) {
          return self.indexOf(item) == pos;
        })
      }
    });
    return this.datafilter;
  }


  prepareData(arr) {
    arr.forEach(element => {
      // This creates an array fron a string of words separated by comma
      if (element.nice_skills) {
        element.nice_skills = element.nice_skills.split(",");
      }
      if (element.must_skills) {
        element.must_skills = element.must_skills.split(",");
      }
      element.job_type = element.job_type.split(",");
    })
  }



  processData(data: any) {
    this.data = data.json();
    let jobs = this.data;
    this.prepareData(jobs);

    this.FilterLoad();
    return this.data;
  }

  getJobs(more) {
    // Maps out the data from load function
    return this.Load(more).map((data: any) => {
      return data;
    });
  }



  getTracks() {
    // Maps out the data from filterload and returns a sorted array of job types
    return this.FilterLoad().map((data: any) => {
      return data.stripedjobtypes.sort();
    });
  }
  getCountry() {
    // Maps out the data from filterload and returns a sorted array of country
    return this.FilterLoad().map((data: any) => {
      return data.stripedjobCountry.sort();
    });
  }


}
