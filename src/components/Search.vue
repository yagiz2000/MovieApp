<template>
  <div class="container">
    <div class="row justify-content-center" id="row-1">
      <div class="col-sm-10 col-md-8 col-lg-8">
        <div class="searchbar">
          <div class="input-group-prepend d-flex flex-column">
            <input
            type="text"
            v-model="query"
            class="form-control"
            placeholder="Film Ara"
            aria-describedby="basic-addon1"
            @keypress.enter="searchFilm"
          />
           <button
              @click.prevent="searchFilm"
              class="btn"
              type="button"
              id="search-btn"
            >
              Ara
            </button>
          </div>
          
    
      </div>
      </div>
      
    </div>
    <div class="row" v-if="films.length>0" id="row-2">
      <div
        v-for="(film, i) in films"
        :key="i"
        class="col-sm-5 col-md-4 col-lg-3"
      >
        <div  class="film-card">
          <router-link tag="h4" @click.native="sendIdToStore(film.id)" id="filmTitle" :to="{name:'film',params:{id:film.id}}" >{{ film.title }}</router-link>
          <p>Puan: {{ film.vote_average }}</p>
          <img
            v-if="film.poster_path===null"
            id="poster"
            src="../assets/notfound.png"
            style="width:100%;"
          />
          <img
            v-else
            id="poster"
            :src="getPoster(film.poster_path)"
            style="width:100%;"
          />
          <button @click="addFilmToDb(film)" id="addFavBtn" class="btn">Fava Ekle</button>


        </div>
      </div>
    </div>
    <div class="row"  style="text-align:center;" v-else id="row-2" >
      <h4 >Aradığınız kelimede film bulunamadı lütfen geçerli film adı deneyiniz.</h4>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      query: "",
      films: [],
      havePoster: true,
    };
  },
  methods: {
    async searchFilm() {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=627db53bdee442611e5ff76d64be01c1&language=en-US&query=${this.query}&page=1&include_adult=false`
      );
      const json = await res.json();
      this.films = json.results;
     
    },
    getPoster(path) {
      if (path === null) {
        return (this.havePoster = false);
      }
      this.havePoster = true;
      return `https://image.tmdb.org/t/p/original${path}`;
    },
      sendIdToStore(id){
      this.$store.commit("setFilmId",id);
    },
    addFilmToDb(film){
      this.$store.dispatch("addFavFilmToDatabase",film);
    }
  },
};
</script>

<style>
.card {
  background-color: grey;
  height: auto;
  align-items: center;
  position: relative;
  margin: 10px 0;
}
#parap {
  text-align: center;
}
#search-btn{
  margin: 10px 0px;
  border-radius: 0px;
  border: 1px white solid;
  margin: 10px auto;
  width: 20%;
}
#search-btn:hover{
  background-color: #F9F871;
}

#search-btn:focus{
  outline: none;
  box-shadow: none;
}
</style>
