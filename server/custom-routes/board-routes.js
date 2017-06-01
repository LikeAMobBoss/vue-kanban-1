let Boards = require('../models/board');
let Comments = require('../models/comment');
let Lists = require('../models/list');
let Tasks = require('../models/task');


export default {
  entityByRelationship: {
    path: '/boards/:boardId/list/:listId?',
    reqType: 'get',
    method(req, res, next) {
      console.log(req.params)
      var listId = req.query.tasks
      let action = 'Find item by ID'
      // if (req.query.taskId) {
      //   debugger
      //   Tasks.findById(req.params.taskId).then(task => {
      //     Comments.find({ taskId: req.params.taskId })
      //       .then(comments => {
      //         task.comments = comments
      //         res.send(handleResponse(action, task))
      //       })

      //   })
      // }
      if (req.params.listId) {
        console.log('here2')
        Lists.findById(req.params.listId).then(list => {
          Tasks.find({ listId: req.params.listId })
            .then(tasks => {
              console.log('here3')
              list.tasks = tasks
              if(list.tasks.length > 0){
              list.tasks.forEach(task => {
                Comments.find({ taskId: task._id }).then(comments => {
                  task.comments = comments
                })
              })
              }
                  res.send(handleResponse(action, list))
            })

        })
      }
      else if (req.params.boardId) {
        Boards.findById(req.params.boardId).then(board => {
          Lists.find({ boardId: req.params.boardId })
            .then(lists => {
              var data = {
                board: board,
                lists: lists
              }
              Tasks.find({ boardId: req.params.boardId})
              .then(tasks=>{
                data.tasks = tasks
                Comments.find({ boardId: req.params.boardId})
                .then(comments=>{
                  data.comments = comments
                  res.send(handleResponse(action, data))
                })
              })
              // if (board.lists.length > 0) {
              //   board.lists.forEach(list => {
              //     Tasks.find({ listId: list._id }).then(tasks => {
              //       list.tasks = tasks
              //       if (list.tasks.length > 0) {
              //         list.tasks.forEach(task => {
              //           Comments.find({ taskId: task._id }).then(comments => {
              //             task.comments = comments
              //             res.send(handleResponse(action, board))
              //           })
              //         })
              //       } else {
              //         res.send(handleResponse(action, board))
              //       }
              //     })
              //   })
              // } else {
              //   res.send(handleResponse(action, board))
              // }
            })
            .catch(error => {
              return next(handleResponse(action, null, error))
            }
            )
        }
        )
      }
    }
  }
}
function handleResponse(action, data, error) {
  var response = {
    action: action,
    data: data
  }
  if (error) {
    response.error = error
  }
  return response
}