//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Storage } from '@ionic/storage';
import { Platform } from 'ionic-angular';
/*
  Generated class for the UsuarioProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UsuarioProvider {

  items: Observable<any[]>;
  clave:string;
  constructor(private af:AngularFireDatabase,
              private storage:Storage,
              private platform:Platform) {
    
  }

  verificarUsuario(clave:string){
    clave=clave.toLowerCase();

    let promesa=new Promise((resolve,reject)=>{
     this.af.list('/usuarios/'+clave)
     .valueChanges()
     .subscribe(data=>{

        if( data.length===0 ){
          resolve(false);
        }else {
          this.clave=clave;
          this.guardarStorage();
          resolve(true);
        } 
     });
             
    }).catch(error=>{
      console.log("error en promesa service", JSON.stringify(error));
    });
    return promesa;
  }

  guardarStorage(){

    let promesa=new Promise((resolve,reject)=>{
      if( this.platform.is("cordova") ){
        this.storage.set('clave',this.clave);
      }else{
        if(this.clave){
        localStorage.setItem("clave",this.clave);
        }
        else{
          localStorage.removeItem("clave");
        }
      }

    });
    return promesa;
  }
  cargarStorage(){
    let promesa=new Promise((resolve,reject)=>{
      if(this.platform.is("cordova")){
        this.storage.ready()
        .then(()=>{
          this.storage.get("clave")
          .then(clave=>{
            this.clave=clave;
            resolve();
          });
        });
      }
      else{ 
        this.clave=localStorage.getItem("clave");
        resolve();
      }
    });
    return promesa;
  }

  borarUsuario(){
    this.clave=null;
    this.guardarStorage();
  }

}
