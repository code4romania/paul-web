<template>
  <img :src="this.src" :width="this.width" />
</template>

<script>
export default {
  name: 'Logo',
  props: {
    isSmall: {
      type: Boolean
    }
  },
  computed: {
    width: function() {
      return this.isSmall ? '68' : '68'
    },
    src: function() {
      const file = this.isSmall ? 'logo-small' : 'logo-default';
      var images = require.context('../assets/img/', false, /\.svg$/)
      return images('./' + file + '.svg')
    }
  }
}
</script>
