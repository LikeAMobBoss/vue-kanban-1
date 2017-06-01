<template>
  <div id = "lists" class='col-sm-4'> 
      <p><router-link :to="'/boards/'+ this.$route.params.id + '/list/' + this.list._id">{{list.name}} - {{list.description}}</router-link><button type= 'button' class="btn btn-primary" @click="removeList(list._id)"><span class="glyphicon glyphicon-trash"></span></button></p>
      
  </div>
</template>

<script>
export default {
  name: 'lists',
  mounted(){
  },
  data(){
    return{

    }
  },
  props: [
    'list'
  ],
  methods:{
    createList(){
      this.$root.$data.store.actions.createList({
        name: this.name,
        description: this.description,
        boardId: this.$route.params.id
      })
    },
    removeList(boardId, listId){
      this.$root.$data.store.actions.removeList(this.$route.params.id, listId)
    }
  }
}
</script>

<style scoped>

</style>
