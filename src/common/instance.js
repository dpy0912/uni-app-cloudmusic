// 配置接口定义以及拦截器
import axios from 'axios'
import config from '@/api/config.js'
import qs from 'qs'

const {
	// eslint-disable-next-line camelcase
	api_base_url
} = config

// 创建axios实例
let instance = axios.create({
	time: 1000 * 60,
	baseURL: api_base_url,
	header: {
		'X-Requested-With': 'XMLHttpRequest',
		'Content-Type': 'multipart/form-data;application/json;charset=UTF-8;'
	}
})
// 请求数据返回结果为json类型
// #ifdef APP-PLUS || H5
instance.defaults.responseType = 'json'
// #ifdef MP
instance.defaults.responseType = 'text'
// 是否开启上传凭证， 为true获得的第三方cookies，
// 将会依旧享受同源策略，因此不能被通过document.cookie或者从头部相应请求的脚本等访问。
instance.defaults.withCredentials = true
// 格式化请求数据，返回结果为字符串
instance.defaults.transformRequest = [
	data => {
		return qs.stringify(data)
	}
]
// instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

// promise 将被 resolve; 否则，promise 将被 rejecte
instance.defaults.validateStatus = function() {
	return true
}

// 添加请求拦截器
instance.interceptors.request.use(
	config => {
		// if (config.method === 'POST') {
		// 	config.data = JSON.stringify(config.data);
		// }
		return config

	},
	error => {
		Message.error({
			message: '请求超时了!'
		})
		return Promise.reject(error)
	}
)

// 添加响应拦截器,做登录响应的拦截
instance.interceptors.response.use((response) => {
	let data = response.data
	let status = response.status
	if (status === 200) {
		return Promise.resolve(data)
	} else if (status === 301) {
		uni.showToast({
			title: '需要登录',
			icon: 'error'
		})
		// uni.switchTab({
		// 	url: '/pages/login/index'
		// })
		this.$Router.push({
			name: 'Login'
		})
	} else {
		return Promise.reject(response)
	}
}, function(error) {
	return Promise.reject(error)
})

// 请求方式
let ajaxMethod = ['get', 'post']

let api = {}
ajaxMethod.forEach(method => {
	api[method] = function(url, data, config) {
		return new Promise(function(resolve, reject) {
			instance[method](url, data, config).then((response) => {
				// 成功调用promise
				resolve(response)
			}).catch((error) => {
				//   调用promise失败
				reject(error)
			})
		})
	}
})
// 暴露
export default api
