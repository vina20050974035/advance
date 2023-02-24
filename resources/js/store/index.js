import axios from "axios";
import { times } from "lodash";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        allProduct: [
            {
                id: 1,
                name: "Indomie Goreng Rendang",
                desc: "Masakan instan terenak di dunia",
                qty: 25,
                carts_qty: 0,
                price: 3000,
                carts_price: 0,
            },
            {
                id: 2,
                name: "Mie Gelas Rendang",
                desc: "Mie instant khusus anak kosan",
                qty: 35,
                carts_qty: 0,
                price: 1500,
                carts_price: 0,
            },
            {
                id: 3,
                name: "Bakmi Mewah",
                desc: "Kalau anak kosan jangan macam2 deh",
                qty: 45,
                carts_qty: 0,
                price: 5000,
                carts_price: 0,
            },
            {
                id: 4,
                name: "Mie Lemonilo",
                desc: "Mari berburu photocard",
                qty: 55,
                carts_qty: 0,
                price: 7000,
                carts_price: 0,
            },
            
        ],
        carts: [],
        totalCartsQty: 0,
        totalPrice: 0
    },
    getters: {
        getAllProduct(state) {
            return state.allProduct
        },
        getCarts(state) {
            return state.carts
        },
        getTotalCartsQty(state) {
            return state.totalCartsQty
        },
        getTotalPrice(state) {
            return state.totalPrice
        }
    },
    mutations: {
        addToCart(state, id) {
            let produk = state.allProduct.find((item) => item.id == id);
            let cart = state.carts.find((item) => item.idProduk == id);
            let idProduk = produk.id;
            let name = produk.name;
            let price = produk.price;

            produk.carts_qty++;
            produk.qty--;
            state.totalCartsQty++;

            if (!cart) {
                let cartTotal = {
                    idProduk: idProduk,
                    name: name,
                    price: price,
                    qty: 1,
                    subTotal: price,
                };
                state.carts.push(cartTotal);
            } else {
                cart.qty++;
                cart.subTotal = cart.qty * cart.price;
            }
        },

        removeFromCart(state, id) {
            state.carts.forEach((cart) => {
                if (cart.idProduk == id) {
                    if (cart.qty === 0) {
                        state.carts.splice(state.carts.indexOf(cart), 1);
                        console.log(cart.subTotal)
                    } else {
                        cart.qty -= 1;
                        cart.subTotal = cart.qty * cart.price;
                    }
                }
            });

        },

        triggerCheckout(state) {
            state.carts.forEach();
        },

        Checkout(state, id) {
            state.carts.forEach((cart) => {
                state.totalPrice += cart.subTotal;
            });
            if (state.carts.length !== 0) {
                alert("Total Pembelian Anda Adalah Rp." + state.totalPrice);
                location.reload();
            }
        },
    },
        
    actions: {
        getList(context) {
            let url = 'api/get_product'
            axios.get(url).then((response) => {
                context.commit('UPDATE_TODO', response.data)
            })
        },
        addToCart(id) {
            this.$store.commit("addToCart", id)
        },
        removeFromCart(id) {
            this.$store.commit("removeFromCart", id)
        },
        triggerCheckout(id) {
            this.$store.commit("triggerCheckout")
        },
        Checkout(id) {
            this.$store.commit("Checkout")
        }
    },
    modules: {

    }
})