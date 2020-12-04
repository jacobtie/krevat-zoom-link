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
        :disabled="code.length === 0"
        @click="login"
      />
    </b-field>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      code: '',
      error: null,
    };
  },
  watch: {
    code() {
      if (this.error) this.error = null;
    },
  },
  methods: {
    async login() {
      try {
        const res = await this.$http.post('/login', { code: this.code });
        this.$emit('login', res.data);
      } catch (err) {
        console.dir(err);
        this.error = 'Invalid passcode';
      }
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
