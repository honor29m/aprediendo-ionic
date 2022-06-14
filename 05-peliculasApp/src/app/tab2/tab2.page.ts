import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  textoBuscar = '';
  ideas: string[] = ['Spiderman', 'Avenger', 'Harry Potter', 'Pokemon'];

  constructor() {}

  buscar( event:any ) {
    const valor = event.detail.value;
    console.log(valor);
    
  }

  ideaBuscar( idea: string) {
    this.textoBuscar = idea;
  }
}
