<template>
  <div id="resumeEditor">
    <nav>
      <ol>
         <li v-for="(item,index) in resume.config"  v-bind:class="{active: item.field === selected}" @click="selected = item.field">
            <svg class="icon">
              <use :xlink:href="`#icon-${item.icon}`"></use>
            </svg>
         </li>
      </ol>
    </nav>
    <ol class="panels">
      <li v-for="item in resume.config" v-show="item.field === selected">
        <div v-if="resume[item.field] instanceof Array">
          <div class="subitem" v-for="(subitem,index) in resume[item.field]">
            <div class="resumeField" v-for="(value,key) in subitem">
              <label> {{key}} </label>
              <input type="text" :value="value" @input="changeResumeField(`${item.field}.${index}.${key}`, $event.target.value)">
            </div>
          </div>
        </div>
        <div v-else class="resumeField" v-for="(value,key) in resume[item.field]">
          <label> {{key}} </label>
          <input type="text" :value="value" @input="changeResumeField(`${item.field}.${key}`, $event.target.value)">
        </div>
      </li>
    </ol>
  </div>
</template>

<script>
export default {
    name: 'ResumeEditor',
    computed: {
      selected:{
        get(){
          return this.$store.state.selected
        },
        set(value){
          return this.$store.commit('switchTab', value)
        }
      },
      resume (){
        return this.$store.state.resume
      }
    },
     methods: {
      changeResumeField(path, value){
        this.$store.commit('updateResume',{
          path,
          value
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  #resumeEditor{
    background:#ffffff;
    box-shadow:0 1px 3px 0 rgba(0,0,0,0.25);
    display: flex;
    flex-direction: row;
    overflow: auto;
    nav{
      width: 80px;
      background-color: black;
      color: white;
      ol{
        list-style: none;
        li{
          height: 48px;
          margin: 16px 0px;
          display: flex;
          justify-content: center;
          align-items: center;
          &.active{
            background-color: white;
            svg.icon{
              fill: black;
            }
          }
          svg.icon{
            width: 24px;
            height: 24px;
          }
        }
      }
    }
    .panels{
      list-style: none;
      flex-grow: 1;
      padding:24px;
      .resumeField{
        label{
          display: block;
        }
        input[type=text]{
          margin: 16px 0px;
          border: 1px solid #ddd;
          box-shadow: inset 0 1px 3px 0 rgba(0,0,0,.25);
          width: 100%;
          height: 40px;
          padding: 0 8px;
        }
      }
    }
  }
</style>