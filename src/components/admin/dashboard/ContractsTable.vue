<template>
  <div>
    <v-row no-gutters>
      <v-col cols="2">
        <v-autocomplete
          v-model="model"
          :items="contracts"
          label=Поиск
          persistent-hint
          prepend-icon="mdi-magnify"
          class="pt-0"
        ></v-autocomplete>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-select
          v-model="e6"
          :items="workTypesItems"
          :menu-props="{ maxHeight: '400' }"
          label="Тип работ"
          multiple
          persistent-hint
        ></v-select>
      </v-col>
      <v-col cols="4" md="4" xl="4" class="pt-5">
        <v-pagination
            v-model="page"
            :length="pageCount"
            :total-visible="6"
            @input="handlePageChange"
            next-icon="mdi-menu-right"
            prev-icon="mdi-menu-left"
            color="blue"
        ></v-pagination>
      </v-col>
      <v-col cols="4" md="2" xl=1>
        <v-select
          v-model="pageSize"
          :items="pageSizes"
          label="Показывать по"
        ></v-select>
      </v-col>
    </v-row>
    
    <v-data-table
        :headers="headers"
        :items="contracts"
        :options.sync="options"
        :page.sync="page"
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
      <template v-slot:item.customer.account.balance="{ item }">
        <cell-number v-bind:number="item.customer.account.balance"></cell-number>
      </template>
      <template v-slot:item.sum="{ item }">
        <cell-number v-bind:number="item.sum"></cell-number>
      </template>
      <template v-slot:item.budget="{ item }">
        <cell-number v-bind:number="item.budget"></cell-number>
      </template>
    </v-data-table>

    <v-row class="pt-8">
      <v-spacer></v-spacer>
      <v-col cols="6" md="6" xl="4" class="pt-5">
        <v-pagination
            v-model="page"
            :length="pageCount"
            :total-visible="6"
            @input="handlePageChange"
            next-icon="mdi-menu-right"
            prev-icon="mdi-menu-left"
            color="blue"
        ></v-pagination>
      </v-col>
      <v-col cols="6" md="2" xl=1>
        <v-select
          v-model="pageSize"
          :items="pageSizes"
          label="Показывать по"
        ></v-select>
      </v-col>
    </v-row>
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
    ...mapState('contracts', ['contracts']),
    ...mapState('workTypes', ['workTypes'])
  },

  data() {
    return {
      isLoading: true,
      page: 1,
      pageCount: 1,
      contractsPerPage: 10,
      totalContracts: 0,
      options: {},
      pageSize: 100,
      pageSizes: [100, 200, 500],

      headers: [
        { text: 'Номер', value: 'number', sortable: true, width: 90 },
        { text: 'Дата', value: 'contract_date', sortable: true, width: 90 },
        { text: 'Д. зав.', value: 'end_date', sortable: true, width: 90 },
        { text: 'Заказчик', value: 'customer.short_name', sortable: true, width: 230 },
        { text: 'Объект', value: 'contract_object', sortable: true },
        { text: 'Баланс, BYN', value: 'customer.account.balance', sortable: true, width: 120 },
        { text: 'Сумма, BYN', value: 'sum', sortable: true, width: 120 },
        { text: 'Бюджет, BYN', value: 'budget', sortable: true, width: 120 },
        { text: 'Статус', value: 'status', sortable: true, width: 115 },
      ],
    }
  },

  mounted() {
    this.getContracts().then(data => {
      this.totalContracts = data.count;
      this.pageCount = Math.round(data.count / data.take);
      this.isLoading = false;
    });

    this.getWorkTypes().then(data => {
      this.workTypesItems = data.map(i => i.name);
    });
  },

  methods: {
    ...mapActions('contracts', ['getContracts']),
    ...mapActions('workTypes', ['getWorkTypes']),

    handlePageChange() {
      this.getContracts({
        skip: this.pageSize * (this.page - 1),
        take: this.pageSize
      }).then(data => {
        this.totalContracts = data.count;
        this.pageCount = Math.round(data.count / data.take);
        this.isLoading = false;
      });
    }
  }
}
</script>