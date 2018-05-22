import { Inject } from 'angular-es-utils';
import body from './index.html';
import controller from './ctrl';

const noop = () => {};

const height = Math.min(window.screen.height - 200, 800);

// 默认选择器样式
const defaultStyle = { width: '960px', maxWidth: '960px', minWidth: '960px', height: height + 'px' };

const DefaultConfig = {
	commonZoneMax: 8, // 常显条件区最多数量
	description: '',
	preferenceAble: true, // 是否开启条件偏好设置
	advanceSearchAble: true, // 是否允许高级搜索
	conditions: [], // 常用条件
	extendConditions: [], // 更多条件
	columns: [], // 显示列
	type: 'multiple', // 选择框类型
	fetch: noop, // 接口请求函数

	// 条件模式[BASE:简单查找,ADVANCE:高级查找]
	searchModel: 'ADVANCE'
};

@Inject('$ccModal', '$rootScope', )
export default class DetailSelectorService {
	constructor() {}

	/**
	 * 明细选择器
	 * @param title {string | undefined}  Modal弹出框的标题
	 * @param uid {string}  组件唯一标识，组件会基于该值做物理缓存
	 * @param style {object | undefined}  自定义样式，多为高宽
	 * @param config {object} 配置数据
	 * @param onClose {function | undefined}  关闭时回调
	 */
	open({
		title = '明细选择器',
		uid,
		style = {},
		config,
		onClose = noop
	} = {}) {
		if (isUndefined(uid)) {
			throw new Error('`uid` is required for `bsDetailSelector`');
		}

		Object.keys(DefaultConfig).forEach(key => {
			if (!config.hasOwnProperty(key)) {
				config[key] = DefaultConfig[key];
			}
		});

		const scope = this._$rootScope.$new();

		scope.uid = uid;
		scope.config = config;

		title = `<span>${title}</span>${config.description?`<icon class="iconfont icon-bangzhu" cc-tooltip="'${config.description}'"></icon>`:''}`;

		return this._$ccModal.modal({
			bindings: scope,
			__body: body,
			scope,
			title,
			style: Object.assign({}, defaultStyle, style),
			controller,
			onClose,
			uid: 'CCMS_BS_DETAIL_SELECTOR-' + uid
		}).open();
	}
}

function isUndefined(v) {
	return v === undefined;
}
