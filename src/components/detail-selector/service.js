import { Inject } from 'angular-es-utils';
import body from './index.html';
import controller from './ctrl';

const noop = () => {};

// 默认选择器样式
const defaultStyle = { width: '960px', maxWidth: '960px', height: (window.screen.height - 400) + 'px' };
// 默认配置选择器样式
const setterConfig = { title: '配置选择器', offsetLeft: '95px', style: { width: '600px', maxWidth: '600px', height: '455px' } };

@Inject('$ccModal', '$rootScope', )
export default class DetailSelectorService {
	constructor() {}

	/**
	 * 明细选择器
	 * @param title {string | undefined}  Modal弹出框的标题
	 * @param uid {string}  组件唯一标识，组件会基于该值做物理缓存
	 * @param style {object | undefined}  自定义样式，多为高宽
	 * @param setter {object | false} 自定义选择器配置界面的配置
	 * @param conditions {arrayOf field}
	 * @param extendConditions {arrayOf field}
	 * @param columns {arrayOf field}
	 * @param advanceSearch {boolean}  是否允许高级搜索
	 * @param selectType {string}  选择器类型，multiple(多选)、single(单选)
	 * @param resources {object}  业务接口配置
	 * @param onClose {function | undefined}  关闭时回调
	 */
	open({
		title = '明细选择器',
		uid,
		style = {},
		setter = {},
		conditions = [],
		extendConditions = [],
		columns = [],
		advanceSearch = true,
		selectType = 'multiple',
		resources = {},
		onClose = noop
	} = {}) {
		if (isUndefined(uid)) {
			throw new Error('bsDetailSelector 服务必须配置 uid');
		}

		const scope = this._$rootScope.$new();
		scope.uid = uid;
		scope.selectType = selectType;
		scope.advanceSearch = advanceSearch;
		scope.conditions = conditions;
		scope.extendConditions = extendConditions;
		scope.columns = columns;

		// setter 可能为 false
		scope.setter = setter ? Object.assign({}, setterConfig, setter) : setter;

		const locals = { resources };

		return this._$ccModal.modal({
			bindings: scope,
			__body: body,
			scope,
			locals,
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
