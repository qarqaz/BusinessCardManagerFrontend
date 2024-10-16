import { Component } from '@angular/core';
import { faAddressCard, faHome, faPlusSquare } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'BusinessCardManager';
  faHome = faHome;
  faPlusSquare = faPlusSquare;
  faAddressCard = faAddressCard;
}
