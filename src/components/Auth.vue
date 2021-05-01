<template>
  <div class="container text-center">
    <div class="row d-flex justify-content-center">
      <div class="col-md-4">
        <h2>{{isUser | cardHeader}}</h2>
        
        <div :class="{'login-card-green':isUser,'login-card-blue':!isUser }">
          <form class="form">
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label"
                >Email</label
              >
              <input
                type="email"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                v-model="user.email"
              /> 
            </div>
            <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label"
                >Şifre</label
              >
              <input
                type="password"
                class="form-control"
                id="exampleInputPassword1"
                v-model="user.password"
              />
            </div>
            <button @click.prevent="signUpOrIn" type="submit" class="btn" :class="{'btn-success':isUser,'btn-primary':!isUser}">{{isUser ?'Giriş Yap':'Kayıt Ol'}}</button>
            <a href="#" @click.prevent="isUser=!isUser" class="register-link" >{{isUser ? 'Üye olmak istiyorum': 'Üyeliğim var'}} </a>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
export default {
    data(){
        return{
            user:{
                email:null,
                password:null
            },
            isUser:false,
            apiKey:"AIzaSyBUojiNoUITZxBD9T8Wqx773bnD0LCoGiw"
        }
    },
    filters:{
      cardHeader(value){
        if(!value){
          return "Kayıt Sayfası"
        }
        return "Giriş Sayfası"
      }
    },
    methods:{
        signUpOrIn(){
          if(this.user.email===null || this.user.password===null){
             Swal.fire({
               title:"Hata",
                text: "Boş alan bırakmayınız",
                icon: 'warning',
             })
             return false;
          }
           this.$store.dispatch("signUpOrIn",{...this.user, isUser: this.isUser})
            // eslint-disable-next-line no-unused-vars
           .then(response=>{
               this.$router.push("/");
           })
           .catch(()=>{
             if(!this.isUser){
               Swal.fire({
               title:"Hata",
                text: "Bu e-posta daha önceden alınmış ya da şifreniz 6 karakterden az, lütfen tekrar deneyin",
                icon: 'warning',
             })
             return false;
             }
             Swal.fire({
               title:"Hata",
                icon: 'warning',
                showCancelButton: true,
               text:"Şifre ya da e-posta hatalı. Lütfen tekrar dene"
               })
             
             this.user= {}
           });
        }
    }
};
</script>

<style>
.login-card-blue{
background: rgba( 5, 94, 252, 0.25 );
box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
backdrop-filter: blur( 5.0px );
-webkit-backdrop-filter: blur( 5.0px );
border-radius: 10px;
border: 1px solid rgba( 255, 255, 255, 0.18 );    
padding: 20px 20px;
}
.login-card-green{
  background: rgba( 29, 249, 3, 0.25 );
  box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 ); 
  backdrop-filter: blur( 5.0px );
  -webkit-backdrop-filter: blur( 5.0px );
  border-radius: 10px;
  border: 1px solid rgba( 255, 255, 255, 0.18 );
  padding: 20px 20px;
}
.row{
    margin-top: 100px;
}
.register-link{
    color: whitesmoke;
    display: block;
    margin-top: 10px;
}
.btn-primary{
  border: 0px;
  border-radius: 0px;
  background-color:#E2B659 ;
}
.btn-primary:hover{
  background-color: #1F646F;
}
.btn-primary:focus,.btn-primary:active{
  outline: none;
  box-shadow: none;
}
.btn-success{
  border: 0px;
  border-radius: 0px;
  background-color:#00DFFF ;
  color: black;
}
.btn-success:hover{
  background-color:#8CF8B8 ;
  color:black
}
.btn-success:focus,.btn-success:active{
  outline: none;
  box-shadow: none;
}
</style>
