<template>
  <div id="topbar">
    <div class="wrapper">
      <span class="logo">Resumer</span>
      <div class="actions">
        <button class="primary">保存</button><button>预览</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Topbar'
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
      button{
        width:72px;
        height:32px;
        border: none;
        cursor: pointer;
        font-size: 18px;
        background:#ddd;
        color: #222;
        &.primary{
          background:#02af5f;
          color: white;
          margin: 0px 16px;
        }
        &:hover{
          box-shadow: 1px 1px 1px hsla(0, 0, 0, 0.50);
        }
      }
    }
  }
</style>