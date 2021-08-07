<template>
  <v-app dark style="background-color: #242735;">

    <NavigationBar/>
    <v-main>
        <Nuxt />
    </v-main>


    

    <!-- Rarity -->
        <v-bottom-sheet
        v-model="isSet"
        inset
        persistent
        >
        <v-card
            height="200px"
            shaped
            color="#11131B"
        >

        <v-card-title>
          Account Transaction Details
          <v-spacer></v-spacer>
          <v-btn
          small
          rounded
          color="red"
          @click="save_ronin_address()"
          >
            Save
          </v-btn>
        </v-card-title>

        <!-- <v-card-subtitle>
          Provide exact information needed once failed no return no exchange
        </v-card-subtitle> -->
    
            <v-container class="pa-5">
                
                

                <v-text-field
                  v-model="ronin"
                  label="RONIN ADDRESS"
                  placeholder="Enter your wallet address"
                  required
                  filled
                  class="mb-3"
                  rounded
                  type="text"
                  hide
                  hint='Make sure your Ronin address starts with "ronin:". Copy paste it from your Ronin wallet.'
                  persistent-hint
                ></v-text-field>

                <!-- <v-text-field
                  v-model="privatekey"
                  label="Private Key"
                  placeholder="Enter your MetaMask private key"
                  required
                  filled
                  class="mb-3"
                  rounded
                  type="password"
                  hide
                  hint='Warning: Never disclose this key. Anyone with your private keys can steal any assets held in your account.'
                  persistent-hint
                ></v-text-field> -->


            </v-container>


        </v-card>
        </v-bottom-sheet>
        <!-- Rarity -->

  </v-app>
</template>

<script>
 import Moralis from 'moralis'
import NavigationBar from '~/components/navigation.vue'
import { mapActions,mapState,mapMutations } from 'vuex'
export default {
  components:{
    NavigationBar
  },
  data () {
      return {
        yawa: 0,
        ronin: '',
        privatekey: ''
      }
  },
  computed:{
    ...mapState(
        [
          'user',
          'userETH',
          'roninaddress'
        ]
      ),
    isSet : function (){
      return this.roninaddress == undefined  && this.user.length != 0? true : false
    }
  },

  watch:{
    user: function (){
      this.load_eth_balance();
    }
  },

  methods:{

      ...mapActions(['currentUser']),

      ...mapMutations(['lock_eth','set_ethbalance','set_ronin']),

      async save_ronin_address () {
          const user = await Moralis.User.current();
          this.set_ronin(this.ronin)
          user.set("roninwallet",this.ronin)
          // user.set("privatekey",this.privatekey)
          user.save()
      },

      async load_eth_balance(){
        if(this.user.length != 0){
          const web3 = await Moralis.Web3.enable();
          const balances =  await Moralis.Web3.getERC20();
          let currentBalance = web3.utils.fromWei(balances.balance, 'ether')
          this.set_ethbalance(parseFloat(currentBalance).toFixed(4));
          console.log(parseFloat(currentBalance).toFixed(4));
        }
      },
  }, 

  mounted(){
      this.load_eth_balance();
  }
}
</script>

