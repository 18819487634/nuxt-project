<template>
  <div class="message">
    <button type="" @click="sendMsg">
      发送
    </button>
  </div>
</template>

<script>
export default {
  methods: {
    sendMsg () {
      const data = {
        token: '',
        title: '',
        content: ''
      }
      this.$request('sendMsgToAuthor', data).then((res) => {
      })
    }
  }
}
</script>

<style>
.message {
}
</style>
