import domready from 'domready';
import Vue from 'vue';

// Sans Lazy-loading
// import MAIN from 'Vue/Main.vue';

domready(() => {
  const SELECTOR = document.querySelector('#vue-root');

  if (SELECTOR) {
    // Avec Lazy-loading
    const MAIN = () => import('Vue/Main.vue');

    const APA_VUE = new Vue({
      render: h => h(MAIN)
    });

    APA_VUE.$mount(SELECTOR);
  }
});
