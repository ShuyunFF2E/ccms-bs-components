import angular from 'angular';
import { Inject } from 'angular-es-utils';
import body from './index.html';
import controller from './ctrl';

const noop = () => {};

@Inject('$ccModal', '$rootScope', )
export default class DetailSelectorService {
	constructor() {}

	/**
	 *
	 * @param title {string | undefined}  Modal弹出框的标题
	 * @param uid {string}  组件唯一标识，组件会基于该值做物理缓存
	 * @param style {object | undefined}  自定义样式，多为高宽
	 * @param settingIconOffsetLeft {object | undefined} 弹出框标题配置图标向左偏移量
	 * @param settingModalTitle {object | undefined} 配置选择器弹出框的标题
	 * @param resources {object}  业务接口配置
	 * @param onClose {function | undefined}  关闭时回调
	 *
	 */
	open({
		title = '明细选择器',
		uid,
		style = { width: '850px', maxWidth: '850px', height: '550px' },
		settingIconOffsetLeft = '95px',
		settingModalTitle = '配置选择器',
		resources = {},
		onClose = noop
	} = {}) {
		if (isUndefined(uid)) {
			throw new Error('bsDetailSelector 服务必须配置 uid');
		}

		const scope = this._$rootScope.$new();
		scope.uid = uid;
		scope.settingModalTitle = settingModalTitle;
		scope.settingIconOffsetLeft = settingIconOffsetLeft;

		const locals = { resources };

		return this._$ccModal.modal({
			bindings: scope,
			__body: body,
			scope,
			locals,
			title,
			style,
			controller,
			onClose,
			uid: 'CCMS_BS_DETAIL_SELECTOR-' + uid
		}).open();
	}
}

function isUndefined(v) {
	return v === undefined;
}
