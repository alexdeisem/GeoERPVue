<template>
  <div>
    <v-row 
      no-gutters
    >
       <v-col cols="2" class="pr-8">
        <v-select
          :value="activeWorkTypes"
          :items="workTypesItems"
          :menu-props="{ maxHeight: '350' }"
          :label="`Тип работ${activeWorkTypes.length ? '' : ': все'}`"
          multiple
          dense
          clearable
          height="29px"
          @change="handleWorkTypesChange"
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
          label="Дата договора от"
          mask="date"
          type="date"
          :value="contractDateStart"
          @change="handleContractDateStartChange"
          dense
        ></v-text-field>
      </v-col>

      <v-col cols="1" class="mr-8">
        <v-text-field
          label="до"
          mask="date"
          type="date"
          :value="contractDateEnd"
          @change="handleContractDateEndChange"
          dense
        ></v-text-field>
      </v-col>

      <v-col cols="2">
        <v-text-field
          :value="searchQuery"
          label="Поиск..."
          type="text"
          dense
          height="29px"
          clearable
          prepend-icon="mdi-magnify"
          @input="handleSearchQueryChange"
        ></v-text-field>
      </v-col>

      <v-col class="ml-8">
        <v-tooltip v-for="(item, i) in checkedStatuses" :key="i" bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              class="mx-1"
              :outlined="!item.checked"
              fab
              x-small
              :color="item.color"
              v-bind="attrs"
              v-on="on"
              @click="handleStatusSwitcherClick(i)"
            >
              <v-icon dark>
                {{ item.icon }}
              </v-icon>
            </v-btn>
          </template>
          <span>{{ item.status }}</span>
        </v-tooltip>
      </v-col>

      <v-spacer></v-spacer>

      <v-col cols="1">
          <v-btn
            small
            class="float-right"
            tile
            elevation="1"
            @click="dropFilters"
          >
            Сбросить фильтр
            <v-icon small class="ml-2 pt-1">mdi-backspace-outline</v-icon>
          </v-btn>
      </v-col>
    </v-row>



    <v-row no-gutters>
       <v-col cols="2">
        <p class="body-2">Всего записей: {{ totalContracts }}</p>
      </v-col>

      <v-spacer></v-spacer>

      <v-col cols="4" md="4" xl="3">
        <v-pagination
          v-if="pageCount > 1"
          :value="page"
          :length="pageCount"
          :total-visible="8"
          @input="handelPageChange"
          next-icon="mdi-menu-right"
          prev-icon="mdi-menu-left"
          color="blue"
        ></v-pagination>
      </v-col>

      <v-col xl="1" class="pt-2">
        <v-select
          :value="pageSize"
          :items="pageSizes"
          label="Показывать по"
          dense
          @change="handlePageSizeChange"
          class="float-right"
        ></v-select>
      </v-col>
    </v-row>



    <v-data-table
      :headers="headers"
      :items="Object.values(contracts)"
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
      <template v-slot:item.status="{ item }">
        <cell-select
          v-bind:status="item.status"
          v-on:status-change="handleThis(item)"
          v-model="item.status"
        ></cell-select>
      </template>
    </v-data-table>




    <v-row class="pt-8" no-gutters>
      <v-spacer></v-spacer>

      <v-col cols="6" md="6" xl="3" class="pt-2">
        <v-pagination
          v-if="pageCount > 1"
          :value="page"
          :length="pageCount"
          :total-visible="8"
          @input="handelPageChange"
          next-icon="mdi-menu-right"
          prev-icon="mdi-menu-left"
          color="blue"
        ></v-pagination>
      </v-col>
      <v-col cols="6" md="2" xl="1">
        <v-select
          :value="pageSize"
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
import CellSelect from "@/components/table/CellSelect";

export default {
  name: "ContractsTable",

  components: {
    CellNumber,
    CellDate,
    CellSelect,
  },

  computed: {
    ...mapState("contracts", ["contracts"]),
    ...mapState("workTypes", ["workTypes"]),
    ...mapState("contractsTable", ["activeWorkTypes"]),
    ...mapState("contractsTable", ["checkedStatuses"]),
    ...mapState("contractsTable", ["contractDateStart"]),
    ...mapState("contractsTable", ["contractDateEnd"]),
    ...mapState("contractsTable", ["pageSize"]),
    ...mapState("contractsTable", ["searchQuery"]),

    page: {
      get() {
        return this.$store.state.contractsTable.page;
      },

      set(page) {
        this.setPage(page);
      }
    },
    
    workTypesItems() {
      return this.workTypes.map((i) => {
        return { text: i.name, value: i.id };
      });
    },
  },

  data() {
    return {
      isLoading: true,

      pageCount: 1,
      pageSizes: [10, 20, 100, 200, 500],
      totalContracts: 0,
      options: {},

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
    this.updateTableData(false);
    this.getWorkTypes();
  },

  methods: {
    ...mapActions("contracts", ["getContracts"]),
    ...mapActions("workTypes", ["getWorkTypes"]),
    ...mapActions("contractsTable", [
        "setActiveWorkTypes",
        "setCheckedStatuses",
        "setContractDateStart",
        "setContractDateEnd",
        "setPage",
        "setPageSize",
        "setSearchQuery"
      ]),

    getQueryParams() {
      let statuses = this.checkedStatuses
        .filter((i) => i.checked)
        .map((i) => i.status);

      return {
        skip: this.pageSize * (this.page - 1),
        take: this.pageSize,
        work_types: this.activeWorkTypes.map(i => i.value).join(),
        date_start: this.contractDateStart,
        date_end: this.contractDateEnd,
        statuses: statuses.join(","),
        search: this.searchQuery,
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

    handleContractDateStartChange(newDate) {
      this.setContractDateStart(newDate);
      this.updateTableData(true);
    },

    handleContractDateEndChange(newDate) {
      this.setContractDateEnd(newDate);
      this.updateTableData(true);
    },

    handelPageChange(page) {
      this.setPage(page);
      this.updateTableData(false);
    },

    handlePageSizeChange(newSize) {
      this.setPageSize(newSize);
      if (Math.round(this.totalContracts / this.pageSize) < this.page) {
        this.page = Math.round(this.totalContracts / this.pageSize);
      }

      this.updateTableData();
    },

    handleWorkTypesChange(values) {
      let newActiveItems = [];

      for (let workType of this.workTypes) {

        for (let id of values) {
          if (id != workType.id) {
            continue;
          }

          newActiveItems.push({ text: workType.name, value: workType.id });
        }
      } 

      this.activeWorkTypes.splice(0, this.activeWorkTypes.length);
      this.activeWorkTypes.push(...newActiveItems);
      this.setActiveWorkTypes(this.activeWorkTypes);
      this.updateTableData(true);
    },

    formatWorkTypeText(text) {
      return text
        .replace("-", " ")
        .split(" ")
        .map((i) => i[0])
        .join("")
        .toUpperCase();
    },

    disableWorkType(item) {
      if (item === "Все типы") {
        this.activeWorkTypes = [];
        return;
      }

      for (let workType of this.activeWorkTypes) {
        if (workType.value != item.value) {
          continue;
        }

        this.activeWorkTypes.splice(this.activeWorkTypes.indexOf(item), 1);
        this.setActiveWorkTypes(this.activeWorkTypes);
      }

      this.updateTableData(true);
    },

    handleStatusSwitcherClick(i) {
      this.checkedStatuses[i].checked = !this.checkedStatuses[i].checked;
      this.setCheckedStatuses(this.checkedStatuses);
      this.updateTableData(true);
    },

    handleSearchQueryChange(query) {
      if (query === null) {
        this.setSearchQuery('');
        this.updateTableData(true);
        return;
      }

      this.setSearchQuery(query);
      this.updateTableData(true);
    },

    dropFilters() {
      this.setSearchQuery(process.env.VUE_APP_CTBL_SEARCH_QUERY);
      this.setContractDateStart(process.env.VUE_APP_CTBL_DATE_START);
      this.setContractDateEnd(new Date().toISOString().slice(0, 10));
      this.setActiveWorkTypes(JSON.parse(process.env.VUE_APP_CTBL_WORK_TYPES));
      this.setPage(+process.env.VUE_APP_CTBL_PAGE);
      this.setPageSize(+process.env.VUE_APP_CTBL_PAGE_SIZE);
      this.setCheckedStatuses(JSON.parse(process.env.VUE_APP_CTBL_STATUSES));

      this.updateTableData();
    },

    handleThis(item) {
      console.log(item);
    }
  },
};
</script>