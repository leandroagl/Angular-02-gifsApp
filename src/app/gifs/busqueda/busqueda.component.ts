import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent {

  // Manipulacion del input para que aparezca en cosola luego de un enter y para que se limpie

  @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>;  //operador para asegurarse que el objeto no es nulo

  constructor(private gifsServices: GifsService) {}

  buscar() {
    const valor  = this.txtBuscar.nativeElement.value;

    if (valor.trim().length === 0) {  // metodo trim quita los espacios para tomar el length del string
      return;
    }

    this.gifsServices.buscarGifs(valor);

    this.txtBuscar.nativeElement.value = '';
  }

}
