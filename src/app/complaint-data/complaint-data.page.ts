import { Component, ViewChild, ElementRef, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { VideoService } from '../services/video.service';
import { CameraResultType, CameraSource } from '@capacitor/camera';
import { OnInit } from '@angular/core';
import { Capacitor  } from '@capacitor/core';
import { Plugins} from '@capacitor/core';
import * as WebVPPlugins from 'capacitor-video-player';
// import {CapacitorVideoPlayer, CapacitorVideoPlayerWeb } from '@capacitor/core'
const { CapacitorVideoPlayer} = Plugins;
const { CapacitorVideoPlayerWeb } = Plugins;
import { SafeResourceUrl, DomSanitizer} from '@angular/platform-browser';
// import {  } from '@angular/platform-browser';
// import { url } from 'inspector';
const {Camera} = Plugins;
let photoCaptured = false;

@Component({
  selector: 'app-complaint-data',
  templateUrl: './complaint-data.page.html',
  styleUrls: ['./complaint-data.page.scss'],
})
export class ComplaintDataPage implements OnInit {

  constructor( private sanitizer:DomSanitizer, public videoService: VideoService, private changeDetector: ChangeDetectorRef) { }

  ngOnInit() {

  }
  
  show(){
    if(document.getElementById('allRecord').style.display=="block"){
      document.getElementById('allRecord').style.display="none"
      console.log('If is executed');
    }
    else{
      document.getElementById('allRecord').style.display="block"
      console.log('Else is executed');
    }
  }
  
  photo : SafeResourceUrl;
  guestPicture: any;
  image: any;

  async takePicture(){
    try{
      const profilePicture = await Plugins.Camera.getPhoto({
        quality:100,
        allowEditing:false,
        // resultType:CameraResultType.Base64,
        resultType:CameraResultType.DataUrl,
        source:CameraSource.Camera,
        saveToGallery:true,
        photoCaptured : true,
      });
      // this.image = profilePicture;
      // this.guestPicture = profilePicture.base64String; 
      // this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(profilePicture && (profilePicture.Base64))
      this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(profilePicture && (profilePicture.dataUrl))
      // debugger;
      document.getElementById('image').style.display="block";
      document.getElementById('image2').style.display="block";
      document.getElementById('main').style.display="none";
      // if(photoCaptured==true){
      //   document.getElementById('image').style.display="block";
      // }
    }catch (error){
      console.error(error);
    }
  }
  photo2 : SafeResourceUrl;
  
  async takePicture2(){
    try{
      const profilePicture2 = await Plugins.Camera.getPhoto({
        quality:100,
        allowEditing:false,
        resultType:CameraResultType.DataUrl,
        source:CameraSource.Camera,
        saveToGallery:true,
        photoCaptured : true,
      });
      this.photo2 = this.sanitizer.bypassSecurityTrustResourceUrl(profilePicture2 && (profilePicture2.dataUrl))
      document.getElementById('image3').style.display="block";
      document.getElementById('image2').style.display="none";
      // if(photoCaptured==true){
      //   document.getElementById('image').style.display="block";
      // }
    }catch (error){
      console.error(error);
    }
  }
  
// video.......................record

@ViewChild('video') captureElement: ElementRef;
  mediaRecorder: any;
  videoPlayer: any;
  isRecording = false;
  videos = [];
  async ngAfterViewInit() {
    this.videos = await this.videoService.loadVideos();
 
    // Initialise the video player plugin
    if (Capacitor.isNative) {
      debugger;
      this.videoPlayer = CapacitorVideoPlayer;
    } else {
      this.videoPlayer =WebVPPlugins.CapacitorVideoPlayerWeb;
    }
  }
 
  async recordVideo() {
    // Create a stream of video capturing
    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: 'user'
      },
      audio: true
    });
 
    // Show the stream inside our video object
    this.captureElement.nativeElement.srcObject = stream;
 
    var options = {mimeType: 'video/webm'};
    this.mediaRecorder = new MediaRecorder(stream, options);
    let chunks = [];
 
    // Store the video on stop
    this.mediaRecorder.onstop = async (event) => {
      const videoBuffer = new Blob(chunks, { type: 'video/webm' });
      await this.videoService.storeVideo(videoBuffer);
      
      // Reload our list
      this.videos = this.videoService.videos;
      this.changeDetector.detectChanges();
    }
 
    // Store chunks of recorded video
    this.mediaRecorder.ondataavailable = (event) => {
      if (event.data && event.data.size > 0) {
        chunks.push(event.data)
      }
    }
 
    // Start recording wth chunks of data
    this.mediaRecorder.start(100);
    this.isRecording = true;
  }
 
  stopRecord() {
    this.mediaRecorder.stop();
    this.mediaRecorder = null;
    this.captureElement.nativeElement.srcObject = null;
    this.isRecording = false;
  }
 
  async play(video) {
    // Get the video as base64 data
    const realUrl = await this.videoService.getVideoUrl(video);
 
    // Show the player fullscreen
    await this.videoPlayer.initPlayer({
      mode: 'fullscreen',
      url: realUrl,
      playerId: 'fullscreen',
      componentTag: 'app-home'
    });    
  } 


  


}
