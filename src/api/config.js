// 接口地址
let api_base_url = ''
if (process.env.NODE_ENV === 'development') {
	// 开发地址，直接使用服务器部署的地址
	api_base_url = 'http://localhost:3000'
	// api_base_url = 'http://152.136.183.34:5000'
} else if (process.env.NODE_ENV === 'production') {
	// 生产模式的地址
	// api_base_url = 'https://netease-cloud-music-api-zeta-murex.vercel.app/'
	api_base_url = 'http://152.136.183.34:5000'
}

// 接口地址统一暴露
export default {
	api_base_url
}
