import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { EncabezadoComponent } from './encabezado/encabezado.component';
import { IonicModule } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { ArticulosComponent } from './articulos/articulos.component';
import { InicioComponent } from './inicio/inicio.component';
import { ArticuloDetalleComponent } from './articulo-detalle/articulo-detalle/articulo-detalle.component';
import { CarritoComponent } from './carrito/carrito.component';
import { FormsModule } from '@angular/forms';

import { initializeApp } from "firebase/app";
import { AngularFireModule } from '@angular/fire/compat';

import { environment } from 'src/environments/environment';
import {AngularFireStorageModule, BUCKET } from '@angular/fire/compat/storage';
import { ServiceWorkerModule } from '@angular/service-worker';
import { LoginComponent } from './login/login.component';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

const app = initializeApp(environment.firebaseConfig);



@NgModule({
  declarations: [
    AppComponent,
    EncabezadoComponent,
    ArticulosComponent,
    InicioComponent,
    ArticuloDetalleComponent,
    CarritoComponent,
    LoginComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    AngularFireAuthModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    IonicModule.forRoot()
   /*
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }) */
  ],
  providers: [{ provide: BUCKET, useValue: '' }],
  bootstrap: [AppComponent]
})
export class AppModule { }