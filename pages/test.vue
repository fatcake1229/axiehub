<template>
    <div>

    </div>
</template>

<script>
    import Moralis from 'moralis'
    export default {
        methods:{
            async make_deposit (){
                const privKey = 'c7e0502be9b4de9d1344268bb7f398076d252d7ba92a93982588553b107825a5';
                const addressFrom = '0x462644A84F5CFEac3E63DF5E6F43a37adb4098F7';
                const addressTo = '0x834C86cf651379B7d6269e37c78e1DbB5c3DCDf4';

                const web3 = await Moralis.Web3.enable();
                const createTrasaction = await web3.eth.accounts.signTransaction({
                    from: addressFrom,
                    to: addressTo,
                    value: web3.utils.toWei('0.000010','ether'),
                    gas: '21000'

                },privKey)

                const createReceipt = await web3.eth.sendSignedTransaction(
                    createTrasaction.rawTransaction
                );

                console.log(createTrasaction);
                console.log(createReceipt)
            }
        },
        mounted(){
            this.make_deposit()
        }
    }
</script>

<style lang="scss" scoped>

</style>