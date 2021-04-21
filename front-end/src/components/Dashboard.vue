<template>
<div class="admin">

  <div class="menu">
    <center>
      <h2>Logged in as {{user.firstName}} {{user.lastName}} 
        <button class="pure-button pure-button-primary" @click="logout"><i class="fas fa-sign-out-alt"></i></button>
      </h2>
    </center>
  </div>

    <h1>Library Control Form</h1>

    <div class="heading">
      <div class="circle">1</div>
    </div>

    <div class="new-book-form">
      <h2>Add a Genre</h2>
      <input v-model="genreName">
      <br>
      <button class="pure-button pure-button-primary" @click="createGenre">Add</button>

    </div>

    <div class="heading">
      <div class="circle">2</div>
    </div>

    <div class="new-book-form">
      <h2>Add a Book</h2>
      <div class="pure-form">
        <div class="form-input">
          <p>Title:</p>
          <input v-model="title">
        </div>
        <br>
        <div class="form-input">
          <p>Author: </p>
          <input v-model="author">
        </div>
        <br>
        <div class="form-input">
          <p for="genre">Genre: </p>
          <input v-model="genre">
          <div class="suggestions" v-if="genreSuggestions.length > 0">
          <div class="suggestion" v-for="s in genreSuggestions" :key="s.id" @click="selectGenre(s)">{{s.genreName}}</div>
      </div>
        </div>
      </div>
        <input type="file" name="photo" @change="fileChanged">
        <button class="pure-button pure-button-primary" @click="upload">Upload</button>

    </div>

      <div class="upload" v-if="addItem">
        <h2>{{addItem.title}}</h2>
        <p>{{addItem.author}}</p>
        <p>{{addItem.genre}}</p>
        <img :src="addItem.path" />
      </div>
        
    <div class="heading">
      <div class="circle">3</div>
      <h2>Edit/Delete an Item</h2>
    </div>
        
        
    <div class="edit">
      <div class="form">
        <input v-model="findTitle" placeholder="Search">
        <div class="suggestions" v-if="suggestions.length > 0">
          <div class="suggestion" v-for="s in suggestions" :key="s.id" @click="selectItem(s)">{{s.title}}
          </div>
        </div>
      </div>
      <div class="upload" v-if="findItem">
        <input v-model="findItem.title">
        <p></p>
        <input v-model="findItem.author">
        <p></p>
        <input v-model="findItem.genre">
        <div class="suggestions" v-if="genreSuggestions.length > 0">
        <div class="suggestion" v-for="s in genreSuggestions" :key="s.id" @click="selectGenreFind(s)">{{s.genreName}}</div>
        </div>

        <img :src="findItem.path" />
      </div>
      <div class="actions" v-if="findItem">
        <button class="pure-button pure-button-primary" @click="deleteItem(findItem)">Delete</button>
        <button class="pure-button pure-button-primary" @click="editItem(findItem)">Edit</button>
      </div>
    </div>
</div>
</template>

<style scoped>
  .image h2 {
    font-style: italic;
    font-size: 1em;
  }

  .heading {
    display: flex;
    margin-bottom: 20px;
    margin-top: 20px;
  }

  .heading h2 {
    margin-top: 8px;
    margin-left: 10px;
  }

  .add,
  .edit {
    display: flex;
  }

  .circle {
    border-radius: 50%;
    width: 18px;
    height: 18px;
    padding: 8px;
    background: #333;
    color: #fff;
    text-align: center
  }

/* Form */
  input,
  button,
  textarea,
  select,
  {
    font-family: 'Montserrat', sans-serif;
    font-size: 1em;
  }

  .form {
    margin-right: 50px;
    display: table;
    width: 100%;
  }

.new-book-form {
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 50%;
}

.new-book-form h2{
  text-align: center;
}

button {
  margin: 15px;
}

label {
  float: left;
}

.form-input {
  display: table-cell;
  padding-left: 10px;
  font-size: 20px;
  border: none !important;
  box-shadow: none !important;
  width: 100%;
  height: 40px;
}

.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Uploaded images */
  .upload h2 {
    margin: 0px;
  }

  .upload img {
    max-width: 300px;
  }

/* Suggestions */
.suggestions {
  width: 200px;
  border: 1px solid #ccc;
}

.suggestion {
  min-height: 20px;
}

.suggestion:hover {
  background-color: #5BDEFF;
  color: #fff;
}

.menu {
  display: flex;
  justify-content: space-between;
}
</style>

<script>
  import axios from 'axios';
  export default {
  name: 'Dashboard',
    data() {
    return {
      title: "",
      author: "",
      genre: "",
      genreName: "",
      findGenreName: "",
      findGenreItem: null,
      addGenre: null,
      file: null,
      addItem: null,
      books: [],
      genres: [],
      findTitle: "",
      findAuthor: "",
      findGenre: "",
      findItem: null,
    }
  },
  created() {
    this.getGenres();
    this.getBooks();
  },
  computed: {
    user() {
      return this.$root.$data.user;
    },
    suggestions() {
      let books = this.books.filter(book => book.title.toLowerCase().startsWith(this.findTitle.toLowerCase()));
      return books.sort((a, b) => a.title > b.title);
    },
    genreSuggestions() {
      let genres = this.genres.filter(genre => genre.genreName.toLowerCase().startsWith(this.genre.toLowerCase()));
      return genres.sort((a, b) => a.genreName > b.genreName);
    }
  },
  methods: {
    async logout() {
      try {
        await axios.delete("/api/users");
        this.$root.$data.user = null;
      } catch (error) {
        this.$root.$data.user = null;
      }
    },
    fileChanged(event) {
      this.file = event.target.files[0]
    },
    async createGenre() {
      try {
        let r1 = await axios.post('/api/genres', {
          genreName: this.genreName
        });
        this.addGenre = r1.data;
        this.genreName = "";
        this.getGenres();
      } catch(error) {
        console.log(error)
      }
    },
    async upload() {
      try {
        const formData = new FormData();
        formData.append('photo', this.file, this.file.name)
        formData.append('user', this.user)
        formData.append('title', this.title)
        formData.append('author', this.author)
        formData.append('genre', this.genre)
        let r1 = await axios.post("/api/books", formData);
        this.addItem = r1.data;
        this.title = "";
        this.genre = "";
        this.author = "";
        this.file = null;
        this.getBooks();
      } catch (error) {
          console.log(error)
      }
    },
    async getBooks() {
      try {
        let response = await axios.get("/api/books");
        this.books = response.data;
        return true;
      } catch (error) {
        console.log(error)
      }
    },
    async getGenres() {
      try {
        let response = await axios.get("/api/genres");
        this.genres = response.data;
        return true;
      } catch (error) {
        console.log(error)
      }
    },
    selectItem(book) {
      this.findTitle = "";
      this.findAuthor = "";
      this.findGenre = "";
      this.findItem = book;
    },
    selectGenre(genre) {
      this.genre = genre.genreName;
      this.findGenreName = "";
      this.findGenreItem = genre;
    },
    selectGenreFind(genre) {
      this.findItem.genre = genre.genreName;
      this.findGenreName = "";
      this.findGenreItem = genre;
    },
    async deleteItem(book) {
      try {
        await axios.delete("/api/books/" + book._id);
        this.findItem = null;
        this.getBooks();
        return true;
      } catch (error) {
          console.log(error)

      }
    },
    async editItem(book) {
      try {
        await axios.put("/api/books/" + book._id, {
          title: this.findItem.title,
          author: this.findItem.author,
          genre: this.findItem.genre,
        });
        this.findItem = null;
        this.getBooks();
        return true;
      } catch (error) {
          console.log(error)
      }
    },
  },

}
  
</script>