import ApiService from './api'
import { QueryString } from '@/utils/helpers'

const DatabaseService = {
  getDatabase() {
    return ApiService.get('databases/')
  }
}

//
//
const TableService = {
  getTables() {
    return ApiService.get('tables/')
  },

  getTable(idTable) {
    return ApiService.get(`tables/${idTable}/`)
  },

  postTable(data) {
    return ApiService.post(`tables/`, data)
  },

  putTable(idTable, data) {
    return ApiService.put(`tables/${idTable}/`, data)
  },

  patchTable(idTable, data) {
    return ApiService.patch(`tables/${idTable}/`, data)
  },

  deleteTable(idTable) {
    return ApiService.delete(`tables/${idTable}/`)
  },

  exportTable(idTable) {
    return ApiService.get(`tables/${idTable}/csv-export/`)
  },

  getEntries(id, query) {
    const queryString = query != null ? '?' + QueryString(query) : ''
    return ApiService.get(`tables/${id}/entries/${queryString}`)
  },

  getEntity(idTable, idEntity) {
    return ApiService.get(`tables/${idTable}/entries/${idEntity}/`)
  },

  postEntity(idTable, data) {
    // console.log(JSON.stringify(data))
    return ApiService.post(`tables/${idTable}/entries/`, data)
  },

  putEntity(idTable, idEntity, data) {
    return ApiService.put(`tables/${idTable}/entries/${idEntity}/`, data)
  },

  deleteEntity(idTable, idEntity) {
    return ApiService.delete(`tables/${idTable}/entries/${idEntity}/`)
  }
}

//
//
const ImportService = {
  getData(idImport) {
    return ApiService.get(`csv-imports/${idImport}/`)
  },

  prepare(data) {
    return ApiService.post(`csv-imports/`, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },

  manual(idTable, data) {
    return ApiService.post(`tables/${idTable}/csv-manual-import/`, data)
  },

  run(idTable, idImport) {
    return ApiService.post(`tables/${idTable}/csv-import/${idImport}/`, {
      id: idTable,
      csv_import_pk: idImport
    })
  }
}

//
//
const TableViewService = {
  getTableViews(getAll) {
    return ApiService.get('filters/' + (getAll ? 'all' : ''))
  },

  postTableView(data) {
    return ApiService.post('filters/', data)
  },

  getTableView(id) {
    return ApiService.get(`filters/${id}/`)
  },

  putTableView(id, data) {
    return ApiService.put(`filters/${id}/`, data)
  },

  patchTableView(id, data) {
    return ApiService.patch(`filters/${id}/`, data)
  },

  deleteTableView(id) {
    return ApiService.delete(`filters/${id}/`)
  },

  getEntries(id, query) {
    const queryString = query != null ? '?' + QueryString(query) : ''
    return ApiService.get(`filters/${id}/entries/${queryString}`)
  }
}

const ChartService = {
  getCharts() {
    return ApiService.get('charts/')
  },

  createChart(data) {
    return ApiService.post('charts/', data)
  },

  getChart(id) {
    return ApiService.get(`charts/${id}/`)
  },

  getChartData(id, query) {
    const queryString = query != null ? '?' + QueryString(query) : ''
    return ApiService.get(`charts/${id}/data/${queryString}`)
  },

  updateChart(id, data) {
    return ApiService.put(`charts/${id}/`, data)
  },

  patchChart(id, data) {
    return ApiService.patch(`charts/${id}/`, data)
  },

  deleteChart(id) {
    return ApiService.delete(`charts/${id}/`)
  }
}

export {
  ChartService,
  DatabaseService,
  ImportService,
  TableService,
  TableViewService
}
