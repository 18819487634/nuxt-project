<template>
  <div class="my-project-list">
    <div v-for="(item, index) in 4" :key="index" class="list-item">
      {{ item }}
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: 5
    }
  }
}
</script>

<style>
.my-project-list {
  display: flex;
  flex-wrap: wrap;
}
.list-item {
  flex: 1 1 33.33%;
  background: #ededed;
  border: 1px #cccccc solid;
  border-radius: 4px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
</style>
