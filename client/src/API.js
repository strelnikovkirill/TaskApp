import axios from 'axios';

class Api {
  constructor(url) {
    this.url = url;

    this.person = {
      create(params) {
        return axios.post(url + "/person/add", params).then(d => d.data);
      },

      read(login) {
        return axios.get(url + "/person/" + login).then(d => d.data);
      }
    }

    this.task = {
      create(params) {
        return axios.post(url + "/task/add", params).then(d => d.data);
      },

      delete(id) {
        return axios.get(url + "/task/delete/" + id).then(d => d.data);
      },

      update(id, params) {
        return axios.post(url + "/task/update/" + id, params).then(d => d.data);
      },

      read() {
        return axios.get(url + "/task").then(d => d.data);
      },

      readOne(id) {
        return axios.get(url + "/task/edit/" + id).then(d => d.data);
      }
    }

    this.auth = {
      authorize(params) {
        return axios.post(url + "/auth", params).then(d => d.data)
      }
    }
  }
}

function createApi() {
  return new Api("https://tensor-demo.buzanovn.ru/api");
}

export default createApi();