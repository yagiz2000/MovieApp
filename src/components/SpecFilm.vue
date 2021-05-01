<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-8">
        <img :src="getPoster(film.poster_path)" id="specFilmPoster" />
      </div>
      <div class="col-lg-4">
        <h3>{{ film.original_title }}</h3>
        <p>{{ film.overview }}</p>
      </div>
    </div>
    <hr />
    <div class="row justify-content-center">
      <div class="col-lg-8">
        <div class="comment-box">
          <div class="form-group">
            <label id="comment-text" for="exampleFormControlTextarea3">Filmin Nasıl Bitmesini İsterdin ?</label>
            <textarea
              v-model="comment"
              class="form-control"
              id="exampleFormControlTextarea3"
              rows="7"
            ></textarea>
          </div>
          <button type="button" @click.prevent="addComment(film.title)" id="comment-sbmt-btn" class="btn btn-success">Gönder</button>
        </div>
      </div>
    </div>
    <hr>
    <div class="row justify-content-center">
      <div class="col-lg-8">
        <h2 style="text-align:center;" >Alternatif Senaryolar</h2>
        <div class="comments">
          <div v-for="(c,i) in comments" :key="i" class="user-comment-box">
            <h5>{{c.email}}</h5>
            <p>{{c.content}}</p>
          </div>
        </div>
      </div>
    </div>
    <notifications  width="300px" height="200px" position="bottom right" group="foo" />
  </div>
</template>

<script>
import Swal from 'sweetalert2';
export default {
  data() {
    return {
      film: {},
      id: 0,
      comment:""
    };
  },
  beforeMount() {
    this.loadFilmData();
    this.loadComments();
  },
  computed: {
    getFilmId() {
      return this.$store.getters.getFilmId;
    },
    comments(){
      let comments = this.$store.getters.getComments;
      return comments;
    }
  },
  methods: {
    async loadFilmData() {
      let id = this.$route.params.id;
      let filmIdStrfd = id.toString();
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${filmIdStrfd}?api_key=627db53bdee442611e5ff76d64be01c1&language=en-US`
      );
      const jsnd = await response.json();
      this.film = jsnd;
    },
    getPoster(path) {
      return `https://image.tmdb.org/t/p/original${path}`;
    },
    addComment(title){
      if(this.comment===""){
        Swal.fire({icon:"error",text:"Yorum boş bırakılamaz."});
        return false
      }
      let filmId = this.$route.params.id;
      let comment = this.comment;
      let data = {
        filmId,
        comment,
        title
      }
      this.$store.dispatch("addComment",data);
      this.$notify({
        group:"foo",
        title:"Bitiş ekledi",
        type:"success",
        duration:"700",
        text:"Alternatif senaryonuz eklendi...",
        speed:"800"
      })
      this.comment = "";
      this.loadComments();
    },
    loadComments(){
      let filmId = this.$route.params.id;
      this.$store.dispatch("loadComments", filmId);
    }
  },
};
</script>
<style>
#specFilmPoster {
  max-width: 300px;
  margin-bottom: 50px;
}
.comment-box {
  margin: 30px auto;
  text-align: center;
}
#comment-text{
  margin-bottom: 10px;
}
#comment-sbmt-btn{
  margin-top: 10px;
}
.user-comment-box{
  text-align: center;
  border: 5px solid rgba( 255, 255, 255, 0.18 );
  height: auto;
  margin-bottom: 20px;
  padding: 15px;
}
</style>
