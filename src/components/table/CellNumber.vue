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

      return (+this.number).toLocaleString(
          'ru-RU', { style: 'currency', currency: 'RUB' }
          )
          .replace(',', '.')
          .slice(0, -2);
    }
  }
}
</script>