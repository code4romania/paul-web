import { Parser } from '@/utils/helpers'

const FieldComponentMap = {
  enum: 'VSelect',
  bool: 'b-checkbox',
  date: 'VDate'
}

const FieldFilterComponentMap = {
  enum: 'FilterEnum',
  bool: 'b-checkbox',
  date: 'FilterDate',
  int: 'FilterNumeric',
  float: 'FilterNumeric'
}

const FieldTypes = {
  enum: 'Enum',
  date: 'Date',
  int: 'Integer',
  float: 'Float',
  bool: 'Boolean',
  text: 'Text'
}

const FilterOptions = {
  number: {
    gt: 'Greater than',
    gte: 'Greater than or equal',
    lt: 'Lower than',
    lte: 'Lower than or equal',
    exact: 'Equal to',
    interval: 'Interval'
  },
  date: {
    gt: 'After date',
    gte: 'After date, including',
    lt: 'Before date',
    lte: 'Before date, including',
    exact: 'Exact date',
    interval: 'Date interval'
  }
}

const FieldService = {
  getColumns() {},
  getParsedValue(value, type) {
    return Parser[type] ? Parser[type](value) : value
  },
  getFieldTypes() {
    return FieldTypes
  },
  getComponent(type) {
    return FieldComponentMap[type] ? FieldComponentMap[type] : 'b-input'
  },

  getFilterComponent(type) {
    return FieldFilterComponentMap[type]
      ? FieldFilterComponentMap[type]
      : 'b-input'
  }
}

export default FieldService

export { FilterOptions }