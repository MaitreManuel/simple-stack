import domready from 'domready';
import Vue from 'vue';

domready(() => {
  const SELECTOR = document.querySelector('#vue-root');

  if (SELECTOR) {
    const MAIN = () => import('./src/Main.vue');

    const APA_VUE = new Vue({
      render: h => h(MAIN)
    });

    APA_VUE.$mount(SELECTOR);
  }
});
