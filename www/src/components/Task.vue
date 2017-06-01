<template>
  <div class = 'indTask'>
    Active Task: {{task.name}} - {{task.description}}<br>
    <comments v-for="comment in comments" :comment='comment'></comments>
    <button type="button" class="btn btn-primary" @click="commentFormToggle" v-show="addCommentButton">Add a Comment</button><br><br>
    <div class="commentForm" v-show="newComment">
      <form class="form-inline create-comment-form" @submit.prevent="createComment">
        <div class="form-group">
          <input type="text" class="form-control" v-model="name" name="name" placeholder="Name" />
          <input type="text" class="form-control" v-model="description" name="description" placeholder="Comment Description" />
          <button type="submit" class="btn btn-primary" id="create-comment-button" @click="commentFormToggleBack">Create New Comment</button><button type="button" class="btn btn-primary" @click="commentFormToggleBack">Cancel</button>
        </div>
      </form>
    </div>
    <br><br>
  </div>
</template>

<script>
  import comments from '../components/Comments'
  export default {
    name: 'task',
    props: ['task'],
    data() {
      return {
        name: '',
        description: '',
        newComment: false,
        addCommentButton: true
      }
    },
    mounted() {
      this.$root.$data.store.actions.getTask(this.$route.params.id, this.$route.params.listid)
      
    },
    methods: {
      createComment(comment) {
        this.$root.$data.store.actions.createComment({
        name: this.name,
        description: this.description,
        boardId: this.$route.params.id,
        listId: this.$route.params.listId
        })
      },
      commentFormToggle() {
        this.newComment = true;
        this.addCommentButton = false;
      },
      commentFormToggleBack() {
        this.newComment = false;
        this.addCommentButton = true;
      }
    },
    computed: {
      board() {
        return this.$root.$data.store.state.activeBoard
      },
      list() {
        return this.$root.$data.store.state.activeList
      },
      comments() {
        return this.$root.$data.store.state.activeComments
      },
    },
    components: {
      comments
    }
  }

</script>

<style scoped>
.indTask{
  padding: 15px;
  margin: 5px;
  border-radius: 15px 15px;
  background: green;
}

</style>