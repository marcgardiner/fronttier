import { Component, OnInit } from '@angular/core';
import { Quotes } from './thinking-quotes';

@Component({
  selector: 'app-thinking-state',
  templateUrl: './thinking-state.component.html',
  styleUrls: ['./thinking-state.component.sass']
})
export class ThinkingStateComponent implements OnInit {

  quote: string;
  constructor() { }

  ngOnInit() {
    this.quote = Quotes[Math.floor(Math.random() * Quotes.length)];
  }

}
