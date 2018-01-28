<template>
  <div id="resumePreview">
    <section data-name="profile" v-show="resume.profile">
      <h1>
        {{resume.profile.姓名}}
      </h1>
      <h3>{{resume.profile.出生日}}<span>&nbsp;&nbsp;&nbsp;{{resume.profile.性别}}</span></h3>
      <h3>应聘职位-{{resume.profile.应聘职位}}<span>&nbsp;&nbsp;&nbsp;当前城市-{{resume.profile.城市}}</span></h3>      
    </section>
    <section data-name="projects" v-show="resume.education">
      <h2>项目经历</h2>
      <ol>
        <li v-for="item in resume.projects"  v-show="item">
          <h3>{{item.项目名称}}</h3>
          <p> {{item.项目描述}}</p>
        </li>
      </ol>
    </section>
    <section data-name="workHistory" v-show="resume.workHistory">
      <h2>工作经历</h2>
      <ol>
        <li v-for="item in resume.workHistory" v-show="item">
          <h3>{{item.公司}}</h3>
          <p> {{item.职位}} </p>
        </li>
      </ol>
    </section>
    <section data-name="education" v-show="resume.education">
      <h2>毕业院校</h2>
      <ol>
        <li v-for="item in resume.education" v-show="item">
          <p>{{item.毕业学校}}
            <span> - {{item.毕业时间}} </span>
          </p>
        </li>
      </ol>
    </section>
    <section data-name="awards" v-show="resume.awards">
      <h2>获奖情况</h2>
      <ol>
        <li v-for="item in resume.awards" v-show="item">
          <h3>{{item.获得奖项}}<span>——{{item.时间}}</span></h3>
        </li>
      </ol>
    </section>
    <section data-name="contacts" v-show="resume.contacts">
      <h2>联系方式</h2>
      <table>
        <tr>
          <td v-show="resume.contacts.联系方式">手机:{{resume.contacts.联系方式}}</td>
        </tr>
        <tr>
          <td v-show="resume.contacts.邮箱"> 邮箱:{{resume.contacts.邮箱}} </td>
        </tr>
        <tr>
          <td v-show="resume.contacts.QQ"> QQ:{{resume.contacts.QQ}} </td>
        </tr>
      </table>
    </section>
  </div>
</template>

<script>
export default {
  name: 'ResumePreview',
  computed: {
    resume(){
      return this.$store.state.resume
    }
  },
  created() {
    console.log(this.resume)
  }
}
</script>

<style lang="scss">
  #resumePreview{
    background-color:white; 
    box-shadow:0 1px 3px 0 rgba(0,0,0,0.25);
    color: #333;
    padding-top: 52px;
    overflow: auto;
    * {box-sizing: border-box; font-variant: normal; font-weight: normal; margin: 0px; padding: 0px;}
    ol{ list-style: none; }
    section{
      margin: 0px 10% 20px 10%;
      h1{
        font-size: 48px;
        margin-bottom: 20px;
      }
      h3,li p{
        font-size: 20px;
        margin-bottom: 10px;
      }
      h2{
        margin-bottom: 10px;
        background-color: #eaeaea;
      }
      li p{
        white-space: pre-line;
      }
      table{
        tr td{
          font-size: 20px;
          padding-bottom: 10px;
        }
      }
    }
  }
</style>