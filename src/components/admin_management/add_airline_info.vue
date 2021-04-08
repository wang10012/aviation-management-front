<template>
  <a-form-model :model="form" :label-col="labelCol" :wrapper-col="wrapperCol">
    <b-modal v-model="success_flag" title="添加成功"> 添加航线信息成功！</b-modal>
    <!-- <b-modal v-model="init_alert" title="初始化失败"> 初始化失败！ </b-modal> -->
    <b-modal v-model="false_flag" title="添加失败"> 添加航线信息失败！</b-modal>
    <a-form-model-item label="公司名">
      <a-input v-model="company_name" disabled />
    </a-form-model-item>

    <a-form-model-item label="航线编号">
      <a-select  style="width: 600px" v-model="airline_id">
        <a-select-option value="1">
          1：上海到北京
        </a-select-option>
        <a-select-option value="2">
          2：上海到广东
        </a-select-option>
         <a-select-option value="3">
          3：上海到天津
        </a-select-option>
         <a-select-option value="4">
          4：北京到安徽
        </a-select-option>
         <a-select-option value="5">
          5：广东到安徽
        </a-select-option>
        <a-select-option value="6">
          6：安徽到上海
        </a-select-option>
        <a-select-option value="7">
          7：安徽到北京
        </a-select-option>
        <a-select-option value="8">
          8：安徽到天津
        </a-select-option>
        <a-select-option value="9">
          9：天津到广东
        </a-select-option>
        <a-select-option value="10">
          10: 安徽到广东
        </a-select-option>
      </a-select>
    </a-form-model-item>
   
    <a-form-model-item :wrapper-col="{ span: 14, offset: 12 }">
      <a-button type="primary" @click="add_company_airline_info()">
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
      false_flag:false,
      success_flag:false,
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
      company_name:'',
      airline_id:''
    };
  },
  methods: {
    init_company_info: function () {
      this.company_name = this.$cookies.get("company_name");
    },
    // onChange(date, dateString) {
    //   console.log(date, dateString);
    // },
    add_company_airline_info: function () {
      this.$axios({
        url: "http://127.0.0.1:5000/admin/add_company_airline_info_api",
        method: "post",
        data: {
          company_name:this.$cookies.get('company_name'),
          airline_id:this.airline_id
        },
      }).then((res) => {
        let data = res.data;
        if (data.success) {
          this.success_flag = true;
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