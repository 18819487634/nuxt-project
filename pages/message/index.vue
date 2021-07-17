<template>
  <div class="message">
    <div class="title">
      联系作者~
    </div>
    <div class="vwrap">
      <div class="vheader item3">
        <input
          ref="nickName"
          class="vinput"
          :class="emptyNick ? 'empty-input' : ''"
          type="text"
          name="nick"
          :placeholder="emptyNick ? '请输入昵称' : '昵称'"
        >
        <input ref="phoneNumber" class="vinput" :class="emptyPhone ? 'empty-input' : ''" type="text" :placeholder="emptyPhone ? '请输入联系方式' : '联系方式'">
      </div>
      <div class="vedit">
        <textarea
          id="veditor"
          ref="messageText"
          class="vinput"
          :class="emptyMsg ? 'empty-input' : ''"
          cols="30"
          rows="10"
          :placeholder="emptyMsg ? '说点什么呗~' : '把想说的话写下来吧~'"
        />
      </div>
      <el-button type="" class="send-btn" title="Enter" @click="sendMsg">
        发送
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      emptyNick: false,
      emptyPhone: false,
      emptyMsg: false
    }
  },
  methods: {
    // 发送消息
    sendMsg () {
      const nickName = this.$refs.nickName.value.trim()
      const phoneNumber = this.$refs.phoneNumber.value.trim()
      const mseeageText = this.$refs.messageText.value.trim()
      const isEmpty = this.msgIsEmpty(nickName, phoneNumber, mseeageText)
      if (isEmpty) {
        return
      }
      const data = {
        token: '1bb854a217804eebb4a3610df02abd5a',
        title: `名字：${nickName} + 联系方式：${phoneNumber}`,
        content: mseeageText
      }
      this.$request('sendMsgToAuthor', data).then((res) => {
        if (res.code === 200) {
          this.$refs.nickName.value = ''
          this.$refs.phoneNumber.value = ''
          this.$refs.messageText.value = ''
          this.$Message({
            iconClass: 'message',
            type: 'success',
            message: '发送成功，作者会尽快回复的~'
          })
        } else {
          this.$Message({
            iconClass: 'message',
            type: 'error',
            message: '服务好像出了点问题，请稍后再试'
          })
        }
      }).catch(() => {
        this.$Message({
          iconClass: 'message',
          type: 'error',
          message: '服务好像出了点问题，请稍后再试'
        })
      })
    },
    // 判断用户输入是否为空
    msgIsEmpty (nick, phone, msg) {
      let flag = false
      if (!msg) {
        flag = true
        this.emptyMsg = true
        this.$refs.messageText.focus()
      }
      if (!phone) {
        flag = true
        this.emptyPhone = true
        this.$refs.phoneNumber.focus()
      }
      if (!nick) {
        flag = true
        this.emptyNick = true
        this.$refs.nickName.focus()
      }
      return flag
    }
  }
}
</script>

<style lang="less">
.message {
  max-width: 900px;
  margin: 0 auto;
}
.title {
  font-size: 16px;
  padding: 20px 0;
}
.vwrap {
  border: 1px solid #f0f0f0;
  border-radius: 4px;
  margin-bottom: 10px;
  overflow: hidden;
  position: relative;
  padding: 10px;
}
.vheader {
  .vinput {
    width: 48%;
    border-bottom: 1px dashed #dedede;
  }
}
.vinput {
  border: none;
  resize: none;
  outline: none;
  padding: 10px 5px;
  max-width: 100%;
  font-size: 14px;
  letter-spacing: 1px;
  font-family: fangsong;
}
.empty-input::-webkit-input-placeholder {
  color: #FC3F4C;
}
#veditor {
  line-height: 1.5;
  font-size: 15px;
  width: 100%;
}
.vedit {
  position: relative;
  padding-top: 10px;
}
.send-btn {
  float: right;
  margin-top: 10px;
}
</style>
