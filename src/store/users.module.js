import axios from 'axios'
import { userService } from '../services';
import { authHeader } from '../helpers';
import apiUrl from '../utils/api';

const httpGetUsers = async (params) => {
  const { data } = await userService.getUsers(params)
  return data
}

export const users = {
    namespaced: true,
    state: {
        settings: {},
        users: [],
        page: 1,
        pageCount: 0,
        filter: ''
    },
    getters:{
        settings: state => state.settings,
        users: state => state.users,
        page: state => state.page,
        pageCount: state => state.pageCount,
        filter: state => state.filter
    },
    actions: {
      async deleteUser({commit},id){
        return await userService.deleteUser(id)
      },
      async recoverUser({commit},id){
        return await userService.recoverUser(id)
      },
      async phone_unique({ rootState, commit },phone){
        return await userService.phoneUnique(phone)
      },
      async email_unique({ rootState, commit },email){
        return await userService.emailUnique(email)
      },
      async getSettings ({ rootState, commit }) {
        const endpoint = apiUrl + '/users/settings'
        const headers = { headers: authHeader() }
        const { data } = await axios.get(endpoint, { headers })
        commit('updateSettings', data)
      },
    
      async saveSettings ({ rootState }, settings) {
        const endpoint = apiUrl + '/users/settings'
        const headers = { headers: authHeader() }
        return await axios.put(endpoint, settings, { headers })
      },

      async addOrUpdate({commit},user){
        return await userService.addOrUpdate(user)
      },
    
      async getUsers ({ state, commit }) {
        const data = await httpGetUsers({
          page: state.page,
          text: state.filter
        })
        commit('setUsers', {items:data.data.data,pages:data.data.total/data.data.per_page})
      },

      async xemBaoCaoTong({ state, commit },params){
        return await userService.xemBaoCaoTong(params)
      },
    
      async changePage ({ state, commit }, page) {
        const data = await httpGetUsers({
          page,
          text: state.filter
        })
        commit('setPage', page)
        commit('setUsers', {items:data.data.data,pages:data.data.total/data.data.per_page})
      },
    
      async applyFilter ({ state, commit }) {
        const data = await httpGetUsers({
          page: 1,
          text: state.filter
        })
        commit('setPage', 1)
        commit('setUsers', {items:data.data.data,pages:data.data.total/data.data.per_page})
      }
    },
    mutations: {
      updateSettings (state, settings) {
          state.settings = settings
      },
      setUsers (state, { items, pages }) {
          state.users = items
          state.pageCount = pages
      },
      setPage (state, page) {
          state.page = page
      },
      setFilter (state, filter) {
          state.filter = filter
      }
    }
}