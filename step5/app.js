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
    this.currentUser = this.getCurrentUser();
    this.todoList = this.allList;
    this.fetchTodos();
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
        this.saveOrUpdateTodos();
      }
      this.newTodo = '';
    },
    removeTodo: function(item){
      this.removeInAllList(item);
      this.removeInActiveList(item);
      this.removeIncompletedList(item);
      this.saveOrUpdateTodos();
    },
    didYouFinishIt: function(item){
      if(item.done === false){
        this.removeInActiveList(item);
        this.completedList.push(item);
      }else{
        this.removeIncompletedList(item);
        this.activeList.push(item);
      }
      this.saveOrUpdateTodos();
    },
    updateTodos: function(){
      let dataString = JSON.stringify(this.allList) 
      let avTodos = AV.Object.createWithoutData('AllTodos', this.allList.id)
      avTodos.set('content', dataString)
      avTodos.save().then(()=>{
        console.log('更新成功')
      })
    },
    saveTodos: function(){
      let dataString = JSON.stringify(this.allList)
      var AVTodos = AV.Object.extend('AllTodos');
      var avTodos = new AVTodos();
      var acl = new AV.ACL();
      acl.setReadAccess(AV.User.current(),true);
      acl.setWriteAccess(AV.User.current(),true); 
      avTodos.set('content', dataString);
      avTodos.setACL(acl)
      avTodos.save().then((todo) =>{
        this.allList.id = todo.id
        console.log("保存成功");
      }, function (error) {
        console.log(error);
      });
    },
    saveOrUpdateTodos: function(){
      if(this.allList.id){
        this.updateTodos();
      }else{
        this.saveTodos();
      }
    },
    fetchTodos: function(){
      if(this.currentUser){
        var query = new AV.Query('AllTodos');
        query.find()
          .then((todos) => {
            let avAllTodos = todos[0];
            let id = avAllTodos.id;
            this.allList = JSON.parse(avAllTodos.attributes.content);
            this.allList.id = id;
            this.todoList = this.allList;
            this.activeList = this.allList.filter(function(elem){
                return (elem.done === false);
            });
            this.completedList = this.allList.filter(function(elem){
                return (elem.done === true);
            });
          }, function(error){
            console.error(error) 
          })
      }
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
        this.fetchTodos();
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
         return {id, createdAt, attributes: {username}};
       } else {
         return null;
       }
    }
  }
}) 
