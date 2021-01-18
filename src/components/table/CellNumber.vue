<template>
  <div class="float-right">
    <i>{{roundedNumber}}</i>
  </div>
</template>

<script>
export default {
  name: 'CellNumber',

  props: ['number'],

  computed: {
    roundedNumber() {
      if (this.number === null) {
        return '';
      }

      return parseFloat(this.number).toFixed(2);
    }
  }
}
</script>