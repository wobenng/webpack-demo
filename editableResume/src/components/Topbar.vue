<template>
  <div id="topbar">
    <div class="wrapper">
      <span class="logo">Resumer</span>
      <div class="actions">
        <div v-if="logined" class="userActions">
          <span>你好，{{user.username}}</span>
          <button class="button" href="#" @click.prevent="signOut">登出</button>
        </div>
        <div v-else class="userActions">
          <a class="button primary" href="#" @click.prevent="signUpDialogVisible = true">注册</a>
          <a class="button" href="#" @click.prevent="signInDialogVisible = true">登录</a>
        </div>
        <button class="button primary">保存</button>
        <button class="button">预览</button>
      </div>
        <MyDialog title="注册" :visible="signUpDialogVisible" @close="signUpDialogVisible = false">
          <signUpForm @success="signIn($event)"/>
        </MyDialog>
        <MyDialog title="登录" :visible="signInDialogVisible" @close="signInDialogVisible = false">
          <signInForm @success="signIn($event)"/>
        </MyDialog>
    </div>
  </div>
</template>

<script>
import MyDialog from './Dialog'
import signUpForm from './signUpForm'
import AV from '../lib/leancloud'
import signInForm from './SignInForm'

export default {
  name: 'Topbar',
  data(){
    return {
      signUpDialogVisible: false,
      signInDialogVisible: false
    }
  },
  components: {
    MyDialog,signUpForm,signInForm 
  },
  computed: {
    user(){
      return this.$store.state.user
    },
    logined(){
      return this.user.id
    }
  },
  methods: {
    signIn(user){
      this.signUpDialogVisible = false
      this.signInDialogVisible = false
      this.$store.commit('setUser', user)
    },
    signOut(){
      AV.User.logOut()
      this.$store.commit('removeUser')
      console.log(1)
    },

  }
}
</script>

<style scoped lang="scss">
  #topbar{
    background:#ffffff;
    box-shadow:0 1px 3px 0 rgba(0,0,0,0.25);
    >.wrapper{
      min-width: 1024px;
      max-width: 1440px;
      height: 64px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding: 0 16px;
      margin: 0 auto;
    }
    .logo{
      font-size: 24px;
    }
    .actions{
    display: flex;
    .userActions{
      margin-right: 3em;
    }
      .button{ // 由于加了 scoped， 所以这个 button 选择器只在本组件内有效，不会影响其他组件
      width:72px;
      height:32px;
      border: none;
      cursor: pointer;
      font-size: 18px; // 设计稿上是 20px，看起来太大，就改成 18px 了
      background:#ddd;
      color: #222;
      text-decoration: none;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      vertical-align: middle;
      &:hover{
        box-shadow: 1px 1px 1px hsla(0, 0, 0, 0.50);
      }
      &.primary{
          background:#02af5f;
          color: white;
          margin: 0px 16px;
      }
    }
  }
}
</style>
