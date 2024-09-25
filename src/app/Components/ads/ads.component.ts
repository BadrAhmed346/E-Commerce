import { Component, OnDestroy, OnInit } from '@angular/core';
import { adsUrlsData } from 'src/app/Model/Data/ads';

@Component({
  selector: 'app-ads',
  templateUrl: './ads.component.html',
  styleUrls: ['./ads.component.css'],
})
export class AdsComponent implements OnInit, OnDestroy {
  adsUrls: string[] = adsUrlsData; // Initialize with an empty array
  currentImage: string = this.adsUrls[0];
  imageIndex: number = 0;
  autoChangeInterval: any;

  ngOnInit() {
    this.startImageChange();
  }

  startImageChange() {
    this.autoChangeInterval = setInterval(() => {
      this.imageIndex = (this.imageIndex + 1) % this.adsUrls.length; // Loop through the images
      this.currentImage = this.adsUrls[this.imageIndex];
    }, 1500); // Change every 0.5 seconds
  }

  ngOnDestroy() {
    clearInterval(this.autoChangeInterval); // Stop the interval when the component is destroyed
  }
}
