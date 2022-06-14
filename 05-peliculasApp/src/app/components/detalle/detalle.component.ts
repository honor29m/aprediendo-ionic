import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Cast, PeliculaDetalle } from 'src/app/interfaces/interfaces';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit {

  @Input() id;

  public pelicula: PeliculaDetalle = {};
  public actores : Cast[] = [];
  public oculto = 150;

  slideOptActores = {
    slidesPerView: 3.3,
    freeMode: true,
    spaceBetween: -5
  };

  constructor(
    private movieService: MoviesService,
    private modalCtrl: ModalController,
  ) { }

  ngOnInit() {
    console.log('ID', this.id);

    this.movieService.getPeliculaDetalle( this.id ).subscribe(
      (respuesta) => {
        console.log(respuesta);
        this.pelicula = respuesta;
      }
    )

    this.movieService.getActoresPelicula( this.id ).subscribe(
      (respuesta) => {
        console.log(respuesta);
        this.actores = respuesta.cast;
      }
    )
  }

  regresar() {
    this.modalCtrl.dismiss();
  }

  favorito() {
    
  }

}
