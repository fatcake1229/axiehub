<template>
    <div>
        HAHAHAHAHAHA
    </div>
</template>

<script>
    const Moralis = require("moralis")
    import { mapState,mapMutations } from 'vuex'
    export default {
        computed:{
            ...mapState(['pointbalance'])
        },
        methods:{
            ...mapMutations(['set_balance']),
            async addFund(){
                const user = await Moralis.User.current();
                let addFunds = this.pointbalance + 1;
                this.set_balance(addFunds)
                user.set("balance",addFunds)
                user.save()
            }
        },
        mounted(){
            this.addFund()
        }
    }
</script>

<style lang="scss" scoped>

</style>