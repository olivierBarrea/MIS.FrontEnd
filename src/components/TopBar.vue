<template>
  <nav class="navbar navbar-expand navbar-light navbar-bg">
    <a class="sidebar-toggle" @click="sideBarToggle()">
      <i class="hamburger align-self-center" ></i>
    </a>

    <div class="navbar-collapse collapse">
      <ul class="navbar-nav navbar-align">
        <li class="nav-item dropdown">
          <a
            class="nav-link d-none d-sm-inline-block"
            href="#"
            data-bs-toggle="dropdown"
          >
            <span class="text-dark">{{UserName}}</span>
          </a>
          <img src="../assets/icon/user.svg" />
          <div class="dropdown-menu dropdown-menu-end">
            <a class="dropdown-item">
              <i class="align-middle me-1"></i> Settings Privacy</a
            >
            <a class="dropdown-item" href="#"
              ><i class="align-middle me-1" data-feather="help-circle"></i>
              HelpCenter</a
            >
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" @click="logout()">Log out</a>
          </div>
        </li>
      </ul>
    </div>
  </nav>
</template>


<script>
 

export default {
  computed: {
    UserName: {
      get() {
        return this.$store.state.userName;
      },
    },
  },
  methods:{
    logout(){
      this.$store.commit("logout");
      this.$router.push({ name: "Login" });
    },
    sideBarToggle(){
      console.log("hamburger click");
      this.$emit("toggle-sidebar");
    }
  }
}
</script>
