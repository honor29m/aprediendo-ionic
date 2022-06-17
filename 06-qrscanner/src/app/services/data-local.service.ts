import { Injectable } from '@angular/core';
import { Registro } from '../models/registro.model';
import { Storage } from '@ionic/storage-angular';
import { NavController } from '@ionic/angular';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  guardados: Registro[] = [];

  constructor(
    private storage: Storage,
    private navCtrl: NavController,
    private iab: InAppBrowser,
  ) {
      this.cargarStorage();
   }

   async cargarStorage() {
    this.guardados = (await this.storage.get('registros')) || [];
   }

  guardarRegistro( format:string, text: string) {
    const nuevoRegistro = new Registro( format, text );
    this.guardados.unshift( nuevoRegistro );
    // registros
    this.storage.set('registros', this.guardados);

    // this.abrirRegistro( nuevoRegistro );
  }

  abrirRegistro( registro: Registro) {
    this.navCtrl.navigateForward('/tabs/tab2');

    switch( registro.type ) {
      case 'http':
        this.iab.create(registro.text, '_system');
        break;
      case 'geo':
        this.navCtrl.navigateForward(`/tabs/mapa/${ registro.text}`);
        break;
    }
  }

  enviarCorreo() {
    const arrTemp = [];
    const titulos = 'Tipo, Formato, Creado en, Texto\n';
    arrTemp.push( titulos );
    this.guardados.forEach( registro => {
      const linea = `${ registro.type }, ${ registro.format }, ${ registro.created }, ${ registro.text.replace(',', ' ') }\n`;
      arrTemp.push(linea);
    });

    this.crearArchivoFisico( arrTemp.join(' ') );
    
  }

  crearArchivoFisico( text: string ) {
    
  }
}
