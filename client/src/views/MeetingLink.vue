<template>
  <div v-if="zoomLink" class="meeting-link">
    <b-button
      type="is-info"
      label="Join Meeting"
      size="is-large"
      class="meeting-btn"
      @click="joinMeeting"
    />
    <b-field v-if="isAdmin" style="width:100%;">
      <b-input v-model="editingZoomLink" placeholder="Enter Zoom Link" expanded />
      <b-button
        class="set-btn"
        type="is-info"
        label="Update"
        :disabled="!editingZoomLink || editingZoomLink === zoomLink"
        @click="setZoomLink"
      />
    </b-field>
  </div>
</template>

<script>
export default {
  name: 'MeetingLink',
  props: {
    token: {
      required: true,
      type: String,
    },
    isAdmin: {
      required: true,
      type: Boolean,
    },
  },
  data() {
    return {
      zoomLink: '',
      editingZoomLink: '',
    };
  },
  created() {
    this.getDependencies();
  },
  methods: {
    async getDependencies() {
      const res = await this.$http.get('/meeting', {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      });
      this.zoomLink = res.data.link;
      this.editingZoomLink = res.data.link;
    },
    async setZoomLink() {
      await this.$http.post('/meeting', { link: this.editingZoomLink }, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      });
      this.zoomLink = this.editingZoomLink;
    },
    joinMeeting() {
      window.location.assign(this.zoomLink);
    },
  },
};
</script>

<style lang="scss" scoped>
.meeting-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .meeting-btn {
    margin-bottom: 2rem;
  }

  .set-btn {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
}
</style>
