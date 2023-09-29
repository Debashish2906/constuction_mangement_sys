import { Component } from '@angular/core';
import { NgxTypewriterService, TPW, TPWInterface } from 'ngx-typewriter';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  image = '';
  public options: TPWInterface = {
    textList: [
      'A dream home should evoke a sense of tranquility and comfort',
      'A dream home is not just made of bricks and mortar.',
    ],
    speed: 80,
    loop: true,
    delay: 200,
  };
  dreamImages=['../../assets/h1.jpg','../../assets/h2.jpg','../../assets/h1.jpg']
}
