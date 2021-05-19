<template>
  <div class="container text-center">
    <div class="row d-flex justify-content-center">
      <div class="col-md-4">
        <h2>{{ isUser | cardHeader }}</h2>

        <div
          :class="{ 'login-card-green': isUser, 'login-card-blue': !isUser }"
        >
          <form class="form">
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">Email</label>
              <input
                v-model.trim="$v.user.email.$model"
                type="email"
                class="form-control"
                :class="{ 'is-invalid': !$v.user.email.email }"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                v-model="user.email"
              />
              <small v-if="!$v.user.email.required">Bu alan zorunludur</small>
              <small v-if="!$v.user.email.email"
                >Lütfen geçerli bir eposta giriniz</small
              >
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
              <small v-if="!$v.user.password.minLength"
                >Şifre 6 karakterden fazla olmalı</small
              >
            </div>
            <div v-if="!isUser" class="mb-3">
              <label
                for="exampleInputPassword2"
                class="form-label"
                >Şifreyi Tekrar Giriniz</label
              >
              <input
                type="password"
                class="form-control"
                id="exampleInputPassword2"
                v-model="user.repeatPassword"
              />
              <small v-if="!$v.user.repeatPassword.sameAsPassword"
                >Şifreler uyuşmuyor</small
              >
            </div>
            <button
              :disabled="!isUser ? $v.$invalid : false"
              @click.prevent="signUpOrIn"
              type="submit"
              class="btn"
              :class="{ 'btn-success': isUser, 'btn-primary': !isUser }"
            >
              {{ isUser ? "Giriş Yap" : "Kayıt Ol" }}
            </button>
            <a href="#" @click.prevent="isUser = !isUser" class="register-link"
              >{{ isUser ? "Üye olmak istiyorum" : "Üyeliğim var" }}
            </a>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import { required, email, sameAs, minLength } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      user: {
        email: null,
        password: null,
        repeatPassword: null,
      },
      isUser: false,
      apiKey: "AIzaSyBUojiNoUITZxBD9T8Wqx773bnD0LCoGiw",
    };
  },
  validations: {
    user: {
      email: {
        required,
        email,
      },
      password: {
        required,
        minLength: minLength(6),
      },
      repeatPassword: {
        sameAsPassword: sameAs("password"),
      },
    },
  },
  filters: {
    cardHeader(value) {
      if (!value) {
        return "Kayıt Sayfası";
      }
      return "Giriş Sayfası";
    },
  },
  methods: {
    signUpOrIn() {
      if (this.user.email === null || this.user.password === null) {
        Swal.fire({
          title: "Hata",
          text: "Boş alan bırakmayınız",
          icon: "warning",
        });
        return false;
      }
        let payload = {
            ...this.user,
            isUser:this.isUser
        }
        this.$store.dispatch("signUpOrIn",payload)
        .then((res)=>{
          console.log(res);
        })
        .catch(err=>{
        if(err.type==="signIn"){
            Swal.fire({
            title: "Hata",
            icon: "warning",
            showCancelButton: true,
            text: err.msg,
          });
        }
        if(err.type==="signUp"){
          Swal.fire({
            title: "Hata",
            icon: "warning",
            showCancelButton: true,
            text: err.msg,
          });
        }
        });
    },
  },
};
</script>

<style>
.login-card-blue {
  background: rgba(5, 94, 252, 0.25);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  padding: 20px 20px;
}
.login-card-green {
  background: rgba(29, 249, 3, 0.25);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  padding: 20px 20px;
}
.row {
  margin-top: 100px;
}
.register-link {
  color: whitesmoke;
  display: block;
  margin-top: 10px;
}
.btn-primary {
  border: 0px;
  border-radius: 0px;
  background-color: #e2b659;
}
.btn-primary:hover {
  background-color: #1f646f;
}
.btn-primary:focus,
.btn-primary:active {
  outline: none;
  box-shadow: none;
}
.btn-success {
  border: 0px;
  border-radius: 0px;
  background-color: #00dfff;
  color: black;
}
.btn-success:hover {
  background-color: #8cf8b8;
  color: black;
}
.btn-success:focus,
.btn-success:active {
  outline: none;
  box-shadow: none;
}
</style>
