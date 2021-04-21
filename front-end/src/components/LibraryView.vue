<template>
<div>
  <center><h1>My Library</h1>

  <div class="search">
    <h2>Search by Genre</h2>
      <form class="pure-form">
        <i class="fas fa-search"></i><input v-model="searchText" />
      </form>
  </div></center>

<div class="wrapper">
    
  <div class="books">
    <div class="book" v-for="book in bookList" :key="book.id">
      <div class="info">
        <h1>{{book.title}}</h1>
        <p>{{book.author}}</p>
      </div>
      <div class="image">
        <img :src="book.path" height="175" width="200">
      </div>
      <br>
      <div class="genre">
        <h2>{{book.genre}}</h2>
      </div>
    </div>
  </div>
</div>

</div>

</template>

<script>
import axios from 'axios';

export default {
  name: 'LibraryView',
  data() {
    return {
      books: [],
      searchText: '',
    }
  },
  created() {
    this.getBooks();
  },
  computed: {
    user() {
      return this.$root.$data.user;
    },
    bookList() {
      return this.books.filter(book => book.genre.toLowerCase().search(this.searchText.toLowerCase()) >= 0);    
    }
  },
  methods: {
    async getBooks() {
      try {
        let response = await axios.get("/api/books");
        this.books = response.data;
        return true;
      } catch (error) {
        console.log(error)
      }
    },
  }

}
</script>

<style scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

.search {
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 50%;
}

form {
  display: table;
  margin-bottom: 10px;
  width: 100%;
}

i {
  display: table-cell;
  padding-left: 10px;
  width: 1px;
}

input {
  display: table-cell;
  font-size: 20px;
  border: 1px solid;
  box-shadow: none !important;
  width: 100%;
  height: 40px;
}

label {
  float: left;
}

.books {
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.book {
  margin: 10px;
  margin-top: 50px;
  width: 200px;
  height: 350px;
  background: #babbc2;
}

.info {
  background: #5e75f2;
  color: #000;
  padding: 10px 30px;
  height: 80px;
}

.info h1 {
  font-size: 16px;
}

.info h2 {
  font-size: 14px;
}

.info p {
  margin: 0px;
  font-size: 10px;
}

.genre {
  display: flex;
}

.image {
  display: flex;
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