<template>
  <div>
    <v-navigation-drawer
        id="sideNav"
        permanent
        expand-on-hover
    >
      <v-list
          nav
          dense
      >
        <v-list-item-group
            v-model="selectedItem"
            color="primary"
        >
          <v-list-item
              v-for="(item, i) in items"
              :key="i"
              :to="{ name: item.to }"
          >
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item>

        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  name: 'AdminSideNav',

  data() {
    return {
      selectedItem: 0,
      items: [
        { text: 'Dashboard', icon: 'mdi-monitor-dashboard', to: 'Dashboard' },
        { text: 'Заказчики', icon: 'mdi-account-group', to: 'Customers' },
        { text: 'Сотрудники', icon: 'mdi-account-hard-hat',  to: 'Employees' },
        { text: 'Документы', icon: 'mdi-file-document-multiple',  to: 'Docs' },
        { text: 'Карта объектов', icon: 'mdi-map', to: 'Map' },
        { text: 'Настройки', icon: 'mdi-cog',  to: 'Settings' },
      ]
    }
  }
}
</script>

<style>
  #sideNav {
    height: calc(100% - 48px);
    padding-top: 16px;
  }
</style>