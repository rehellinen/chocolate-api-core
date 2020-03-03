const { Controller, login } = require('libs')

export class Mock extends Controller {
  @login()
  getCount () {
    const data = [{
      title: '课程',
      num: '152',
      text: '上线的课程'
    }, {
      title: '学生',
      num: '874',
      text: '已认证的学生'
    }, {
      title: '任务',
      num: '452',
      text: '打卡任务'
    }, {
      title: '新闻',
      num: '98',
      text: '相关新闻'
    }]
    this.json({ data })
  }

  @login()
  getProgress () {
    const data = [{
      percentage: 50,
      title: '课程完成率',
      color: 'purple'
    }, {
      percentage: 70,
      title: '学生活跃率',
      color: 'orange'
    }, {
      percentage: 30,
      title: '完成任务率',
      color: 'blue'
    }]
    this.json({ data })
  }

  @login()
  getImage () {
    const data = [{
      id: 1,
      name: '1.jpg',
      url: 'https://m3.biz.itc.cn/pic/new/t/02/29/Img3162902_t.jpg'
    }, {
      id: 2,
      name: '2.jpg',
      url: 'https://m3.biz.itc.cn/pic/new/t/02/29/Img3162902_t.jpg'
    }, {
      id: 3,
      name: '3.jpg',
      url: 'https://m3.biz.itc.cn/pic/new/t/02/29/Img3162902_t.jpg'
    }]
    this.json({ data })
  }
}
