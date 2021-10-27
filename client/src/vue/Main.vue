<template>
  <main class="wrapper">
    <h1>Vue.js Web</h1>
  </main>
</template>

<script>
  import Socket from 'Class/Socket';

  export default {
    name: 'Main',
    data () {
      return {
        socket: new Socket().getSocket()
      };
    },

    created () {
      this.socket.emit('reload');

      this.socket.on('reloaded', () => {
        console.log('rechargé !')
      });
    }
  };
</script>
