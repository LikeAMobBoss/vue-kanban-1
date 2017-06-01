import Vue from 'vue'
import Router from 'vue-router'
import Boards from 'components/Boards'
import Board from 'components/Board'
import Lists from 'components/Lists'
import List from 'components/List'
import Login from 'components/Login'
import Tasks from 'components/Tasks'
import Task from 'components/Task'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Boards',
      component: Boards
    },{
      path: '/boards/:id',
      name: 'Board',
      component: Board
    },{
      path: '/boards/:id/list/:listid',
      name: 'Task',
      component: Task
    }
    ,{
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
