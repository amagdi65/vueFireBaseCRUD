<template>
  <div id="app">
    <div class="container">
      <div class="row">
        <div class="col-lg-4">
          <form @submit.prevent="sendForm">
            <div class="row">
              <div class="col-lg-2"></div>
              <div class="col-lg-8">
                <div class="form-group">
                  <label for="name">name</label>
                  <input type="text" name="name" class="form-control" v-model="user.name" />
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-lg-2"></div>
              <div class="col-lg-8">
                <div class="form-group">
                  <label for="email">email</label>
                  <input type="email" class="form-control" v-model="user.email" />
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-lg-2"></div>
              <div class="col-lg-8">
                <div class="form-group">
                  <label for="age">age</label>
                  <input type="text" class="form-control" v-model="user.age" />
                </div>
              </div>
            </div>
            <input type="text" v-model="user.id" hidden />
            <button type="submit" class="btn btn-danger btn-lg">send</button>
          </form>
        </div>
        <div class="col-lg-8">
          <table class="table">
            <thead class="thead-dark">
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Age</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="data in dataa" :key="data.id">
                <th scope="row">{{data.user.name}}</th>
                <td>{{data.user.email}}</td>
                <td>{{data.user.age}}</td>
                <td>
                  <button class="btn btn-danger" @click.prevent="delUser()">DELETE</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import { uuid } from "vue-uuid";
export default {
  name: "App",
  data() {
    return {
      user: { id: uuid.v1() },
      dataa: {}
    };
  },
  methods: {
    async sendForm() {
      let config = {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
          "cors-origin": true
        }
      };

      let response = await axios.post(
        `https://assignment2-386c8.firebaseio.com/user.json`,
        { user: this.user },
        config
      );
      console.log(response.data);

      this.user = {};

      this.getData();
    },
    async getData() {
      let response = await axios.get(
        `https://assignment2-386c8.firebaseio.com/user.json`
      );

      this.dataa = response.data;
    },
    async delUser() {
      let response = await axios.delete(
        `https://assignment2-386c8.firebaseio.com/user.json`
      );
      console.log(response);
      this.getData();
    }
  },
  mounted() {
    this.getData();
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
