import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './app.routing';
import { ThinkingStateComponent } from './thinking-state/thinking-state.component';
import { AuthService } from './shared/auth.service';
import { UserAuthService } from './shared/user-auth.service';
import { ThinkingStateService } from './shared/thinking-state.service';
import { APP_BASE_HREF } from '@angular/common';
describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot(appRoutes)
      ],
      declarations: [
        AppComponent,
        ThinkingStateComponent
      ],
      providers: [
        AuthService,
        UserAuthService,
        ThinkingStateService,
        { provide: APP_BASE_HREF, useValue : '/' }
      ]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('app');
  }));
});
