<template>
  <a-form-model :model="form" :label-col="labelCol" :wrapper-col="wrapperCol">
    <b-modal v-model="vip_register_flag" title="VIP注册">VIP注册成功！</b-modal>
    <b-modal v-model="init_alert" title="初始化失败"> 初始化失败！ </b-modal>
    <a-form-model-item label="用户名">
      <a-input v-model="form.username" disabled />
    </a-form-model-item>
    <a-form-model-item label="姓名">
      <a-input v-model="form.name" disabled />
    </a-form-model-item>
    <a-form-model-item label="密码">
      <a-input-password  v-model="form.password" disabled />
    </a-form-model-item>

    <div v-if="is_vip_flag">
      <a-form-model-item :wrapper-col="{ span: 14, offset: 6 }">
        <p style="font-size:15px;color:red;font-weight:bold">您已经是VIP会员了！</p>
        <a-button type="primary" block disabled>
         注册VIP会员
          <!-- 想做一个弹窗确认再修改成功的效果 TODO -->
        </a-button>
      </a-form-model-item>
    </div>

    <div v-else>
      <a-form-model-item :wrapper-col="{ span: 14, offset: 6 }">
        <a-button type="primary" block @click="set_vip()">
          注册VIP会员
          <!-- 想做一个弹窗确认再修改成功的效果 TODO -->
        </a-button>
      </a-form-model-item>
    </div>
  </a-form-model>
</template>

<script>
export default {
  data() {
    return {
      is_vip_flag: false,
      vip_register_flag: false,
      init_alert: false,
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
      form: {
        username: "",
        name: "",
        password: "",
      },
    };
  },
  created: function () {
    this.is_vip();
    this.init_info();
  },
  methods: {
    is_vip: function () {
      this.$axios({
        url: "http://127.0.0.1:5000/customer/is_vip_api",
        method: "post",
        data: {
          username: this.$cookies.get("username"),
        },
      }).then((res) => {
        let data = res.data;
        if (data.success) {
          this.is_vip_flag = true;
        }
      });
    },
    set_vip: function () {
      this.$axios({
        url: "http://127.0.0.1:5000/customer/set_vip_api",
        method: "post",
        data: {
          username: this.$cookies.get("username"),
        },
      }).then((res) => {
        let data = res.data;
        if (data.success) {
          this.vip_register_flag = true;
        }
      });
    },

    init_info: function () {
      this.$axios({
        url: "http://127.0.0.1:5000/customer/get_customer_info_api",
        method: "post",
        data: {
          username: this.$cookies.get("username"),
        },
      }).then((res) => {
        let data = res.data;
        if (data.success) {
          this.form.username = data.customer_info.username;
          this.form.name = data.customer_info.name;
          this.form.password = data.customer_info.password;
        } else {
          console.log(this);
          this.init_alert = true; //TODO
        }
      });
    },
  },
};
</script>

<style>
</style>