<template>
  <a-form-model :model="form" :label-col="labelCol" :wrapper-col="wrapperCol">
    <b-modal v-model="success_flag" title="添加成功"> 添加机场信息成功！</b-modal>
    <!-- <b-modal v-model="init_alert" title="初始化失败"> 初始化失败！ </b-modal> -->
    <b-modal v-model="false_flag" title="添加失败"> 添加机场信息失败！</b-modal>
    <a-form-model-item label="起飞机场">
      <a-input v-model="start_name"  />
    </a-form-model-item>
    <a-form-model-item label="到达机场">
      <a-input v-model="arrive_name" />
    </a-form-model-item>
    <a-form-model-item :wrapper-col="{ span: 14, offset: 12 }">
      <a-button type="primary" @click="add_airport_info()">
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
      start_name: '',
      arrive_name: '',
    };
  },
  methods: {
    add_airport_info: function () {
      this.$axios({
        url: "http://127.0.0.1:5000/admin/add_airport_info_api",
        method: "post",
        data: {
          start_name:this.start_name,
          arrive_name:this.arrive_name
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
};
</script>

<style>
</style>