<template>
    <div>
        <h1>Create a Store</h1>
        <form @submit.prevent="addStore">
            <div class="row">
                <div class="col-md-6">
                    <div class="form-group">
                        <label>Store Title:</label>
                        <input type="text" class="form-control" v-model="store.title">
                    </div>
                </div>
            </div><br />
            <div class="form-group">
                <button class="btn btn-primary">Create</button>
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
    methods: {
        addStore() {
            let uri = 'http://127.0.0.1:8080/stores/add'
            this.axios.post(uri, this.store).then(() => {
                this.$router.push({name: 'stores'})
            })
        }
    }
}
</script>

<style scoped lang="en">
    
</style>