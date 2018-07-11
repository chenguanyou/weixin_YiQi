var data_list = new Array;

// 数据
function reconstructionArray(data) {
  var num = 0
  data_list = new Array()
  var data_length = data.length
  var data_power = Math.round(data_length / 2)

  // 创建数组
  for (var x = 0; x < data_power; x++) {
    data_list[x] = []
      for (var z = 0; z < 2; z++) {
        if (data[num] != null){
          data_list[x][z] = data[num]
          ++num
          continue
        }
      }
  }
  return data_list
}


// 用户的浏览记录, 收藏记录， 报名记录
function reconstructionArrays(data) {
  var num = 0
  data_list = new Array()
  var data_length = data.length
  var data_power = Math.round(data_length / 2)

  // 创建数组
  for (var x = 0; x < data_power; x++) {
    data_list[x] = []
    for (var z = 0; z < 2; z++) {
      if (data[num] != null) {
        data_list[x][z] = data[num]['activity']
        ++num
        continue
      }
    }
  }
  return data_list
}

// 随机取出一个元素
function getRandomArrayElements(arr, count) {
  var shuffled = arr.slice(0), i = arr.length, min = i - count, temp, index;
  while (i-- > min) {
    index = Math.floor((i + 1) * Math.random());
    temp = shuffled[index];
    shuffled[index] = shuffled[i];
    shuffled[i] = temp;
  }
  return shuffled.slice(min);
}

module.exports = {
  data_list: data_list,
  reconstructionArray: reconstructionArray,
  reconstructionArrays: reconstructionArrays,
  getRandomArrayElements: getRandomArrayElements,
}