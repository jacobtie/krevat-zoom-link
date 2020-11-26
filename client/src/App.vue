<template>
  <div class="app">
    <div class="main-view">
      <Header />
      <Login v-if="!isLoggedIn" @login="handleLogin" />
      <MeetingLink v-else :token="token" :isAdmin="isAdmin" />
    </div>
  </div>
</template>

<script>
import Header from './components/Header.vue';
import Login from './views/Login.vue';
import MeetingLink from './views/MeetingLink.vue';

export default {
  name: 'App',
  components: {
    Header,
    Login,
    MeetingLink,
  },
  data() {
    return {
      isLoggedIn: false,
      token: '',
      isAdmin: false,
    };
  },
  methods: {
    handleLogin({ token, isAdmin }) {
      this.isLoggedIn = true;
      this.token = token;
      this.isAdmin = isAdmin;
    },
  },
};
</script>

<style lang="scss">
@import './assets/scss/_variables.scss';

html,
body {
  height: 100%;
  overflow-y: hidden !important;
}

.app {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: $primary;
}

.main-view {
  display: grid;
  align-items: center;
  grid-template-rows: auto 1fr;
  padding: 25px;
  height: 50%;
  width: 50%;
  background-color: white;
  border-radius: 5px;
}

@media (max-width: 780px) {
  .main-view {
    height: 100%;
    width: 100%;
  }
}
</style>
