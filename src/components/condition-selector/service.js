import angular from 'angular';
import { Inject } from 'angular-es-utils';
import body from './index.html';
import controller from './ctrl';

@Inject('$ccModal', '$rootScope')
export default class ConditionSelector {
	constructor() {}

	/**
	 *
	 * @param title {string | undefined}  Modal弹出框的标题
	 * @param style {object | undefined}  自定义样式，多为高宽
	 * @param resources {object}  业务接口配置
	 * @param onClose {function | undefined}  关闭时回调
	 *
	 */
	open({
		title = '条件选择器',
		style = { width: 500 },
		resources = {},
		onClose = () => {}
	} = {}) {
		const scope = this._$rootScope.$new();
		const locals = { resources };
		return this._$ccModal.modal({
			bindings: scope,
			__body: body,
			scope,
			locals,
			title,
			style,
			controller,
			onClose
		}).open();
	}
}
