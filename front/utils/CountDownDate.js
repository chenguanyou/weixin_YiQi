function CountDownDate(o) {
  var www_qsyz_net = /^[\d]{4}-[\d]{1,2}-[\d]{1,2}( [\d]{1,2}:[\d]{1,2}(:[\d]{1,2})?)?$/ig,
    str = '',
    conn, s;
  if (!o.match(www_qsyz_net)) {
    alert('参数格式为2012-01-01[ 01:01[:01]].\r其中[]内的内容可省略');
    return false;
  }
  var sec = (new Date(o.replace(/-/ig, '/')).getTime() - new Date().getTime()) / 1000;
  if (sec > 0) {
    conn = '还有';
  } else {
    conn = '已过去';
    sec *= -1;
  }
  s = {
    'day': Math.floor(sec / 24 / 3600),
    'when': Math.floor(sec / 3600 % 24),
    'points': Math.floor(sec / 60 % 60),
    'seconds': Math.floor(sec % 60)
  };
  var i = 0
  for (i in s) {
    if (Math.floor(s[i]) > 0) str += Math.floor(s[i]) + i;
  }
  if (Math.floor(sec) == 0) {
    str = '0秒';
  }

  return s
  setTimeout(function () {
    count_down(o)
  }, 1000);
}

module.exports = {
  CountDownDate: CountDownDate
}