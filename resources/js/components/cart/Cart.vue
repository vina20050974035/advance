<template>
    <div class="container-fluid" >
        <div v-if="totalCartsQty !== 0" class="card mx-auto mt-5 shadow-lg rounded-0" style="width: 80rem;">
            <div class="card-header">
                <h3>Keranjang Belanja</h3>
            </div>
            <div class="card-body">
                <table class="table table-primary">
                    <thead>
                        <tr>
                            <th>Nama Barang</th>
                            <th>Jumlah Barang</th>
                            <th>Harga</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody class="table-light">
                        <tr v-for="item in carts" :key="item.idProduk">
                            <td>{{ item.name }}</td>
                            <td>{{ item.qty }}</td>
                            <td>Rp. {{ item.subTotal }}</td>
                            <div class="div">
                                <button class="btn btn-outline-danger" v-if="item.qty > 0" @click="removeFromCart(item.idProduk)">Remove</button>
                                <button class="btn btn-outline-danger" v-else>Remove</button>
                            </div>
                        </tr>
                        <tr>
                            <button class="btn btn-outline-success" @click="Checkout">Checkout</button>
                        </tr>
                    </tbody>
                </table>
                <div>
                    
                </div>
        </div>
        </div>
        <div class="container text-center" v-else>
        <div class="row">
            <div class="col align-self-center">
                <h1>Keranjang Masih Kosong</h1>
                <router-link to="/">
                    <button type="button" class="btn btn-danger">Kembali ke Produk</button>
                </router-link>
            </div>
        </div>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'

export default {

    
    mounted() {
        console.log("Mounted")
    },
    computed: {
        ...mapGetters({
            allProduct: 'getAllProduct', // this is the function from store.js
            carts: 'getCarts',
            totalCartsQty: 'getTotalCartsQty',
            totalPrice: 'getTotalPrice'
        })
    },
    methods: {
        ...mapMutations({
            addToCart: 'addToCart', // this is the function from store.js
            removeFromCart: 'removeFromCart',
            Checkout: 'Checkout'
        }),
    }
}
</script>