import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interfaces/gifs.interfaces';

// Este injectable hace que el servicio sea utilizable globalmente en toda la app
@Injectable({
  providedIn: 'root'
})
export class GifsService {

    private apiKey     : string = 'aln43nNnyQT1G2H4qMlU9D6Nvrxe2zle';
    private servicioUrl: string = 'https://api.giphy.com/v1/gifs';
    private _historial : string[] = [];

    public resultados: Gif[] = [];

    get historial() {
      return [...this._historial];
    }

    constructor(private http: HttpClient){

      // this._historial = localStorage.getItem('historial');  En teoria seria asi
      // JSON.parse convierte un string a un objeto
      //if (localStorage.getItem('historial')){
        //this._historial = JSON.parse( localStorage.getItem('historial'));

      this._historial = JSON.parse(localStorage.getItem('historial')!) || [];

      this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];

      }


    buscarGifs(query: string) {

      // Toma el valor string en minuscula, para evitar duplicador
      query = query.trim().toLocaleLowerCase();

      // Includes me dice si existe o si incluye el argumento (query)
      if( !this._historial.includes(query)){
        this._historial.unshift( query );

        // Este metodo corta el arreglo en 10, para que no crezca con mas de 10 items
        this._historial = this._historial.splice(0, 10);

        // JSON.stringify convierte un objeto en string, metodo para almacenar en el local storage
        localStorage.setItem('historial', JSON.stringify(this._historial));
      }

      // Permite editar parametros HTTP, deben ser todos string
      const params = new HttpParams()
          .set('api_key', this.apiKey)
          .set('limit', '10')
          .set('q', query);

      console.log(params.toString());

      // Este metodo realiza la consulta http, luego se subscribe e imprime la data obtenida
      // Subscribe se ejecuta cuando se obtiene la respuesta del get
      // Estas respuestas devuelven un observable
      this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`, {params: params})
          .subscribe((resp) => {
            console.log(resp.data);
            this.resultados = resp.data;
            localStorage.setItem('resultados', JSON.stringify(this.resultados));

          })
    }
}
