import { Component, OnInit } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private aAuth: AngularFireAuth
  ) {

   }

  ngOnInit(): void {
  }

  iniciarSesion(){
    return new Promise<any>((resolve, reject) => {
      this.aAuth.signInAnonymously().then((data) => {
        resolve(data);
      }).catch((error) => {
        const codigoError = error.code;
        const mensajeError = error.message;
        reject(`Ups!! No se pudo iniciar sesion ${error.message}`)
      })
    })
  }

}