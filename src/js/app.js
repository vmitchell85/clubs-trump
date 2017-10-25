window.Vue = require('vue');

Vue.component('root', require('./components/root'));

let VueApp = new Vue({
    el: '#app'
});
