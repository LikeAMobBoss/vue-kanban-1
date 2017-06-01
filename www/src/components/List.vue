<template>
  <div class = 'col-sm-4 indList'>
    Active List: {{list.name}} - {{list.description}}<br>
    <task v-for="task in tasks" :task='task'></task>
    <button type="button" class="btn btn-primary" @click="taskFormToggle" v-show="addTaskButton">Add a Task</button><br><br>
    <div class="taskForm" v-show="newTask">
      <form class="form-inline create-task-form" @submit.prevent="createTask">
        <div class="form-group">
          <input type="text" class="form-control" v-model="name" name="name" placeholder="Name" />
          <input type="text" class="form-control" v-model="description" name="description" placeholder="Task Description" /><br>
          <button type="submit" class="btn btn-primary" id="create-task-button" @click="taskFormToggleBack">Create New Task</button><button type="button" class="btn btn-primary" @click="taskFormToggleBack">Cancel</button>
        </div>
      </form>
    </div>
    <br><br>  <br><br>
  </div>
</template>

<script>
  import task from '../components/Task'
  export default {
    name: 'list',
    props: ['list'],
    data() {
      return {
        name: '',
        description: '',
        newTask: false,
        addTaskButton: true
      }
    },
    mounted() {
      this.$root.$data.store.actions.getList(this.$route.params.id, this.list._id)
      this.$root.$data.store.actions.getTask(this.$route.params.id, this.list._id)
    },
    methods: {
      createTask(task) {
        this.$root.$data.store.actions.createTask({
        name: this.name,
        description: this.description,
        boardId: this.$route.params.id,
        listId: this.list._id
        })
      },
      taskFormToggle() {
        this.newTask = true;
        this.addTaskButton = false;
      },
      taskFormToggleBack() {
        this.newTask = false;
        this.addTaskButton = true;
      }
    },
    computed: {
      board() {
        return this.$root.$data.store.state.activeBoard
      },
      // list() {
      //   return this.$root.$data.store.state.activeList
      // },
      tasks() {
        return this.$root.$data.store.state.activeTasks[this.list._id]
      },
      comments() {
        return this.$root.$data.store.state.activeComments
      },
    },
    components: {
      task
    }
  }

</script>

<style scoped>
.indList{
  padding: 15px;
  border-radius: 15px 15px;
  background: brown;}
</style>