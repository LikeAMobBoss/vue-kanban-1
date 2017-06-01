<template>
  <div id = "tasks"> 
      <p>{{comment.name}} - {{comment.description}}</p><button class = "btn btn-default" @click="removeComment()"><span class="glyphicon glyphicon-trash"></span></button>
      
  </div>
</template>

<script>
export default {
  name: 'comments',
  props: ['comment'],
  mounted(){
  },
  data(){
    return{

    }
  },
  methods:{
    createTask(){
      this.$root.$data.store.actions.createTask({
        name: this.name,
        description: this.description,
        boardId: this.task.boardId,
        listId: this.task.listId
      })
    },
    removeTask(){
      this.$root.$data.store.actions.removeTask(this.task._id, this.task.listId)
    }
  }
}
</script>

<style scoped>
#tasks{
  padding: 10px;
  margin: 3px;
  border-radius: 15px 15px;
  background: grey;
  color: white;
}
</style>