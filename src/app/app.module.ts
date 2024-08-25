import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component'; // Asegúrate de que este sea tu componente independiente
import { AppRoutingModule } from './app.routes'; 

@NgModule({
  declarations: [
    // Aquí no debes incluir AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  // Elimina el bootstrap aquí
})
export class AppModule {}
