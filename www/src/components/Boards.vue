<template>
  <div id="boards-view">
    <button type="button"class='btn btn-primary' @click="boardFormToggle" v-show="addBoardButton">Add a Board</button>
    <button type="button" class='btn btn-primary'><router-link to="login">Login/Register</router-link></button><br><br>
    <div class="Register" v-show="newBoard">
      <form class="form-inline create-board-form" @submit.prevent="createBoard">
        <div class="form-group">
          <input type="text" class="form-control" v-model="name" name="name" placeholder="Name" />
          <input type="text" class="form-control" v-model="description" name="description" placeholder="Board Description" />
          <button type="submit" class="btn btn-primary" id="create-user-button" @click="boardFormToggleBack">Create New Board</button>
        </div>
      </form>
    </div>
    <div id='myBoards'>
      <div class='container-fluid'>
        <div class = 'row'> 
          <div class = "col-sm-3" v-for="board in boards"><div class='well eachBoard boardName'>
          <router-link :to="'/boards/'+board._id">{{board.name}}</router-link> <button type="button" class='btn btn-default' @click="removeBoard(board)"><span class="glyphicon glyphicon-trash"></span></button></div></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'boards',
    data() {
      return {
        name: '',
        description: '',
        newBoard: false,
        addBoardButton: true
      }
    },

    mounted() {
      this.$root.$data.store.actions.getBoards()
    },
    computed: {
      boards() {
        return this.$root.$data.store.state.boards
      }
    },
    methods: {
      createBoard() {
        this.$root.$data.store.actions.createBoard({
          name: this.name,
          description: this.description
        })
      },
      removeBoard(board) {
        this.$root.$data.store.actions.removeBoard(board)
      },
      boardFormToggle() {
        this.newBoard = true;
        this.addBoardButton = false;
      },
      boardFormToggleBack() {
        this.newBoard = false;
        this.addBoardButton = true;
      }
    }
  }

</script>

<style scoped>
#boards-view{
  background: url();
}
#myBoards{
  align-content: center;
  background: green;
}
.eachBoard{
  border: 1px solid black;
  background: grey;
}
.boardName{
  margin: 5%
}
a{
  color:antiquewhite;
}
body{
  background: blue;
}

</style>