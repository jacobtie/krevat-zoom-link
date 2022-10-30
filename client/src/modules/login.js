/* eslint-disable import/prefer-default-export */
export async function login(http, code) {
  try {
    const res = await http.post('/login', { code });
    this.$emit('login', res.data);
  } catch (err) {
    console.dir(err);
    this.error = 'Invalid passcode';
  }
}
