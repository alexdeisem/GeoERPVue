<template>
  <v-row
      class="full-height-container gp-background"
  >
    <v-col class="content-container white">
      <v-tabs
          fixed-tabs
          background-color=""
          light
      >
        <v-tab>
          <v-icon>mdi-map</v-icon>
          Договоры
        </v-tab>
        <v-tab>
          Задачи
        </v-tab>
        <v-tab>
          Статистика
        </v-tab>
        <v-tab>
          Платежные операции
        </v-tab>
      </v-tabs>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'Dashboard',
}
</script>
