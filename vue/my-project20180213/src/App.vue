<template>
  <div id="app">
    <h1 v-text='title'></h1>
    <input v-model="newItem" v-on:keyup.enter="addItem">
    <ul>
      <li v-for="item in items" v-bind:class="{finished:item.flag}"
        v-on:click="toggleFinish(item)">
        {{item.label}}
      </li>
    </ul>
    <span v-text='tips'></span>
  </div>
</template>

<script>
export default {
  name: 'App',
  data:function(){
    return {
      title : "list列表，请输入：",
      items : [
        {label : '数学', flag : true},
        {label : '语文', flag : true},
        {label : '英文', flag : false}
      ],
      newItem :'',
      tips: "list列表，input中输入按Enter自动显示在列表下面"
    }
  },
  methods:{
    toggleFinish:function(item){
        //console.log(item);
        item.flag = !item.flag;
      },
    addItem: function(){
      this.items.push( {label : this.newItem, flag : false});
      this.newItem='';

    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  width: 400px;
  margin: 0 auto;
}
#app ul{
  text-align: left;
}
.finished{
  text-decoration: underline;
}

</style>
