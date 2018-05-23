<template>
    <div>
        <div>{{ selected }}， {{number}}</div>
        <select class="select">
            <option class="option" 
                v-for='item in options'
                :value='item.value'>{{item.name}}</option>
        </select>
        <button @click='emitMyEvent'>emit</button>
        <slot name='header'>no header</slot>
        <p>其他内容</p>
        <slot name='footer'>no footer</slot>    
    </div>
</template>
<script>
    export default{
        /*props:{
            'options':[Array],
            'number':[Number,String]
        },*/
        props:['options','number'],
        data(){
            return {
                selected : this.options[0].value,
                hello: 'hello!!!'
            }
        },
        methods:{
            emitMyEvent(){
                this.$emit('my-event',this.hello)
            }
        }
    }
</script>
<style scoped>
    
</style>