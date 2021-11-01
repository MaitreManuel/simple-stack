<template>
  <main class="wrapper">
    <h1>Logs in Vue.js</h1>
    <button type="button" @click="getLogs">Get Logs</button>
    <br />
    <br />
    <div v-if="logs.length > 0">
      <p v-for="(log, i) in logs" :key="`log-${ i }`" class="logs">
        {{ i + 1 }}. "{{ log.type }}" at {{ log.date }}
      </p>
    </div>
    <p v-else>No logs loaded!</p>
  </main>
</template>

<script>
  import Socket from 'Class/Socket';

  export default {
    name: 'Main',
    data () {
      return {
        logs: [],
        socket: new Socket().getSocket()
      };
    },

    created () {
      this.socket.emit('reload');

      this.socket.on('reloaded', () => {
        console.log('rechargé !')
      });
    },

    methods: {
      getLogs () {
        this.axios({
          method: 'GET',
          url: 'http://0.0.0.0:4555/logs'
        })
          .then(results => results.data)
          .then(results => {
            this.logs = results;
          })
        ;
      }
    }
  };
</script>

<style lang="scss" scoped>
  h1 {
    color: blue;

    animation: gyro alternate .3s infinite;
  }

  .logs {
    margin-bottom: 0;
    margin-top: 0;
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
