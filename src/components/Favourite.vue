<template>
  <div class="container">
      <div class="row" id="films">
        <div v-for="(favFilm, index) in favFilms" :key="index" class="col-sm-5 col-md-4 col-lg-3">
          <div class="film-card">
          <router-link tag="h4" @click.native="sendIdToStore(favFilm.filmid)" id="filmTitle" :to="{name:'film',params:{id:favFilm.filmid}}" >{{ favFilm.title }}</router-link>
              <p>{{favFilm.name}}</p>
              <img id="poster" :src="getPoster(favFilm.poster)" style="width:100%;">
              <div class="delete-btn text-align-center">
              <button id="fav-remove" @click="removeFromFav(favFilm.customid)" type="button" class="btn">Sil</button>
              </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";

export default {
  beforeMount(){
    this.$store.dispatch("getFilmDataFromDb");
  },
  computed:{
    favFilms(){
      return this.$store.getters.getFavFilms;
    }
  },
  methods:{
    getPoster(path){
      return `https://image.tmdb.org/t/p/original${path}`;
    },
    removeFromFav(customId){
      Swal.fire({
                title: 'Emin misin?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                cancelButtonText:"İptal",
                confirmButtonText: 'Evet, sil'
            }).then((result) => {
            if (result.isConfirmed) {
                this.$store.dispatch("removeFilm",customId);
                Swal.fire({
                  title:'Silindi!',
                  icon:"success"
                })
                this.$store.dispatch("getFilmDataFromDb");
             }
            })
    },
     sendIdToStore(id){
      this.$store.commit("setFilmId",id);
    }
  }
}
</script>
<style>
#fav-remove{
  margin: 10px 0;
  width: 50%;
  border-radius: 0px;
  border: 1px white solid;
  color: aliceblue;


}
#fav-remove:hover{
  background-color: #970061;
}
</style>