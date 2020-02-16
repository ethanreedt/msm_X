<template>
    <div>
        <h1>Stores</h1>
        <div class="row">
            <div class="col-md-10"></div>
            <div class="col-md-2">
                <router-link :to="{ name: 'create' }" class="btn btn-primary">Create Store</router-link>
                <router-link :to="{ name: 'reportExpense' }" class="btn btn-primary">Report Expense</router-link>
            </div>
        </div><br />

        <table class="table table-hover">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="store in stores" :key="store._id">
                        <td><router-link :to="{ name: 'store', params: { id: store._id }} ">{{ store.title }}</router-link></td>
                        <td><router-link :to="{ name: 'reportExpense', params: { id: store._id }}" class="btn btn-primary">Report Expense</router-link></td>
                        <td><router-link :to="{ name: 'reportRevenue', params: { id: store._id }}" class="btn btn-primary">Report Revenue</router-link></td>
                        <td><router-link :to="{ name: 'edit', params: { id: store._id }}" class="btn btn-primary">Edit</router-link></td>
                        <td><button class="btn btn-danger" @click.prevent="deleteStore(store._id)">Delete</button></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    data() {
        return {
            stores: []
        }
    },
    created() {
        let uri = 'http://127.0.0.1:8080/stores'
        this.axios.get(uri).then(response => {
            this.stores = response.data;
        })
    },
    methods: {
        deleteStore(id) {
            let uri = `http://127.0.0.1:8080/stores/delete/${id}`
            this.axios.delete(uri).then(() => {
                this.stores.splice(this.stores.findIndex(i => i._id == id), 1);
            })
        }
    }
}
</script>

<style scoped lang="en">
    
</style>