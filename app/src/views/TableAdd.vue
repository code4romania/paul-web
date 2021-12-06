<template>
  <div>
    <BaseTitle title="Add table" />

    <ValidationObserver v-slot="{ passes }" @submit.prevent slim>
      <BaseCard title="Create a new table">
        <div class="card-container">
          <div class="columns">
            <div class="column is-6">
              <VField label="Table name" rules="required">
                <b-input v-model="name" />
              </VField>
            </div>
            <div class="column is-6">
              <VField
                label="How would you like to create the new table?"
                name="Table creation type"
                rules="required"
                class="radio-list"
              >
                <b-radio v-model="type" native-value="table-import">
                  Import from file
                </b-radio>

                <b-radio v-model="type" native-value="table-edit">
                  Create in the platform
                </b-radio>
              </VField>
            </div>
          </div>
        </div>

        <template #footer>
          <b-button class="is-primary" @click="passes(submit)"
            >Continuă</b-button
          >
        </template>
      </BaseCard>
    </ValidationObserver>
  </div>
</template>

<script>
export default {
  name: 'TableAdd',
  data() {
    return {
      name: null,
      type: null
    }
  },
  methods: {
    submit() {
      this.$router.push({ name: this.type, query: { name: this.name } })
    }
  }
}
</script>
