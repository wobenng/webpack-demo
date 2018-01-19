import bar from './bar';
import Vue from 'vue'
import AV from 'leancloud-storage'

var APP_ID = '12IpTMhBQMl3IyeSTpSyxQWK-gzGzoHsz';
var APP_KEY = '9vMnpmAe7XxMkuwE7teEs9Cz';

AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});


var app = new Vue({
  el: '#app',
  data: {
    newTodo: '',
    todoList: [],
    allList: [],
    activeList: [],
    completedList: [],
    optionAll: true,
    optionActive: false,
    optionCompleted: false,
    actionType: 'signUp',
    formData: {
      username: '',
      password: ''
    },
    currentUser: null
  },
  created: function(){
    let oldData = JSON.parse(window.localStorage.getItem('hangbinTodos'));
    this.allList = oldData || [];
    window.onbeforeunload = ()=>{
      let dataString = JSON.stringify(this.allList) ;
      window.localStorage.setItem('hangbinTodos', dataString);
    }
    this.todoList = this.allList;
    this.activeList = this.allList.filter(function(elem){
      return (elem.done === false);
    });
    this.completedList = this.allList.filter(function(elem){
      return (elem.done === true);
    });

    this.currentUser = this.getCurrentUser();
    console.log(AV.User.current())
    
  },
  methods: {
    addTodo: function(){
      if(this.newTodo.split(" ").join("").length){
        let date = new Date();
        let index = date.getFullYear().toString() + (date.getMonth()+1).toString() + date.getDate().toString() + date.getHours().toString() + date.getMinutes().toString() + date.getSeconds().toString();
        this.allList.push({
          title: this.newTodo,
          createdAt: date.getFullYear() + '/' + (date.getMonth()+1) + '/' + date.getDate(),
          done: false,
          index: index
        })
        this.activeList.push({
          title: this.newTodo,
          createdAt: date.getFullYear() + '/' + (date.getMonth()+1) + '/' + date.getDate(),
          done: false,
          index: index
        })
      }
      this.newTodo = '';
    },
    removeTodo: function(item){
      this.removeInAllList(item);
      this.removeInActiveList(item);
      this.removeIncompletedList(item);
    },
    allListChecked: function(){
      this.todoList = this.allList;
      this.optionAll = true;
      this.optionActive = false;
      this.optionCompleted = false;
    },
    activeListChecked: function(){
      this.todoList = this.activeList;
      this.optionAll = false;
      this.optionActive = true;
      this.optionCompleted = false;
    },
    completedListChecked: function(){
      this.todoList = this.completedList;
      this.optionAll = false;
      this.optionActive = false;
      this.optionCompleted = true;
    },
    removeInAllList:function(item){
      for(let i = 0;i < this.allList.length; i++){
        if(item.index === this.allList[i].index){
          this.allList.splice(i,1)
        }
      }
    },
    removeInActiveList: function(item){
      for(let i = 0;i < this.activeList.length; i++){
        if(item.index === this.activeList[i].index){
          this.activeList.splice(i,1)
        }
      }
    },
    removeIncompletedList: function(item){
      for(let i = 0;i < this.completedList.length; i++){
        if(item.index === this.completedList[i].index){
          this.completedList.splice(i,1)
        }
      }
    },
    didYouFinishIt: function(item){
      if(item.done === false){
        this.removeInActiveList(item);
        this.completedList.push(item)
      }else{
        this.removeIncompletedList(item);
        this.activeList.push(item)
      }
    },
    signUp: function () {
        let user = new AV.User();
        user.setUsername(this.formData.username);
        user.setPassword(this.formData.password);
        user.signUp().then((loginedUser)=> {
        this.currentUser = this.getCurrentUser();
      }, (error)=> {
        alert('注册失败');
      });
      
    },
    login: function () {
      AV.User.logIn(this.formData.username, this.formData.password).then( (loginedUser)=> {
        this.currentUser = this.getCurrentUser();
      }, (error)=> {
        alert('登录失败');
      });
    },
    logout: function () {
      AV.User.logOut()
      this.currentUser = null
      window.location.reload()
    },
    getCurrentUser: function(){
      let current = AV.User.current();
       if (current) {
         let {id, createdAt, attributes: {username}} = current;
         console.log({id, createdAt, attributes: {username}})
         return {id, createdAt, attributes: {username}};
       } else {
         return null;
       }
    }
  }
}) 
