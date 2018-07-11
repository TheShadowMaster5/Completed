import { Component, OnInit, Renderer2, NgZone } from '@angular/core';
import { StorePicsProviderService } from '../../../Image_Provider/store-pics-provider.service';
import { Router, ActivatedRoute } from '@angular/router';
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
  Type:any;
  constructor(
                private StorePicsProvider:StorePicsProviderService, private render:Renderer2,
                private _zone:NgZone, private Router: Router, private ActivatedRoute:ActivatedRoute
             ) { }

  ngOnInit() 
  {
    this.ActivatedRoute.params
    .subscribe(params=>{
                          this.Type = params.Type;
                          console.log(this.Type);
                       }
              );

    this.render.listen('document', 'backbutton', ()=>{this._zone.run(() => {
                                                                                this.Router.navigateByUrl(this.Type);
                                                                            })
                                                     });
    this.images = this.StorePicsProvider.Get_Pics();                                                 
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
                        },
        (error) =>{},
        {
          quality: 100,
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
          quality: 100,
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
