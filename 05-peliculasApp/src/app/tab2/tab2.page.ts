import { Component } from '@angular/core';
import { Pelicula } from '../interfaces/interfaces';
import { MoviesService } from '../services/movies.service';
import { DetalleComponent } from '../components/detalle/detalle.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  textoBuscar = '';
  ideas: string[] = ['Spiderman', 'Avenger', 'Harry Potter', 'Pokemon'];
  peliculas: Pelicula[] = [];

  activarSpinner = false;

  constructor(
    private movieService: MoviesService,
    private modalCtrl: ModalController,
  ) {}

  buscar( event:any ) {
    const valor = event.detail.value;

    if ( valor.length == 0 ){
      this.activarSpinner = false;
      this.peliculas = [];
      return;
    }

    this.activarSpinner = true;

    this.movieService.getBuscarPelicula( valor ).subscribe(
      (respuesta) => {
        this.peliculas = respuesta['results'];
        this.activarSpinner = false;
      }
    )
    
  }

  ideaBuscar( idea: string) {
    this.textoBuscar = idea;
  }

  async verDetalle( id: any ) {
    const modal = await this.modalCtrl.create({
      component: DetalleComponent,
      componentProps: {
        id
      }
    });

    modal.present();
  }
}
