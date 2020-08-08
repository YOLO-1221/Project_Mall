import axios from 'axios'

// 最终封装写法
export function request(config) {
  // 1、创建axios的实例
  const instance = axios.create({
    baseURL: "http://152.136.185.210:8000/api/z8",
    timeout: 10000,
    // 给header拼接其他信息
    headers: {

    }
  })

  // 2、axios的拦截器
  // 请求拦截
  instance.interceptors.request.use(config => {
    // 跟下边的config是同一个
    // console.log(config);
    return config
  }, err => {
    // console.log(err);
  })

  // 响应拦截
  instance.interceptors.response.use(res => {
    // console.log(res);
    return res.data
  }, err => {
    console.log(err);
  })

  // 3、发送真正的网络请求
  return instance(config)   // 这个函数是一个Promise对象
}
