import { validatorService } from '../services';

const httpGetValidators = async (params) => {
  const { data } = await validatorService.getAll(params)
  return data
}

export const validators = {
    namespaced: true,
    state: {
        validators: [],
        page: 1,
        pageCount: 0,
        filter: ''
    },
    getters:{
        validators: state => state.validators,
        page: state => state.page,
        pageCount: state => state.pageCount,
        filter: state => state.filter
    },
    actions: {
      async deleteValidator({commit},id){
        return await validatorService.deleteValidator(id)
      },
      async recoverValidator({commit},id){
        return await validatorService.recoverValidator(id)
      },

      async addOrUpdate({commit},validator){
        return await validatorService.addOrUpdate(validator)
      },
    
      async getValidators ({ state, commit }) {
        const res = await httpGetValidators({
          page: state.page,
          text: state.filter
        })
        commit('setValidators', {items:res.data,pages:res.data.length/res.data.length})
      },

      async xemBaoCaoTong({ state, commit },params){
        return await validatorService.viewReport(params)
      },
    
      async changePage ({ state, commit }, page) {
        const res = await httpGetValidators({
          page,
          text: state.filter
        })
        commit('setPage', page)
        commit('setValidators', {items:res.data.data,pages:res.data.total/res.data.per_page})
      },
    
      async applyFilter ({ state, commit }) {
        const res = await httpGetValidators({
          page: 1,
          text: state.filter
        })
        commit('setPage', 1)
        commit('setValidators', {items:res.data.data,pages:res.data.total/res.data.per_page})
      }
    },
    mutations: {
      setValidators (state, { items, pages }) {
          state.validators = items
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