import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ShareserviceService } from '../shareservice.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  @Output() valueEmitted = new EventEmitter<string>();
  profiles : any;
  gentures:boolean=false;
  profile: boolean=false;
  homepages: boolean=true;
  storedProfiles: any[] = [];
  startX: number = 0;
  swipedLeft = false;
  swipedRight = false;
  imagedata:any;
  constructor( private router: Router,private Sharesrv:ShareserviceService) {}

  ngOnInit(): void {

    const profiles = localStorage.getItem('staticProfiles');
    if (profiles) {
        this.storedProfiles = JSON.parse(profiles);    
    } else {
      console.error('No profiles found in localStorage');
    }

console.log(this.storedProfiles);
this.imagedata=this.storedProfiles.length
if (this.startIndex > 0) {
  this.startIndex -= 4;
  this.disableNext = false;
}
if (this.startIndex === 0) {
  this.disablePrevious = true; 
}
  }

  removeProfile(index: number, action: string): void  {
   
    let sourceconfirm= window.confirm("Are you sure you want to delete this profile?");
    if(!sourceconfirm){
      return ;
    }else{
      this.storedProfiles.splice(index, 1);
      this.imagedata=this.storedProfiles.length
      if (this.startIndex > 0) {
        this.startIndex -= 4;
        this.disableNext = false;
      }
      if (this.startIndex === 0) {
        this.disablePrevious = true; 
      }
      if (this.startIndex + 4 < this.imagedata) {
        this.startIndex += 4; 
        this.disablePrevious = false; 
      }
      if (this.startIndex + 4 >= this.imagedata) {
        this.disableNext = true; 
      }
    }
  }

  goToGestureScreen() {
    this.homepages=false;
   this.gentures=true
   this.profile=false;
  }
  selectedProfileimage: any;
  goToProfileDetails(profile: number) {
    this.selectedProfileimage = profile;
    this.Sharesrv.particular_id.next(this.selectedProfileimage);
    this.homepages=false;
    this.profile=true;
    this.gentures=false;
  }
  startIndex: number = 0; 
  disablePrevious: boolean=false;
  disableNext: boolean=false;
  getPreviousData() {
    if (this.startIndex > 0) {
      this.startIndex -= 4;
      this.disableNext = false;
    }
    if (this.startIndex === 0) {
      this.disablePrevious = true; 
    }
  }

  getNextData() {
    if (this.startIndex + 4 < this.imagedata) {
      this.startIndex += 4; 
      this.disablePrevious = false; 
    }
    if (this.startIndex + 4 >= this.imagedata) {
      this.disableNext = true; 
    }
  }
}
