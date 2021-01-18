<template>
  <v-data-table
      :headers="headers"
      :items="contracts"
      dense
  >
    <template v-slot:item.contract_date="{ item }">
      <cell-date v-bind:date="item.contract_date"></cell-date>
    </template>
    <template v-slot:item.end_date="{ item }">
      <cell-date v-bind:date="item.end_date"></cell-date>
    </template>
    <template v-slot:item.sum="{ item }">
      <cell-number v-bind:number="item.sum"></cell-number>
    </template>
    <template v-slot:item.budget="{ item }">
      <cell-number v-bind:number="item.budget"></cell-number>
    </template>
  </v-data-table>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import CellNumber from "@/components/table/CellNumber";
import CellDate from "@/components/table/CellDate";

export default {
  name: 'ContractsTable',

  components: {
    CellNumber,
    CellDate
  },

  computed: {
    ...mapState('contracts', ['contracts'])
  },

  data() {
    return {
      headers: [
        { text: 'Номер', value: 'number', sortable: true },
        { text: 'Дата договора', value: 'contract_date', sortable: true },
        { text: 'Дата завершения', value: 'end_date', sortable: true },
        { text: 'Заказчик', value: 'customer.short_name', sortable: true },
        { text: 'Объект', value: 'contract_object', sortable: true },
        { text: 'Сумма', value: 'sum', sortable: true },
        { text: 'Бюджет', value: 'budget', sortable: true },
        { text: 'От кого', value: 'recommend_by', sortable: true },
        { text: 'Статус', value: 'status', sortable: true },
      ],
    }
  },

  mounted() {
    this.getContracts();
  },

  methods: {
    ...mapActions('contracts', ['getContracts'])
  }
}
</script>