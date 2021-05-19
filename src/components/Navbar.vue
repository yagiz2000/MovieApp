<template>
  <div>
    <nav v-if="showNavbar" class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Movie App</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav d-flex">
            <router-link  class="nav-link" @click.native="changeSelectedLink(0)" :class='{ active: isSelected===0}' tag="a" to="/">
              Popülerler
            </router-link>     
            <router-link class="nav-link" @click.native="changeSelectedLink(1)" :class='{ active: isSelected===1}' tag="a" to="/favourites">
              Favoriler
            </router-link>   
             <router-link class="nav-link" @click.native="changeSelectedLink(2)" :class='{active: isSelected===2}' tag="a" to="/searchFilm">
                Film Ara
            </router-link>
            <router-link class="nav-link" @click.native="changeSelectedLink(3)" :class='{active: isSelected===3}' tag="a" to="/comments">
                Senaryoların
            </router-link>
            <router-link class="nav-link" @click.native="changeSelectedLink(4)" :class='{active: isSelected===4}' tag="a" to="/profile">
                Profil
            </router-link>
            <a @click.prevent="signOut"  class="nav-link" id="logout-btn"  href="#">Çıkış Yap</a>
          </div>
        </div>
      </div>
    </nav>
    <nav v-else>
    </nav>
  </div>
</template>

<script>
export default {
  data(){
    return{
      isSelected:0,
      isAuth:true
    }
  },
  computed:{
    showNavbar(){
      return this.$store.getters.showNavbar;
    }
  },
    methods:{
      signOut(){
        this.$store.dispatch("signOut");
        this.$router.push("/auth");
        this.isAuth = this.$store.getters.getAuthStatus;
      },
      changeSelectedLink(order){
        this.isSelected = order;
      },
  
    }
};
</script>
<style>
.nav-link{
    text-align: center;
    border: 2px solid black ;
    margin: 10px     10px; 
    border-radius: 15px;
}
.active{
  background-color: #00C9C8;
}
.navbar-nav{
  width: 100%;
}
@media screen and (min-width:992px) {
  #logout-btn{
  margin-left: auto;
}
}

</style>
