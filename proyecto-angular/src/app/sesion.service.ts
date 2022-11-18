import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SesionService {

  constructor(public aAuth: AngularFireAuth) {
    this.aAuth.idToken.subscribe(jwt => console.log("jwt", jwt));


    this.aAuth.authState.subscribe(a => console.log("a", a));
  }

  usuarioLoggeado: Observable<boolean>;


}