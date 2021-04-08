<template>
  <a-form-model :model="form" :label-col="labelCol" :wrapper-col="wrapperCol">
    <b-modal v-model="success_flag" title="添加成功">
      添加航班信息成功！</b-modal
    >
    <!-- <b-modal v-model="init_alert" title="初始化失败"> 初始化失败！ </b-modal> -->
    <b-modal v-model="false_flag" title="添加失败"> 添加航班信息失败！</b-modal>
    <a-form-model-item label="公司名">
      <a-input v-model="company_name" disabled />
    </a-form-model-item>

    <a-form-model-item label="航班号">
      <a-input v-model="flight_id" />
    </a-form-model-item>

    <!-- <a-form-model-item label="起飞时间">
      <a-input v-model="start_time" />
    </a-form-model-item>
    <a-form-model-item label="到达时间">
      <a-input v-model="arrive_time" />
    </a-form-model-item> -->

    <a-form-model-item label="起飞时间">
      <a-time-picker @change="dateChangeStartTime" placeholder="起飞时间" style="width: 100%; diplay: inline-block" />
    </a-form-model-item>

    <a-form-model-item label="到达时间">
      <a-time-picker @change="dateChangeArriveTime" placeholder="到达时间"  style="width: 100%; diplay: inline-block" />
    </a-form-model-item>

    <a-form-model-item label="头等舱价格">
      <a-input v-model="first_class_price" />
    </a-form-model-item>
    <a-form-model-item label="商务舱价格">
      <a-input v-model="business_class_price" />
    </a-form-model-item>
    <a-form-model-item label="经济舱价格">
      <a-input v-model="economy_class_price" />
    </a-form-model-item>
    <a-form-model-item label="剩余座位数">
      <a-input v-model="num_remain_seat" />
    </a-form-model-item>
    <a-form-model-item label="剩余头等舱座位数">
      <a-input v-model="num_remain_first_class" />
    </a-form-model-item>
    <a-form-model-item label="剩余商务舱座位数">
      <a-input v-model="num_remain_business_class" />
    </a-form-model-item>
    <a-form-model-item label="剩余经济舱座位数">
      <a-input v-model="num_remain_economy_class" />
    </a-form-model-item>
    <a-form-model-item label="航线编号">
      <a-input v-model="air_line_id" />
    </a-form-model-item>
    <a-form-model-item label="机场编号">
      <a-input v-model="airport_id" />
    </a-form-model-item>
    <a-form-model-item label="飞机编号">
      <a-input v-model="plane_id" />
    </a-form-model-item>

    <a-form-model-item :wrapper-col="{ span: 14, offset: 12 }">
      <a-button type="primary" @click="add_flight_info()">
        添加
        <!-- 想做一个弹窗确认再修改成功的效果 TODO -->
      </a-button>
    </a-form-model-item>
  </a-form-model>
</template>

<script>
export default {
  data() {
    return {
      false_flag: false,
      success_flag: false,
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
      company_name: "",
      flight_id: "",
      start_time: "",
      arrive_time: "",
      first_class_price: "",
      business_class_price: "",
      economy_class_price: "",
      num_remain_seat: "",
      num_remain_first_class: "",
      num_remain_business_class: "",
      num_remain_economy_class: "",

      air_line_id: "",
      airport_id: "",
      plane_id: "",
    };
  },
  methods: {
    dateChangeStartTime(_, dateString) {
      this.start_time = dateString;
    },
    dateChangeArriveTime(_, dateString){
      this.arrive_time = dateString;
    },
    init_company_info: function () {
      this.company_name = this.$cookies.get("company_name");
    },
    add_flight_info: function () {
      this.$axios({
        url: "http://127.0.0.1:5000/admin/add_flight_info_api",
        method: "post",
        data: {
          company_name: this.$cookies.get("company_name"),
          flight_id: this.flight_id,
          start_time: this.start_time,
          arrive_time: this.arrive_time,
          first_class_price: this.first_class_price,
          business_class_price: this.business_class_price,
          economy_class_price: this.economy_class_price,
          num_remain_seat: this.num_remain_seat,
          num_remain_first_class: this.num_remain_first_class,
          num_remain_business_class: this.num_remain_business_class,
          num_remain_economy_class: this.num_remain_economy_class,
          air_line_id: this.air_line_id,
          airport_id: this.airport_id,
          plane_id: this.plane_id,
        },
      }).then((res) => {
        let data = res.data;
        if (data.success) {
          this.success_flag = true;
          this.init_info();
        } else {
          this.false_flag = true;
        }
      });
    },
  },
  created: function () {
    this.init_company_info();
  },
};
</script>

<style>
</style>