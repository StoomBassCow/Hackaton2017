
import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { UsuarioProvider } from '../usuario/usuario';
/*
  Generated class for the UbicacionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UbicacionProvider {

  usuario:AngularFireObject<any>;
  private watch:any;
  constructor(private geolocation:Geolocation,
              private afd:AngularFireDatabase,
              private user:UsuarioProvider) {
    console.log('Hello UbicacionProvider Provider');
    if(!this.user.clave){
      return;
    }
    this.usuario=this.afd.object("/usuarios/"+this.user.clave);
  }

  iniciarLocalizacion(){
    this.watch=this.geolocation.watchPosition()
    .subscribe((data)=>{
      //console.log(data);
      if(!this.user.clave){
        return;
      }
      this.usuario.update({lat:data.coords.latitude,lng:data.coords.longitude});
    });
  }

  detenerWatch(){
    this.watch.unsubscribe();
  }

}
