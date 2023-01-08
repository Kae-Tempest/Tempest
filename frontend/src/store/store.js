import { defineStore } from 'pinia'

export const LoginStore = defineStore({  
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

})