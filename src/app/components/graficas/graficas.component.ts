import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/productos.model';
import { ProductosService } from 'src/app/services/productos.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-graficas',
  templateUrl: './graficas.component.html',
  styleUrls: ['./graficas.component.scss'],
  providers: [
    ProductosService, UsuarioService
  ]
})
export class GraficasComponent implements OnInit {
  chartOptions = {
    responsive: true,
  };
  chartLabels:any = [];
  chartData:any = [];
  chartColors:any = [{
    backgroundColor: []
  }];
  chartLegend = true;
  chartPlugins = [];

  public modeloProductoGet:any = [];
  constructor(
    public _productoService: ProductosService,
    public _usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
    this.getProducto();
  }

  getProducto(){
    this._productoService.obtenerProductos(this._usuarioService.obtenerToken()).subscribe(
      (response)=>{
        console.log(response);
        this.modeloProductoGet =  response.productos;
        this.modeloProductoGet.forEach(dato => {
          this.chartLabels.push(dato.nombre);
          this.chartData.push(dato.cantidad);
          this.chartColors[0].backgroundColor.push(`#${Math.floor(Math.random()*16777215).toString(16)}`)
        });
      },
      (error)=>{
        console.log(<any>error)
      }
    )
  }
}
