<template>
  <div class="container">
    <div class="row" id="films">
      <div
        v-for="(film, i) in films"
        :key="i"
        class="col-sm-5 col-md-4 col-lg-3"
      >
        <div  class="film-card" >
          <router-link tag="h4" @click.native="sendIdToStore(film.id)" id="filmTitle" :to="{name:'film',params:{id:film.id}}" >{{ film.title }}</router-link>
          <p>Puan: {{ film.vote_average }}</p>
          <img id="poster" :src="getPoster(film.poster_path)" style="width:100%;">
          <button @click="addFilmToDb(film)" id="addFavBtn" class="btn">Fava Ekle</button>
        </div>      
      </div>
    </div>
    <notifications  width="300px" height="200px" position="bottom right" group="foo" />
  </div>
</template>
<script>
export default {
  methods: {
    getPoster(path) {
      return `https://image.tmdb.org/t/p/original${path}`;
    },
    addFilmToDb(film){
      this.$store.dispatch("addFavFilmToDatabase",film);
      this.$notify({
        group:"foo",
        title:"Favorilere eklendi",
        type:"success",
        duration:"700",
        text:"Film favorilere eklendi",
        speed:"800"
      })
    },
    sendIdToStore(id){
      this.$store.commit("setFilmId",id);
    }
  },
  computed:{
    films(){
      return this.$store.getters.emitFilms;
    }
  },
  created() {
    this.$store.dispatch("getFilmsFromApi");
  },
};
</script>
<style>
#films {
  margin: 20px 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}
.film-card {
  background-color: cadetblue;
  border-radius: 10px;
  border: 1px solid white;
  text-align: center;
    height: auto;
    margin: 10px 10px;
  border-radius: 10px;
  transition:0.4s;
  padding: 10px;
  transform:perspective(100px) translateZ(0);
  padding-bottom: 10px;
  cursor: pointer;
}
#poster{
    height: 200px;
    width: 200px;
    object-fit:contain;
}
.film-card:hover {
  transform:perspective(100px) translateZ(10px);
}
#addFavBtn{
  color: aliceblue;
  margin: 10px 0px;
  border-radius: 0px;
  border: 1px white solid;
 
}
#addFavBtn:hover{

  background-color: #9BBAFE;
}
#filmTitle:hover{
  text-decoration: underline;
}
.success{
  font-size: 20px;
}
</style>
