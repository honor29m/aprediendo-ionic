import { Component, OnInit } from '@angular/core';
import { Pelicula } from '../interfaces/interfaces';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  public pelisRecientes: Pelicula[] = [];
  public populares: Pelicula[] = [];

  

  constructor(
    private moviesService: MoviesService
  ) {}

  ngOnInit() {
    this.moviesService.getFeature().subscribe(
      (respuesta) => {
        console.log('Resp', respuesta);
        this.pelisRecientes = respuesta.results;
      }   
    );

    this.getPopulares();
  }

  cargarMas(){
    this.getPopulares();
  }

  getPopulares() {
    this.moviesService.getPopulares().subscribe(
      (respuesta => {
        // console.log('Populares', respuesta);
        const arrTemp = [ ...this.populares, ...respuesta.results ]
        this.populares = arrTemp;
      })
    )
  }
}
