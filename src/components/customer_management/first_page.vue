<template>
  <div>
    <div style="text-align: center">
      <div>
        <div>
          <startpicker only-province @province="OnchangeStart"></startpicker>
          
          <!-- <startpicker only-province @province="OnchangeStart" ></startpicker> -->
        </div>
        <div>
          <br/>
          <!-- <label>目的地:</label> -->
          <destinationpicker
            only-province
            @province="OnchangeDestination"
          ></destinationpicker>
          
        </div>
      </div>
    </div>
    <div style="text-align: center">
      <br/>
      <!-- <label>出发时间:</label><br/> -->
      <b-form-datepicker
        style="width: 176px;margin-left: auto;margin-right: auto"
        v-model="airline_date"
        :min="min"
        :max="max"
        :date-format-options="{
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
        }"
        :hide-header="hideHeader"
        locale="en"
        placeholder="选择日期"
      ></b-form-datepicker>
      
    </div>
    <div style="text-align: center">
      <br/>
      <a-button variant="outline-primary" @click="flightFilter">搜索机票</a-button>
      <b-modal v-model="alert" title="查询失败"> 未查询到相关航班信息 </b-modal>
    </div>
  </div>
</template>

<script>
const startpicker = () => import("v-distpicker");
const destinationpicker = () => import("v-distpicker");
export default {
  components: {
    startpicker,
    destinationpicker,
  },
  data: function () {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const minDate = new Date(today);
    minDate.setMonth(minDate.getMonth());
    minDate.setDate(minDate.getDate());
    const maxDate = new Date(today);
    maxDate.setMonth(maxDate.getMonth() + 2);
    maxDate.setDate(15);
    return {
      min: minDate,
      max: maxDate,
      airline_date: "",
      start: "",
      destination: "",
      hideHeader: true,
      alert: false,
      collapsed: false,
    };
  },
  methods: {
    OnchangeStart: function (event) {
      this.start = event.value;
    },
    OnchangeDestination: function (event) {
      this.destination = event.value;
    },
    flightFilter: function () {
      this.$axios({
        url: "http://127.0.0.1:5000/air/get_airline_api",
        method: "post",
        data: {
          start: this.start,
          destination: this.destination,
          airline_date: this.airline_date,
        },
      }).then((res) => {
        let data = res.data;
        if (data.success) {
          this.$cookies.set("start", this.start);
          this.$cookies.set("destination", this.destination);
          this.$cookies.set("airline_date", this.airline_date);
          this.$router.push("/flight_filter_show");
        } else {
          this.alert = true;
        }
      });
    },
  },
};
</script>

<style>
</style>