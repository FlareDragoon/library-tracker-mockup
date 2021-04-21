<template>
<div class = "admin-console">
    <Dashboard v-if="user" />
    <Login v-else />
</div>
</template>

<script>
import axios from 'axios';
import Dashboard from '@/components/Dashboard.vue';
import Login from '@/components/Login.vue';

export default {
  name: 'Admin',
  components: {
    Dashboard,
    Login,
  },
  async created() {
    try {
      let response = await axios.get('/api/users');
      this.$root.$data.user = response.data.user;
    } catch (error) {
      this.$root.$data.user = null;
    }
  },
  computed: {
    user() {
      return this.$root.$data.user;
    }
  }
}
</script>

<style>
.admin-console {
  padding: 20px;
}
</style>