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
      console.log('子组件调用成功')
      this.$parent.handleMsg('子传父')
    }
  }
}
</script>

<style>

</style>
