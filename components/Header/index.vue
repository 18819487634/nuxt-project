<template>
  <header class="navbar">
    <a href="/" aria-current="page" class="flex-left-center">
      <img class="my-avatar" src="~/assets/img/home/avatar.jpg" alt="">
      <span class="site-name">evan</span>
    </a>
    <div class="links">
      <nav v-if="navList.length" class="nav-links">
        <div v-for="(item, index) in navList" :key="index" class="nav-item">
          <div :id="index" class="dropdown-wrapper">
            <a :href="item.href" :disabled="activeIndex === index" :class="activeIndex === index ? 'active-a': ''">{{ item.name }}</a>
          </div>
        </div>
        <!-- <div class="nav-item">
          <div class="dropdown-wrapper" @mousedown="isShowQrcode = true" @mouseenter="isShowQrcode = true" @mouseleave="isShowQrcode = false">
            <button class="dropdown-title">
              <span class="title">author</span>
              <span class="arrow" />
            </button>
            <div v-if="isShowQrcode" class="nav-dropdown">
              <img class="wechat-qrcode" src="~/assets/img/common/wechat.png" alt="">
            </div>
          </div>
        </div> -->
        <div class="nav-item">
          <a href="https://github.com/18819487634" target="_blank">
            GitHub
            <svg
              xmlns="http://www.w3.org/2000/svg"
              aria-labelledby="outbound-link-title"
              role="img"
              focusable="false"
              x="0px"
              y="0px"
              viewBox="0 0 100 100"
              width="15"
              height="15"
              class="icon outbound"
            ><title id="outbound-link-title">(opens new window)</title> <path fill="currentColor" d="M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z" /> <polygon fill="currentColor" points="45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9" /></svg>
          </a>
        </div>
      </nav>
    </div>
  </header>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      isShowQrcode: false,
      navList: [
        { href: '/my_project', name: 'project' },
        { href: '/about', name: 'about' },
        { href: '/message', name: 'message' }
      ]
    }
  },
  computed: {
    ...mapState(['activeIndex'])
  },
  mounted () {
  }
}
</script>

<style lang="less">
.navbar {
  position: fixed;
  z-index: 20;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  line-height: 34px;
  background-color: #fff;
  box-sizing: border-box;
  border-bottom: 1px solid #eaecef;
  padding: 11px 24px;
}
a {
  font-weight: 600;
  text-decoration: none;
}
.active-a {
  padding-bottom: 4px;
  border-bottom: 2px solid #46bd87;
}
.my-avatar {
  width: 30px;
  height: 30px;
  border-radius: 4px;
}
.site-name {
  font-size: 1.3rem;
  font-weight: 500;
  color: #2c3e50;
  position: relative;
  margin-left: 8px;
}
.links {
  box-sizing: border-box;
  background-color: #fff;
  white-space: nowrap;
  font-size: 14px;
  position: absolute;
  right: 24px;
  top: .7rem;
  display: flex;
}
.nav-links {
  display: inline-block;
}
.nav-item {
  position: relative;
  display: inline-block;
  margin-left: 1.5rem;
  line-height: 2rem;
}
.dropdown-wrapper {
  cursor: pointer;
  a:hover {
    padding-bottom: 4px;
    border-bottom: 2px solid #46bd87;
  }
}
.dropdown-wrapper .dropdown-title {
  display: block;
  font-size: .9rem;
  font-family: inherit;
  cursor: inherit;
  padding: inherit;
  line-height: 1.4rem;
  background: transparent;
  border: none;
  font-weight: 500;
  color: #2c3e50;
}
.arrow {
  display: inline-block;
  width: 0;
  height: 0;
}
.dropdown-wrapper .dropdown-title .arrow {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 6px solid #ccc;
  border-bottom: 0;
  vertical-align: middle;
  margin-top: -1px;
  margin-left: .4rem;
}
.nav-dropdown {
  height: auto!important;
  box-sizing: border-box;
  max-height: calc(100vh - 2.7rem);
  overflow-y: auto;
  position: absolute;
  top: 100%;
  right: 0;
  background-color: #fff;
  padding: .6rem 0;
  border: 1px solid;
  border-color: #ddd #ddd #ccc;
  text-align: left;
  border-radius: .25rem;
  white-space: nowrap;
  margin: 0;
}
.wechat-qrcode {
  width: 180px;
}
.outbound {
  color: #aaa;
  display: inline-block;
  vertical-align: middle;
  position: relative;
  top: -2px;
}
</style>
