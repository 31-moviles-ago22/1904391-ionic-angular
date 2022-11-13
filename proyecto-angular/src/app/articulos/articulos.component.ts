import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { AgregarCarritoService } from '../agregar-carrito.service';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable, of } from 'rxjs';

import { Articulo } from '../articulo.model';

@Component({
  selector: 'app-articulos',
  templateUrl: './articulos.component.html',
  styleUrls: ['./articulos.component.css']
})
export class ArticulosComponent implements OnInit {

  observaVar = of(1, 2, 3); //Todos los valores por los que pasa esta variable

  obserVaCambios  = {
    next: (x: number) => {
      console.log('Cambios en x ' +  x);
    }
  }

  

  //private articulosCollection: AngularFirestoreCollection<Articulo>;
  //arts: Observable<Articulo[]>; 


  private coleccionFirebase: AngularFirestoreCollection<Articulo>;
  articulosFirebase: Observable<Articulo[]>;
  articuloDoc: any;

  //private test: AngularFirestoreCollection<Articulo>;

  constructor(
    private carritoService : AgregarCarritoService,
    private aFirestore: AngularFirestore

  ) { 
    this.coleccionFirebase = this.aFirestore.collection<Articulo>('articulos');
    this.articulosFirebase = this.coleccionFirebase.valueChanges();
    this.articuloDoc = this.aFirestore.doc<Articulo>('/articulos/KyPraPRLoHbek3pEt0kk');
    
    //this.articulosCollection = this.af.collection<Articulo>('articulos');
    //this.arts = this.articulosCollection.valueChanges();
  }

  articulosColeccionFb: Articulo[] = [];

  ngOnInit(): void {

    //this.observaVar.subscribe(this.obserVaCambios);


   
    console.log(this.coleccionFirebase.valueChanges({idField: 'id'}).subscribe(res => {
      this.articulosColeccionFb = res;
    }));
    
    this.articulosFirebase.subscribe(res => {
      
    })
  }

  ngOnDestroy() {
    this.articulosColeccionFb = [];
   
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

  @Output() agregarAcarrito =  new EventEmitter();

  agregarCarrito(articulo : any){
    this.carro++;
    this.agregarAcarrito.emit(this.carro);

    this.carritoService.testService();
  }


}