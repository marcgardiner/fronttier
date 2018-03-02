import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DragulaModule } from 'ng-dragula/ng-dragula';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './app.routing';
import { UserAuthService } from './shared/user-auth.service';
import { AuthService } from './shared/auth.service';
import { AngularDependenciesModule } from './shared/angular-dependencies.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    DragulaModule,
    BrowserAnimationsModule,
    NgbModule.forRoot(),
    AngularDependenciesModule
  ],
  providers: [
    AuthService,
    UserAuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
