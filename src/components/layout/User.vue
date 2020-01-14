<template>
    <div v-if="user">
        <p>Welcome back, {{user.name}}</p>
    </div>
</template>

<script>
    import {
        mapActions, mapState
    } from 'vuex';

    export default {
        computed:{
            ...mapState(['user'])
        },
        beforeMount(){
            this.GetUser(1)
        },
        
        methods: {
            ...mapActions(['GetUser']),

        }
    }
</script>