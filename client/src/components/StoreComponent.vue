<template>
  <div>
        <h1>{{ store.title }}</h1>

        <div>Total Expenses: {{ totalExpense }} </div>
        <div>Total Revenue: {{ totalRevenue }} </div>
        <br/>

        <div id="graph-container">
            <store-graph 
                v-if="(this.storeLoaded && this.expensesLoaded && this.revenuesLoaded)"
                v-bind:store=this.store
                v-bind:expenses=this.expenses
                v-bind:revenues=this.revenues
            ></store-graph>
        </div>

        <h2>Expenses</h2>
        <div class="row">
            <div class="col-md-10"></div>
            <div class="col-md-2">
                <router-link :to="{ name: 'reportExpense', params: { id: store._id }}" class="btn btn-primary">Report Expense</router-link>
            </div>
        </div><br/>
        
        <table class="table table-hover">
            <thead>
                <tr>
                    <th>Amount</th>
                    <th>Description</th>
                    <th>Date</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="expense in expenses" :key="expense._id">
                     <td>{{ expense.amount }}</td> 
                     <td>{{ expense.description }}</td>
                     <td>{{ expense.date }}</td>
                </tr>
            </tbody>
        </table>

        <h2>Revenues</h2>
        <div class="row">
            <div class="col-md-10"></div>
            <div class="col-md-2">
                <router-link :to="{ name: 'reportRevenue', params: { id: store._id }}" class="btn btn-primary">Report Revenue</router-link>
            </div>
        </div><br/>
        
        <table class="table table-hover">
            <thead>
                <tr>
                    <th>Amount</th>
                    <th>Description</th>
                    <th>Date</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="revenue in revenues" :key="revenue._id">
                     <td>{{ revenue.amount }}</td> 
                     <td>{{ revenue.description }}</td>
                     <td>{{ revenue.date }}</td>
                </tr>
            </tbody>
        </table>
  </div>
</template>

<script>
import StoreGraph from './StoreGraph.vue';

export default {
    components: {
        StoreGraph
    },
    data() {
        return {
            store: {},
            expenses: [],
            revenues: [],
            loadBools: {
                storeLoaded: false,
                expensesLoaded: false,
                revenuesLoaded: false
            }
        }
    },
    created() {
        // get store information
        let store_uri = `http://127.0.0.1:8080/stores/${this.$route.params.id}`;
        this.axios.get(store_uri).then(response => {
            this.store = response.data;
            this.storeLoaded = true
        });

        // get store expenses
        let expenses_uri = `http://127.0.0.1:8080/expenses/store/${this.$route.params.id}`;
        this.axios.get(expenses_uri).then(response => {
            this.expenses = response.data;
            this.expensesLoaded = true;
        });

        // get store revenues
        let revenues_uri = `http://127.0.0.1:8080/revenues/store/${this.$route.params.id}`;
        this.axios.get(revenues_uri).then(response => {
            this.revenues = response.data;
            this.revenuesLoaded = true;
        });
    },
    computed: {
        totalExpense() {
            let expenseTotal = 0;
            for (let expense of this.expenses) {
                expenseTotal += expense.amount
            }
            return expenseTotal;
        },
        totalRevenue() {
            let revenueTotal = 0;
            for (let revenue of this.revenues) {
                revenueTotal += revenue.amount;
            }
            return revenueTotal;
        }
    }
}
</script>

<style>
    #graph-container {
        height: 500px;
        width: 500px;
        margin: auto;
    }
</style>