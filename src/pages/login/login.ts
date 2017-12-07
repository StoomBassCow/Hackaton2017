import { Component,ViewChild, AfterViewInit } from '@angular/core';
import { IonicPage, NavController, NavParams,Slides,LoadingController,AlertController } from 'ionic-angular';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { HomePage } from '../home/home';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage implements AfterViewInit{

  @ViewChild(Slides) slides:Slides;
  clave:string="";
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private usuario:UsuarioProvider,
              private loadingCtrl:LoadingController,
              private  alertCtrl:AlertController 
            ) {
  }

 ngAfterViewInit() {
   this.slides.lockSwipes(true);
   this.slides.freeMode=false;
   this.slides.paginationType="progress";
 }

 continuar() {
   //verificar si la clav es valida
   let loading=this.loadingCtrl.create({
     content:"espere por favor...."
   });
   loading.present();
   this.usuario.verificarUsuario(this.clave)
   .then(valor=>{
      loading.dismiss();
      if( valor ) {
        this.slides.lockSwipes(false);
        this.slides.slideNext();
        this.slides.lockSwipes(true);
      }
      else{
        //no es correcta
        this.alertCtrl.create({
          title:"clave incorrecta",
          subTitle:"verifique su clave",
          buttons:['OK']
        }).present();
      }

   })
   .catch(error=>{
      loading.dismiss();
      console.log("error",JSON.stringify(error));
   });
 }

 ingresar() {
   //tenemos la clave ir a home
   this.navCtrl.setRoot(HomePage);
 }

}
