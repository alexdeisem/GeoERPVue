<template>
  <div>
    <v-menu
      rounded="0"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          :color="btnColor"
          v-bind="attrs"
          v-on="on"
          small
          width="100%"
          class="text-left"
          tile
          elevation="0"
        >
          <v-icon small class="pr-1">{{ btnIcon }}</v-icon>
          {{ status }}
        </v-btn>
      </template>

      <v-list dense class="pa-0">
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
          link
          :class="`pa-0 pl-2 ${item.title === status ? item.color : ''}`"
          @click="updateValue(item)"
        >
          <v-icon class="pr-1">{{ item.icon }}</v-icon>
          <v-list-item-title
            v-text="item.title"
            style="font-weight: 400"
          ></v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
export default {
  name: 'CellDate',

  props: ['status'],

  computed: {
    btnColor() {
      for (let item of this.items) {
        if (item.title === this.status) {
          return item.color;
        }
      }
      
      return this.items[0].color;
    },

    btnIcon() {
      for (let item of this.items) {
        if (item.title === this.status) {
          return item.icon;
        }
      }
      
      return this.items[0].icon;
    },
  },

  data() {
    return {
      items: [
        { title: 'новый', color: 'blue lighten-1', icon: 'mdi-calendar-plus' },
        { title: 'в работе', color: 'yellow darken-1', icon: 'mdi-pickaxe' },
        { title: 'выполнен', color: 'green accent-4', icon: 'mdi-check' },
        { title: 'отменен', color: 'red darkern-4', icon: 'mdi-close' },
      ]
    }
  },

  methods: {
    updateValue: function (value) {
      this.$emit('input', value.title);
      this.$emit('status-change', value.title);
    },
  }
}
</script>