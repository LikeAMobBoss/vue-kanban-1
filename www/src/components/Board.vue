<template>
  <div class = 'myBoard'>
    Active Board: {{board.name}} - {{board.description}}<br>
        <button type="button" class='btn btn-primary' @click="listFormToggle" v-show="addListButton">Add a List</button><br><br>
    <div class='container'>
      <div class='row'>
        <list v-for="list in lists" :list='list'></list>
        <div class="ListForm" v-show="newList">
          <form class="form-inline create-list-form" @submit.prevent="createList">
            <div class="form-group">
              <input type="text" class="form-control" v-model="name" name="name" placeholder="Name" />
              <input type="text" class="form-control" v-model="description" name="description" placeholder="List Description" />
              <button type="submit" class="btn btn-primary" id="create-list-button" @click="listFormToggleBack">Create New List</button><button type="button" class="btn btn-primary" @click="listFormToggleBack">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <br><br>
  </div>
</template>

<script>
  import list from '../components/List'
  export default {
    name: 'board',
    data() {
      return {
        name: '',
        description: '',
        newList: false,
        addListButton: true
      }
    },
    mounted() {
      this.$root.$data.store.actions.getBoard(this.$route.params.id)
    },
    methods: {
      createList(list) {
        this.$root.$data.store.actions.createList({
          name: this.name,
          description: this.description,
          boardId: this.$route.params.id
        })
      },
      listFormToggle() {
        this.newList = true;
        this.addListButton = false;
      },
      listFormToggleBack() {
        this.newList = false;
        this.addListButton = true;
      }
    },
    computed: {
      board() {
        return this.$root.$data.store.state.activeBoard
      },
      lists() {
        return this.$root.$data.store.state.activeLists
      },
      tasks() {
        return this.$root.$data.store.state.activeTasks
      },
      comments() {
        return this.$root.$data.store.state.activeComments
      },
    },
    components: {
      list
    }
  }

</script>

<style scoped>
.myBoard{
  background: blue;
  color: aqua;
}

</style>