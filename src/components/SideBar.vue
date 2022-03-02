<template>
  <nav ref="sidebar"   class="sidebar js-sidebar"  :class="{collapsed: isCollapsed}" >
    <div class="sidebar-content js-simplebar sticky-top" >
      <a class="sidebar-brand mt-3">
        <img src="../assets/icon/deltaRayLogo.svg" style="width: 150px" />
        <router-link to="/Dashboard"></router-link>
      </a>

      <ul class="sidebar-nav">
        <li class="sidebar-header">General</li>

        <li
          class="sidebar-item"
          :class="{ active: this.activeTab == 'Dashboard' }"
        >
          <a class="sidebar-link">
            <i class="align-middle"
              ><img src="../assets/icon/clipboard.svg"
            /></i>
            <router-link
              class="sidebar-link-router"
              to="/Dashboard"
              @click="changePage('Dashboard')"
              >Dashboard
            </router-link>
          </a>
        </li>

        <li class="sidebar-item" :class="{ active: this.activeTab == 'Live' }">
          <a class="sidebar-link">
            <i class="align-middle"><img src="../assets/icon/film.svg" /></i>
            <router-link
              class="sidebar-link-router"
              to="/Live"
              @click="changePage('Live')"
              >Live View
            </router-link>
          </a>
        </li>

        <li
          class="sidebar-item"
          :class="{ active: this.activeTab == 'Product History' }"
        >
          <a class="sidebar-link">
            <i class="align-middle"
              ><img src="../assets/icon/book-open.svg"
            /></i>
            <router-link
              class="sidebar-link-router"
              to="/ProductHistory"
              @click="changePage('Product History')"
              >Product History</router-link
            >
          </a>
        </li>

        <li class="sidebar-header">Machine</li>

        <li
          class="sidebar-item"
          :class="{ active: this.activeTab == 'Machine Health' }"
        >
          <a class="sidebar-link">
            <i class="align-middle"
              ><img src="../assets/icon/activity.svg"
            /></i>
            <router-link
              class="sidebar-link-router"
              to="/MachineHealth"
              @click="changePage('Machine Health')"
              >Machine Health
            </router-link>
          </a>
        </li>

        <li
          class="sidebar-item"
          :class="{ active: this.activeTab == 'Counters' }"
        >
          <a class="sidebar-link">
            <i class="align-middle"><img src="../assets/icon/clock.svg" /></i>
            <router-link
              class="sidebar-link-router"
              to="/Counters"
              @click="changePage('Counters')"
              >Counters
            </router-link>
          </a>
        </li>

        <li class="sidebar-header">Report</li>

        <li
          class="sidebar-item"
          :class="{ active: this.activeTab == 'BatchSelection' }"
        >
          <a class="sidebar-link">
            <i class="align-middle"
              ><img src="../assets/icon/bar-chart.svg"
            /></i>
            <router-link
              class="sidebar-link-router"
              to="/BatchSelection"
              @click="changePage('BatchSelection')"
              >Batch Selection
            </router-link>
          </a>
        </li>

        <li
          class="sidebar-item"
          :class="{ active: this.activeTab == 'UserManagement' }"
        >
          <a class="sidebar-link">
            <i class="align-middle"
              ><img src="../assets/icon/database.svg"
            /></i>
            <router-link
              class="sidebar-link-router"
              to="/BatchSelection"
              @click="changePage('UserManagement')"
              >User management
            </router-link>
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>

export default {
  name: "SideBar",
  userName: "",
  data() {
    return {
      activeTab: "Dashboard",
      isCollapsed : false
    };
  },
 

  methods: {
    // Change the selected tab active class
    changePage(newPage) {
      this.activeTab = newPage;
      console.log("new tab selected:" + this.activeTab);
    },
    toggleCollapsed(){
      console.log("collapsed from sidebar:" + this.isCollapsed);
      this.isCollapsed = !this.isCollapsed;
      console.log("new collapsed from sidebar:" + this.isCollapsed);
      
    }
  },
};
</script>

<style scoped>
.sidebar-link-router {
  color: rgba(233, 236, 239, 0.5);
  cursor: pointer;
  font-weight: 400;
  text-decoration: none;
}

.sidebar-link-router:hover {
  color: white;
}

.sidebar-margin {
  padding-left: 20px;
}

.sidebar {
  direction: ltr;
  max-width: 260px;
  min-width: 260px;
}

.sidebar,
.sidebar-content {
  background: #222e3c;
  transition: margin-left 0.35s ease-in-out, left 0.35s ease-in-out,
    margin-right 0.35s ease-in-out, right 0.35s ease-in-out;
}

.sidebar-content {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.sidebar-nav {
  flex-grow: 1;
  list-style: none;
  margin-bottom: 0;
  padding-left: 0;
}

.sidebar-link,
a.sidebar-link {
  background: #222e3c;
  border-left: 3px solid transparent;
  color: #e9ecef;
  cursor: pointer;
  display: block;
  font-weight: 400;
  padding: 0.625rem 1.625rem;
  position: relative;
  text-decoration: none;
  transition: background 0.1s ease-in-out;
}

.sidebar-link i,
.sidebar-link svg,
a.sidebar-link i,
a.sidebar-link svg {
  color: rgba(233, 236, 239, 0.5);
  margin-right: 0.75rem;
}

.sidebar-link:focus {
  outline: 0;
}

.sidebar-link:hover {
  background: #222e3c;
  border-left-color: transparent;
}

.sidebar-link:hover,
.sidebar-link:hover i,
.sidebar-link:hover svg {
  color: rgba(233, 236, 239, 0.75);
}

.sidebar-item.active .sidebar-link:hover,
.sidebar-item.active > .sidebar-link {
  background: linear-gradient(
    90deg,
    rgba(59, 125, 221, 0.1),
    rgba(59, 125, 221, 0.0875) 50%,
    transparent
  );
  border-left-color: #3b7ddd;
  color: #e9ecef;
}

.sidebar-item.active .sidebar-link:hover i,
.sidebar-item.active .sidebar-link:hover svg,
.sidebar-item.active > .sidebar-link i,
.sidebar-item.active > .sidebar-link svg {
  color: #e9ecef;
}

.sidebar-brand {
  color: #f8f9fa;
  display: block;
  font-size: 1.15rem;
  font-weight: 600;
  padding: 1.55rem 3rem;
}

.sidebar-brand:hover {
  color: #f8f9fa;
  text-decoration: none;
}

.sidebar-brand:focus {
  outline: 0;
}

.sidebar-toggle {
  cursor: pointer;
  display: flex;
  height: 26px;
  width: 26px;
}

.sidebar.collapsed {
  margin-left: -260px;
}

@media (min-width: 1px) and (max-width: 991.98px) {
  .sidebar {
    margin-left: -260px;
  }

  .sidebar.collapsed {
    margin-left: 0;
  }
}

.sidebar-toggle {
  margin-right: 1rem;
}

.sidebar-header {
  background: transparent;
  color: #ced4da;
  font-size: 0.75rem;
  padding: 1.5rem 1.5rem 0.375rem;
}

.sidebar-badge {
  position: absolute;
  right: 15px;
  top: 14px;
  z-index: 1;
}

.sidebar-cta-content {
  background: #2b3947;
  border-radius: 0.3rem;
  color: #e9ecef;
  margin: 1.75rem;
  padding: 1.5rem;
}
</style>
