import { Pipe, PipeTransform } from '@angular/core';

const url = 'https://image.tmdb.org/t/p';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string): string {

    if ( !img ) {
      console.log('entre en el if');
      
      return './assets/no-image-banner.jpg';
    }

    const imgURL = `${url}/w500${ img }`;
    
    return imgURL;
  }

}
