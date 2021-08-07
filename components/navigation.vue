<template>
    <div>

        

    <v-navigation-drawer
        v-if="user.length != 0"
        v-model="drawer"
        color="#232634"
        :clipped="!isNotIndex"
        app
        :right="isNotIndex"
        
    >

        <v-container>
            <v-card outlined color="transparent" >
                <v-card-title class="justify-center">Account</v-card-title>
                <v-card-subtitle class="caption">{{user.id}}</v-card-subtitle>
                <v-card-text>
                    <div class="px-2">
                        <v-icon small>mdi-ethereum</v-icon>
                         <small v-if="ETHBalance != undefined">{{ETHBalance}}</small>
                         <v-progress-circular
                            v-if="ETHBalance == undefined"
                            indeterminate
                            :size="15"
                            color="primary"
                        ></v-progress-circular>
                    </div>
                    <div class="px-2">
                        <v-icon small>mdi-wallet-outline</v-icon>
                         <small>{{userETH | truncate_address}}</small>
                    </div>


                    <div class="px-2">
                         <span class="caption">Balance</span>: 
                         <small class="overline">{{pointbalance | truncate_balance}}</small>
                    </div>

                </v-card-text>
            </v-card>
        </v-container>


        <v-container>
            <v-list rounded>
                <v-list-item @click="ronindialog = true"> 
                <v-list-item-action>
                    <v-icon>mdi-wallet-outline</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title>Accoun Wallet</v-list-item-title>
                </v-list-item-content>
                </v-list-item>

                <v-list-item @click="logout_metamask()">
                <v-list-item-action>
                    <v-icon>mdi-logout</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title>Logout</v-list-item-title>
                </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-container>
    </v-navigation-drawer>

    <v-app-bar
        clipped-left
        fixed
        app
        flat
        color="#11131B"
        >

        
         <v-img 
            max-height="32"
            max-width="66"
            class="mr-5"
            :src="require('@/assets/logo.png')"
            >
        </v-img>

        <v-toolbar-title class="overline" v-text="title" />

        <v-spacer></v-spacer>

        <v-btn
        color="primary"
        depressed
        text
        to="/login"
        v-if="user.length == 0"
        >
        <v-icon class="mr-2">mdi-login</v-icon>
        Login
        </v-btn>

        <v-app-bar-nav-icon v-if="user.length != 0" @click.stop="drawer = !drawer" />
        

        <template v-slot:extension class="d-flex justify-center">
            
            <v-tabs color="primary" align-with-title v-model="activeTab">
                <v-tab v-for="tab in routes" :key="tab.id" :to="tab.link">
                     <v-icon small class="mr-1">{{tab.icon}}</v-icon>
                    {{ tab.title }}
                </v-tab>

                <v-tabs-items v-model="activeTab" @change="updateRouter($event)">
                    <v-tab-item v-for="tab in routes" :key="tab.id" :to="tab.link">
                        <router-view />          
                    </v-tab-item>
                </v-tabs-items>
            </v-tabs>
            
        </template>
        

    </v-app-bar>





    <v-dialog
      v-model="ronindialog"
      persistent
      max-width="500"
    >
     
      <v-card 
      color="#11131B"
      shaped 
      v-if="roninaddress != undefined">
        <v-card-title class="text-h5">
            Account Wallet
        </v-card-title>
       
        <v-container>
                <v-text-field
                  v-model="roninaddress"
                  label="RONIN ADDRESS"
                  placeholder="Enter your wallet address"
                  required
                  filled
                  disabled
                  class="mb-3 glasseffect"
                  rounded
                  type="text"
                  hide
                  hide-details="auto"
                ></v-text-field>
        </v-container>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="ronindialog = false"
          >
            Close
          </v-btn>
          <v-btn
            text
            color="green darken-1"
            @click="update_ronin_address()"
          >
            Update
        </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

   
    </div>
</template>

<script>
    import { mapState,mapMutations } from 'vuex'
    import Moralis from 'moralis'
    export default {
        
        computed:{
            ...mapState(['user','pointbalance','ETHBalance','userETH','roninaddress']),
            isNotIndex : function (){
                return $nuxt.$route.name != 'index' ? false : true
            }
        },

        data () {
            return {
            balance: undefined,
            activeTab: '',
            ronindialog:false,
            routes: [
            {
                id: 1,
                title: 'Market',
                icon: 'mdi-storefront-outline',
                link: '/'
            },
            {
                id: 2,
                title: 'Bridge',
                icon: 'mdi-ethereum',
                link: '/bridge/deposit'
            },
            {
                id: 3,
                title: 'Cart',
                icon: 'mdi-cart-minus',
                link: '/cart'
            }
            
            ],
            drawer:true,
            items: [
                {
                icon: 'mdi-account',
                title: 'Account',
                to: '/account'
                },
                {
                icon: 'mdi-logout',
                title: 'Logout',
                to: '/logout'
                }
            ],
            miniVariant: true,
            right: false,
            rightDrawer: false,
            title: 'Axie SLP'
            }
        },
        filters:{
            truncate_address : function (string){
                var startDigit = string.substring(0,7);
                var lastDigit = string.substr(string.length-5);
                return startDigit+"..."+lastDigit
            },
            truncate_balance : function (string){
                let balance = string.toString();
                var startDigit = balance.substring(0,8);
                return startDigit
            }
        },
        methods: {
            updateRouter(val){
                this.$router.push(val)
            },

            async update_ronin_address () {
                const user = await Moralis.User.current();
                this.set_ronin(undefined)
                user.set("roninwallet",undefined)
                user.save()
            },

            ...mapMutations(['authorize_loggin','set_ronin']),
            async logout_metamask() {
                await Moralis.User.logOut();
                this.authorize_loggin([]);
                console.log("logged out");
                this.$router.push('/')
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>