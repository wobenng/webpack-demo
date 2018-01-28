import Vuex from 'vuex'
 import Vue from 'vue' 

 Vue.use(Vuex) 
 
 export default new Vuex.Store({
  state: {
    selected: 'profile',
    resume: {
      config: [
        { field: 'profile', icon: 'id' },
        { field: 'workHistory', icon: 'work' },
        { field: 'education', icon: 'book' },
        { field: 'projects', icon: 'heart' },
        { field: 'awards', icon: 'cup' },
        { field: 'contacts', icon: 'phone' },
      ],
      profile: {
        '姓名': '董杭彬',
        '城市': '温州',
        '应聘职位': '前端',
        '出生日': '1993-5-4',
        '性别':'女'
      },
      'workHistory': [
        { '公司': '最近一份工作单位', '职位': 'xxx'},
        { '公司': '最近一份工作单位', '职位': 'yyy'},
      ],
      education: [
         {'毕业学校': '二十一','毕业时间': '2011'},
         {'毕业学校': '理工','毕业时间': '2016'}
      ],
      projects: [
        { '项目名称': '', '项目描述': '' },
        { '项目名称': '', '项目描述': '' },
        { '项目名称': '', '项目描述': '' },
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
},
mutations: {
  switchTab (state, payload){
    state.selected = payload 
  }
}
})