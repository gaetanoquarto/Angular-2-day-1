import {HttpClient} from '@angular/common/http';
import { Component } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Pic } from './models/pic';
import { PicsService } from './services/pics.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'start';
  newPic: {
    title: string,
    thumbnailUrl: string
  } = {
    title: '',
    thumbnailUrl: ''
  }
  count = 0;
  sub!: Subscription;
  pics: Pic[] | undefined;
  loading = true;

  constructor(private http: HttpClient, private picSrv: PicsService) {}

  ngOnInit(): void {
    this.recuperaImmagini();
  }

  recuperaImmagini() {
    this.sub = this.picSrv.get().subscribe((ris) => {
      console.log(ris);
      this.pics = ris;
      this.loading = false;
    });
  }

  cancellaImmagine(id: number) {
    this.sub = this.picSrv.delete(id).subscribe(() => {
      this.pics = this.pics?.filter((pic) => pic.id != id);
      console.log(`Utente ${id} cancellato`);
    })
  }


  like() {
    this.count++;
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
