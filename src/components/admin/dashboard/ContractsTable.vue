<template>
  <div>
    <v-data-table
        :headers="headers"
        :items="contracts"
        :options.sync="options"
        :server-items-length="totalContracts"
        :loading="isLoading" loading-text="Получаем данные..."
        :hide-default-footer="true"
        dense
    >
      <template v-slot:item.contract_date="{ item }">
        <cell-date v-bind:date="item.contract_date"></cell-date>
      </template>
      <template v-slot:item.end_date="{ item }">
        <cell-date v-bind:date="item.end_date"></cell-date>
      </template>
      <template v-slot:item.contract_object="{ item }">
        <span v-text="item.contract_object"></span>
        <i v-if="item.recommend_by" class="text--secondary caption float-right">{{ item.recommend_by }}</i>
      </template>
      <template v-slot:item.sum="{ item }">
        <cell-number v-bind:number="item.sum"></cell-number>
      </template>
      <template v-slot:item.budget="{ item }">
        <cell-number v-bind:number="item.budget"></cell-number>
      </template>
    </v-data-table>

    <v-col cols="12" sm="9">
      <v-pagination
          v-model="page"
          :length="totalPages"
          :total-visible="5"
          next-icon="mdi-menu-right"
          prev-icon="mdi-menu-left"
      ></v-pagination>
    </v-col>
  </div>
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
      page: 1,
      totalPages: 1,
      totalContracts: 0,
      options: {},

      headers: [
        { text: 'Номер', value: 'number', sortable: true, width: 90 },
        { text: 'Дата', value: 'contract_date', sortable: true, width: 90 },
        { text: 'Д. зав.', value: 'end_date', sortable: true, width: 90 },
        { text: 'Заказчик', value: 'customer.short_name', sortable: true, width: 230 },
        { text: 'Объект', value: 'contract_object', sortable: true },
        { text: 'Сумма, BYN', value: 'sum', sortable: true, width: 120 },
        { text: 'Бюджет, BYN', value: 'budget', sortable: true, width: 120 },
        { text: 'Статус', value: 'status', sortable: true, width: 115 },
      ],
    }
  },

  mounted() {
    this.getContracts().then(data => {
      console.log(data);
      this.totalContracts = data.count;
      this.totalPages = Math.round(data.count / data.take);
      this.isLoading = false;
      console.log(this.totalPages)
    });
  },

  methods: {
    ...mapActions('contracts', ['getContracts'])
  }
}
</script>