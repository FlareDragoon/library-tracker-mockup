<template>
  <div id="app">
    <div class ="header">
      <br>
      <h1>Personal Library Manager</h1>
      <br>
    </div>
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/admin">Library Management</router-link>
    </div>
    <router-view/>

    <div class = "footer">
      <hr>
      <p>My Github for this assignment can be found <a href="https://github.com/FlareDragoon/260final">here</a></p>
      <p>I spent approximately five and a half hours working on this project.</p>
    </div>
    
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  text-align: center;
  padding: 30px;
}

.footer {
  text-align: center;
  background-color: #5e75f2;
  color: white;
}

.footer a{
  color: white;
}

.header {
  text-align: center;
  background-color: #5e75f2;
  color: white;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #0f1cab;
}
</style>
