<template>
  <a-result
    status="success"
    title="成功订票"
    sub-title="您已经购票成功!."
  >
    <template #extra>
      <a-button @click="go_to_ticket_show()" key="go_ticket_show" type="primary">
        我的订单
      </a-button>
      <a-button @click="go_to_first_page()" key="go_first_page">
        返回订票页面
      </a-button>
    </template>
  </a-result>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods:{
    go_to_first_page:function(){
        this.$router.push('/first_page')
    },
    go_to_ticket_show:function(){
        this.$router.push('/ticket_show');
    }
  }
};
</script>

<style>
</style>