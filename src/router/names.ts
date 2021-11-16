export const PAGES = {
	/** 首页 */
	HOME: Symbol(),
	/** 个人中心 */
	USER: Symbol(),
	/** 修改个人资料 */
	Update: Symbol(),
	/** 登录 */
	LOGIN: Symbol(),
	/** 注册 */
	REGISTER: Symbol(),
	/** 设置 */
	setting: Symbol(),
	/** 新闻 */
	news: Symbol(),
	/** 新闻详情 */
	news_detail: Symbol(),
	/** 订单中心 */
	order: Symbol(),
	/** 订单详情 */
	order_detail: Symbol(),
	/** 在线客服 */
	service: Symbol(),
	/** 留言,意见反馈 */
	contact_us: Symbol(),
	/** 下单 */
	place_order: Symbol(),
	/** 购物车 */
	cart: Symbol(),
	/** 商品列表 */
	goods: Symbol(),
	/** 商品管理 */
	goods_manage: Symbol(),
	/** 商品详情 */
	goods_detail: Symbol(),
	/** 修改密码 */
	update_password: Symbol(),
	/** 找回密码 */
	retrieve_password: Symbol(),
	/** 身份认证 */
	authentication: Symbol(),
	/** 帮助中心 */
	support: Symbol(),
	/** 搜索中心 */
	search: Symbol(),
	/** 分类中心 */
	category: Symbol(),
	/** 我的喜爱/收藏/关注 */
	favorite: Symbol(),
	/** 订单支付 */
	payment: Symbol(),
	/** 物流信息 */
	logistics: Symbol(),
	/** 优惠券列表 */
	coupon: Symbol(),
	/** 消息中心 */
	message: Symbol(),
	/** 消息详情 */
	message_detail: Symbol(),
	/** 店铺列表 */
	shop: Symbol(),
	/** 店铺管理 */
	shop_manage: Symbol(),
	/** 店铺详情 */
	shop_detail: Symbol(),
	/** 活动中心 */
	event: Symbol(),
	/** 活动详情 */
	event_detail: Symbol(),
	/** 评价列表 */
	comment: Symbol(),
	/** 评价管理 */
	comment_manage: Symbol(),
	/** 评价详情 */
	comment_detail: Symbol(),
	/** 收货地址 */
	address: Symbol(),
	/** 新增收货地址 */
	add_address: Symbol(),
	/** 修改收货地址 */
	update_address: Symbol(),
	/** 声明：法律声明，免责条款，用户手册，隐私协议   */
	statement: Symbol(),

	ERROR_401: Symbol(),
	ERROR_403: Symbol(),
	ERROR_404: Symbol(),
	ERROR_500: Symbol(),
	ERROR_501: Symbol(),
	ERROR_503: Symbol(),
} as const;

/** 默认重定向地址 */
export const redirectRouteNameLoggedOut = PAGES.HOME;
/** 登陆成功或已登录时访问登录注册页面的重定向地址 */
export const redirectRouteNameLoggedIn = PAGES.USER;
