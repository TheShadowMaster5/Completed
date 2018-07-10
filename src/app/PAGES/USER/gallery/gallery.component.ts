import { Component, OnInit } from '@angular/core';
import { StorePicsProviderService } from '../../../Image_Provider/store-pics-provider.service';
declare let cordova: any;
declare let navigator: any;
let device;

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit 
{
  images:any;
  constructor(private StorePicsProvider:StorePicsProviderService) { }

  ngOnInit() 
  {

  }

  Delete(index)
  {
      this.StorePicsProvider.Delete(index);
  }

  openCamera() 
  {

    if( navigator != undefined)
    {
      navigator.camera.getPicture(
        (imageData) => {
                          let image = "data:image/jpeg;base64," + imageData; 
                          this.StorePicsProvider.Store_Pics_Camera(image);
                          this.images = this.StorePicsProvider.Get_Pics();
                          alert(image);
                        },
        (error) =>{},
        {
          quality: 75,
          targetHeight:100,
          targetWidth:100,
          destinationType: navigator.camera.DestinationType.DATA_URL,
          encodingType: navigator.camera.EncodingType.JPEG,
          mediaType: navigator.camera.MediaType.PICTURE,
          //sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
          saveToPhotoAlbum:true
        }
      );
    }
  }

  openGallery()
  {
    if( navigator != undefined)
    {
      navigator.camera.getPicture(
        (imageData) => {
                          let image = "data:image/jpeg;base64," + imageData; 
                          this.StorePicsProvider.Store_Pics_Camera(image);
                          this.images = this.StorePicsProvider.Get_Pics();
                          alert(image);
                        },
        (error) =>{},
        {
          quality: 75,
          targetHeight:100,
          targetWidth:100,
          destinationType: navigator.camera.DestinationType.DATA_URL,
          encodingType: navigator.camera.EncodingType.JPEG,
          //mediaType: navigator.camera.MediaType.PHOTOLIBRARY,
          sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY,
          saveToPhotoAlbum:true
        }
      );
    }
  }

}
