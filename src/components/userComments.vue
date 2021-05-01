<template>
  <div>
      <div class="container">
          <div class="row d-flex justify-content-center">
              <div class="col-sm-10 col-md-10 col-l-8">
                    <h1 class="title">Filmleri Sen Nasıl Bitirirdin ?</h1>
                    <div v-for="(comment,i) in comments" :key="i" class="comment-card d-flex flex-column align-items-center">
                        <h3>{{comment.title}}</h3>
                        <p id="comment">{{comment.content}}</p>
                        <div class="edit-btns">
                            <button type="button" @click="removeComment(comment.commentId,comment.filmId)" id="removeComment" class="btn">Sil</button>
                            <button type="button" @click="edit(comment)" id="editComment" class="btn">Güncelle</button>
                        </div>
                    </div>
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
            comments:[],
            
        }
    },
    methods:{
        async loadUserComments(){
            let uid = localStorage.getItem("uid").toString();
            let url = `https://filmapp-aa692-default-rtdb.firebaseio.com/users/${uid}/comments.json`;
            const res = await fetch(url);
            const jsnd = await res.json();
            this.comments = jsnd;
        },
        async removeComment(commentId,filmId){
            const data = {
                commentId,
                filmId
            }
            Swal.fire({
                title: 'Emin misin?',
                text: "Bu senaryon sonsuza kadar silinecek.",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                cancelButtonText:"İptal",
                confirmButtonText: 'Evet, sil'
            }).then((result) => {
            if (result.isConfirmed) {
                this.$store.dispatch("removeCommentFromDb",data);
                Swal.fire(
                'Silindi!',
                'Senaryonuz silindi',
                'success'
                )
                this.loadUserComments();
             }
            })
        },
        edit(comment){
            console.log(comment);
            Swal.fire({
                title:"Senaryoyu Güncelle",
                icon:"info",
                input:"textarea",
                showCancelButton:true,
                inputValue:comment.content,
                inputValidator:(value)=>{
                    const payload = {
                        value,
                        filmId:comment.filmId,
                        commentId:comment.commentId,
                        title:comment.title,
                        email:comment.email
                    }
                    if(value===""){
                        return "Burası boş kalamaz, lütfen tekrar deneyin"
                    }
                    this.$store.dispatch("editCommentFromDb",payload);
                    Swal.fire({
                        title:"Senaryon Güncellendi",
                        icon:"success"
                    })
                    this.loadUserComments();
                }
            });
        }
    },beforeMount(){
        this.loadUserComments();
    },
}
</script>

<style>
.title{
    text-align: center;
}
.comment-card{
    background-color: yellow;
    margin: 20px 0px;
    padding: 15px;
    height: auto;
}
#comment{
    text-align: center;
    display: block;
    width: 100%;
    height: auto;
    word-wrap: break-word;
}
#removeComment{
    border: 1px tomato solid;
    border-radius: 0px;
    margin-right: 20px;
   
}
#removeComment:hover{
    background-color: tomato  !important;
}
#editComment{
    border: 1px black solid;
    border-radius: 0px;

}
#editComment:hover{
    color: white;
    background-color: black;
}
</style>