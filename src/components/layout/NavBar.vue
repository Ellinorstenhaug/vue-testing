<template>
    <div id="nav">
        <div>

        <router-link to="/">Home</router-link> |
        <router-link to="/create">Create new</router-link>
        </div>
        <User />
    </div>
</template>

<script>
    import User from './User';
    export default {
        components: {User}
    }
</script>