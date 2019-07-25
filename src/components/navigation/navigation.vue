<template>
  <div id="primary-nav">
    <div class="container-fluid">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <a class="navbar-brand" href="/"></a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" 
          data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" 
          aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="row collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav w-100">
                <li class="nav-item">
                    <router-link :to="{ name: '' }" class="nav-link"><i class="fa fa-newspaper-o" aria-hidden="true"></i> Stake With Us
                    </router-link>
                </li>
                <!-- <li class="nav-item">
                    <router-link :to="{ name: '' }" class="nav-link"><i class="fa fa-level-down" aria-hidden="true"></i> Nhập Cùi
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link :to="{ name: '' }" class="nav-link"><i class="fa fa-level-up" aria-hidden="true"></i> Giao Cùi
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link :to="{ name: '' }" class="nav-link"><i class="fa fa-random" aria-hidden="true"></i> Chọn Số
                    </router-link>
                </li>
                <li class="nav-item ">
                    <router-link :to="{ name: '' }" class="nav-link">
                        <i class="fa fa-gift" aria-hidden="true"></i> Trả Thưởng
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link :to="{ name: '' }" class="nav-link">
                        <i class="fa fa-object-group" aria-hidden="true"></i> Báo Cáo
                    </router-link>
                </li> -->
                <!-- <li class="nav-item dropdown">
                    <a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown" 
                    role="button" aria-expanded="false">
                    <i class="fa fa-cogs" aria-hidden="true"></i> Hệ Thống
                    </a>

                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <li><router-link :to="{ name:'' }" class="dropdown-item">
                            <i class="fa fa-object-ungroup" aria-hidden="true"></i> Danh sách Công ty</router-link></li>
                          
                        <li><router-link :to="{ name: '' }" class="dropdown-item">
                            <i class="fa fa-building-o" aria-hidden="true"></i> Đại Lý</router-link></li>

                        <li><router-link :to="{ name: 'users' }" class="dropdown-item">
                            <i class="fa fa-users" aria-hidden="true"></i> Người Dùng</router-link></li>

                        
                    </div>
                </li> -->
                <!-- <li class="nav-item ml-auto"><h4>Tổng hạn mức: <a href="#" class="badge badge-danger">0 đ</a></h4></li> -->
                <!-- <li class="nav-item dropdown ml-auto">
                  <a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown" 
                    role="button" aria-expanded="false">
                        Chào <strong> </strong>
                        <span class="caret"></span>
                    </a>
                  <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
                    <router-link :to="{ name: '' }" class="dropdown-item">
                        <i class="fa fa-address-card" aria-hidden="true"></i> Thông tin người dùng
                    </router-link>
                    <a href="/login" @click="logout()" class="dropdown-item">
                    <i class="fa fa-sign-out" aria-hidden="true"></i> Đăng xuất
                    </a>
                  </div>
                </li> -->
            </ul>
          </div>
        </nav>
    </div>
  </div>
</template>

<script>
export default {
  methods:{
    logout(){
      this.$store.dispatch('authentication/logout');
    }
  }
};
</script>