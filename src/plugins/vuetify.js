import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

import ru from 'vuetify/lib/locale/ru';

export default new Vuetify({
    lang: {
        locales: { ru },
        current: 'ru'
    },

    theme: {
        themes: {
            light: {
                primary: '#264892'
            }
        }
    }
});
