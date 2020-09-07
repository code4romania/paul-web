// import router from '@/router'
import Vue from 'vue'
import { DatabaseService, TableService, ImportService } from '@/services/data'
import { ToastService } from '@/services/buefy'

export default {
  namespaced: true,
  state: {
    database: null,
    table: {},
    tableEntries: {},
    entity: null,
    filters: null,
    import: null
  },
  mutations: {
    setDatabase(state, data) {
      state.database = data[0]
    },
    setTable(state, { idTable, data }) {
      Vue.set(state.table, idTable, data)
      // state.table = data
    },
    setTableEntries(state, { idTable, data }) {
      Vue.set(state.tableEntries, idTable, data)
      // state.tableEntries = data
    },
    setEntity(state, data) {
      state.entity = data
    },
    setFilters(state, data) {
      state.filters = data
    },
    setImport(state, data) {
      state.import = data
    }
  },
  actions: {
    getDatabase({ commit }) {
      return DatabaseService.getDatabase().then(response => {
        commit('setDatabase', response)
      })
    },

    getTable({ commit }, idTable) {
      return TableService.getTable(idTable).then(response => {
        commit('setTable', { idTable, data: response })
      })
    },

    getTableEntries({ commit }, { idTable, query }) {
      return TableService.getEntries(idTable, query).then(response => {
        commit('setTableEntries', { idTable, data: response })
      })
    },

    getEntity({ commit }, { idTable, idEntity }) {
      return TableService.getEntity(idTable, idEntity).then(response => {
        commit('setEntity', response)
      })
    },

    deleteTable({ dispatch }, idTable) {
      return TableService.deleteTable(idTable).then(() => {
        dispatch('getDatabase').then(
          ToastService.open('The table has been deleted')
        )
      })
    },

    deleteEntity({ dispatch }, { idTable, idEntity }) {
      return TableService.deleteEntity(idTable, idEntity).then(() => {
        dispatch('getTableEntries', { idTable }).then(() => {
          ToastService.open('The entity has been deleted')
        })
      })
    },

    prepareImport({ commit }, { idTable, data }) {
      return ImportService.prepare(idTable, data).then(response => {
        commit('setImport', response)
      })
    }
  }
}
