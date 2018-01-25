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
          <div class="subitem" v-for="subitem in resume[item.field]">
            <div class="resumeField" v-for="(value,key) in subitem">
              <label> {{key}} </label>
              <input type="text" v-model="subitem[key]">
            </div>
          </div>
        </div>
        <div v-else class="resumeField" v-for="(value,key) in resume[item.field]">
          <label> {{key}} </label>
          <input type="text" v-model="resume[item.field][key]">
        </div>
      </li>
    </ol>
  </div>
</template>

<script>
export default {
    name: 'ResumeEditor',
    data() {
      return {
        selected: 'profile',
        resume: {
          config: [
            { field: 'profile', icon: 'id' },
            { field: 'work history', icon: 'work' },
            { field: 'education', icon: 'book' },
            { field: 'projects', icon: 'heart' },
            { field: 'awards', icon: 'cup' },
            { field: 'contacts', icon: 'phone' },
          ],
          profile: {
            '姓名': '',
            '城市': '',
            '应聘职位': ''
          },
          'work history': [
            { '公司': '最近一份工作单位', '职位': '' },
            { '公司': '最近一份工作单位', '职位': '' },
          ],
          education: [
             {'毕业学校': ''},
             {'参加活动一': '','参加活动二': '','参加活动三': ''}
          ],
          projects: [
            { '项目一名称': '', '项目一描述': '' },
            { '项目二名称': '', '项目二描述': '' },
            { '项目三名称': '', '项目三描述': '' },
          ],
          awards: [
            { '获得奖项': '', '时间': '2018-1-25' },
            { '获得奖项': '', '时间': '2018-1-25' },
            { '获得奖项': '', '时间': '2018-1-25' }
          ],
          contacts: { 
            '联系方式': '',
            '邮箱':'',
            'QQ':''
            },
        }
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