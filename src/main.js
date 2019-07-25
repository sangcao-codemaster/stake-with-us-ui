import Vue from 'vue';
import 'bootstrap'
import $ from 'jquery'
import { store } from './store';
import { router } from './helpers';
import App from './App';
import axios from './axios.js'
import VueAxios from 'vue-axios'
import Vuelidate from 'vuelidate';
Vue.use(Vuelidate);
import Toasted from 'vue-toasted';
Vue.use(Toasted)
import Notifications from 'vue-notification'
Vue.use(Notifications)
import pdfObject from 'pdfobject'
Vue.use(pdfObject);
import moment from 'moment-timezone'
import VueLodash from 'vue-lodash'
const options = { name: 'lodash' } // customize the way you want to call it
Vue.use(VueLodash, options) // options is optional
import VueToastr2 from 'vue-toastr-2'
Vue.use(VueAxios, axios)
window.toastr = require('toastr')
Vue.use(VueToastr2)
moment.tz.setDefault('Asia/Ho_Chi_Minh')
Vue.mixin({
    methods: {
        capitalizeFirstLetter: str => str.charAt(0).toUpperCase() + str.slice(1),
        formatPrice(value) {
            // let val = (value/1).toFixed(2).replace('.', ',')
            return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        },
        DateFormat: function(date) {
            return moment(date).format('YYYY-MM-DD');
        },
        VnDateFormat: function(date) {
            return moment(date).format('DD-MM-YYYY');
        },
        VnDateTimeFormat: function(date) {
            return moment(date).format('DD-MM-YYYY HH:mm:ss');
        }
    }
})

// Using font-awesome 5 icons
$.extend(true, $.fn.datetimepicker.defaults, {
    icons: {
      time: 'far fa-clock',
      date: 'far fa-calendar',
      up: 'fas fa-arrow-up',
      down: 'fas fa-arrow-down',
      previous: 'fas fa-chevron-left',
      next: 'fas fa-chevron-right',
      today: 'fas fa-calendar-check',
      clear: 'far fa-trash-alt',
      close: 'far fa-times-circle'
    }
  });

const main= new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});

export default main