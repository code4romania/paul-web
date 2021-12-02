<template>
  <b-menu class="is-size-6" id="base-menu">
    <router-link :to="{ name: 'dashboard' }" class="menu-logo-container">
      <Logo
        :class="menuActive ? 'menu-logo' : 'menu-logo menu-logo-small'"
        :src="menuActive ? 'logo-default' : 'logo-small'"
      />
    </router-link>
    <b-menu-list>
      <b-menu-item
        :icon="menuActive ? 'menu-open' : 'menu-icon'"
        label="MENU"
        class="menu-header"
        @click="toggleMenu"
      />

      <b-menu-item
        tag="router-link"
        icon="monitor-screenshot"
        label="Dashboard"
        :to="{ name: 'dashboard' }"
      />

      <b-menu-item
        tag="router-link"
        icon="dns-outline"
        label="Manage database"
        :to="{ name: 'database-view' }"
      />

      <b-menu-item
        tag="router-link"
        icon="tune"
        label="Filtered views"
        :to="{ name: 'filter-view' }"
      />

      <b-menu-item
        icon="chart-box-outline"
        :active="isActive.charts"
        @click="!menuActive && toggleMenu()"
      >
        <template #label="props">
          <span>Data visualization</span>
          <b-icon
            class="menu-tick"
            :icon="props.expanded ? 'menu-up' : 'menu-down'"
          ></b-icon>
        </template>
        <b-menu-item
          tag="router-link"
          label="Charts"
          :to="{ name: 'charts-view' }"
        />
        <b-menu-item
          tag="router-link"
          label="Cards"
          :to="{ name: 'cards-view' }"
        />
      </b-menu-item>

      <b-menu-item
        tag="router-link"
        icon="account-details-outline"
        label="User management"
        v-if="isAdmin"
        :to="{ name: 'users-view' }"
      />

      <b-menu-item
        tag="router-link"
        icon="application-import"
        label="Import data"
        :to="{ name: 'table-import', query: { manual: true } }"
      />
    </b-menu-list>
  </b-menu>
</template>

<script>
import Logo from '@/components/Logo.vue'

export default {
  name: 'BaseMenu',
  components: {
    Logo
  },
  props: {
    isAdmin: Boolean,
    menuActive: Boolean
  },
  data() {
    return {
      isActive: {
        plugins: false,
        import: false
      }
    }
  },
  methods: {
    toggleMenu() {
      this.$emit('toggleMenu')
    }
  }
}
</script>
