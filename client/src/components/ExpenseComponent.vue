<template>
  <div>
      <h1>Report Expense</h1>
      <form @submit.prevent=reportExpense>
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label>Amount</label>
                <input type="number" class="form-control" v-model="expense.amount">
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                  <label>Description</label>
                  <textarea class="form-control" v-model="expense.description"></textarea>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label for="store-selection">Store</label>
                <select class="form-control" id="store-selection" v-model="selectedStoreId">
                  <option disabled value="">Select a Store</option>
                  <option v-for="store in stores" :key="store._id" v-bind:value="store._id">{{ store.title }}</option>
                </select>
              </div>
            </div>
          </div>
          <div class="form-group">
            <button class="btn btn-primary">Report</button>
          </div>
      </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      stores: [],
      selectedStoreId: '',
      expense: {}
    }
  },
  created() {
    // populate store names
    let store_uri = 'http://127.0.0.1:8080/stores';
    this.axios.get(store_uri).then(response => {
      this.stores = response.data;
    });
    // if store id is in route parameters
    // select store
    this.selectedStoreId = this.$route.params.id;
  },
  methods: {
    reportExpense() {
      this.expense.store = this.selectedStoreId;

      let uri = `http://127.0.0.1:8080/expenses/add`;

      this.axios.post(uri, this.expense).then(() => {
        this.$router.go(-1);
      });
    }
  }
}
</script>

<style>

</style>