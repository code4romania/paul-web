<template>
  <div v-if="database">
    <BaseTitle :title="title" />

    <ValidationObserver v-slot="{ passes }" @submit.prevent slim>
      <BaseCard title="Configure view and table link">
        <div class="card-container">
          <div class="columns">
            <div class="column is-6">
              <VField label="View name">
                <b-input v-model="name" />
              </VField>
            </div>
          </div>
        </div>
        <div
          class="card-container"
          v-for="(link, link_index) in links"
          :key="`link-${link_index}`"
        >
          <div class="columns is-multiline">
            <div class="column is-6">
              <VField
                label="Select a table"
                rules="required"
                :name="`Table #${link_index + 1} name`"
              >
                <b-select
                  v-model="link.table"
                  @input="getTableFields($event, link_index)"
                  expanded
                >
                  <option
                    v-for="table in database.active_tables"
                    :value="table.id"
                    :key="table.id"
                  >
                    Table – {{ table.data.name }}
                  </option>
                </b-select>
              </VField>
            </div>
            <div class="column is-4">
              <VField
                label="Link field"
                rules="required"
                :name="`Table #${link_index + 1} link `"
                labelInfo="Field types must match"
              >
                <b-select
                  v-model="link.join_field"
                  @input="resetLinkField(link_index)"
                  expanded
                >
                  <option
                    v-for="field in table[link.table]
                      ? table[link.table].fields
                      : []"
                    :value="field.id"
                    :key="link_index + '-' + field.id"
                    :disabled="checkLinkFieldtype(field.field_type, link_index)"
                  >
                    {{ field.display_name }}
                  </option>
                </b-select>
              </VField>
            </div>

            <div class="column is-12" v-if="table[link.table]">
              <VField
                :name="`Table #${link_index + 1} columns `"
                label="Select which columns you wish to keep"
                rules="required|over:2"
              >
                <div class="checkbox-list">
                  <b-checkbox
                    v-for="(field, index) in table[link.table].fields"
                    :key="'check' + index"
                    v-model="link.fields"
                    :native-value="field.id"
                  >
                    {{ field.display_name }}
                  </b-checkbox>
                </div>
              </VField>
            </div>
          </div>
        </div>

        <template #footer>
          <b-button class="is-primary" @click="passes(submit)"
            >Continue</b-button
          >
        </template>
      </BaseCard>
    </ValidationObserver>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { TableViewService } from '@/services/data'
import { ToastService } from '@/services/buefy'

export default {
  name: 'FilterEdit',
  data() {
    return {
      idTable: this.$route.params.idTable,
      name: null,
      links: [
        { table: null, join_field: null, fields: [] },
        { table: null, join_field: null, fields: [] }
      ],
      title: null
    }
  },
  computed: mapState('data', {
    database: state => state.database,
    table: state => state.table,
    tableView: state => state.tableView
  }),
  mounted() {
    this.title = this.idTable ? 'Edit filtered view' : 'Add filtered view'

    this.$store.dispatch('data/getDatabase')

    if (this.idTable)
      this.$store.dispatch('data/getTableView', this.idTable).then(() => {
        this.name = this.tableView.name

        this.$store
          .dispatch('data/getTable', this.tableView.config.primary_table.table)
          .then(() => {
            this.$store
              .dispatch(
                'data/getTable',
                this.tableView.config.join_tables[0].table
              )
              .then(() => {
                this.$set(this.links, 0, {
                  ...this.tableView.config.primary_table
                })
                this.$set(this.links, 1, {
                  ...this.tableView.config.join_tables[0]
                })
              })
          })
      })
  },
  methods: {
    getTableFields(value, index) {
      this.$store.dispatch('data/getTable', value).then(() => {
        Object.assign(this.links[index], { join_field: null, fields: [] })
      })
    },
    checkLinkFieldtype(type, index) {
      // console.log('checkLinkFieldtype', type, index)
      if (index == 0 || this.links[0].join_field == null) return false

      return (
        this.table[this.links[0].table].fields.find(
          e => e.id == this.links[0].join_field
        ).field_type != type
      )
    },
    resetLinkField(index) {
      if (index == 0) {
        this.links.forEach((e, i) => {
          i && (e.join_field = null)
        })
      }
    },
    submit() {
      // console.log('submit')
      const resource = {
        name: this.name,
        primary_table: this.links[0],
        join_tables: [this.links[1]]
      }

      if (!this.idTable) {
        TableViewService.postTableView(resource).then(response => {
          ToastService.open('The view has been created successfully')

          this.$router.push({
            name: 'filter-table-view',
            params: {
              idTable: response.id
            }
          })
        })
      } else {
        TableViewService.putTableView(this.idTable, resource).then(() => {
          ToastService.open('The view has been updated')

          this.$router.push({
            name: 'filter-table-view',
            params: {
              idTable: this.idTable
            }
          })
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.card-container {
  &:not(:last-child) {
    border-bottom: 1px solid $grey;
  }
}
</style>