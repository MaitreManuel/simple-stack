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
      this.socket.emit('wantToGetLogs');

      this.socket.on('reloaded', () => {
        console.log('rechargé !')
      });
    }
  };
</script>

<style lang="scss" scoped>
  h1 {
    color: blue;

    animation: gyro alternate .3s infinite;
  }

  @keyframes gyro {
    from {
      color: blue;
    }
    to {
      color: red;
    }
  }
</style>
