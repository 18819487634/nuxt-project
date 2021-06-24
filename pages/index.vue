<template>
  <div class="container">
    <div>
      <Test />
      <button @click="goList">点击跳转</button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    handleMsg (msg) {
      console.log(msg)
    },
    goList () {
      this.$router.push('/list')
    }
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
}

</style>
