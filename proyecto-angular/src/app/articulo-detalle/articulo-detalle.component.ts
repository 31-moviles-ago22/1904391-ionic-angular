import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-articulo-detalle',
  templateUrl: './articulo-detalle.component.html',
  styleUrls: ['./articulo-detalle.component.css']
})
export class ArticuloDetalleComponent implements OnInit {

  constructor(private ruta: ActivatedRoute) { }

  ngOnInit(): void {
    this.buscarArticulo();

    
  }

  articulos: any = [
    {
      id: 1,
      nombre: "Gorra", 
      imagen: 'assets/imagenes/gorra.jpg',
      precio: 299,
      reviews: [
        'malisimo! Se rompio a la primera lavada',
        'La gorra es mas pequeña de lo normal - no vale el precio'
      ]
    },
    {
      id: 2,
      nombre: "Taza", 
      imagen: 'assets/imagenes/taza.jpg',
      precio: 199, 
      reviews: [
        'buenisimo, me encanto',
        'Ultra coool!'
      ]
    },
    {
      id: 3,
      nombre: "Camiseta", 
      imagen: 'assets/imagenes/playera.jpg',
      precio: 199,
      reviews: [
        'Hola, este articulo es de muy bueno, el vendedor se comunico y fue muy agradable tratar con usted.'
      ]
    },
    {
      id: 4,
      nombre: "Bolsa", 
      imagen: 'assets/imagenes/bolsa.jpg',
      precio: 99,
      reviews: [
        'WOW - vuelvo a comprar esta bolsa. En la foto no se aprecia pero es mas pequeña de lo que parece pero la calidad es buena'
      ]
    }
  ];
  idArticulo: string = this.ruta.snapshot.params['id'];

  articuloDetalle: any = {};

  buscarArticulo(){
    for(let i = 0; i < this.articulos.length; i++){
      if(this.idArticulo == this.articulos[i].id){
        this.articuloDetalle = this.articulos[i];
      }
    }
  }

  carro : number = 0;
  cantidad: number = 1;

  agregarCarrito(){
    this.carro++;
  }
}