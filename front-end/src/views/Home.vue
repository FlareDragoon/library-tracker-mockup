<template>
<div> 
  <LibraryView v-if="user" />
  <div v-else>
    <About />
    <center><h2>Log in to see your library.</h2></center>
    <Login />
  </div>
</div>
</template>

<script>
import About from '@/components/About.vue';
import LibraryView from '@/components/LibraryView.vue';
import Login from '@/components/Login.vue';
import axios from 'axios';

export default {
  name: 'Home',
  components: {
    Login,
    About,
    LibraryView,
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
p {
  padding: 10px;
  font-size: 18px;
}

/* Masonry on large screens */
@media only screen and (min-width: 1024px) {
  .image-gallery {
    column-count: 4;
  }
}

/* Masonry on medium-sized screens */
@media only screen and (max-width: 1023px) and (min-width: 768px) {
  .image-gallery {
    column-count: 3;
  }
}

/* Masonry on small screens */
@media only screen and (max-width: 767px) and (min-width: 540px) {
  .image-gallery {
    column-count: 2;
  }
}
</style>