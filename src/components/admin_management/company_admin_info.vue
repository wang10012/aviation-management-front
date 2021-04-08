<template>
  <a-form-model :model="form" :label-col="labelCol" :wrapper-col="wrapperCol">
    <b-modal v-model="success_flag" title="修改成功"> 修改成功！</b-modal>
    <b-modal v-model="init_alert" title="初始化失败"> 初始化失败！ </b-modal>
    <b-modal v-model="false_flag" title="修改失败"> 修改失败！</b-modal>
    <a-form-model-item label="公司名">
      <a-input v-model="form.company_name" disabled />
    </a-form-model-item>
    <a-form-model-item label="密码">
      <a-input-password v-model="form.company_password" />
    </a-form-model-item>
    <a-form-model-item label="联系方式">
      <a-input v-model="form.call_number"  />
    </a-form-model-item>

    <a-form-model-item :wrapper-col="{ span: 14, offset: 6 }">
      <a-button type="primary" @click="change_company_info()">
        修改
        <!-- 想做一个弹窗确认再修改成功的效果 TODO -->
      </a-button>
    </a-form-model-item>
  </a-form-model>
</template>

<script>
export default {
  data() {
    return {
      success_flag: false,
      init_alert: false,
      false_flag: false,
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
      form: {
        company_name: "",
        company_password: "",
        call_number: "",
      },
    };
  },
  created: function () {
    this.init_company_info();
  },
  methods: {
    init_company_info: function () {
      this.$axios({
        url: "http://127.0.0.1:5000/admin/get_company_info_api",
        method: "post",
        data: {
          company_name: this.$cookies.get("company_name"),
          company_password:this.$cookies.get('company_password')
        },
      }).then((res) => {
        let data = res.data;
        if (data.success) {
          this.form.company_name = data.company_info.company_name;
          this.form.company_password = data.company_info.company_password;
          this.form.call_number = data.company_info.call_number;
        } else {
          console.log(this);
          this.init_alert = true; //TODO
        }
      });
    },
    change_company_info: function () {
      this.$axios({
        url: "http://127.0.0.1:5000/admin/complete_company_info_api",
        method: "post",
        data: {
          company_name:this.$cookies.get('company_name'),
          company_password:this.form.company_password,
          call_number:this.form.call_number
        },
      }).then((res) => {
        let data = res.data;
        if (data.success) {
          this.success_flag = true;
          this.init_company_info();
        } else {
          this.false_flag = true;
        }
      });
    },
  },
};
</script>
<style>
</style>