<template>
  <div>
    <v-row no-gutters>
      <v-col cols="2" class="pr-8">
        <v-select
          v-model="activeWorkTypes"
          :items="workTypesItems"
          :menu-props="{ maxHeight: '350' }"
          :label="`Тип работ${activeWorkTypes.length ? '' : ': все'}`"
          multiple
          dense
          clearable
          height="29px"
          @change="updateTableData(true)"
        >
          <template v-slot:selection="{ item, index }">
            <v-chip v-if="index === workTypesItems.length - 1" small>
              <span>Все типы</span>
            </v-chip>
            <v-chip
              v-if="activeWorkTypes.length !== workTypesItems.length"
              small
              close
              @click:close="disableWorkType(item, index)"
              class="pa-0 px-1"
            >
              <span>{{ formatWorkTypeText(item.text) }}</span>
            </v-chip>
          </template>
        </v-select>
      </v-col>

      <v-col cols="1" class="mr-4">
        <v-text-field
          v-model="contract_date_start"
          label="Дата договора от"
          mask="date"
          type="date"
          :value="contract_date_start"
          @change="updateTableData(true)"
          dense
        ></v-text-field>
      </v-col>

      <v-col cols="1" class="mr-8">
        <v-text-field
          v-model="contract_date_end"
          label="до"
          mask="date"
          type="date"
          :value="contract_date_end"
          @change="updateTableData(true)"
          dense
        ></v-text-field>
      </v-col>

      <v-col cols="2">
        <v-text-field
          label="Поиск..."
          type="text"
          dense
          height="29px"
          clearable
          prepend-icon="mdi-magnify"
        ></v-text-field>
      </v-col>

      <v-spacer></v-spacer>

      <v-col cols="4" md="4" xl="2">
        <v-pagination
          v-if="pageCount > 1"
          v-model="page"
          :length="pageCount"
          :total-visible="5"
          @input="updateTableData(false)"
          next-icon="mdi-menu-right"
          prev-icon="mdi-menu-left"
          color="blue"
        ></v-pagination>
      </v-col>

      <v-col>
         <v-select
          v-model="pageSize"
          :items="pageSizes"
          label="Показывать по"
          dense
          style="width: 100px"
          @change="handlePageSizeChange"
          class="float-right"
        ></v-select>
      </v-col>
    </v-row>

    <v-data-table
      :headers="headers"
      :items="contracts"
      :options.sync="options"
      :page.sync="page"
      :server-items-length="totalContracts"
      :loading="isLoading"
      loading-text="Получаем данные..."
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
        <i
          v-if="item.recommend_by"
          class="text--secondary caption float-right"
          >{{ item.recommend_by }}</i
        >
      </template>
      <template v-slot:item.customer.account.balance="{ item }">
        <cell-number
          v-bind:number="item.customer.account.balance"
        ></cell-number>
      </template>
      <template v-slot:item.sum="{ item }">
        <cell-number v-bind:number="item.sum"></cell-number>
      </template>
      <template v-slot:item.budget="{ item }">
        <cell-number v-bind:number="item.budget"></cell-number>
      </template>
    </v-data-table>

    <v-row class="pt-8" no-gutters>
      <v-spacer></v-spacer>
      <v-col cols="6" md="6" xl="3" class="pt-5">
        <v-pagination
          v-if="pageCount > 1"
          v-model="page"
          :length="pageCount"
          :total-visible="8"
          @input="updateTableData(false)"
          next-icon="mdi-menu-right"
          prev-icon="mdi-menu-left"
          color="blue"
        ></v-pagination>
      </v-col>
      <v-col cols="6" md="2" xl="1">
        <v-select
          v-model="pageSize"
          :items="pageSizes"
          label="Показывать по"
          @change="handlePageSizeChange"
        ></v-select>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import CellNumber from "@/components/table/CellNumber";
import CellDate from "@/components/table/CellDate";

export default {
  name: "ContractsTable",

  components: {
    CellNumber,
    CellDate,
  },

  computed: {
    ...mapState("contracts", ["contracts"]),
    ...mapState("workTypes", ["workTypes"]),

    workTypesItems() {
      return this.workTypes.map((i) => {
        return { text: i.name, value: i.id };
      });
    },
  },

  data() {
    return {
      isLoading: true,

      page: 1,
      pageCount: 1,
      pageSize: 10,
      pageSizes: [10, 20, 100, 200, 500],

      contract_date_start: "2007-01-01",
      contract_date_end: new Date().toISOString().slice(0, 10),

      totalContracts: 0,
      options: {},
      activeWorkTypes: [],

      headers: [
        { text: "Номер", value: "number", sortable: true, width: 90 },
        { text: "Дата", value: "contract_date", sortable: true, width: 90 },
        { text: "Д. зав.", value: "end_date", sortable: true, width: 90 },
        {
          text: "Заказчик",
          value: "customer.short_name",
          sortable: true,
          width: 230,
        },
        { text: "Объект", value: "contract_object", sortable: true },
        {
          text: "Баланс, BYN",
          value: "customer.account.balance",
          sortable: true,
          width: 120,
        },
        { text: "Сумма, BYN", value: "sum", sortable: true, width: 120 },
        { text: "Бюджет, BYN", value: "budget", sortable: true, width: 120 },
        { text: "Статус", value: "status", sortable: true, width: 115 },
      ],
    };
  },

  mounted() {
    this.getContracts().then((data) => {
      this.totalContracts = data.count;
      this.pageCount = Math.round(data.count / data.take);
      this.isLoading = false;
    });

    if (this.workTypes.length === 0) {
      this.getWorkTypes();
    }
  },

  methods: {
    ...mapActions("contracts", ["getContracts"]),
    ...mapActions("workTypes", ["getWorkTypes"]),

    getQueryParams() {
      return {
        skip: this.pageSize * (this.page - 1),
        take: this.pageSize,
        work_types: this.activeWorkTypes.join(),
        date_start: this.contract_date_start,
        date_end: this.contract_date_end,
      };
    },

    updateTableData(toFirstPage = false) {
      if (toFirstPage) {
        this.page = 1;
      }

      let params = this.getQueryParams();

      this.getContracts(params).then((data) => {
        this.totalContracts = data.count;
        this.pageCount = Math.round(data.count / data.take);
        this.isLoading = false;
      });
    },

    handlePageSizeChange() {
      if (Math.round(this.totalContracts / this.pageSize) < this.page) {
        this.page = Math.round(this.totalContracts / this.pageSize);
      }

      this.updateTableData();
    },

    formatWorkTypeText(text) {
      return text
        .replace("-", " ")
        .split(" ")
        .map((i) => i[0])
        .join("")
        .toUpperCase();
    },

    disableWorkType(item, index) {
      if (item === "Все типы") {
        this.activeWorkTypes = [];
        return;
      }

      this.activeWorkTypes.splice(index, 1);
      this.updateTableData(true);
    },
  },
};
</script>