const baseUrl = 'http://127.0.0.1:3001/'

export default {
  header: {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  },
  backup: {
    avatar: 'http://res.cloudinary.com/gougou/image/upload/gougou.png'
  },
  qiniu: {
    video: 'http://p602wqzqa.bkt.clouddn.com/',
    thumb: 'http://p602wqzqa.bkt.clouddn.com/',
    avatar: 'http://p5u04gsl9.bkt.clouddn.com/',
    upload: 'https://upload.qiniu.com'
  },
  cloudinary: {
    cloud_name: 'shanghai-zhiyin',  
    api_key: '755435465729744',  
    base: '	http://res.cloudinary.com/shanghai-zhiyin',
    image: 'https://api.cloudinary.com/v1_1/shanghai-zhiyin/image/upload',
    video: 'https://api.cloudinary.com/v1_1/shanghai-zhiyin/video/upload',
    audio: 'https://api.cloudinary.com/v1_1/shanghai-zhiyin/raw/upload',
  },
  api: {
    creations: baseUrl + 'api/creations',
    comment: baseUrl + 'api/comments',
    up: baseUrl + 'api/up',
    video: baseUrl + 'api/creations/video',
    audio: baseUrl + 'api/creations/audio',
    signup: baseUrl + 'api/u/signup',
    verify: baseUrl + 'api/u/verify',
    update: baseUrl + 'api/u/update',
    signature: baseUrl + 'api/signature'
  }
}