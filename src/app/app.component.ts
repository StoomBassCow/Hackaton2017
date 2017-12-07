import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { UsuarioProvider } from '../providers/usuario/usuario';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;

  constructor(platform: Platform, statusBar: StatusBar,
             splashScreen: SplashScreen,
              private usuario:UsuarioProvider) {
    platform.ready().then(() => {
      this.usuario.cargarStorage()
      .then(()=>{
        if(this.usuario.clave){
          this.rootPage=HomePage;
        }
        else{
          this.rootPage="LoginPage";
        }
        statusBar.styleDefault();
        splashScreen.hide();
      });
      

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      
    });
  }
}

