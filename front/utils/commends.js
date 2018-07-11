// 评论处理
var result = new Array
var hz = new Array
var msg_list_dict = {}
var list_data = new Array
var n = 0

var Commection = function(data) {
  var num = 0
  hz = new Array
  // 获取父级评论
  for (var i = 0; i < data.length; i++) {
    if (data[i]['parent_comment'] == null) {
      result[num] = data[i]
      num++;
    } else {
      // 获取子级别评论
      for (var x = 0; x < result.length; x++) {
        if (result[x]['id'] == data[i]['parent_comment']) {
          list_data = new Array
          result[x]['child'] = list_data
          result[x]['child'].push(data[i])
        } else if (result[x]['id'] != data[i]['parent_comment']) {
          hz.push(data[i])
        }
      }
    }
  }
  console.log(result, hz)
  return result
}

module.exports = {
  Commection: Commection
}