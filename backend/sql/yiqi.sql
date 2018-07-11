/*
 Navicat Premium Data Transfer

 Source Server         : 本机Mysql数据库
 Source Server Type    : MySQL
 Source Server Version : 50720
 Source Host           : localhost:3306
 Source Schema         : yiqi

 Target Server Type    : MySQL
 Target Server Version : 50720
 File Encoding         : 65001

 Date: 11/07/2018 11:01:12
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for SharingSet_sharingsetmodel
-- ----------------------------
DROP TABLE IF EXISTS `SharingSet_sharingsetmodel`;
CREATE TABLE `SharingSet_sharingsetmodel` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `set_path` varchar(1) NOT NULL,
  `title` varchar(50) NOT NULL,
  `imageUrl` varchar(100) DEFAULT NULL,
  `addtime` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of SharingSet_sharingsetmodel
-- ----------------------------
BEGIN;
INSERT INTO `SharingSet_sharingsetmodel` VALUES (1, '0', '旅行真正的快乐不在于目的地，而在于它的过程。', 'SharingSet/18/04/ce7a3e1c8cce43d0801f2df98c386aec/tooopen_sy_141357577876.jpg', '2018-07-04 10:29:58.000000');
INSERT INTO `SharingSet_sharingsetmodel` VALUES (2, '0', '人生就是一场旅行，不在乎目的地，在乎的应该是沿途的风景以及看风景的心情。', 'SharingSet/18/04/ce7a3e1c8cce43d0801f2df98c386aec/tooopen_sy_115615561524369.jpg', '2018-07-04 10:36:14.000000');
INSERT INTO `SharingSet_sharingsetmodel` VALUES (3, '1', '梦想，并不奢侈，只要勇敢地迈出第一步。', 'SharingSet/18/04/fb5be8762d3e478abd6b0fd5edf93a14/tooopen_sy_234110021676.jpg', '2018-07-04 11:05:33.000000');
INSERT INTO `SharingSet_sharingsetmodel` VALUES (4, '1', '要么读书、要么旅行，灵魂和身体，必须有一个在路上。', 'SharingSet/18/04/fb5be8762d3e478abd6b0fd5edf93a14/timg.jpeg', '2018-07-04 11:06:23.000000');
INSERT INTO `SharingSet_sharingsetmodel` VALUES (5, '1', '人生最好的旅行，就是你在一个陌生的地方，发现一种久违的感动。', 'SharingSet/18/04/3f1dc3c49a424e3ba05a26fb25753a80/tooopen_sy_212262971441.jpg', '2018-07-04 11:54:41.000000');
INSERT INTO `SharingSet_sharingsetmodel` VALUES (6, '1', '因为有梦，所以勇敢出发，选择出发，便只顾风雨兼程。', 'SharingSet/18/04/3f1dc3c49a424e3ba05a26fb25753a80/tooopen_sy_191622676468.jpg', '2018-07-04 11:56:06.000000');
INSERT INTO `SharingSet_sharingsetmodel` VALUES (7, '1', '每个人心中，都会有一个古镇情怀，流水江南，烟笼人家。', 'SharingSet/18/04/3f1dc3c49a424e3ba05a26fb25753a80/tooopen_sy_123995289533.jpg', '2018-07-04 11:56:53.000000');
INSERT INTO `SharingSet_sharingsetmodel` VALUES (8, '0', '记录沿途的心情，那样的生活才是我想要的。', 'SharingSet/18/04/672430092210403c8b56c262bcb9215e/tooopen_sy_141343367572.jpg', '2018-07-04 13:46:16.000000');
INSERT INTO `SharingSet_sharingsetmodel` VALUES (9, '0', '和TA一起，在路上遇见最真实的自己。', 'SharingSet/18/04/672430092210403c8b56c262bcb9215e/tooopen_sy_233746431863.jpg', '2018-07-04 13:47:37.000000');
INSERT INTO `SharingSet_sharingsetmodel` VALUES (10, '0', '要学会随遇而安，淡然一点，走走停停。', 'SharingSet/18/04/672430092210403c8b56c262bcb9215e/tooopen_sy_120548398993.jpg', '2018-07-04 13:50:46.000000');
COMMIT;

-- ----------------------------
-- Table structure for activity_activityimagesmodel
-- ----------------------------
DROP TABLE IF EXISTS `activity_activityimagesmodel`;
CREATE TABLE `activity_activityimagesmodel` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `image` varchar(100) DEFAULT NULL,
  `addtime` datetime(6) NOT NULL,
  `activity_id` int(11) NOT NULL,
  `indexnum` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `activity_activityima_activity_id_505c602c_fk_activity_` (`activity_id`),
  CONSTRAINT `activity_activityima_activity_id_505c602c_fk_activity_` FOREIGN KEY (`activity_id`) REFERENCES `activity_activitymodel` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for activity_activitymodel
-- ----------------------------
DROP TABLE IF EXISTS `activity_activitymodel`;
CREATE TABLE `activity_activitymodel` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cover_image` varchar(100) DEFAULT NULL,
  `title` varchar(50) NOT NULL,
  `content` longtext NOT NULL,
  `startdate` datetime(6) NOT NULL,
  `enddate` datetime(6) NOT NULL,
  `address` varchar(255) NOT NULL,
  `limitnum` int(11) NOT NULL,
  `username` varchar(3) NOT NULL,
  `wechat` varchar(20) NOT NULL,
  `groupcode` varchar(100) DEFAULT NULL,
  `istrue` tinyint(1) NOT NULL,
  `thedraft` tinyint(1) NOT NULL,
  `activitytype_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `latitude` varchar(200) NOT NULL,
  `longitude` varchar(200) NOT NULL,
  `addtime` datetime(6) NOT NULL,
  `audit` varchar(1) NOT NULL,
  `registration_number` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `activity_activitymodel_user_id_ed877846_fk_users_userprofile_id` (`user_id`),
  KEY `activity_activitymod_activitytype_id_689a8f86_fk_activity_` (`activitytype_id`),
  CONSTRAINT `activity_activitymod_activitytype_id_689a8f86_fk_activity_` FOREIGN KEY (`activitytype_id`) REFERENCES `activity_activitytypemodel` (`id`),
  CONSTRAINT `activity_activitymodel_user_id_ed877846_fk_users_userprofile_id` FOREIGN KEY (`user_id`) REFERENCES `users_userprofile` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for activity_activitytypemodel
-- ----------------------------
DROP TABLE IF EXISTS `activity_activitytypemodel`;
CREATE TABLE `activity_activitytypemodel` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `Introduction` longtext NOT NULL,
  `indexnum` int(11) NOT NULL,
  `addtime` datetime(6) NOT NULL,
  `cover_image` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of activity_activitytypemodel
-- ----------------------------
BEGIN;
INSERT INTO `activity_activitytypemodel` VALUES (1, '城市探险', '对城市中的人造建筑展开的探险...', 0, '2018-07-01 02:05:17.000000', 'ActivityTypeModel/18/01/1a3398f04eab4bcf86b779d26f1f8991/tooopen_sy_183358335862037.jpg');
INSERT INTO `activity_activitytypemodel` VALUES (2, '骑行', '骑行是一种健康自然的运动旅游方式 ，能充分享受旅行过程之美 。一辆单车，一个背包即可出行 ，简单又环保。在不断而来的困难当中体验挑战，在旅途的终点体验成功', 1, '2018-07-01 02:07:02.000000', 'ActivityTypeModel/18/01/1a3398f04eab4bcf86b779d26f1f8991/tooopen_sy_119046289467.jpg');
INSERT INTO `activity_activitytypemodel` VALUES (3, '读书', '阅读是一种习惯，书中自有颜如玉！', 2, '2018-07-01 02:08:07.000000', 'ActivityTypeModel/18/01/1a3398f04eab4bcf86b779d26f1f8991/tooopen_sy_234299941827.jpg');
INSERT INTO `activity_activitytypemodel` VALUES (4, '游戏', '玩玩游戏，时刻放松一下！', 3, '2018-07-01 02:09:10.000000', 'ActivityTypeModel/18/01/1a3398f04eab4bcf86b779d26f1f8991/tooopen_sy_126646593189.jpg');
INSERT INTO `activity_activitytypemodel` VALUES (5, '旅行', '看看身边的景色和事物，行万里路，读万卷书！', 4, '2018-07-01 02:10:20.000000', 'ActivityTypeModel/18/01/1a3398f04eab4bcf86b779d26f1f8991/tooopen_sy_230185184143.jpg');
INSERT INTO `activity_activitytypemodel` VALUES (6, '其他', '其余，不分人与物！', 5, '2018-07-01 02:13:00.000000', 'ActivityTypeModel/18/01/1a3398f04eab4bcf86b779d26f1f8991/tooopen_sy_211426474221.jpg');
COMMIT;

-- ----------------------------
-- Table structure for activity_slidemodels
-- ----------------------------
DROP TABLE IF EXISTS `activity_slidemodels`;
CREATE TABLE `activity_slidemodels` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `image` varchar(100) DEFAULT NULL,
  `indexnum` int(11) NOT NULL,
  `addtime` datetime(6) NOT NULL,
  `activity_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `activity_slidemodels_activity_id_f8f0529f_fk_activity_` (`activity_id`),
  CONSTRAINT `activity_slidemodels_activity_id_f8f0529f_fk_activity_` FOREIGN KEY (`activity_id`) REFERENCES `activity_activitymodel` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for auth_group
-- ----------------------------
DROP TABLE IF EXISTS `auth_group`;
CREATE TABLE `auth_group` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(80) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for auth_group_permissions
-- ----------------------------
DROP TABLE IF EXISTS `auth_group_permissions`;
CREATE TABLE `auth_group_permissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `group_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for auth_permission
-- ----------------------------
DROP TABLE IF EXISTS `auth_permission`;
CREATE TABLE `auth_permission` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `content_type_id` int(11) NOT NULL,
  `codename` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`),
  CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=109 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of auth_permission
-- ----------------------------
BEGIN;
INSERT INTO `auth_permission` VALUES (1, 'Can add log entry', 1, 'add_logentry');
INSERT INTO `auth_permission` VALUES (2, 'Can change log entry', 1, 'change_logentry');
INSERT INTO `auth_permission` VALUES (3, 'Can delete log entry', 1, 'delete_logentry');
INSERT INTO `auth_permission` VALUES (4, 'Can view log entry', 1, 'view_logentry');
INSERT INTO `auth_permission` VALUES (5, 'Can add permission', 2, 'add_permission');
INSERT INTO `auth_permission` VALUES (6, 'Can change permission', 2, 'change_permission');
INSERT INTO `auth_permission` VALUES (7, 'Can delete permission', 2, 'delete_permission');
INSERT INTO `auth_permission` VALUES (8, 'Can add group', 3, 'add_group');
INSERT INTO `auth_permission` VALUES (9, 'Can change group', 3, 'change_group');
INSERT INTO `auth_permission` VALUES (10, 'Can delete group', 3, 'delete_group');
INSERT INTO `auth_permission` VALUES (11, 'Can view group', 3, 'view_group');
INSERT INTO `auth_permission` VALUES (12, 'Can view permission', 2, 'view_permission');
INSERT INTO `auth_permission` VALUES (13, 'Can add content type', 4, 'add_contenttype');
INSERT INTO `auth_permission` VALUES (14, 'Can change content type', 4, 'change_contenttype');
INSERT INTO `auth_permission` VALUES (15, 'Can delete content type', 4, 'delete_contenttype');
INSERT INTO `auth_permission` VALUES (16, 'Can view content type', 4, 'view_contenttype');
INSERT INTO `auth_permission` VALUES (17, 'Can add session', 5, 'add_session');
INSERT INTO `auth_permission` VALUES (18, 'Can change session', 5, 'change_session');
INSERT INTO `auth_permission` VALUES (19, 'Can delete session', 5, 'delete_session');
INSERT INTO `auth_permission` VALUES (20, 'Can view session', 5, 'view_session');
INSERT INTO `auth_permission` VALUES (21, 'Can add 用户管理', 6, 'add_userprofile');
INSERT INTO `auth_permission` VALUES (22, 'Can change 用户管理', 6, 'change_userprofile');
INSERT INTO `auth_permission` VALUES (23, 'Can delete 用户管理', 6, 'delete_userprofile');
INSERT INTO `auth_permission` VALUES (24, 'Can view 用户管理', 6, 'view_userprofile');
INSERT INTO `auth_permission` VALUES (25, 'Can add Bookmark', 7, 'add_bookmark');
INSERT INTO `auth_permission` VALUES (26, 'Can change Bookmark', 7, 'change_bookmark');
INSERT INTO `auth_permission` VALUES (27, 'Can delete Bookmark', 7, 'delete_bookmark');
INSERT INTO `auth_permission` VALUES (28, 'Can add log entry', 8, 'add_log');
INSERT INTO `auth_permission` VALUES (29, 'Can change log entry', 8, 'change_log');
INSERT INTO `auth_permission` VALUES (30, 'Can delete log entry', 8, 'delete_log');
INSERT INTO `auth_permission` VALUES (31, 'Can add User Setting', 9, 'add_usersettings');
INSERT INTO `auth_permission` VALUES (32, 'Can change User Setting', 9, 'change_usersettings');
INSERT INTO `auth_permission` VALUES (33, 'Can delete User Setting', 9, 'delete_usersettings');
INSERT INTO `auth_permission` VALUES (34, 'Can add User Widget', 10, 'add_userwidget');
INSERT INTO `auth_permission` VALUES (35, 'Can change User Widget', 10, 'change_userwidget');
INSERT INTO `auth_permission` VALUES (36, 'Can delete User Widget', 10, 'delete_userwidget');
INSERT INTO `auth_permission` VALUES (37, 'Can view Bookmark', 7, 'view_bookmark');
INSERT INTO `auth_permission` VALUES (38, 'Can view log entry', 8, 'view_log');
INSERT INTO `auth_permission` VALUES (39, 'Can view User Setting', 9, 'view_usersettings');
INSERT INTO `auth_permission` VALUES (40, 'Can view User Widget', 10, 'view_userwidget');
INSERT INTO `auth_permission` VALUES (41, 'Can add Token', 11, 'add_token');
INSERT INTO `auth_permission` VALUES (42, 'Can change Token', 11, 'change_token');
INSERT INTO `auth_permission` VALUES (43, 'Can delete Token', 11, 'delete_token');
INSERT INTO `auth_permission` VALUES (44, 'Can view Token', 11, 'view_token');
INSERT INTO `auth_permission` VALUES (45, 'Can add 活动图片管理', 12, 'add_activityimagesmodel');
INSERT INTO `auth_permission` VALUES (46, 'Can change 活动图片管理', 12, 'change_activityimagesmodel');
INSERT INTO `auth_permission` VALUES (47, 'Can delete 活动图片管理', 12, 'delete_activityimagesmodel');
INSERT INTO `auth_permission` VALUES (48, 'Can add 发布活动管理', 13, 'add_activitymodel');
INSERT INTO `auth_permission` VALUES (49, 'Can change 发布活动管理', 13, 'change_activitymodel');
INSERT INTO `auth_permission` VALUES (50, 'Can delete 发布活动管理', 13, 'delete_activitymodel');
INSERT INTO `auth_permission` VALUES (51, 'Can add 活动类别管理', 14, 'add_activitytypemodel');
INSERT INTO `auth_permission` VALUES (52, 'Can change 活动类别管理', 14, 'change_activitytypemodel');
INSERT INTO `auth_permission` VALUES (53, 'Can delete 活动类别管理', 14, 'delete_activitytypemodel');
INSERT INTO `auth_permission` VALUES (54, 'Can view 活动图片管理', 12, 'view_activityimagesmodel');
INSERT INTO `auth_permission` VALUES (55, 'Can view 发布活动管理', 13, 'view_activitymodel');
INSERT INTO `auth_permission` VALUES (56, 'Can view 活动类别管理', 14, 'view_activitytypemodel');
INSERT INTO `auth_permission` VALUES (57, 'Can add 活动报名记录', 15, 'add_activityuserinfo');
INSERT INTO `auth_permission` VALUES (58, 'Can change 活动报名记录', 15, 'change_activityuserinfo');
INSERT INTO `auth_permission` VALUES (59, 'Can delete 活动报名记录', 15, 'delete_activityuserinfo');
INSERT INTO `auth_permission` VALUES (60, 'Can view 活动报名记录', 15, 'view_activityuserinfo');
INSERT INTO `auth_permission` VALUES (61, 'Can add 活动报名记录', 16, 'add_activityuserinfo');
INSERT INTO `auth_permission` VALUES (62, 'Can change 活动报名记录', 16, 'change_activityuserinfo');
INSERT INTO `auth_permission` VALUES (63, 'Can delete 活动报名记录', 16, 'delete_activityuserinfo');
INSERT INTO `auth_permission` VALUES (64, 'Can view 活动报名记录', 16, 'view_activityuserinfo');
INSERT INTO `auth_permission` VALUES (65, 'Can add 幻灯片管理', 17, 'add_slidemodels');
INSERT INTO `auth_permission` VALUES (66, 'Can change 幻灯片管理', 17, 'change_slidemodels');
INSERT INTO `auth_permission` VALUES (67, 'Can delete 幻灯片管理', 17, 'delete_slidemodels');
INSERT INTO `auth_permission` VALUES (68, 'Can view 幻灯片管理', 17, 'view_slidemodels');
INSERT INTO `auth_permission` VALUES (69, 'Can add 用户举报记录', 18, 'add_collectionusermodel');
INSERT INTO `auth_permission` VALUES (70, 'Can change 用户举报记录', 18, 'change_collectionusermodel');
INSERT INTO `auth_permission` VALUES (71, 'Can delete 用户举报记录', 18, 'delete_collectionusermodel');
INSERT INTO `auth_permission` VALUES (72, 'Can add 用户分享记录', 19, 'add_sharingusermodel');
INSERT INTO `auth_permission` VALUES (73, 'Can change 用户分享记录', 19, 'change_sharingusermodel');
INSERT INTO `auth_permission` VALUES (74, 'Can delete 用户分享记录', 19, 'delete_sharingusermodel');
INSERT INTO `auth_permission` VALUES (75, 'Can view 用户举报记录', 18, 'view_collectionusermodel');
INSERT INTO `auth_permission` VALUES (76, 'Can view 用户分享记录', 19, 'view_sharingusermodel');
INSERT INTO `auth_permission` VALUES (77, 'Can add 分享页面设置', 20, 'add_sharingsetmodel');
INSERT INTO `auth_permission` VALUES (78, 'Can change 分享页面设置', 20, 'change_sharingsetmodel');
INSERT INTO `auth_permission` VALUES (79, 'Can delete 分享页面设置', 20, 'delete_sharingsetmodel');
INSERT INTO `auth_permission` VALUES (80, 'Can view 分享页面设置', 20, 'view_sharingsetmodel');
INSERT INTO `auth_permission` VALUES (81, 'Can add 用户举报记录', 21, 'add_reporttionusermodel');
INSERT INTO `auth_permission` VALUES (82, 'Can change 用户举报记录', 21, 'change_reporttionusermodel');
INSERT INTO `auth_permission` VALUES (83, 'Can delete 用户举报记录', 21, 'delete_reporttionusermodel');
INSERT INTO `auth_permission` VALUES (84, 'Can view 用户举报记录', 21, 'view_reporttionusermodel');
INSERT INTO `auth_permission` VALUES (85, 'Can add 用户浏览记录', 22, 'add_browseusermodel');
INSERT INTO `auth_permission` VALUES (86, 'Can change 用户浏览记录', 22, 'change_browseusermodel');
INSERT INTO `auth_permission` VALUES (87, 'Can delete 用户浏览记录', 22, 'delete_browseusermodel');
INSERT INTO `auth_permission` VALUES (88, 'Can view 用户浏览记录', 22, 'view_browseusermodel');
INSERT INTO `auth_permission` VALUES (89, 'Can add 用户评论', 23, 'add_commentsmodels');
INSERT INTO `auth_permission` VALUES (90, 'Can change 用户评论', 23, 'change_commentsmodels');
INSERT INTO `auth_permission` VALUES (91, 'Can delete 用户评论', 23, 'delete_commentsmodels');
INSERT INTO `auth_permission` VALUES (92, 'Can view 用户评论', 23, 'view_commentsmodels');
INSERT INTO `auth_permission` VALUES (93, 'Can add 用户反馈记录', 24, 'add_feedbackmodels');
INSERT INTO `auth_permission` VALUES (94, 'Can change 用户反馈记录', 24, 'change_feedbackmodels');
INSERT INTO `auth_permission` VALUES (95, 'Can delete 用户反馈记录', 24, 'delete_feedbackmodels');
INSERT INTO `auth_permission` VALUES (96, 'Can view 用户反馈记录', 24, 'view_feedbackmodels');
INSERT INTO `auth_permission` VALUES (97, 'Can add 消息内容管理', 25, 'add_sysmessages');
INSERT INTO `auth_permission` VALUES (98, 'Can change 消息内容管理', 25, 'change_sysmessages');
INSERT INTO `auth_permission` VALUES (99, 'Can delete 消息内容管理', 25, 'delete_sysmessages');
INSERT INTO `auth_permission` VALUES (100, 'Can view 消息内容管理', 25, 'view_sysmessages');
INSERT INTO `auth_permission` VALUES (101, 'Can add 系统用户设置', 26, 'add_sysusermodel');
INSERT INTO `auth_permission` VALUES (102, 'Can change 系统用户设置', 26, 'change_sysusermodel');
INSERT INTO `auth_permission` VALUES (103, 'Can delete 系统用户设置', 26, 'delete_sysusermodel');
INSERT INTO `auth_permission` VALUES (104, 'Can add 系统用户菜单', 27, 'add_sysuserthemenumodel');
INSERT INTO `auth_permission` VALUES (105, 'Can change 系统用户菜单', 27, 'change_sysuserthemenumodel');
INSERT INTO `auth_permission` VALUES (106, 'Can delete 系统用户菜单', 27, 'delete_sysuserthemenumodel');
INSERT INTO `auth_permission` VALUES (107, 'Can view 系统用户设置', 26, 'view_sysusermodel');
INSERT INTO `auth_permission` VALUES (108, 'Can view 系统用户菜单', 27, 'view_sysuserthemenumodel');
COMMIT;

-- ----------------------------
-- Table structure for authtoken_token
-- ----------------------------
DROP TABLE IF EXISTS `authtoken_token`;
CREATE TABLE `authtoken_token` (
  `key` varchar(40) NOT NULL,
  `created` datetime(6) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`key`),
  UNIQUE KEY `user_id` (`user_id`),
  CONSTRAINT `authtoken_token_user_id_35299eff_fk_users_userprofile_id` FOREIGN KEY (`user_id`) REFERENCES `users_userprofile` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for django_admin_log
-- ----------------------------
DROP TABLE IF EXISTS `django_admin_log`;
CREATE TABLE `django_admin_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint(5) unsigned NOT NULL,
  `change_message` longtext NOT NULL,
  `content_type_id` int(11) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  KEY `django_admin_log_user_id_c564eba6_fk_users_userprofile_id` (`user_id`),
  CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `django_admin_log_user_id_c564eba6_fk_users_userprofile_id` FOREIGN KEY (`user_id`) REFERENCES `users_userprofile` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for django_content_type
-- ----------------------------
DROP TABLE IF EXISTS `django_content_type`;
CREATE TABLE `django_content_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of django_content_type
-- ----------------------------
BEGIN;
INSERT INTO `django_content_type` VALUES (12, 'activity', 'activityimagesmodel');
INSERT INTO `django_content_type` VALUES (13, 'activity', 'activitymodel');
INSERT INTO `django_content_type` VALUES (14, 'activity', 'activitytypemodel');
INSERT INTO `django_content_type` VALUES (15, 'activity', 'activityuserinfo');
INSERT INTO `django_content_type` VALUES (17, 'activity', 'slidemodels');
INSERT INTO `django_content_type` VALUES (1, 'admin', 'logentry');
INSERT INTO `django_content_type` VALUES (3, 'auth', 'group');
INSERT INTO `django_content_type` VALUES (2, 'auth', 'permission');
INSERT INTO `django_content_type` VALUES (11, 'authtoken', 'token');
INSERT INTO `django_content_type` VALUES (4, 'contenttypes', 'contenttype');
INSERT INTO `django_content_type` VALUES (26, 'messagess', 'sysusermodel');
INSERT INTO `django_content_type` VALUES (27, 'messagess', 'sysuserthemenumodel');
INSERT INTO `django_content_type` VALUES (5, 'sessions', 'session');
INSERT INTO `django_content_type` VALUES (20, 'SharingSet', 'sharingsetmodel');
INSERT INTO `django_content_type` VALUES (16, 'userOperation', 'activityuserinfo');
INSERT INTO `django_content_type` VALUES (22, 'userOperation', 'browseusermodel');
INSERT INTO `django_content_type` VALUES (18, 'userOperation', 'collectionusermodel');
INSERT INTO `django_content_type` VALUES (23, 'userOperation', 'commentsmodels');
INSERT INTO `django_content_type` VALUES (24, 'userOperation', 'feedbackmodels');
INSERT INTO `django_content_type` VALUES (21, 'userOperation', 'reporttionusermodel');
INSERT INTO `django_content_type` VALUES (19, 'userOperation', 'sharingusermodel');
INSERT INTO `django_content_type` VALUES (25, 'userOperation', 'sysmessages');
INSERT INTO `django_content_type` VALUES (6, 'users', 'userprofile');
INSERT INTO `django_content_type` VALUES (7, 'xadmin', 'bookmark');
INSERT INTO `django_content_type` VALUES (8, 'xadmin', 'log');
INSERT INTO `django_content_type` VALUES (9, 'xadmin', 'usersettings');
INSERT INTO `django_content_type` VALUES (10, 'xadmin', 'userwidget');
COMMIT;

-- ----------------------------
-- Table structure for django_migrations
-- ----------------------------
DROP TABLE IF EXISTS `django_migrations`;
CREATE TABLE `django_migrations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=109 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of django_migrations
-- ----------------------------
BEGIN;
INSERT INTO `django_migrations` VALUES (1, 'contenttypes', '0001_initial', '2018-06-30 21:54:35.510805');
INSERT INTO `django_migrations` VALUES (2, 'contenttypes', '0002_remove_content_type_name', '2018-06-30 21:54:35.571008');
INSERT INTO `django_migrations` VALUES (3, 'auth', '0001_initial', '2018-06-30 21:54:35.767479');
INSERT INTO `django_migrations` VALUES (4, 'auth', '0002_alter_permission_name_max_length', '2018-06-30 21:54:35.796635');
INSERT INTO `django_migrations` VALUES (5, 'auth', '0003_alter_user_email_max_length', '2018-06-30 21:54:35.805202');
INSERT INTO `django_migrations` VALUES (6, 'auth', '0004_alter_user_username_opts', '2018-06-30 21:54:35.812140');
INSERT INTO `django_migrations` VALUES (7, 'auth', '0005_alter_user_last_login_null', '2018-06-30 21:54:35.819141');
INSERT INTO `django_migrations` VALUES (8, 'auth', '0006_require_contenttypes_0002', '2018-06-30 21:54:35.821156');
INSERT INTO `django_migrations` VALUES (9, 'auth', '0007_alter_validators_add_error_messages', '2018-06-30 21:54:35.830117');
INSERT INTO `django_migrations` VALUES (10, 'auth', '0008_alter_user_username_max_length', '2018-06-30 21:54:35.838456');
INSERT INTO `django_migrations` VALUES (11, 'users', '0001_initial', '2018-06-30 21:54:36.090684');
INSERT INTO `django_migrations` VALUES (12, 'admin', '0001_initial', '2018-06-30 21:54:36.179466');
INSERT INTO `django_migrations` VALUES (13, 'admin', '0002_logentry_remove_auto_add', '2018-06-30 21:54:36.219486');
INSERT INTO `django_migrations` VALUES (14, 'authtoken', '0001_initial', '2018-06-30 21:54:36.275419');
INSERT INTO `django_migrations` VALUES (15, 'authtoken', '0002_auto_20160226_1747', '2018-06-30 21:54:36.381310');
INSERT INTO `django_migrations` VALUES (16, 'sessions', '0001_initial', '2018-06-30 21:54:36.423748');
INSERT INTO `django_migrations` VALUES (17, 'xadmin', '0001_initial', '2018-06-30 21:54:36.694243');
INSERT INTO `django_migrations` VALUES (18, 'activity', '0001_initial', '2018-07-01 00:49:22.392933');
INSERT INTO `django_migrations` VALUES (19, 'users', '0002_auto_20180701_0049', '2018-07-01 00:49:22.513004');
INSERT INTO `django_migrations` VALUES (20, 'activity', '0002_auto_20180701_0054', '2018-07-01 00:54:23.759146');
INSERT INTO `django_migrations` VALUES (21, 'users', '0003_auto_20180701_0054', '2018-07-01 00:54:23.834950');
INSERT INTO `django_migrations` VALUES (22, 'activity', '0003_auto_20180701_0330', '2018-07-01 03:30:12.032349');
INSERT INTO `django_migrations` VALUES (23, 'users', '0004_auto_20180701_0330', '2018-07-01 03:30:12.115013');
INSERT INTO `django_migrations` VALUES (24, 'activity', '0004_auto_20180701_1828', '2018-07-01 18:28:11.856873');
INSERT INTO `django_migrations` VALUES (25, 'users', '0005_auto_20180701_1828', '2018-07-01 18:28:11.946188');
INSERT INTO `django_migrations` VALUES (26, 'activity', '0005_auto_20180701_1844', '2018-07-01 18:45:01.692466');
INSERT INTO `django_migrations` VALUES (27, 'users', '0006_auto_20180701_1844', '2018-07-01 18:45:01.767931');
INSERT INTO `django_migrations` VALUES (28, 'activity', '0006_auto_20180701_1904', '2018-07-01 19:04:29.884862');
INSERT INTO `django_migrations` VALUES (29, 'userOperation', '0001_initial', '2018-07-01 19:04:30.008831');
INSERT INTO `django_migrations` VALUES (30, 'users', '0007_auto_20180701_1904', '2018-07-01 19:04:30.111095');
INSERT INTO `django_migrations` VALUES (31, 'activity', '0007_auto_20180702_0008', '2018-07-02 00:08:20.459577');
INSERT INTO `django_migrations` VALUES (32, 'users', '0008_auto_20180702_0008', '2018-07-02 00:08:20.543140');
INSERT INTO `django_migrations` VALUES (33, 'activity', '0008_auto_20180702_0102', '2018-07-02 01:02:22.823397');
INSERT INTO `django_migrations` VALUES (34, 'users', '0009_auto_20180702_0102', '2018-07-02 01:02:22.914149');
INSERT INTO `django_migrations` VALUES (35, 'activity', '0009_auto_20180702_1210', '2018-07-02 12:10:43.931114');
INSERT INTO `django_migrations` VALUES (36, 'users', '0010_auto_20180702_1210', '2018-07-02 12:10:44.026328');
INSERT INTO `django_migrations` VALUES (37, 'activity', '0010_auto_20180702_1912', '2018-07-02 19:12:32.951498');
INSERT INTO `django_migrations` VALUES (38, 'users', '0011_auto_20180702_1912', '2018-07-02 19:12:33.041420');
INSERT INTO `django_migrations` VALUES (39, 'SharingSet', '0001_initial', '2018-07-03 23:35:11.822257');
INSERT INTO `django_migrations` VALUES (40, 'activity', '0011_auto_20180703_2335', '2018-07-03 23:35:11.885381');
INSERT INTO `django_migrations` VALUES (41, 'userOperation', '0002_collectionusermodel_sharingusermodel', '2018-07-03 23:35:12.081660');
INSERT INTO `django_migrations` VALUES (42, 'users', '0012_auto_20180703_2335', '2018-07-03 23:35:12.190747');
INSERT INTO `django_migrations` VALUES (43, 'SharingSet', '0002_auto_20180703_2338', '2018-07-03 23:38:32.915435');
INSERT INTO `django_migrations` VALUES (44, 'activity', '0012_auto_20180703_2338', '2018-07-03 23:38:32.989747');
INSERT INTO `django_migrations` VALUES (45, 'userOperation', '0003_auto_20180703_2338', '2018-07-03 23:38:33.331929');
INSERT INTO `django_migrations` VALUES (46, 'users', '0013_auto_20180703_2338', '2018-07-03 23:38:33.415463');
INSERT INTO `django_migrations` VALUES (47, 'SharingSet', '0003_auto_20180703_2342', '2018-07-03 23:42:13.569243');
INSERT INTO `django_migrations` VALUES (48, 'activity', '0013_auto_20180703_2342', '2018-07-03 23:42:13.639433');
INSERT INTO `django_migrations` VALUES (49, 'userOperation', '0004_reporttionusermodel_contion', '2018-07-03 23:42:13.712322');
INSERT INTO `django_migrations` VALUES (50, 'users', '0014_auto_20180703_2342', '2018-07-03 23:42:13.805407');
INSERT INTO `django_migrations` VALUES (51, 'SharingSet', '0004_auto_20180704_1022', '2018-07-04 10:22:25.001048');
INSERT INTO `django_migrations` VALUES (52, 'activity', '0014_auto_20180704_1022', '2018-07-04 10:22:25.063519');
INSERT INTO `django_migrations` VALUES (53, 'userOperation', '0005_browseusermodel', '2018-07-04 10:22:25.215641');
INSERT INTO `django_migrations` VALUES (54, 'users', '0015_auto_20180704_1022', '2018-07-04 10:22:25.302484');
INSERT INTO `django_migrations` VALUES (55, 'SharingSet', '0005_auto_20180704_1029', '2018-07-04 10:29:19.196719');
INSERT INTO `django_migrations` VALUES (56, 'activity', '0015_auto_20180704_1029', '2018-07-04 10:29:19.255830');
INSERT INTO `django_migrations` VALUES (57, 'users', '0016_auto_20180704_1029', '2018-07-04 10:29:19.322267');
INSERT INTO `django_migrations` VALUES (58, 'SharingSet', '0006_auto_20180704_1032', '2018-07-04 10:32:05.040528');
INSERT INTO `django_migrations` VALUES (59, 'activity', '0016_auto_20180704_1032', '2018-07-04 10:32:05.132211');
INSERT INTO `django_migrations` VALUES (60, 'users', '0017_auto_20180704_1032', '2018-07-04 10:32:05.209898');
INSERT INTO `django_migrations` VALUES (61, 'SharingSet', '0007_auto_20180704_1509', '2018-07-04 15:09:44.232474');
INSERT INTO `django_migrations` VALUES (62, 'activity', '0017_auto_20180704_1509', '2018-07-04 15:09:44.425059');
INSERT INTO `django_migrations` VALUES (63, 'users', '0018_auto_20180704_1509', '2018-07-04 15:09:44.508113');
INSERT INTO `django_migrations` VALUES (64, 'SharingSet', '0008_auto_20180706_1708', '2018-07-06 17:08:18.730635');
INSERT INTO `django_migrations` VALUES (65, 'activity', '0018_auto_20180706_1708', '2018-07-06 17:08:18.914170');
INSERT INTO `django_migrations` VALUES (66, 'users', '0019_auto_20180706_1708', '2018-07-06 17:08:19.007656');
INSERT INTO `django_migrations` VALUES (67, 'SharingSet', '0009_auto_20180707_0351', '2018-07-07 03:51:13.506357');
INSERT INTO `django_migrations` VALUES (68, 'activity', '0019_auto_20180707_0351', '2018-07-07 03:51:13.580990');
INSERT INTO `django_migrations` VALUES (69, 'userOperation', '0006_activityuserinfo_type', '2018-07-07 03:51:13.711228');
INSERT INTO `django_migrations` VALUES (70, 'users', '0020_auto_20180707_0351', '2018-07-07 03:51:13.781641');
INSERT INTO `django_migrations` VALUES (71, 'SharingSet', '0010_auto_20180707_1720', '2018-07-07 17:21:21.117806');
INSERT INTO `django_migrations` VALUES (72, 'activity', '0020_auto_20180707_1720', '2018-07-07 17:21:21.181303');
INSERT INTO `django_migrations` VALUES (73, 'userOperation', '0007_auto_20180707_1720', '2018-07-07 17:21:21.373912');
INSERT INTO `django_migrations` VALUES (74, 'users', '0021_auto_20180707_1720', '2018-07-07 17:21:21.474358');
INSERT INTO `django_migrations` VALUES (75, 'SharingSet', '0011_auto_20180708_1910', '2018-07-08 19:11:08.574008');
INSERT INTO `django_migrations` VALUES (76, 'activity', '0021_auto_20180708_1910', '2018-07-08 19:11:08.645552');
INSERT INTO `django_migrations` VALUES (77, 'userOperation', '0008_auto_20180708_1910', '2018-07-08 19:11:08.732155');
INSERT INTO `django_migrations` VALUES (78, 'users', '0022_auto_20180708_1910', '2018-07-08 19:11:08.863121');
INSERT INTO `django_migrations` VALUES (79, 'SharingSet', '0012_auto_20180708_1946', '2018-07-08 19:46:17.582157');
INSERT INTO `django_migrations` VALUES (80, 'activity', '0022_auto_20180708_1946', '2018-07-08 19:46:17.661024');
INSERT INTO `django_migrations` VALUES (81, 'userOperation', '0009_auto_20180708_1946', '2018-07-08 19:46:17.745966');
INSERT INTO `django_migrations` VALUES (82, 'users', '0023_auto_20180708_1946', '2018-07-08 19:46:17.837971');
INSERT INTO `django_migrations` VALUES (83, 'SharingSet', '0013_auto_20180708_2025', '2018-07-08 20:25:56.527162');
INSERT INTO `django_migrations` VALUES (84, 'SharingSet', '0014_auto_20180708_2025', '2018-07-08 20:25:56.536790');
INSERT INTO `django_migrations` VALUES (85, 'activity', '0023_auto_20180708_2025', '2018-07-08 20:25:56.618586');
INSERT INTO `django_migrations` VALUES (86, 'activity', '0024_auto_20180708_2025', '2018-07-08 20:25:56.670794');
INSERT INTO `django_migrations` VALUES (87, 'userOperation', '0010_auto_20180708_2025', '2018-07-08 20:25:56.770202');
INSERT INTO `django_migrations` VALUES (88, 'users', '0024_auto_20180708_2025', '2018-07-08 20:25:57.042268');
INSERT INTO `django_migrations` VALUES (89, 'users', '0025_auto_20180708_2025', '2018-07-08 20:25:57.167739');
INSERT INTO `django_migrations` VALUES (90, 'SharingSet', '0015_auto_20180709_1128', '2018-07-09 11:28:57.698866');
INSERT INTO `django_migrations` VALUES (91, 'activity', '0025_auto_20180709_1128', '2018-07-09 11:28:57.778793');
INSERT INTO `django_migrations` VALUES (92, 'userOperation', '0011_auto_20180709_1128', '2018-07-09 11:28:57.906434');
INSERT INTO `django_migrations` VALUES (93, 'users', '0026_auto_20180709_1128', '2018-07-09 11:28:58.011976');
INSERT INTO `django_migrations` VALUES (94, 'SharingSet', '0016_auto_20180709_1435', '2018-07-09 14:35:32.935557');
INSERT INTO `django_migrations` VALUES (95, 'activity', '0026_auto_20180709_1435', '2018-07-09 14:35:33.000818');
INSERT INTO `django_migrations` VALUES (96, 'messagess', '0001_initial', '2018-07-09 14:35:33.115684');
INSERT INTO `django_migrations` VALUES (97, 'userOperation', '0012_auto_20180709_1435', '2018-07-09 14:35:33.283071');
INSERT INTO `django_migrations` VALUES (98, 'users', '0027_auto_20180709_1435', '2018-07-09 14:35:33.369863');
INSERT INTO `django_migrations` VALUES (99, 'SharingSet', '0017_auto_20180709_1519', '2018-07-09 15:19:48.215273');
INSERT INTO `django_migrations` VALUES (100, 'activity', '0027_auto_20180709_1519', '2018-07-09 15:19:48.292802');
INSERT INTO `django_migrations` VALUES (101, 'messagess', '0002_auto_20180709_1519', '2018-07-09 15:19:48.366259');
INSERT INTO `django_migrations` VALUES (102, 'userOperation', '0013_auto_20180709_1519', '2018-07-09 15:19:48.462150');
INSERT INTO `django_migrations` VALUES (103, 'users', '0028_auto_20180709_1519', '2018-07-09 15:19:48.596712');
INSERT INTO `django_migrations` VALUES (104, 'SharingSet', '0018_auto_20180709_1911', '2018-07-09 19:11:30.949711');
INSERT INTO `django_migrations` VALUES (105, 'activity', '0028_auto_20180709_1911', '2018-07-09 19:11:31.034742');
INSERT INTO `django_migrations` VALUES (106, 'messagess', '0003_auto_20180709_1911', '2018-07-09 19:11:31.130110');
INSERT INTO `django_migrations` VALUES (107, 'userOperation', '0014_auto_20180709_1911', '2018-07-09 19:11:31.215048');
INSERT INTO `django_migrations` VALUES (108, 'users', '0029_auto_20180709_1911', '2018-07-09 19:11:31.369871');
COMMIT;

-- ----------------------------
-- Table structure for django_session
-- ----------------------------
DROP TABLE IF EXISTS `django_session`;
CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL,
  PRIMARY KEY (`session_key`),
  KEY `django_session_expire_date_a5c62663` (`expire_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of django_session
-- ----------------------------
BEGIN;
INSERT INTO `django_session` VALUES ('g372glbmb73i8fiapybcz932qhs145hq', 'MDI4ODAyNjQwMjgyN2VkYmI3NTNhMWJmM2JmY2RiMDMwNmFiY2RkYzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiIyZWU5Y2RmZDk5NWYyZjUxOGUzZjZlN2Q3MWI2YjAzZWEzZDZiOTk2IiwiTElTVF9RVUVSWSI6W1sidXNlcnMiLCJ1c2VycHJvZmlsZSJdLCIiXX0=', '2018-07-24 22:17:32.825228');
INSERT INTO `django_session` VALUES ('vvb8f1imofi5z2lq5x2bqf3dvudklrcr', 'ZDI2OTFmYWE0N2IzNTNhZjI3ODQ3NGEyMTQyODdmZGJiYjZmZmNjZjp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiIyZWU5Y2RmZDk5NWYyZjUxOGUzZjZlN2Q3MWI2YjAzZWEzZDZiOTk2In0=', '2018-07-23 23:17:55.674904');
COMMIT;

-- ----------------------------
-- Table structure for messagess_sysusermodel
-- ----------------------------
DROP TABLE IF EXISTS `messagess_sysusermodel`;
CREATE TABLE `messagess_sysusermodel` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sysname` varchar(10) NOT NULL,
  `sysIntroduction` longtext NOT NULL,
  `images` varchar(100) DEFAULT NULL,
  `addtime` datetime(6) NOT NULL,
  `types` varchar(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of messagess_sysusermodel
-- ----------------------------
BEGIN;
INSERT INTO `messagess_sysusermodel` VALUES (1, '消息通知', '嗨，我是消息通知！', 'SysUserModel/2018/07/686fe7e499e04acd8d981bab07000e65/消息_1.png', '2018-07-09 14:47:19.000000', '0');
COMMIT;

-- ----------------------------
-- Table structure for messagess_sysuserthemenumodel
-- ----------------------------
DROP TABLE IF EXISTS `messagess_sysuserthemenumodel`;
CREATE TABLE `messagess_sysuserthemenumodel` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `themenu_name` varchar(10) NOT NULL,
  `urls` varchar(255) NOT NULL,
  `addtime` datetime(6) NOT NULL,
  `sysuser_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `messagess_sysuserthe_sysuser_id_0c75740c_fk_messagess` (`sysuser_id`),
  CONSTRAINT `messagess_sysuserthe_sysuser_id_0c75740c_fk_messagess` FOREIGN KEY (`sysuser_id`) REFERENCES `messagess_sysusermodel` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of messagess_sysuserthemenumodel
-- ----------------------------
BEGIN;
INSERT INTO `messagess_sysuserthemenumodel` VALUES (1, '我加入的', 'pages/user/usersingup/usersingup', '2018-07-09 14:52:38.000000', 1);
INSERT INTO `messagess_sysuserthemenumodel` VALUES (2, '即将开始', 'pages/index/allthestart/allthestart', '2018-07-09 14:52:52.000000', 1);
INSERT INTO `messagess_sysuserthemenumodel` VALUES (3, '活动分类', 'pages/index/classification/classification', '2018-07-09 14:54:40.000000', 1);
COMMIT;

-- ----------------------------
-- Table structure for userOperation_activityuserinfo
-- ----------------------------
DROP TABLE IF EXISTS `userOperation_activityuserinfo`;
CREATE TABLE `userOperation_activityuserinfo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(3) NOT NULL,
  `wechat` varchar(20) NOT NULL,
  `addtime` datetime(6) NOT NULL,
  `activity_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `type` varchar(1) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userOperation_activi_activity_id_033e8ad1_fk_activity_` (`activity_id`),
  KEY `userOperation_activi_user_id_9c4c958c_fk_users_use` (`user_id`),
  CONSTRAINT `userOperation_activi_activity_id_033e8ad1_fk_activity_` FOREIGN KEY (`activity_id`) REFERENCES `activity_activitymodel` (`id`),
  CONSTRAINT `userOperation_activi_user_id_9c4c958c_fk_users_use` FOREIGN KEY (`user_id`) REFERENCES `users_userprofile` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for userOperation_browseusermodel
-- ----------------------------
DROP TABLE IF EXISTS `userOperation_browseusermodel`;
CREATE TABLE `userOperation_browseusermodel` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `addtime` datetime(6) NOT NULL,
  `activity_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userOperation_browse_user_id_a2ece1f8_fk_users_use` (`user_id`),
  KEY `userOperation_browse_activity_id_e2fe4c6a_fk_activity_` (`activity_id`),
  CONSTRAINT `userOperation_browse_activity_id_e2fe4c6a_fk_activity_` FOREIGN KEY (`activity_id`) REFERENCES `activity_activitymodel` (`id`),
  CONSTRAINT `userOperation_browse_user_id_a2ece1f8_fk_users_use` FOREIGN KEY (`user_id`) REFERENCES `users_userprofile` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for userOperation_collectionusermodel
-- ----------------------------
DROP TABLE IF EXISTS `userOperation_collectionusermodel`;
CREATE TABLE `userOperation_collectionusermodel` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `addtime` datetime(6) NOT NULL,
  `activity_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userOperation_collec_user_id_2b010e26_fk_users_use` (`user_id`),
  KEY `userOperation_collec_activity_id_2eaf04ae_fk_activity_` (`activity_id`),
  CONSTRAINT `userOperation_collec_activity_id_2eaf04ae_fk_activity_` FOREIGN KEY (`activity_id`) REFERENCES `activity_activitymodel` (`id`),
  CONSTRAINT `userOperation_collec_user_id_2b010e26_fk_users_use` FOREIGN KEY (`user_id`) REFERENCES `users_userprofile` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for userOperation_commentsmodels
-- ----------------------------
DROP TABLE IF EXISTS `userOperation_commentsmodels`;
CREATE TABLE `userOperation_commentsmodels` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `centent` longtext NOT NULL,
  `addtime` datetime(6) NOT NULL,
  `activity_id` int(11) NOT NULL,
  `parent_comment_id` int(11) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userOperation_commen_activity_id_2b571f50_fk_activity_` (`activity_id`),
  KEY `userOperation_commen_user_id_adce88c2_fk_users_use` (`user_id`),
  KEY `userOperation_commen_parent_comment_id_ef817836_fk_userOpera` (`parent_comment_id`),
  CONSTRAINT `userOperation_commen_activity_id_2b571f50_fk_activity_` FOREIGN KEY (`activity_id`) REFERENCES `activity_activitymodel` (`id`),
  CONSTRAINT `userOperation_commen_parent_comment_id_ef817836_fk_userOpera` FOREIGN KEY (`parent_comment_id`) REFERENCES `userOperation_commentsmodels` (`id`),
  CONSTRAINT `userOperation_commen_user_id_adce88c2_fk_users_use` FOREIGN KEY (`user_id`) REFERENCES `users_userprofile` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for userOperation_feedbackmodels
-- ----------------------------
DROP TABLE IF EXISTS `userOperation_feedbackmodels`;
CREATE TABLE `userOperation_feedbackmodels` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(20) NOT NULL,
  `centent` longtext NOT NULL,
  `images` varchar(100) DEFAULT NULL,
  `addtime` datetime(6) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userOperation_feedba_user_id_c6600b37_fk_users_use` (`user_id`),
  CONSTRAINT `userOperation_feedba_user_id_c6600b37_fk_users_use` FOREIGN KEY (`user_id`) REFERENCES `users_userprofile` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for userOperation_reporttionusermodel
-- ----------------------------
DROP TABLE IF EXISTS `userOperation_reporttionusermodel`;
CREATE TABLE `userOperation_reporttionusermodel` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `addtime` datetime(6) NOT NULL,
  `activity_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `contion` longtext NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userOperation_report_activity_id_c9f7a6c4_fk_activity_` (`activity_id`),
  KEY `userOperation_report_user_id_7f78cae3_fk_users_use` (`user_id`),
  CONSTRAINT `userOperation_report_activity_id_c9f7a6c4_fk_activity_` FOREIGN KEY (`activity_id`) REFERENCES `activity_activitymodel` (`id`),
  CONSTRAINT `userOperation_report_user_id_7f78cae3_fk_users_use` FOREIGN KEY (`user_id`) REFERENCES `users_userprofile` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for userOperation_sharingusermodel
-- ----------------------------
DROP TABLE IF EXISTS `userOperation_sharingusermodel`;
CREATE TABLE `userOperation_sharingusermodel` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `addtime` datetime(6) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userOperation_sharin_user_id_53e841de_fk_users_use` (`user_id`),
  CONSTRAINT `userOperation_sharin_user_id_53e841de_fk_users_use` FOREIGN KEY (`user_id`) REFERENCES `users_userprofile` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for userOperation_sysmessages
-- ----------------------------
DROP TABLE IF EXISTS `userOperation_sysmessages`;
CREATE TABLE `userOperation_sysmessages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titles` varchar(50) NOT NULL,
  `content` longtext NOT NULL,
  `addtime` datetime(6) NOT NULL,
  `activity_id` int(11) NOT NULL,
  `sysuser_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `ISOPEN` varchar(1) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userOperation_sysmes_activity_id_60c03bfa_fk_activity_` (`activity_id`),
  KEY `userOperation_sysmes_user_id_a13e8ded_fk_users_use` (`user_id`),
  KEY `userOperation_sysmes_sysuser_id_cd4812cb_fk_messagess` (`sysuser_id`),
  CONSTRAINT `userOperation_sysmes_activity_id_60c03bfa_fk_activity_` FOREIGN KEY (`activity_id`) REFERENCES `activity_activitymodel` (`id`),
  CONSTRAINT `userOperation_sysmes_sysuser_id_cd4812cb_fk_messagess` FOREIGN KEY (`sysuser_id`) REFERENCES `messagess_sysusermodel` (`id`),
  CONSTRAINT `userOperation_sysmes_user_id_a13e8ded_fk_users_use` FOREIGN KEY (`user_id`) REFERENCES `users_userprofile` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for users_userprofile
-- ----------------------------
DROP TABLE IF EXISTS `users_userprofile`;
CREATE TABLE `users_userprofile` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) NOT NULL,
  `first_name` varchar(30) NOT NULL,
  `last_name` varchar(30) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  `openid` varchar(200) NOT NULL,
  `avatarUrl` varchar(500) NOT NULL,
  `country` varchar(100) NOT NULL,
  `user_bh` varchar(50) NOT NULL,
  `province` varchar(100) NOT NULL,
  `city` varchar(100) NOT NULL,
  `language` varchar(100) NOT NULL,
  `background` varchar(100),
  `nickName` varchar(20) NOT NULL,
  `name` varchar(20) NOT NULL,
  `birthay` date NOT NULL,
  `avatar` varchar(100) DEFAULT NULL,
  `mobile` varchar(11) DEFAULT NULL,
  `gender` varchar(10) NOT NULL,
  `thesignature` longtext NOT NULL,
  `agreement` tinyint(1) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `add_time` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `user_bh` (`user_bh`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of users_userprofile
-- ----------------------------
BEGIN;
INSERT INTO `users_userprofile` VALUES (1, 'pbkdf2_sha256$36000$84Asj8ez6gvY$zv2wBScM6CfmynQdbW18hgBujBti3HYlM8kyQbbcj4U=', '2018-07-10 21:17:28.683952', 1, 'shujian', '', '', 1, 1, '2018-06-30 21:55:12.637351', '', '', '', 'e61002de2f5c4cf5a1f21b324b564941', '', '', '', '/default/default.jpg', '', '', '2018-06-30', '', NULL, '1', '', 0, '', '2018-06-30 21:55:12.637421');
INSERT INTO `users_userprofile` VALUES (12, 'pbkdf2_sha256$36000$UIPPaG1r0yaG$7ztu5NXbkM1Yo+jdDOhxZpKuSWhvAYoQzi6wSydsn+I=', NULL, 0, 'orTEV0YkH3oI5ZunYB85ZfgQQut4', '', '', 0, 1, '2018-07-10 21:57:17.753989', 'orTEV0YkH3oI5ZunYB85ZfgQQut4', 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLQaWXfpntwPpg2Khv8J437OJ8lI3WdTElajibufpTJfjeMBibyES6TpxELqFS8P5Hf0v03WHgia45BQ/132', 'China', '935a1576b257457fabe25a917392b4c0', 'Beijing', 'Chaoyang', 'zh_CN', '/default/default.jpg', '啊哈哈', '啊哈哈', '2018-07-10', 'UserProFilebg/avatar/orTEV0YkH3oI5ZunYB85ZfgQQut4.png', NULL, '1', '世界为你转身，因为你肯冒险！', 0, NULL, '2018-07-10 21:57:17.754027');
COMMIT;

-- ----------------------------
-- Table structure for users_userprofile_groups
-- ----------------------------
DROP TABLE IF EXISTS `users_userprofile_groups`;
CREATE TABLE `users_userprofile_groups` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userprofile_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_userprofile_groups_userprofile_id_group_id_823cf2fc_uniq` (`userprofile_id`,`group_id`),
  KEY `users_userprofile_groups_group_id_3de53dbf_fk_auth_group_id` (`group_id`),
  CONSTRAINT `users_userprofile_gr_userprofile_id_a4496a80_fk_users_use` FOREIGN KEY (`userprofile_id`) REFERENCES `users_userprofile` (`id`),
  CONSTRAINT `users_userprofile_groups_group_id_3de53dbf_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for users_userprofile_user_permissions
-- ----------------------------
DROP TABLE IF EXISTS `users_userprofile_user_permissions`;
CREATE TABLE `users_userprofile_user_permissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userprofile_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_userprofile_user_p_userprofile_id_permissio_d0215190_uniq` (`userprofile_id`,`permission_id`),
  KEY `users_userprofile_us_permission_id_393136b6_fk_auth_perm` (`permission_id`),
  CONSTRAINT `users_userprofile_us_permission_id_393136b6_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `users_userprofile_us_userprofile_id_34544737_fk_users_use` FOREIGN KEY (`userprofile_id`) REFERENCES `users_userprofile` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for xadmin_bookmark
-- ----------------------------
DROP TABLE IF EXISTS `xadmin_bookmark`;
CREATE TABLE `xadmin_bookmark` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(128) NOT NULL,
  `url_name` varchar(64) NOT NULL,
  `query` varchar(1000) NOT NULL,
  `is_share` tinyint(1) NOT NULL,
  `content_type_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `xadmin_bookmark_content_type_id_60941679_fk_django_co` (`content_type_id`),
  KEY `xadmin_bookmark_user_id_42d307fc_fk_users_userprofile_id` (`user_id`),
  CONSTRAINT `xadmin_bookmark_content_type_id_60941679_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `xadmin_bookmark_user_id_42d307fc_fk_users_userprofile_id` FOREIGN KEY (`user_id`) REFERENCES `users_userprofile` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for xadmin_log
-- ----------------------------
DROP TABLE IF EXISTS `xadmin_log`;
CREATE TABLE `xadmin_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `action_time` datetime(6) NOT NULL,
  `ip_addr` char(39) DEFAULT NULL,
  `object_id` longtext,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` varchar(32) NOT NULL,
  `message` longtext NOT NULL,
  `content_type_id` int(11) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `xadmin_log_content_type_id_2a6cb852_fk_django_content_type_id` (`content_type_id`),
  KEY `xadmin_log_user_id_bb16a176_fk_users_userprofile_id` (`user_id`),
  CONSTRAINT `xadmin_log_content_type_id_2a6cb852_fk_django_content_type_id` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `xadmin_log_user_id_bb16a176_fk_users_userprofile_id` FOREIGN KEY (`user_id`) REFERENCES `users_userprofile` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=82 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of xadmin_log
-- ----------------------------
BEGIN;
INSERT INTO `xadmin_log` VALUES (1, '2018-06-30 22:55:40.943536', '127.0.0.1', NULL, '', 'delete', '批量删除 1 个 用户管理', NULL, 1);
INSERT INTO `xadmin_log` VALUES (2, '2018-06-30 23:14:50.802111', '127.0.0.1', NULL, '', 'delete', '批量删除 1 个 用户管理', NULL, 1);
INSERT INTO `xadmin_log` VALUES (3, '2018-06-30 23:25:31.213620', '127.0.0.1', NULL, '', 'delete', '批量删除 1 个 用户管理', NULL, 1);
INSERT INTO `xadmin_log` VALUES (4, '2018-06-30 23:27:14.026137', '127.0.0.1', NULL, '', 'delete', '批量删除 1 个 用户管理', NULL, 1);
INSERT INTO `xadmin_log` VALUES (5, '2018-07-01 02:06:58.711880', '127.0.0.1', '1', '城市探险', 'create', '已添加。', 14, 1);
INSERT INTO `xadmin_log` VALUES (6, '2018-07-01 02:08:04.156876', '127.0.0.1', '2', '骑行', 'create', '已添加。', 14, 1);
INSERT INTO `xadmin_log` VALUES (7, '2018-07-01 02:08:07.510166', '127.0.0.1', '2', '骑行', 'change', '没有字段被修改。', 14, 1);
INSERT INTO `xadmin_log` VALUES (8, '2018-07-01 02:09:08.266262', '127.0.0.1', '3', '读书', 'create', '已添加。', 14, 1);
INSERT INTO `xadmin_log` VALUES (9, '2018-07-01 02:09:10.355232', '127.0.0.1', '3', '读书', 'change', '没有字段被修改。', 14, 1);
INSERT INTO `xadmin_log` VALUES (10, '2018-07-01 02:10:10.327313', '127.0.0.1', '4', '游戏', 'create', '已添加。', 14, 1);
INSERT INTO `xadmin_log` VALUES (11, '2018-07-01 02:10:20.422590', '127.0.0.1', '4', '游戏', 'change', '修改 indexnum', 14, 1);
INSERT INTO `xadmin_log` VALUES (12, '2018-07-01 02:12:19.174488', '127.0.0.1', '5', '旅行', 'create', '已添加。', 14, 1);
INSERT INTO `xadmin_log` VALUES (13, '2018-07-01 02:15:44.279213', '127.0.0.1', '6', '其他', 'create', '已添加。', 14, 1);
INSERT INTO `xadmin_log` VALUES (14, '2018-07-01 23:46:16.481769', '127.0.0.1', NULL, '', 'delete', '批量删除 7 个 发布活动管理', NULL, 1);
INSERT INTO `xadmin_log` VALUES (15, '2018-07-02 12:51:45.003863', '127.0.0.1', '3', '周末我们一起来读书吧！', 'create', '已添加。', 17, 1);
INSERT INTO `xadmin_log` VALUES (16, '2018-07-02 12:51:56.804536', '127.0.0.1', '4', '周末一起去看风景吧😉', 'create', '已添加。', 17, 1);
INSERT INTO `xadmin_log` VALUES (17, '2018-07-02 12:51:59.284973', '127.0.0.1', '4', '周末一起去看风景吧😉', 'change', '修改 indexnum', 17, 1);
INSERT INTO `xadmin_log` VALUES (18, '2018-07-02 12:52:30.039593', '127.0.0.1', '5', '测试图片顺序', 'create', '已添加。', 17, 1);
INSERT INTO `xadmin_log` VALUES (19, '2018-07-02 22:02:04.850209', '127.0.0.1', '9', '活动标题测试测试', 'change', '修改 title', 13, 1);
INSERT INTO `xadmin_log` VALUES (20, '2018-07-03 15:30:39.570094', '127.0.0.1', '26', '天安门看毛爷爷', 'change', '修改 title', 13, 1);
INSERT INTO `xadmin_log` VALUES (21, '2018-07-03 16:17:30.928239', '127.0.0.1', '26', '天安门看毛爷爷', 'change', '修改 startdate 和 enddate', 13, 1);
INSERT INTO `xadmin_log` VALUES (22, '2018-07-03 17:21:48.421554', '127.0.0.1', '26', '周末天安门一起走走。', 'change', '修改 cover_image 和 title', 13, 1);
INSERT INTO `xadmin_log` VALUES (23, '2018-07-03 17:22:23.806840', '127.0.0.1', '26', '周末天安门一起走走。', 'change', '修改 cover_image', 13, 1);
INSERT INTO `xadmin_log` VALUES (24, '2018-07-03 18:01:00.691418', '127.0.0.1', '12', '周末一起去看风景吧😉', 'change', '修改 startdate', 13, 1);
INSERT INTO `xadmin_log` VALUES (25, '2018-07-04 10:32:14.471383', '127.0.0.1', '1', '5', 'create', '已添加。', 20, 1);
INSERT INTO `xadmin_log` VALUES (26, '2018-07-04 10:36:14.502449', '127.0.0.1', '1', '5', 'change', '没有字段被修改。', 20, 1);
INSERT INTO `xadmin_log` VALUES (27, '2018-07-04 10:36:23.693526', '127.0.0.1', '2', '0', 'create', '已添加。', 20, 1);
INSERT INTO `xadmin_log` VALUES (28, '2018-07-04 10:36:30.957530', '127.0.0.1', '1', '0', 'change', '修改 set_path', 20, 1);
INSERT INTO `xadmin_log` VALUES (29, '2018-07-04 11:06:20.141419', '127.0.0.1', '3', '1', 'create', '已添加。', 20, 1);
INSERT INTO `xadmin_log` VALUES (30, '2018-07-04 11:06:23.184244', '127.0.0.1', '3', '1', 'change', '没有字段被修改。', 20, 1);
INSERT INTO `xadmin_log` VALUES (31, '2018-07-04 11:06:49.625694', '127.0.0.1', '4', '1', 'create', '已添加。', 20, 1);
INSERT INTO `xadmin_log` VALUES (32, '2018-07-04 11:48:12.154082', '127.0.0.1', NULL, '', 'delete', '批量删除 3 个 用户浏览记录', NULL, 1);
INSERT INTO `xadmin_log` VALUES (33, '2018-07-04 11:49:44.567470', '127.0.0.1', NULL, '', 'delete', '批量删除 1 个 用户浏览记录', NULL, 1);
INSERT INTO `xadmin_log` VALUES (34, '2018-07-04 11:55:38.690251', '127.0.0.1', '5', '1', 'create', '已添加。', 20, 1);
INSERT INTO `xadmin_log` VALUES (35, '2018-07-04 11:56:04.932936', '127.0.0.1', '5', '1', 'change', '没有字段被修改。', 20, 1);
INSERT INTO `xadmin_log` VALUES (36, '2018-07-04 11:56:06.898431', '127.0.0.1', '5', '1', 'change', '没有字段被修改。', 20, 1);
INSERT INTO `xadmin_log` VALUES (37, '2018-07-04 11:56:52.162010', '127.0.0.1', '6', '1', 'create', '已添加。', 20, 1);
INSERT INTO `xadmin_log` VALUES (38, '2018-07-04 11:56:53.898381', '127.0.0.1', '6', '1', 'change', '没有字段被修改。', 20, 1);
INSERT INTO `xadmin_log` VALUES (39, '2018-07-04 11:57:32.498643', '127.0.0.1', '7', '1', 'create', '已添加。', 20, 1);
INSERT INTO `xadmin_log` VALUES (40, '2018-07-04 13:47:20.719618', '127.0.0.1', '8', '0', 'create', '已添加。', 20, 1);
INSERT INTO `xadmin_log` VALUES (41, '2018-07-04 13:47:35.620391', '127.0.0.1', '8', '0', 'change', '没有字段被修改。', 20, 1);
INSERT INTO `xadmin_log` VALUES (42, '2018-07-04 13:47:37.270100', '127.0.0.1', '8', '0', 'change', '没有字段被修改。', 20, 1);
INSERT INTO `xadmin_log` VALUES (43, '2018-07-04 13:48:28.109564', '127.0.0.1', '9', '0', 'create', '已添加。', 20, 1);
INSERT INTO `xadmin_log` VALUES (44, '2018-07-04 13:50:46.063669', '127.0.0.1', '9', '0', 'change', '没有字段被修改。', 20, 1);
INSERT INTO `xadmin_log` VALUES (45, '2018-07-04 13:51:31.651138', '127.0.0.1', '10', '0', 'create', '已添加。', 20, 1);
INSERT INTO `xadmin_log` VALUES (46, '2018-07-04 15:12:32.338433', '127.0.0.1', '10', '活动标题', 'change', '修改 registration_number', 13, 1);
INSERT INTO `xadmin_log` VALUES (47, '2018-07-05 23:29:59.186776', '127.0.0.1', NULL, '', 'delete', '批量删除 1 个 活动报名记录', NULL, 1);
INSERT INTO `xadmin_log` VALUES (48, '2018-07-05 23:34:48.286874', '127.0.0.1', NULL, '', 'delete', '批量删除 1 个 活动报名记录', NULL, 1);
INSERT INTO `xadmin_log` VALUES (49, '2018-07-07 03:46:08.275992', '127.0.0.1', '7', '啊哈哈', 'change', '修改 gender 和 thesignature', 6, 1);
INSERT INTO `xadmin_log` VALUES (50, '2018-07-07 17:23:09.605672', '127.0.0.1', '1', '書劍', 'create', '已添加。', 23, 1);
INSERT INTO `xadmin_log` VALUES (51, '2018-07-07 17:23:26.955330', '127.0.0.1', '1', '書劍', 'change', '修改 parent_comment 和 centent', 23, 1);
INSERT INTO `xadmin_log` VALUES (52, '2018-07-07 17:23:43.888033', '127.0.0.1', '1', '書劍', 'change', '修改 parent_comment 和 centent', 23, 1);
INSERT INTO `xadmin_log` VALUES (53, '2018-07-07 17:37:31.637391', '127.0.0.1', '2', '書劍', 'create', '已添加。', 23, 1);
INSERT INTO `xadmin_log` VALUES (54, '2018-07-07 19:24:56.551803', '127.0.0.1', '3', '啊哈哈', 'create', '已添加。', 23, 1);
INSERT INTO `xadmin_log` VALUES (55, '2018-07-07 19:58:52.731401', '127.0.0.1', '4', '啊哈哈', 'create', '已添加。', 23, 1);
INSERT INTO `xadmin_log` VALUES (56, '2018-07-07 20:05:38.952064', '127.0.0.1', '5', '書劍', 'create', '已添加。', 23, 1);
INSERT INTO `xadmin_log` VALUES (57, '2018-07-07 20:49:51.978260', '127.0.0.1', NULL, '', 'delete', '批量删除 1 个 活动报名记录', NULL, 1);
INSERT INTO `xadmin_log` VALUES (58, '2018-07-07 20:50:40.835345', '127.0.0.1', '30', '活动进行中！', 'change', '修改 registration_number', 13, 1);
INSERT INTO `xadmin_log` VALUES (59, '2018-07-08 02:32:42.369572', '127.0.0.1', '6', '啊哈哈', 'create', '已添加。', 23, 1);
INSERT INTO `xadmin_log` VALUES (60, '2018-07-08 02:39:45.826788', '127.0.0.1', '5', '書劍', 'change', '修改 parent_comment', 23, 1);
INSERT INTO `xadmin_log` VALUES (61, '2018-07-08 03:49:36.427799', '127.0.0.1', '7', '啊哈哈', 'create', '已添加。', 23, 1);
INSERT INTO `xadmin_log` VALUES (62, '2018-07-08 03:57:06.544939', '127.0.0.1', '8', '啊哈哈啊哈哈啊哈哈書劍書劍None', 'create', '已添加。', 23, 1);
INSERT INTO `xadmin_log` VALUES (63, '2018-07-08 04:08:11.549127', '127.0.0.1', '9', '書劍啊哈哈None', 'create', '已添加。', 23, 1);
INSERT INTO `xadmin_log` VALUES (64, '2018-07-09 14:52:34.897515', '127.0.0.1', '1', '系统通知', 'create', '已添加。', 26, 1);
INSERT INTO `xadmin_log` VALUES (65, '2018-07-09 14:52:49.880433', '127.0.0.1', '1', '菜单一', 'create', '已添加。', 27, 1);
INSERT INTO `xadmin_log` VALUES (66, '2018-07-09 14:53:01.866176', '127.0.0.1', '2', '菜单二', 'create', '已添加。', 27, 1);
INSERT INTO `xadmin_log` VALUES (67, '2018-07-09 14:53:21.454799', '127.0.0.1', '2', '菜单二', 'change', '修改 urls', 27, 1);
INSERT INTO `xadmin_log` VALUES (68, '2018-07-09 14:54:50.818541', '127.0.0.1', '3', '菜单三', 'create', '已添加。', 27, 1);
INSERT INTO `xadmin_log` VALUES (69, '2018-07-09 15:41:31.871791', '127.0.0.1', '1', '周末我们一起读书吧', 'create', '已添加。', 25, 1);
INSERT INTO `xadmin_log` VALUES (70, '2018-07-09 17:35:03.842652', '127.0.0.1', '2', '加入活动成功！', 'create', '已添加。', 25, 1);
INSERT INTO `xadmin_log` VALUES (71, '2018-07-09 17:35:25.641321', '127.0.0.1', '2', '加入活动成功！', 'change', '修改 ISOPEN', 25, 1);
INSERT INTO `xadmin_log` VALUES (72, '2018-07-09 17:36:28.474813', '127.0.0.1', '3', '哈哈哈加入了您发布的活动！', 'create', '已添加。', 25, 1);
INSERT INTO `xadmin_log` VALUES (73, '2018-07-09 18:29:59.668671', '127.0.0.1', '3', '哈哈哈加入了您发布的活动！', 'change', '修改 ISOPEN', 25, 1);
INSERT INTO `xadmin_log` VALUES (74, '2018-07-09 19:19:22.605263', '127.0.0.1', NULL, '', 'delete', '批量删除 1 个 活动报名记录', NULL, 1);
INSERT INTO `xadmin_log` VALUES (75, '2018-07-09 19:21:22.439106', '127.0.0.1', NULL, '', 'delete', '批量删除 1 个 活动报名记录', NULL, 1);
INSERT INTO `xadmin_log` VALUES (76, '2018-07-10 21:17:39.228600', '127.0.0.1', NULL, '', 'delete', '批量删除 1 个 用户管理', NULL, 1);
INSERT INTO `xadmin_log` VALUES (77, '2018-07-10 21:19:23.871483', '127.0.0.1', NULL, '', 'delete', '批量删除 1 个 用户管理', NULL, 1);
INSERT INTO `xadmin_log` VALUES (78, '2018-07-10 21:23:15.613318', '127.0.0.1', NULL, '', 'delete', '批量删除 1 个 用户管理', NULL, 1);
INSERT INTO `xadmin_log` VALUES (79, '2018-07-10 21:23:21.499714', '127.0.0.1', NULL, '', 'delete', '批量删除 1 个 用户管理', NULL, 1);
INSERT INTO `xadmin_log` VALUES (80, '2018-07-10 21:54:27.355382', '127.0.0.1', NULL, '', 'delete', '批量删除 1 个 用户管理', NULL, 1);
INSERT INTO `xadmin_log` VALUES (81, '2018-07-10 21:55:32.660863', '127.0.0.1', NULL, '', 'delete', '批量删除 1 个 用户管理', NULL, 1);
COMMIT;

-- ----------------------------
-- Table structure for xadmin_usersettings
-- ----------------------------
DROP TABLE IF EXISTS `xadmin_usersettings`;
CREATE TABLE `xadmin_usersettings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `key` varchar(256) NOT NULL,
  `value` longtext NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `xadmin_usersettings_user_id_edeabe4a_fk_users_userprofile_id` (`user_id`),
  CONSTRAINT `xadmin_usersettings_user_id_edeabe4a_fk_users_userprofile_id` FOREIGN KEY (`user_id`) REFERENCES `users_userprofile` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of xadmin_usersettings
-- ----------------------------
BEGIN;
INSERT INTO `xadmin_usersettings` VALUES (1, 'dashboard:home:pos', '', 1);
COMMIT;

-- ----------------------------
-- Table structure for xadmin_userwidget
-- ----------------------------
DROP TABLE IF EXISTS `xadmin_userwidget`;
CREATE TABLE `xadmin_userwidget` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `page_id` varchar(256) NOT NULL,
  `widget_type` varchar(50) NOT NULL,
  `value` longtext NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `xadmin_userwidget_user_id_c159233a_fk_users_userprofile_id` (`user_id`),
  CONSTRAINT `xadmin_userwidget_user_id_c159233a_fk_users_userprofile_id` FOREIGN KEY (`user_id`) REFERENCES `users_userprofile` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

SET FOREIGN_KEY_CHECKS = 1;
