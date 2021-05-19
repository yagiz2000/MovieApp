<template>
  <div class="container">
      <div class="row">
          <div class="col-md-6">
              <div class="profile-card">
                <rotate-square2 v-if="showLoading"></rotate-square2>
                <img v-if="!showLoading" ref="pp" :src="pp" class="profile-image" alt="">
                <h4>{{username}}</h4>
                <p>Bilgiler</p>     
                <div class="profile-btns">
                    <input type="file" class="form-control-file" ref="fileInput" accept="image/*" @change="handleFileUpload" id="exampleFormControlFile1">
                    <button class="btn btn-info" @click="uploadFileToStorage">Gönder</button>
                </div>         
              </div>
          </div>
          <div class="col-md-6">
              <div class="info-card">
                  <div class="info">
                      <h5>Username</h5>
                      <p>{{username}}</p>
                  </div>
                  <div class="info">
                      <h5>Email</h5>
                      <p>{{email}}</p>
                      <div class="info-btns">
                            <button class="btn btn-success edit-btn">Güncelle</button>
                            <button @click="updatePassword" class="btn btn-danger edit-btn">Şifreni Değiştir</button>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>
<script>
import {RotateSquare2} from 'vue-loading-spinner'
import Swal from "sweetalert2";
export default {
    components:{
        RotateSquare2
    },
    data(){
        return{
            file:{},
            pp:"",
            showLoading:true
        }
    },
    beforeMount(){
        this.displayProfilePic();
    },
    methods:{
        handleFileUpload(e){
            this.file = e.target.files[0];
        },
        async uploadFileToStorage(){
            this.$store.dispatch("uploadImageToFirebase",this.file).then(()=>{
                this.displayProfilePic();
            })
        },
        displayProfilePic(){
            this.$store.dispatch("getProfilePhoto")
            .then((url)=>{
            this.pp = url;
            this.showLoading= false;
        })
        },
        updatePassword(){
            Swal.fire({
                title:"Şifre Güncelleme",
                icon:"info",
                input:"password",
                showCancelButton:true,
                inputValue:"",
                inputValidator:(value)=>{
                    if(value ==="" || value.length<6){
                    Swal.fire({
                        title:"Hata",
                        icon:"warning"
                        ,text:"Şifreniz 6 karakterden az olmamalıdır"
                    });
                    }
                    else{
                        this.$store.dispatch("updatePassword",value);
                        Swal.fire({
                        title:"Senar",
                        icon:"success"
                        ,text:"Şifreniz başarıyla değiştirildi"
                    });
                    }
                }
            });
        }
    },
    computed:{
        email(){
            let email = localStorage.getItem("email");
            return email;
        },
        username(){
            let email = localStorage.getItem("email");
            //console.log("componentteki email:",email);
            return email.split("@")[0];
        },
    }
}
</script>
<style>
.profile-card{
    border: 5px solid black;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 5px;
}

.profile-image{
    width: 200px;
    
}
.profile-btns{
    display: flex;
    width: 90%;
    justify-content: center;
}
.info-card{
    border: 1px solid black;
    margin: 20px;
    padding:10px;
}
.info{
    display: flex;
    flex-direction: column;
    align-items: center;
}
.edit-btn{
    margin: 0 10px;
}
</style>