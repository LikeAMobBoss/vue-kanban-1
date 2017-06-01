import axios from 'axios'
import router from '../router'
let api = axios.create({
  baseURL: 'http://localhost:3000/api/',
  timeout: 2000,
  withCredentials: true
})
let auth = axios.create({
  baseURL: 'http://localhost:3000/',
  timeout: 2000,
  withCredentials: true
})

// REGISTER ALL DATA HERE 
let state = {
  boards: [],
  activeBoard: {},
  activeLists: [],
  activeList: {},
  activeTasks: {},
  activeComments: [],
  error: {}
}

let handleError = (err) => {
  state.error = err
}

export default {
  // ALL DATA LIVES IN THE STATE
  state,
  // ACTIONS ARE RESPONSIBLE FOR MANAGING ALL ASYNC REQUESTS
  actions: {
    getBoards() {
      api('boards')
        .then(res => {
          state.boards = res.data.data
        })
        .catch(handleError)
    },
    getBoard(id) {
      api('boards/' + id + '/list')
        .then(res => {
          console.log(res.data.data)
          state.activeBoard = res.data.data.board
          state.activeLists = res.data.data.lists
          state.activeComments = res.data.data.comments
        })
        .catch(handleError)
    },
    createBoard(board) {
      api.post('boards/', board)
        .then(res => {
          console.log(res)
          this.getBoards()
        })
        .catch(handleError)
    },
    removeBoard(board) {
      api.delete('boards/' + board._id)
        .then(res => {
          this.getBoards()
        })
        .catch(handleError)
    },
    getList(boardId, listId) {
      api('boards/' + boardId + '/list/' + listId)
        .then(res => {
          state.activeList = res.data.data
        })
        .catch(handleError)
    },
    getLists(boardId, listId) {
      api('boards/' + boardId + '/list/' + listId)
        .then(res => {
          state.activeLists = res.data.data
        })
        .catch(handleError)
    },
    createList(list) {
      api.post('lists', list)
        .then(res => {
          this.getBoard(list.boardId)
        })
        .catch(handleError)
    },
    removeList(listId, boardId) {
      api.delete('lists/' + listId)
        .then(res => {
          this.getBoard(boardId)
        })
        .catch(handleError)
    },
    createUser(email, name, password) {
      var user = {
        email,
        name,
        password
      }

      auth.post('register/', user)
        .then(res => {
          console.log(res)
          router.push('/')
        })
        .catch(handleError)
    },
    loginUser(email, password) {
      var user = {
        email,
        password
      }

      auth.post('login/', user)
        .then(res => {
          console.log(res)
          router.push('/')
        })
        .catch(handleError)
    },
    getAuth() {
      auth.get('authenticate')
        .then(res => {
          state.user = res.data.data
          router.push('/boards')
        }).catch(err => {
          router.push('/login')
        })
    },
    getTask(boardId, listId, taskId) {
      debugger
      api('boards/' + boardId + '/list/' + listId)
        .then(res => {
          state.activeTasks = {}
          debugger
          state.activeTasks[listId] = res.data.data.tasks
        })
        .catch(handleError)
    },
    createTask(task) {
      debugger
      api.post('tasks', task)
        .then(res => {
          debugger
          this.getTask(task.boardId, task.listId)
        })
        .catch(handleError)
    },
    removeTask(taskId, listId) {
      api.delete('tasks/' + taskId)
        .then(res => {
          this.getList(listId)
        })
        .catch(handleError)
    }

  }
}

