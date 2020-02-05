<template>
    <div>
        <h1>Edit Store</h1>
        <form @submit.prevent="updateStore">
            <div class="row">
                <div class="col-md-6">
                    <div class="form-group">
                        <label>Store Title:</label>
                        <input type="text" class="form-control" v-model="store.title">
                    </div>
                </div>
            </div>
            <div class="form-group">
                <button class="btn btn-primary">Update</button>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            store: {}
        }
    },
    created() {
        let uri = `http://127.0.0.1:8080/stores/edit/${this.$route.params.id}`

        this.axios.get(uri).then(response => {
            this.store = response.data
        })
    },
    methods: {
        updateStore() {
            let uri = `http://127.0.0.1:8080/stores/update/${this.$route.params.id}`

            this.axios.post(uri, this.store).then(() => {
                this.$router.push({ name: 'stores' })
            })
        }
    }
}
</script>

<style scoped lang="en">
    
</style>