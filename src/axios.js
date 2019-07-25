const axios = require('axios')
import main from './main.js'

axios.interceptors.request.use(
  success => {
    return success
  },
  error => {
    main.$toastr.error($t(error.response.data.message), main.$t('message.error'), {})
    return Promise.reject(error)
  }
)
axios.interceptors.response.use(
  success => {
    return success
  },
  error => {
    if (error.response.data.error === 'token_expired') {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      return Promise.reject(error)
    }else if (error.response.data.error === 'invalid.credentials') {
      main.$toastr.error("Không đúng tên đăng nhập hoặc mật khẩu", "Đăng nhập không thành công!",{})
      return Promise.reject(error)
    } else if(error.response.data.error==='invalid.reset.password.email'){
      main.$toastr.error("Email không tồn tại!", "đã có lỗi xảy ra",{})
      return Promise.reject(error)
    }
    else{
      main.$toastr.error("Vui lòng thử lại", "Có lỗi xảy ra!",{})
      return Promise.reject(error)
    }
  }
)

export default axios
