<template>
  <v-footer
      padless
  >
    <v-row id="Footer" class="text-center py-4" no-gutters>
      <v-col cols="12" class="text-left caption">
        <v-row>
          <v-col></v-col>
          <v-col cols="2">
            <p class="font-weight-bold mb-0">ООО "ГеоПланета"</p>
            <p>Пн-Пт: 9:00-18:00</p>
            <p class="font-weight-bold mb-0">Адрес:</p>
            <p> ул. Мележа, 5, корп. 1, оф. 217
              220113
              Республика Беларусь, г. Минск
              (вход со стороны Л. Беды, 40)</p>
          </v-col>
          <v-col cols="2">
            <p class="font-weight-bold mb-0">Email:</p>
            <p>info@geoplaneta.by</p>
            <p class="font-weight-bold mb-0">Телефон:</p>
            <div class="d-flex flex-column mb-4">
              <a href="tel:+375172723189">+375 (17) 272 31 89</a>
              <a href="tel:+375297674388">+375 (29) 767 43 88</a>
            </div>
          </v-col>
          <v-col cols="2">
            <p class="font-weight-bold mb-0">Социальные сети:</p>
            <div class="d-flex flex-column mb-4">
              <a href="https://www.linkedin.com/company/geoplaneta" class="text-decoration-none">
                <v-icon small>mdi-linkedin</v-icon>
                LinkedIn
              </a>
            </div>
          </v-col>
          <v-col></v-col>
        </v-row>
      </v-col>
      <v-col class="caption">
        <strong>&copy;GeoPlaneta</strong> - {{ new Date().getFullYear() }}
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
export default {
  name: 'Footer',
}
</script>

<style>
  #Footer {
    background: #E5E5E5;
  }

  #Footer * {
    color: #A0A0A0;
  }
</style>