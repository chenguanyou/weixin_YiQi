// let host = 'http://192.168.1.80:8001'

// let host = 'http://127.0.0.1:8001'

// let host = 'http://192.168.4.117:8001'

let host = 'https://api.goog8.com'

// 用户注册url
var Registered = host + '/users/Registered/'

// 用户登录url
var login = host + '/users/login/'

// 获取分类
var ActivityType = host + '/activity/ActivityTypeView/'

// 保存活动数据
var UploadTextDateView = host + '/activity/UploadTextDateView/'

// 获取首页幻灯片数据
var IndexSlide = host + '/activity/SlideIndexViewSet/'

// 活动搜索接口
var SearchAll = host + '/activity/SearchAllDateViewSet/?search='

// 获取数据详情
var Eventdetails = host + '/activity/SearchAllDateViewSet/'

// 地图数据
var MapModelAllDateViewSet = host + '/activity/MapModelAllDateViewSet/'

// 即将开始数据
var StartAllDataViewSet = host + '/activity/StartAllDataViewSet/'

// 获取通用分享数据
var GeneralSharingViewSet = host + '/SharingSet/GeneralSharingViewSet/'

// 获取活动页面分享数据
var ActivitySharingViewSet = host + '/SharingSet/ActivitySharingViewSet/'

// 获取分享用户
var SharingUserViewSet = host + '/userOperation/SharingUserViewSet/'

// 获取浏览用户
var BrowseUserViewSet = host + '/userOperation/BrowseUserViewSet/'

// 热门活动
var RegistrationAllDataViewSet = host + '/activity/RegistrationAllDataViewSet/'

// 获取小程序二维码
var Qr_Code = host + '/userOperation/QrCodeApi/'

// 报名信息
var ActivityUserInfo = host + '/userOperation/ActivityUserInfo/'

// 收藏和取消收藏功能
var ClooectionViewSet = host + '/userOperation/ClooectionViewSet/'

// 用户举报
var ReportionViewSet = host + '/userOperation/ReportionViewSet/'

// 获取每个活动下面的报名用户
var RegisteredUserViewSet = host + '/userOperation/RegisteredUserViewSet/'

// 获取当前活动的id
var CommentsModelsUserViewSet = host + '/userOperation/CommentsModelsUserViewSet/'

// 获取用户个人信息和修改用户个人信息
var GetUser = host + '/users/GetUser/'

// 获取当前用户发布的内容
var UserAllActivityView = host + '/userOperation/UserAllActivityView/'

// 获取当前用户的浏览记录
var UserbrowseView = host + '/userOperation/UserbrowseView/'

// 获取当前用户的收藏记录
var CollectionUserView = host + '/userOperation/CollectionUserView/'

// 获取当前用户的报名记录
var ActivityUserinfoView = host + '/userOperation/ActivityUserinfoView/'

// 反馈接口
var FeedBackViewSet = host + '/userOperation/FeedBackViewSet/'

// 获取系统消息
var SysMessages = host + '/messages/SysMessages/'

// 获取消息
var UserMessageListViewSet = host + '/messages/UserMessageListViewSet/'


module.exports = {
  login: login,
  GetUser: GetUser,
  Qr_Code: Qr_Code,
  SearchAll: SearchAll,
  IndexSlide: IndexSlide,
  Registered: Registered,
  SysMessages: SysMessages,
  Eventdetails: Eventdetails,
  ActivityType: ActivityType,
  UserbrowseView: UserbrowseView,
  FeedBackViewSet: FeedBackViewSet,
  ReportionViewSet: ReportionViewSet,
  ActivityUserInfo: ActivityUserInfo,
  BrowseUserViewSet: BrowseUserViewSet,
  CollectionUserView: CollectionUserView,
  ClooectionViewSet: ClooectionViewSet,
  SharingUserViewSet: SharingUserViewSet,
  UploadTextDateView: UploadTextDateView,
  UserAllActivityView: UserAllActivityView,
  StartAllDataViewSet: StartAllDataViewSet,
  GeneralSharingViewSet: GeneralSharingViewSet,
  ActivityUserinfoView: ActivityUserinfoView,
  RegisteredUserViewSet: RegisteredUserViewSet,
  ActivitySharingViewSet: ActivitySharingViewSet,
  MapModelAllDateViewSet: MapModelAllDateViewSet,
  UserMessageListViewSet: UserMessageListViewSet,
  CommentsModelsUserViewSet: CommentsModelsUserViewSet,
  RegistrationAllDataViewSet: RegistrationAllDataViewSet,
}