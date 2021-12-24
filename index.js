// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
云函数changeGood

// 云函数入口函数
exports.main = async (event, context) => {
  if (event.action == 'remove') { //  删除商品
    return await cloud.database().collection('goods').doc(event.id).remove()
  } else if (event.action == 'songda') { //商品送达，待用户评价
    return await cloud.database().collection('order').doc(event.id).update({
      data: {
        //-1订单取消,0新下单发货,1已收货待评价,2订单已完成
        status: 1
      }
    })
  }



const db = cloud.database()
const _ = db.command
const dbGood = db.collection('goods')

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  if (event.action == 'search' && event.searchKey) { //搜索商品
    return await dbGood.where({
        name: db.RegExp({
          regexp: event.searchKey,
          options: 'i'
        }),
        status: '上架',
        num: _.gt(0) //剩余数量需要大于0
      })
      .orderBy('_createTime', 'desc').get()
  } else if (event.action == 'getNew') { //获取最新的商品
    return await dbGood.where({
        status: '上架',
        num: _.gt(0) //剩余数量需要大于0
      })
      .orderBy('_createTime', 'desc')
      .get()
  } else if (event.action == 'getHot') { //获取首页推荐位热门商品
    return await dbGood.where({
        status: '上架',
        tuijian: true,
        num: _.gt(0) //剩余数量需要大于0
      })
      .orderBy('_createTime', 'desc')
      .get()
  } else if (event.action == 'seller') { //获取我发布的商品
    return await dbGood.where({
        _openid: wxContext.OPENID
      })
      .get()
  } else { //获取100条商品
    return await dbGood.where({
      status: '上架',
      num: _.gt(0) //剩余数量需要大于0
    }).get()
  }
main
}