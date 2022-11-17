import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { AgregarCarritoService } from '../agregar-carrito.service';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable, of } from 'rxjs';

import { Articulo } from '../articulo.model';


import { AngularFireStorage } from '@angular/fire/compat/storage';

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
    private aFirestore: AngularFirestore,
    private aFireStorage: AngularFireStorage
  ) { 
    this.coleccionFirebase = this.aFirestore.collection<Articulo>('articulos');
    this.articulosFirebase = this.coleccionFirebase.valueChanges();
    this.articuloDoc = this.aFirestore.doc<Articulo>('/articulos/KyPraPRLoHbek3pEt0kk');
    
    //this.articulosCollection = this.af.collection<Articulo>('articulos');
    //this.arts = this.articulosCollection.valueChanges();


    const ref = this.aFireStorage.storage;
  }

  articulosColeccionFb: Articulo[] = [];

  ngOnInit(): void {

    console.log(this.coleccionFirebase.valueChanges({idField: 'id'}).subscribe(res => {
      this.articulosColeccionFb = res;
    }));
    
    this.articulosFirebase.subscribe(res => {
      
    });
  }

  ngOnDestroy() {
    this.articulosColeccionFb = [];
  }

  cargarFotos(){

  }

  porcentaje$ : Observable<number>;
  progress : number | undefined;
  subirFoto(event: any){
    //Sube foto del input de File
    const archivo: File = event.target.files[0];
    console.log(archivo.name);

    const pathArchivo = `${archivo.name}` // ${this.articulo} // necesitamos un folder por articulo


    const task = this.aFireStorage.upload(pathArchivo, archivo);

     task.percentageChanges().subscribe(res => {
      this.progress = res;
     });

    //this.progress = porcentaje$;

   /*  setInterval(() => {
      this.progress += 0.01;
      if (this.progress > 1) {
        setTimeout(() => {
          this.progress = 0;
        }, 1000);
      }
    }, 50); */

    task.snapshotChanges().subscribe();
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