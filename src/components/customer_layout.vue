<template>
  <a-layout id="components-layout-demo-custom-trigger">
    <a-layout-sider v-model="collapsed" :trigger="null" collapsible>
      <div class="logo" />
      <a-menu theme="dark" mode="inline" :default-selected-keys="['1']">

        <a-menu-item key="1">
          <router-link to="/first_page">
            <a-icon type="user" />
            <span>航班查找</span>
          </router-link>
        </a-menu-item>

        <a-sub-menu key="sub1">
          <span slot="title"><a-icon type="edit" /><span>用户信息管理</span></span>
          <a-menu-item key="2">
            <router-link to="/customer_info_management">
              <a-icon type="edit" />
              <span>个人信息管理</span>
            </router-link>
          </a-menu-item>
          <a-menu-item key="3">
            <router-link to="/vip_register">
              <a-icon type="edit" />
              <span>注册VIP</span>
            </router-link>
          </a-menu-item>
        </a-sub-menu>

  
        <a-menu-item key="4">
          <router-link to="/ticket_show">
            <a-icon type="upload" />
            <span>我的订票</span>
          </router-link>
        </a-menu-item>

        <a-menu-item key="5">
          <router-link to="/">
            <a-icon type="upload" />
            <span>退出登录</span>
          </router-link>
        </a-menu-item>

      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <a-icon
          class="trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="() => (collapsed = !collapsed)"
        />
      </a-layout-header>
      <a-layout-content
        :style="{
          margin: '24px 16px',
          padding: '24px',
          background: '#eaf8fe',
          minHeight: '280px',
        }"
      >
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
export default {
  data() {
    return {
      collapsed: false,
    };
  },
};
</script>
<style>
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.205);
  margin: 16px;
}
</style>