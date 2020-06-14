<template>
  <div class="about">
    <h1>IPC Test</h1>
    <a-select style="width: 200px; margin-right: 15px;">
      <a-select-option v-for="item in options" :value="item.no" :key="item.no">
        {{ item.name }}
      </a-select-option>
    </a-select>
    <a-button @click="handleClick">Query</a-button>
  </div>
</template>

<script>
const { ipcRenderer } = window.require('electron')

export default {
  data () {
    return {
      options: []
    }
  },
  methods: {
    handleClick () {
      ipcRenderer.send('query_request', 'query')
      ipcRenderer.on('query_response', (event, message) => {
        console.log(event)
        console.log(message)
        this.options = message
      })
    }
  }
}
</script>
