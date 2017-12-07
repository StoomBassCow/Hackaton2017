import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UbicacionProvider } from '../../providers/ubicacion/ubicacion';
import { UsuarioProvider } from '../../providers/usuario/usuario';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  lat: number = 51.678418;
  lng: number = 7.809007;
  user:any={};
  constructor(public navCtrl: NavController,
              private ubicacion:UbicacionProvider,
              private usuario:UsuarioProvider) {

              this.ubicacion.iniciarLocalizacion();  
              this.ubicacion.usuario.valueChanges()
              .subscribe((data)=>{
                console.log("datos"+data);
                this.user=data;
              });
  }

  salir() {
    this.usuario.borarUsuario();
    this.ubicacion.detenerWatch();
    this.navCtrl.setRoot("LoginPage")
  }

}
