<template>
    <div class='page'>
        <header>
          <Topbar/>
        </header>
        <main>
          <ResumeEditor/>
          <ResumePreview/>
        </main>
    </div>
</template>

<script>
import 'normalize.css'
import './assets/reset.css'

import Topbar from './components/Topbar'
import ResumeEditor from './components/ResumeEditor'
import ResumePreview from './components/ResumePreview'
import icons from './assets/icons'
import store from './store/index'

export default {
  name: 'app',
  store,
  components: {Topbar, ResumeEditor, ResumePreview},
  created(){
     document.body.insertAdjacentHTML('afterbegin', icons) 
  }
}
</script>

<style lang="scss">
.page{
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: #EAEBEC;
}
.page main{
  min-width: 1024px;
  max-width: 1440px;
  display: flex;
  margin-top: 16px;
  margin-bottom: 16px; 
  justify-content: space-between;
  width: 100%; 
  align-self: center;
  flex-grow: 1;
  padding: 0 16px;
}
#resumeEditor{
   min-width: 35%;
   background: #444;
   overflow: hidden;
}
#resumePreview{
  flex-grow: 1;
  margin-left: 16px;
  background: #777;
  
}
svg.icon{
  height: 1em;
  width: 1em;
  fill: white;
  vertical-align: -0.1em;
  font-size:16px;
}
</style>
