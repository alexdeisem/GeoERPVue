<template>
  <div>
    {{formatDate}}
  </div>
</template>

<script>
export default {
  name: 'CellDate',

  props: ['date'],

  computed: {
    formatDate() {
      if (this.date === null) {
        return '';
      }

      return new Date(this.date).toLocaleString().split(',')[0]
    }
  }
}
</script>