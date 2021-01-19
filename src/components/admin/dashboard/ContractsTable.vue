<template>
  <v-data-table
      :headers="headers"
      :items="contracts"
      :loading="isLoading" loading-text="Получаем данные..."
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
      isLoading: true,

      headers: [
        { text: 'Номер', value: 'number', sortable: true, width: 90 },
        { text: 'Дата', value: 'contract_date', sortable: true, width: 90 },
        { text: 'Д. зав.', value: 'end_date', sortable: true, width: 90 },
        { text: 'Заказчик', value: 'customer.short_name', sortable: true, width: 230 },
        { text: 'Объект', value: 'contract_object', sortable: true },
        { text: 'Сумма', value: 'sum', sortable: true, width: 110 },
        { text: 'Бюджет', value: 'budget', sortable: true, width: 110 },
        { text: 'От кого', value: 'recommend_by', sortable: true, width: 150 },
        { text: 'Статус', value: 'status', sortable: true, width: 115 },
      ],
    }
  },

  mounted() {
    this.getContracts().then(() => {
      this.isLoading = false;
    });
  },

  methods: {
    ...mapActions('contracts', ['getContracts'])
  }
}
</script>