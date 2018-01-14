import bar from './bar';
import Vue from 'vue'

var app = new Vue({
  el: '#app',
  data: {
    newTodo: '',
    todoList: []
  },
  methods: {
    addTodo: function(){
      let date = new Date();
      this.todoList.push({
        title: this.newTodo,
        createdAt: date.getFullYear() + '/' + (date.getMonth()+1) + '/' + date.getDate(),
        done: false
      })
      this.newTodo = '';
    }
  }
}) 
