import { defineStore } from 'pinia'

export const LoginStore = defineStore('LoginStore',
{  
  id: 'login',
  state: () => ({
    connect: false
  }),
  getters: {
  },

  actions: {
    setConnect(value) {
      this.connect = value
    }
  },
persist: true
},)