<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-sm-9 d-none d-lg-block">
        <img id="img-background" src="../assets/image/login-image.webp" />
      </div>
      <div class="form-box col-3">
        <img id="img-delta" src="../assets/image/DRay.png" />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <h2>Authentication</h2>
        <br />

        <form>
          <div class="form-input">
            <div class="form-group">
              <input
                type="text"
                required
                class="form-control"
                placeholder="User Name"
                v-model="username"
              />
            </div>
            <br />
            <div class="form-group">
              <input
                type="password"
                required
                class="form-control"
                placeholder="Password"
                v-model="password"
              />
            </div>
          </div>
          <br />
          <div class="form-group">
            <input
              type="submit"
              class="btnSubmit"
              value="Login"
              @click="submitClick()"
            />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>


<script>

 

export default {

  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    submitClick() {
      if (
        this.username != "" &&
        this.password != "" &&
        this.username == this.password
      ) {
        this.$store.commit("login",this.username);
        
        console.log(this.$store.state.isAuthenticated);
        this.$router.push({ name: "Dashboard" });

      }
      else{
         this.$store.commit("logout");
      }
    },
  },
};
</script>

<style scoped>


.form-box {
  text-align: center;
  margin-top: 30px;
}



.form {
  padding: 5%;
}

.div {
  padding-top: 100px;
}

#img-background {
  width: 100%;
}

#img-delta {
  align-content: center;
}

div {
  margin-top: 0px;
 

}

.login-container form {
  padding: 0%;
}
.btnSubmit {
  width: 50%;
  border-radius: 1rem;
  padding: 1.5%;
  border: none;
  cursor: pointer;
  font-weight: 600;
  color: #fff;
  background-color: #0062cc;
}
</style>
