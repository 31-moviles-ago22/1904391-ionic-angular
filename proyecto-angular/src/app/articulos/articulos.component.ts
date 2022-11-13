import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-articulos',
  templateUrl: './articulos.component.html',
  styleUrls: ['./articulos.component.css']
})
export class ArticulosComponent implements OnInit {

  constructor() { }

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
    this.carro++;
  }
  
}