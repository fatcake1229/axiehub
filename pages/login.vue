<template>
    <div style="margin-top:150px">

        <div class="d-flex justify-center text-center">
            <v-sheet width="500px" color="transparent">
            
            

            <v-container>

                <v-btn
                class="mt-2 mb-5 font-weight-regular"
                x-large
                block
                color="primary"
                @click="ronindialog = !ronindialog"

                style="text-transform: none;"
                
                >
                

                <v-sheet class="mr-2" height="30" width="30" color="transparent">
                    <v-img
                        small
                        :src="require('@/assets/ronin-white.png')"
                        >
                    </v-img>
                </v-sheet>
                Logins with Ronin Wallet
                </v-btn>

                <v-btn
                class="mt-2  font-weight-regular"
                x-large
                block
                outlined
                color="white"
                :loading="authorize"
                style="text-transform: none;"
                @click="loginMetamask()"
                
                >

                <template v-slot:loader>
                        Connecting...
                </template>
                
                <v-sheet class="mr-2" height="30" width="30" color="transparent">
                    <v-img
                        small
                        :src="require('@/assets/metamask-white.png')"
                        >
                    </v-img>
                </v-sheet>

                Login with MetaMask</v-btn>


            </v-container>
            </v-sheet>
        </div>


        <v-dialog
        v-model="ronindialog"
        max-width="400"
        >
        
        <v-card 
        color="#11131B"
        height="200"
        shaped >

        <v-card-title>

        </v-card-title>


        <v-card-text class="mt-15 text-center">
            <h1>Currently Unavailable</h1>
        </v-card-text>

        </v-card>
        </v-dialog>
    </div>
</template>

<script>
    import { mapState,mapActions } from 'vuex'
    import Moralis from 'moralis';
    export default {

        middleware: 'is_loggedin',
        data: () => ({
        authorize: false,
        ronindialog:false,
        message: ''
        }),
        methods:{
            ...mapActions(['loggedin']),
            async loginMetamask (){
                if(window.ethereum){

                    this.authorize = true;
                    try{

                        let user = await Moralis.Web3.authenticate();
                   
                        if(user){
                            this.set_User(user);
                            this.authorize = false;
                            this.loggedin();
                            this.$router.push('/')
                        }

                    }catch{
                        this.authorize = false;
                    }
                }else{
                    this.message = "Please install MetaMask first";
                }
            },

            set_User (token){
            this.$store.commit('authorize_loggin', token)
            },

        },
        computed:{
            ...mapState(['user'])
        },
        
    }
</script>

<style>

.glass_effect{
    backdrop-filter: blur(0px) saturate(180%);
    -webkit-backdrop-filter: blur(0px) saturate(180%);
    background-color: rgba(17, 25, 40, 0.75);
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.125);
}

</style>