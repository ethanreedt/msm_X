<script>
import { Line } from 'vue-chartjs'
import moment from 'moment'

export default {
    extends: Line,
    props: ['store', 'expenses', 'revenues'],
    data() {
        return {
            chartdata: null,
            options: null
        }
    },
    created() {
        this.options = this.getOptions();
        this.chartdata = this.getChartData();
    },
    mounted() {
        this.renderChart(this.chartdata, this.options);
    },
    methods: {
        getChartData() {
            return {
                labels: this.getLabels(),
                datasets: [
                {
                    label: 'Expenses',
                    borderColor: 'red',
                    data: this.expenses.map(expense => expense.amount)
                },
                {
                    label: 'Revenues',
                    borderColor: 'blue',
                    data: this.revenues.map(revenue => revenue.amount)
                }]
            }
        },
        jsonToChartData(objArr) {
            let chartData = [];
            for (let obj of objArr) {
                chartData.push({
                    'y': obj.amount,
                    'x': obj.date
                });
            }
            return chartData
        },
        getLabels(t_span_str) {
            return [ moment().add(-4, t_span_str),
                     moment().add(-3, t_span_str),
                     moment().add(2, t_span_str),
                     moment().add(3, t_span_str),
                     moment().add(4, t_span_str),
                     moment().add(5, t_span_str),
                     moment().add(6, t_span_str), ]
        },
        getOptions() {
            return {
                options: {
                    maintainAspectRatio: false,
                    scales: {
                        xAxes: [{
                            type: 'time',
                            time: {
                                unit: 'week',
                            }
                        }]
                    }
                }
            }
        }
    }
}
</script>

<style>

</style>