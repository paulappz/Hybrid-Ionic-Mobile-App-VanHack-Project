import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JobFilterPage } from './job-filter';

@NgModule({
  declarations: [
    JobFilterPage,
  ],
  imports: [
    IonicPageModule.forChild(JobFilterPage),
  ],
})
export class JobFilterPageModule {}
