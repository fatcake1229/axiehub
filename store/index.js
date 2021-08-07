import Moralis from 'moralis';
import _ from 'lodash';
export const state = () => ({
    user:[],
    mainETH: '0x834C86cf651379B7d6269e37c78e1DbB5c3DCDf4',
    userETH: undefined,
    roninaddress: undefined,
    cart: [
       
    ],
    ETHBalance: undefined,
    pointbalance: 0
})

export const getters ={

    check_axie_exist_in_cart: (state) => (id) => {
        return _.find(state.cart, function(o) { return o.id == id; })
    },
}


export const mutations = {
    addItem(state, params = Object){
        if(state.user.length != 0){
            if(state.cart.length != 0 && params[5] <= state.pointbalance){

                
                var Exist = state.cart.findIndex( s => s.id == params[0])

                if(Exist < 0){
                    state.cart.push({
                        id: params[0],
                        name: params[1],
                        image: params[2],
                        class: params[3],
                        stats:params[4]
                    })

                    state.pointbalance = state.pointbalance - params[5]
                    const currentUser =  Moralis.User.current();
                    currentUser.set("cart",state.cart)
                    currentUser.set("balance",state.pointbalance)
                    currentUser.save()
                }

            }else{
                if(params[5] <= state.pointbalance){
                    
                    state.cart.push({
                        id: params[0],
                        name: params[1],
                        image: params[2],
                        class: params[3],
                        stats:params[4]
                    })

                    state.pointbalance = state.pointbalance - params[5]
                    const currentUser =  Moralis.User.current();
                    currentUser.set("cart",state.cart)
                    currentUser.set("balance",state.pointbalance)
                    currentUser.save()
                    
                }
                
            }
        }
    },

    authorize_loggin(state,user){
        return state.user = user;
    },

    lock_eth(state,userETH){
        return state.userETH = userETH;
    },

    set_ethbalance(state,ETHBalance){
        return state.ETHBalance = ETHBalance;
    },

    set_balance(state,pointbalance){
        return state.pointbalance = pointbalance;
    },

    set_cart(state,cart){
        return state.cart = cart;
    },

    set_ronin(state,roninaddress){
        return state.roninaddress = roninaddress;
    },
}

export const actions = {
    loggedin({commit}){

        const currentUser =  Moralis.User.current();
        if (currentUser) {
           commit('authorize_loggin', currentUser)
           commit('set_ronin', currentUser.attributes.roninwallet)
           commit('lock_eth', currentUser.attributes.authData.moralisEth.id)
           commit('set_balance', currentUser.attributes.balance)
           let cart = currentUser.attributes.cart == undefined ? [] : currentUser.attributes.cart;
           commit('set_cart', cart)
        }
    },


    nuxtClientInit ({ commit }, { req }) {
        Moralis.initialize("a5P0TrsV84ayG0Y42UIaF1C56e5BShjXPxw4mL9V");
        Moralis.serverURL = "https://oq8jfieaetke.usemoralis.com:2053/server"
        Moralis.Web3.getSigningData = () => 'Welcome to Axie Overload'

        const currentUser =  Moralis.User.current();
        if (currentUser) {

           commit('authorize_loggin', currentUser)
           commit('set_ronin', currentUser.attributes.roninwallet)
           commit('lock_eth', currentUser.attributes.authData.moralisEth.id)
           commit('set_balance', currentUser.attributes.balance)
           let cart = currentUser.attributes.cart == undefined ? [] : currentUser.attributes.cart;
           commit('set_cart', cart)
        }
        
    }

}



