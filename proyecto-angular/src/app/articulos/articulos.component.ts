import { Component, OnInit } from '@angular/core';

import { AgregarCarritoService } from '../agregar-carrito.service';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

export interface Articulo{ 
  nombre: string;
  precio: number;
}

@Component({
  selector: 'app-articulos',
  templateUrl: './articulos.component.html',
  styleUrls: ['./articulos.component.css']
})
export class ArticulosComponent implements OnInit {

  //private articulosCollection: AngularFirestoreCollection<Articulo>;
  //arts: Observable<Articulo[]>; 


  private coleccionFirebase: AngularFirestoreCollection<Articulo>;
  articulosFirebase: Observable<Articulo[]>;

  private test: AngularFirestoreCollection<Articulo>;

  constructor(
    private carritoService : AgregarCarritoService,
    private aFirestore: AngularFirestore

  ) { 
    this.coleccionFirebase = this.aFirestore.collection<Articulo>('articulos');
    this.articulosFirebase = this.coleccionFirebase.valueChanges();

    

    //this.articulosCollection = this.af.collection<Articulo>('articulos');
    //this.arts = this.articulosCollection.valueChanges();
  }

  ngOnInit(): void {

   
  }

  
  articulos: any = [
    {
      id: 1,
      nombre: "Gorra", 
      imagen: 'assets/imagenes/gorra.jpg',
      precio: 299
    },
    {
      id: 2,
      nombre: "Taza", 
      imagen: 'assets/imagenes/taza.jpg',
      precio: 199
    },
    {
      id: 3,
      nombre: "Camiseta", 
      imagen: 'assets/imagenes/playera.jpg',
      precio: 199
    },
    {
      id: 4,
      nombre: "Bolsa", 
      imagen: 'assets/imagenes/bolsa.jpg',
      precio: 99
    }
  ];

  carro: number = 0;

  agregarCarrito(){

    this.carritoService.testService();
    //this.carro++;
  }


}