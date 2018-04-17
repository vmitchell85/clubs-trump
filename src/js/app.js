window.Vue = require('vue');

Vue.component('clubs', require('./components/clubs'));
Vue.component('standings', require('./components/standings'));

let VueApp = new Vue({
    el: '#app'
});
