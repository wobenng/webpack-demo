<template>
  <div id="topbar">
    <div class="wrapper">
      <span class="logo">Resumer</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Topbar'
}
</script>

<style>
  #topbar{
    background:#ffffff;
    box-shadow:0 1px 3px 0 rgba(0,0,0,0.25);
  }
  #topbar>.wrapper{
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
  #topbar>.wrapper .logo{
    font-size: 24px;
  }
</style>