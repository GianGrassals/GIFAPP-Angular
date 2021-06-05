import { Gif, SearchGifsResponse } from './../interface/gifs.interface';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {


  private apiKey: string = 'Gv9m0P52VVQGrouGtBQLYBkfV7Qn2H4q';
  private _historySearch: string[] = [];


  public results: Gif[] = [];

  get historySearch() {

    return [...this._historySearch];
  }

  constructor(private http: HttpClient) {

    //Validar el historial del LocalStorage y si esta Null, retornar un [] Vacio.
    this._historySearch = JSON.parse(localStorage.getItem('history')!) || [];
    this.results = JSON.parse(localStorage.getItem('lastSearch')!) || [];



  }

  searchGifs( query: string) {

    // todo entre en minuscula para hacer la validacion include()
    query = query.trim().toLocaleLowerCase();

    // Solo subirlo cuando no este incluido ya en el arreglo.
    if ( !this._historySearch.includes(query) ) {
      this._historySearch.unshift( query );
    }

    // Solo muestre los ultimos 10
    this._historySearch = this._historySearch.splice(0,10);

    // Guardar en el Local Storage el Historial
    localStorage.setItem('history', JSON.stringify(this._historySearch));

    // get del API Giphy

    const params = new HttpParams()
    .set('api_key', this.apiKey)
    .set('limit', '10')
    .set('q',query);

    const url: string = `https://api.giphy.com/v1/gifs/search`

    this.http.get<SearchGifsResponse>(url, { params }).subscribe( (resp) => {
      this.results = resp.data;

      // Guardar en el Local Storage la ultima Busqueda
      localStorage.setItem('lastSearch', JSON.stringify(this.results));

    } )






  }



}
