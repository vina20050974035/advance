<template>
    <div>
    <div class="container-fluid" >
        <div class="card mx-auto mt-5 shadow-lg rounded-0" style="width: 80rem;">
            <div class="card-header">
                <h3>Semua Produk</h3>
            </div>
            <div class="card-body">
                <table class="table table-primary">
                    <thead>
                    <tr>
                        <th>No</th>
                        <th>Nama Barang</th>
                        <th>Deskripsi</th>
                        <th>Harga</th>
                        <th>Stok</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody class="table-light">
                    <tr v-for="item in allProduct" :key="item.id">
                        <td>{{ item.id }}</td>
                        <td>{{ item.name }}</td>
                        <td>{{ item.desc }}</td>
                        <td>{{ item.price }}</td>
                        <td>{{ item.qty }}</td>
                        <div class="div">
                                <button class="btn btn-primary" v-if="item.qty > 0" @click="addToCart(item.id)">Add</button>
                                <button class="btn btn-outline-danger" v-else>Stok Habis</button>
                            </div>
                    </tr>
                    </tbody>
                </table>
                <div class="router-cont mx-5 mt-2">
                    <h5>Barang di Keranjang {{ totalCartsQty }}</h5>
                    <router-link to="/cart">
                        <button @click="triggerCheckout()" type="button">Pergi Ke Cart</button>
                    </router-link>
                </div> 
            </div>
            </div>
        </div>   
    </div>        
</template>

<script>

import { mapGetters, mapMutations } from 'vuex'

    export default {
        mounted() {
            console.log('Mounted')
            this.$store.dispatch('getList')
        },
        computed: {
            ...mapGetters({
                allProduct: 'getAllProduct', // this is the function from store.js
                carts: "getCarts",
                totalCartsQty: 'getTotalCartsQty'
            })
        },
        methods: {
            ...mapMutations({
                addToCart: 'addToCart', // this is the function from store.js
                removeFromCart: 'removeFromCart',
                triggerCheckout: 'triggerCheckout'
            }),

        }
    }
</script>
