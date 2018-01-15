import bar from './bar';
import Vue from 'vue'

var app = new Vue({
  el: '#app',
  data: {
    newTodo: '',
    todoList: [],
    allList: [],
    activeList: [],
    completedList: []
  },
  created: function(){
    let oldData = JSON.parse(window.localStorage.getItem('myTodos'));
    this.allList = oldData || [];
    window.onbeforeunload = ()=>{
      let dataString = JSON.stringify(this.allList) ;
      window.localStorage.setItem('myTodos', dataString);
    }
    this.todoList = this.allList;
    this.activeList = this.allList.map(function(elem){
      return (elem.done === false);
    })
    this.completedList = this.allList.map(function(elem){
      return (elem.done === true);
    })
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
      this.newTodo = '';
      }
    },
    removeTodo: function(item){
      this.allList.splice(this.allList.indexOf(item),1);
      if(this.activeList.indexOf(item)){
        this.activeList.splice(this.activeList.indexOf(item),1);
      }
      if(this.completedList.indexOf(item)){
        this.completedList.splice(this.completedList.indexOf(item),1);
      }
    },
    allListChecked: function(){
      this.todoList = this.allList;
    },
    activeListChecked: function(){
      this.todoList = this.activeList;
    },
    completedListChecked: function(){
      this.todoList = this.completedList;
    }
  }
}) 
