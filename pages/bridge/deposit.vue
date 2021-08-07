<template>
    <div>
        <v-img
        :src="require('@/assets/Arena-fg.png')"
        :lazy-src="require('@/assets/Arena-fg.png')"
    
        >
         <Form/>
         </v-img>
    </div>
</template>

<script>

    import Form from '~/components/deposit.vue'
    export default {
        middleware: 'loggedin',
        components:{
            Form
        }
    }
</script>

<style lang="scss" scoped>

</style>