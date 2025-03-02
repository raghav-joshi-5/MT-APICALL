import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostComponent } from './shared/component/post/post.component';
import { PostdashComponent } from './shared/component/postdash/postdash.component';
import { PostformComponent } from './shared/component/postform/postform.component';
import { NavbarComponent } from './shared/component/navbar/navbar.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { PostcardComponent } from './shared/component/postcard/postcard.component';
import { MaterialModule } from './material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthInterceptor } from './shared/service/auth-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    PostComponent,
    PostdashComponent,
    PostformComponent,
    NavbarComponent,
    PostcardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialModule,
    BrowserAnimationsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
