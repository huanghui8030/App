<template>
    <div>
        <div class="ab">
            <transition name='trans'>
                <p v-show='show'>这是内容css过渡动画</p>
            </transition>  
        </div> 
        <button @click='show=!show'>按钮</button>  
    </div>
</template>
<script>
    export default{
        data(){
            return {
                show : true
            }
        }
    }
</script>
<style scoped>
.fade-enter-active,.fade-leave-active{
    transition: opacity .5s ease-out;
}
.fade-enter,.fade-leave-active{
    opacity: 0;
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