<template>
  <a-form-model :model="form" :label-col="labelCol" :wrapper-col="wrapperCol">
    <b-modal v-model="success_flag" title="修改成功"> 修改成功！</b-modal>
    <b-modal v-model="init_alert" title="初始化失败"> 初始化失败！ </b-modal>
    <b-modal v-model="false_flag" title="修改失败"> 修改失败！</b-modal>
    <a-form-model-item label="用户名">
      <a-input v-model="form.username" disabled />
    </a-form-model-item>
    <a-form-model-item label="姓名">
      <a-input v-model="form.name" disabled/>
    </a-form-model-item>
    <a-form-model-item label="手机号码">
      <a-input v-model="form.phone_number" disabled/>
    </a-form-model-item>
     <a-form-model-item label="密码">
      <a-input-password  v-model="form.password" />
    </a-form-model-item>
    <a-form-model-item label="年龄">
      <a-input type='text' v-model="form.age"/>
    </a-form-model-item>
    <a-form-model-item label="性别">
      <a-select default-value="男" style="width: 120px" v-model="form.gender">
        <a-select-option value="男">
          男
        </a-select-option>
        <a-select-option value="女">
          女
        </a-select-option>
      </a-select>
    </a-form-model-item>
    <a-form-model-item label="身份证号">
      <a-input type='text' v-model="form.ID_number"/>
    </a-form-model-item>

    <div v-if="is_vip_flag" class="vip">
      <a-form-model-item label="vip积分">
        <p>{{form.score}}</p>
      </a-form-model-item>
      <a-form-model-item label="vip等级">
        <p>{{form.VIP_class}}</p>
      </a-form-model-item>
    </div>

    <a-form-model-item :wrapper-col="{ span: 14, offset: 6 }">
      <a-button type="primary" @click="change_customer_info">
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
      is_vip_flag:false,
      success_flag:false,
      init_alert:false,
      false_flag:false,
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
      form: {
        username:'',
        name: '',
        password:'',
        phone_number:'',
        age:'',
        gender:'',
        ID_number:'',
        score:'',
        VIP_class:''
      },
    };
  },
  created: function () {
    this.is_vip();
    this.init_customer_info();
  },
  methods: {
    is_vip:function(){
      this.$axios({
        url: "http://127.0.0.1:5000/customer/get_vip_info_api",
        method: "post",
        data: {
          username: this.$cookies.get("username"),
        },
      }).then((res) => {
        let data = res.data;
        if (data.success){
          this.is_vip_flag = true;
          this.form.score = data.vip_customer_info.score;
          this.form.VIP_class = data.vip_customer_info.VIP_class;
        }
      });
    },

    init_customer_info:function(){
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
          this.form.phone_number = data.customer_info.phone_number;
          this.form.age = data.customer_info.age;
          this.form.gender = data.customer_info.gender;
          this.form.ID_number = data.customer_info.ID_number
        } else {
          console.log(this);
          this.init_alert = true;//TODO
        }
      });
    },
    change_customer_info:function(){
      this.$axios({
        url: "http://127.0.0.1:5000/customer/complete_per_info_api",
        method: "post",
        data: {
          username:this.form.username,
          age:this.form.age,
          gender:this.form.gender,
          ID_number:this.form.ID_number
        },
      }).then((res) => {
        let data = res.data;
        if (data.success) {
          this.success_flag = true;
          this.init_customer_info();
        } else {
          this.false_flag = true;
        }
      });
    },
  },
};
</script>
<style>
label {
  font-size: 1.5em;
}
</style>