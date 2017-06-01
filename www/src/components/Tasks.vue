<template>
  <div id = "tasks" class= "indTask"> 
      <p><router-link :to="'/boards/'+ this.$route.params.id + '/list/' + this.task.listId">{{task.name}} - {{task.description}}</router-link><br><button type="button" class="btn btn-primary" @click="removeTask()"><span class="glyphicon glyphicon-trash"></span></button></p>
      
  </div>
</template>

<script>
export default {
  name: 'tasks',
  mounted(){
  },
  data(){
    return{

    }
  },
  props: [
    'task'
  ],
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
.indTask{
  border: 1px dotted black;
  margin-top: 1px;
}
</style>
