import { Component, OnInit, Output } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Event } from '@angular/router';
import { Observable } from 'rxjs';
import { Articulo, ArticuloDetalle } from '../articulo.model';

@Component({
  selector: 'app-articulo-detalle',
  templateUrl: './articulo-detalle.component.html',
  styleUrls: ['./articulo-detalle.component.css']
})
export class ArticuloDetalleComponent implements OnInit {

  private articuloConsulta : AngularFirestoreDocument<ArticuloDetalle>;
  idArticulo: string;
  articuloDetalle: Observable<ArticuloDetalle|undefined>;

  constructor(private ruta: ActivatedRoute,
    private af: AngularFirestore, 
    ) { 
      this.idArticulo =  this.ruta.snapshot.params['id'];
      
      this.articuloConsulta = this.af.doc<ArticuloDetalle>(`/articulos/${this.idArticulo}`); 

     
      this.articuloDetalle = this.articuloConsulta.valueChanges();
    }

  ngOnInit(): void {

    console.log(this.articuloConsulta);
    //this.buscarArticulo();

  }


  carro : number = 0;
  cantidad: number = 1;
  @Output() carroCopia: number = 0;

  agregarCarrito(){
    
    let total = this.carro + this.cantidad;
    this.carro = total;
  }

  seleccionarCantidad(ev: any){
    this.cantidad = parseInt(ev.target.value);
  }
}