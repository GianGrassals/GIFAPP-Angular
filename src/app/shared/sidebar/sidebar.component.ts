import { GifsService } from './../../gifs/services/gifs.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  // Traer el History Search desde el Service con este Getter.
  get historySearch() {
    return [...this.gifsService.historySearch]
  }

  constructor(private gifsService: GifsService) { }

  ngOnInit(): void {
  }


  searchHistory( history: string ) {
    this.gifsService.searchGifs( history );
  }
}
