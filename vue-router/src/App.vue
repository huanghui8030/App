<template>
  <div id="app">
    <!-- <router-view/> -->
    <my-header></my-header>  
    <Test v-for='(value,key) in objList' :key="key"></Test>
    <ul>
      <li v-for='(value,key) in list' >
        {{key}} ： {{value}}
      </li>
    </ul>
    <a :href="link" :title='title'>首页</a>
    <button @click='addItem'>按钮</button><br/>
    <input type="text" name="name" v-model='myVal'>
    {{otherVal}}
    {{getOtherVal()}}
   <!--  <select v-model='myVal'>
      <option v-for='item in options' :value='item.value'>{{item.name}}</option>
    </select> -->
    <v-select 
      :options='options' number='23235'
      @my-event='getMyEvent'>
      <p slot='header'>header父组件传给子组件的内容！slot</p> 
      <p slot='footer'>footer父组件传给子组件的内容！slot</p> 
    </v-select> 
    <css-transit></css-transit>
    <div>
      <transition name='trans' mode='out-in'>
        <div :is='currView'></div>
      </transition>
      <button @click='toggleCom'>点击</button>
    </div>
  </div>
</template>

<script>
import Test from './components/Test'
import MyHeader from './components/Header'
import Vue from 'vue'
import vSelect from './components/vSelect'
import cssTransit from './components/cssTransit'
import comA from './components/comA'
import comB from './components/comB'
export default {
  components:{
    Test,
    cssTransit,
    'v-select':vSelect,
    'my-header' : MyHeader,
    comA,comB
  },
  name: 'App',
  data(){
    return {
      currView:'com-b',
      link:'/',
      title:'首页标题',
      list:[
        {name:'张三',type:'1'},
        {name:'张三1',type:'2'},
        {name:'张三2',type:'3'},
        {name:'张三3',type:'3'},
      ],
      objList:{
        name:'张三',age:'18',class:'初中',weight:43
      },
      myVal:'1',
      options:[
        {name:'apple',value:0},
        {name:'banana',value:1},
        {name:'orange',value:2}
      ]
    }
  },
  computed:{//计算属性
    otherVal(){
      return this.myVal.replace(/\d/g,'');
    }
  },
  watch:{ //数据监听
    myVal:function(val,oldVal){
      console.log(val,oldVal);
    }
  },
  methods:{
    toggleCom(){
      if(this.currView==='com-a'){
        this.currView ='com-b'
      }else{
         this.currView ='com-a'
      }
    },
    getOtherVal(){
      return this.myVal.replace(/\d/g,'');
    },
    addItem(){
      console.log(this.list);
      //this.list[1]={name:'李四',type:234}; 失效
      Vue.set(this.list,1,{name:'李四',type:234});
    },
    getMyEvent(hello){
      console.log('父页面内容！',hello);
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
}
.trans-enter-active,.trans-leave-active{
    transition: all .5s ease-out;
}
.trans-enter{
    transform: translateY(-500px);
    opacity: 0;
}
.trans-leave-active{
    transform: translateY(500px);
    opacity: 0;
}
</style>
