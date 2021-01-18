<template>
  <v-row
      class="full-height-container gp-background"
  >
    <v-col class="content-container white">
      <v-col class="teal darken-1 pa-0">
        <v-btn
            v-for="(item, i) in tabItems"
            :key="i"
            :to="{ name:item.to }"
            tile
            height="48px"
            color="teal darken-1 white--text"
            elevation="0"
            active-class="teal darken-4"
        >
          <v-icon class="mr-1" v-text="item.icon"></v-icon>
          {{item.text}}
        </v-btn>
      </v-col>
      <div class="mx-8 my-8">
        <contracts-table></contracts-table>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import ContractsTable from "./ContractsTable";

export default {
  name: 'Dashboard',

  components: {
    ContractsTable
  },

  data() {
    return {
      tabItems: [
        {text: 'Договоры', icon: 'mdi-file-document', to: 'Dashboard'},
        {text: 'Задачи', icon: 'mdi-format-list-checks', to: 'Customers'},
        {text: 'Статистика', icon: 'mdi-finance', to: 'Customers'},
        {text: 'Платежные операции', icon: 'mdi-credit-card-outline', to: 'Customers'},
      ]
    }
  },
}
</script>
