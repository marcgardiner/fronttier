import { Component } from '@angular/core';
import { ThinkingStateService } from './shared/thinking-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'app';

  constructor(public thinkingState: ThinkingStateService) { }
}
