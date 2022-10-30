<template>
  <div class="login">
    <b-field label="Passcode" type="is-primary">
      <b-input
        v-model="code"
        placeholder="Enter passcode"
        type="password"
        password-reveal
        icon-pack="fa"
        expanded
        @keypress.enter.native="login"
      />
      <b-button
        class="login-btn"
        type="is-primary"
        label="Login"
        :disabled="shouldDisableLogin"
        @click="login"
      />
    </b-field>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script>
import { login } from '../modules/login';

export default {
  name: 'Login',
  data() {
    return {
      code: '',
      error: null,
    };
  },
  computed: {
    shouldDisableLogin() {
      return this.code === '';
    },
  },
  watch: {
    code() {
      if (this.error) this.error = null;
    },
  },
  methods: {
    async login() {
      await login(this.$http, this.code);
    },
  },
};
</script>

<style lang="scss" scoped>
/deep/ i {
  color: $primary;
}

.login-btn {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
</style>
