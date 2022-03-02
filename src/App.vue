<template>
  <div class="wrapper">
    <SideBar ref="sidebar" v-if="shouldShowSidebar" />
    <div class="main">
      <TopBar v-if="shouldShowSidebar" @toggle-sidebar="toggleSideBar()" />
      <main class="content">
        <router-view></router-view>
      </main>
      <Footer />
    </div>
  </div>
</template>

<script>
import SideBar from "./components/SideBar.vue";
import TopBar from "./components/TopBar.vue";
import Footer from "./components/Footer.vue";

import "./assets/css/App.css";

export default {
  name: "App",
  components: {
    SideBar,
    TopBar,
    Footer,
  },
  computed: {
    shouldShowSidebar() {
      return this.$route.meta.sidebar !== false;
    },
  },
  methods: {
    toggleSideBar(value) {
      console.log("toggle sidebar from App");
      this.$refs.sidebar.toggleCollapsed();
    },
  },
};
</script>

<style>
.wrapper {
  margin: 0%;
}

.content {
  padding: 0px;
}
</style>



