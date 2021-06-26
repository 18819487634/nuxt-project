<template>
  <div>
    测试
  </div>
</template>

<script>
export default {
  props: {
    msg: {
      type: String,
      default: '弹窗'
    }
  },
  methods: {
    handleMsg () {
      this.$parent.handleMsg('子传父')
    }
  }
}
</script>

<style>

</style>
