const config = { "name": "testdd", "displayName": "测试", "maxNum": 10, "helpText": "", "retColumn": "id", "commonConditionConfig": [{ "columnName": "id", "styleType": "", "typeName": "dict", "displayName": "id", "dictConfig": { "isDefault": false, "value": { "dictType": null, "displayField": "dic_name", "descField": "dic_key", "tableName": "metas_dic" } }, "dynamicConfigs": [{ "descVal": "dic_sex", "destVal": "性别" }, { "descVal": "dic_boolean", "destVal": "是否" }, { "descVal": "dic_validation", "destVal": "有效性" }, { "descVal": "dic_province", "destVal": "省市" }, { "descVal": "dic_city", "destVal": "城市" }, { "descVal": "dic_county", "destVal": "区县" }, { "descVal": "dic_vip", "destVal": "淘宝VIP类型" }, { "descVal": "dic_credit", "destVal": "信用等级" }, { "descVal": "dic_memberGrade", "destVal": "店铺会员等级" }, { "descVal": "dic_shop", "destVal": "卖家店铺" }, { "descVal": "dic_period", "destVal": "周期字典表" }, { "descVal": "dic_email_subscribe", "destVal": "邮件订阅" }, { "descVal": "dic_plat", "destVal": "卖家平台" }, { "descVal": "dic_member_grade", "destVal": "买家会员等级" }, { "descVal": "dic_idx_lable_dic_string_type_name", "destVal": "属性标签" }, { "descVal": "dic_idx_lable_dic_string_type_name", "destVal": "属性标签字典" }, { "descVal": "dic_area", "destVal": "区域" }, { "descVal": "camp_status", "destVal": "活动状态" }, { "descVal": "channel_type", "destVal": "渠道类型" }, { "descVal": "channel_fk_type", "destVal": "渠道反馈类型" }, { "descVal": "subjob_status", "destVal": "子任务状态" }, { "descVal": "taobao_order_status", "destVal": "淘宝订单状态" }, { "descVal": "taobao_trade_from", "destVal": "淘宝交易来源" }, { "descVal": "taobao_order_type", "destVal": "淘宝交易类型" }, { "descVal": "taobao_trate_is_rate", "destVal": "淘宝是否已评价" }, { "descVal": "taobao_step_trade_status", "destVal": "分期付款订单状态" }, { "descVal": "taobao_traderate_result", "destVal": "评价结果" }, { "descVal": "taobao_refund_reason", "destVal": "退款原因" }, { "descVal": "taobao_buyer_flag", "destVal": "买家备注旗帜" }, { "descVal": "taobao_trade_status", "destVal": "淘宝订单交易状态" }, { "descVal": "weixin_trade_status", "destVal": "微旺铺交易状态" }, { "descVal": "jd_order_state", "destVal": "京东订单状态" }, { "descVal": "jd_delivery_type", "destVal": "京东送货类型" }, { "descVal": "jd_coupon_type", "destVal": "京东优惠类型" }, { "descVal": "jd_shop", "destVal": "京东店铺" }, { "descVal": "dd_term_type", "destVal": "‘FBP店铺订单状态" }, { "descVal": "dic_memberGrade", "destVal": "千牛数据标签" }, { "descVal": "yhd_order_status", "destVal": "一号店订单状态" }, { "descVal": "yhd_trade_from", "destVal": "一号店交易来源" }, { "descVal": "yhd_shop", "destVal": "一号店店铺" }, { "descVal": "paipai_shop", "destVal": "拍拍店铺" }, { "descVal": "pai_order_status", "destVal": "拍拍订单状态" }, { "descVal": "pai_pay_type", "destVal": "拍拍订单付款类型" }, { "descVal": "pai_rate_state", "destVal": "拍拍订单评价状态" }, { "descVal": "paipai_transport_type", "destVal": "拍拍运送类型" }, { "descVal": "deal_note_type", "destVal": "拍拍订单备注类型" }, { "descVal": "jd_area", "destVal": "京东地区" }, { "descVal": "yhd_area", "destVal": "一号店地区" }, { "descVal": "dd_shop", "destVal": "当当店铺" }, { "descVal": "dd_order_status", "destVal": "当当订单状态" }, { "descVal": "dd_pay_type", "destVal": "当当订单类型" }, { "descVal": "dd_term_type", "destVal": "当当商品类型" }, { "descVal": "dd_term_type", "destVal": "当当省份" }, { "descVal": "dic_cty", "destVal": "卡类型字典表" }, { "descVal": "dic_decathlon_flag", "destVal": "迪卡侬手机邮件标识" }, { "descVal": "dic_decathlon_sex_flag", "destVal": "迪卡侬性别" }, { "descVal": "dic_decathlon_language_flag", "destVal": "迪卡侬语言" }, { "descVal": "dic_decathlon_card_type_flag", "destVal": "迪卡侬卡类型" }, { "descVal": "dic_decathlon_card_status_flag", "destVal": "迪卡侬卡状态" }, { "descVal": "dic_decathlon_order_flag", "destVal": "迪卡侬订购方式" }, { "descVal": "dic_decathlon_score_flag", "destVal": "迪卡侬永久积分" }, { "descVal": "dic_decathlon_temporarily_score_flag", "destVal": "迪卡侬暂时积分" }, { "descVal": "dic_decathlon_product_flag", "destVal": "迪卡侬商品标识" }, { "descVal": "dic_decathlon_dept_flag", "destVal": "迪卡侬部门标识" }, { "descVal": "dic_decathlon_sub_dept_flag", "destVal": "迪卡侬子部门标识" }, { "descVal": "dic_decathlon_sub_dept_flag", "destVal": "迪卡侬家庭标识" }, { "descVal": "dic_decathlon_brand_flag", "destVal": "迪卡侬品牌标识" }, { "descVal": "dic_decathlon_sport_id", "destVal": "迪卡侬活动" }, { "descVal": "dic_model", "destVal": "rfm模型字典表" }, { "descVal": "dic_custom_property_char_meta_char_value", "destVal": "cartoon_自定义属性10052字符字典" }, { "descVal": "dic_custom_property_num_meta_num_value", "destVal": "cartoon_自定义属性10053数字字典" }, { "descVal": "dic_custom_property_char_meta_char_value", "destVal": "cartoon_自定义属性10071字符字典" }, { "descVal": "dic_custom_property_char_meta_char_value", "destVal": "cartoon_自定义属性10072字符字典" }, { "descVal": "dic_custom_property_char_meta_char_value", "destVal": "cartoon_自定义属性10073字符字典" }, { "descVal": "dic_custom_property_char_meta_char_value", "destVal": "cartoon_自定义属性10074字符字典" }, { "descVal": "dic_custom_property_char_meta_char_value", "destVal": "cartoon_自定义属性10075字符字典" }, { "descVal": "dic_custom_property_char_meta_char_value", "destVal": "cartoon_自定义属性10076字符字典" }, { "descVal": "dic_custom_property_char_meta_char_value", "destVal": "cartoon_自定义属性10077字符字典" }, { "descVal": "dic_custom_property_num_meta_num_value", "destVal": "cartoon_自定义属性10078数字字典" }, { "descVal": "dic_custom_property_char_meta_char_value", "destVal": "cartoon_自定义属性10082字符字典" }, { "descVal": "dic_custom_property_char_meta_char_value", "destVal": "cartoon_自定义属性10083字符字典" }, { "descVal": "dic_custom_property_char_meta_char_value", "destVal": "cartoon_自定义属性10084字符字典" }, { "descVal": "dic_custom_property_num_meta_num_value", "destVal": "cartoon_自定义属性10085数字字典" }, { "descVal": "dic_custom_property_char_meta_char_value", "destVal": "cartoon_自定义属性10086字符字典" }, { "descVal": "dic_custom_property_num_meta_num_value", "destVal": "cartoon_自定义属性10087数字字典" }, { "descVal": "dic_custom_property_char_meta_char_value", "destVal": "cartoon_自定义属性10089字符字典" }], "helpText": "" }, { "columnName": "created", "styleType": "YMDhms", "typeName": "date", "displayName": "创建时间", "dictConfig": null, "dynamicConfigs": null, "helpText": "" }, { "columnName": "name", "styleType": "INPUT", "typeName": "text", "displayName": "名称", "dictConfig": null, "dynamicConfigs": null, "helpText": "" }], "moreConditionConfig": [{ "columnName": "parent_id", "styleType": "INPUT", "typeName": "number", "displayName": "上层id", "dictConfig": null, "dynamicConfigs": null, "helpText": "" }, { "columnName": "level", "styleType": "INPUT", "typeName": "number", "displayName": "level", "dictConfig": null, "dynamicConfigs": null, "helpText": "" }, { "columnName": "sort", "styleType": "", "typeName": "number", "displayName": "排序", "dictConfig": null, "dynamicConfigs": [{ "descVal": "true", "destVal": "True" }, { "descVal": "false", "destVal": "False" }], "helpText": "" }, { "columnName": "is_deleted", "styleType": "", "typeName": "boolean", "displayName": "是否可以删除", "dictConfig": null, "dynamicConfigs": [{ "descVal": "true", "destVal": "是" }, { "descVal": "false", "destVal": "否" }], "helpText": "" }, { "columnName": "creator", "styleType": "INPUT", "typeName": "text", "displayName": "创建人", "dictConfig": null, "dynamicConfigs": null, "helpText": "" }, { "columnName": "modified", "styleType": "YMDhms", "typeName": "date", "displayName": "修改时间", "dictConfig": null, "dynamicConfigs": null, "helpText": "" }, { "columnName": "modifier", "styleType": "INPUT", "typeName": "text", "displayName": "修改人", "dictConfig": null, "dynamicConfigs": null, "helpText": "" }], "disableConditionConfig": null, "isAdvancedConfig": false, "sortField": "id", "sort": "ASC", "displayColumnConfig": [{ "columnName": "id", "displayName": null, "isFull": true, "helpText": "" }, { "columnName": "name", "displayName": null, "isFull": true, "helpText": "" }, { "columnName": "parent_id", "displayName": null, "isFull": true, "helpText": "" }, { "columnName": "level", "displayName": null, "isFull": true, "helpText": "" }, { "columnName": "sort", "displayName": null, "isFull": true, "helpText": "" }, { "columnName": "is_deleted", "displayName": null, "isFull": true, "helpText": "" }, { "columnName": "created", "displayName": null, "isFull": true, "helpText": "" }, { "columnName": "creator", "displayName": null, "isFull": true, "helpText": "" }, { "columnName": "modified", "displayName": null, "isFull": true, "helpText": "" }, { "columnName": "modifier", "displayName": null, "isFull": true, "helpText": "" }], "undisplayColumnConfig": null };

function genCondition(c) {
	return {
		...c,
		name: c.displayName,
		code: c.columnName,
		tooltip: c.helpText,
		dataType: c.typeName,
		format: c.styleType
	};
}

function genColumns(c, fields = []) {
	const field = fields.find(f => f.columnName === c.columnName);
	return {
		...field,
		...c,
		name: field.displayName,
		code: c.columnName,
		tooltip: c.helpText,
		dataType: field.typeName
	};
}


(function(angular) {
	angular
		.module('app', ['ccms.bs.components'])
		.controller('ctrl', function($scope, $bsDetailSelector, $resource) {
			config.commonConditionConfig = config.commonConditionConfig || [];
			config.moreConditionConfig = config.moreConditionConfig || [];
			config.disableConditionConfig = config.disableConditionConfig || [];
			config.displayColumnConfig = config.displayColumnConfig || config.undisplayColumnConfig || [];
			const fields = [
				...config.commonConditionConfig,
				...config.moreConditionConfig,
				...config.disableConditionConfig
			];

			const Resource = $resource('http://ual.dcartoon.saasproj.fenxibao.com/common-component/v1/detailSelector/search', {}, {
				post: {
					method: 'POST',
					withCredentials: true,
					headers: {
						Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6Imp3dCJ9.eyJzc28iOmZhbHNlLCJqdGkiOiI0OTEwYWNkZDExNTE0MTJiODc0MGRkZGJkMDAxMjcxZCIsImV4cCI6MTUyNjkwOTQxMiwiaWF0IjoxNTI2ODczNDEyLCJpc3MiOiJlcGFzc3BvcnQiLCJhdWQiOiJwb3J0YWwiLCJzdWIiOiIxIiwidHlwIjoiQmVhcmVyIiwib3NpIjoiYmU4OGQ1YmM4Yjg0NGZlYzhjZTk3MDA4NzU5OGExYTAiLCJ0ZW5hbnQiOiJjYXJ0b29uIiwicHJlZmVycmVkX3VzZXJuYW1lIjoi57O757uf566h55CG5ZGYIiwibmFtZSI6ImFkbWluIiwiaXNTU08iOmZhbHNlfQ.ydqWGRbOdnQ6-15OhCZg5Ho8zs7jNyIS-q1hq-Hvsk4'
					}
				}
			});


			$scope.open1 = function() {
				$bsDetailSelector.open({
					uid: 13,
					title: config.displayName,
					config: {
						description: config.helpText,
						conditions: config.commonConditionConfig.map(genCondition),
						extendConditions: config.moreConditionConfig.map(genCondition),
						columns: config.displayColumnConfig.map((c) => genColumns(c, fields)),
						fetch(params) {
							params.offset = (params.page - 1) * params.size;
							params.limit = params.size;
							delete params.page;
							delete params.size;
							return Resource.post({
								id: 13,
								...params,
								conditions: params.conditions.map(item => ({ childCond: item }))
							}).$promise.catch(err => {
								throw new Error(err.data.message);
							});
						}
					}
				});
			};

			setTimeout(function() {
				$scope.open1();
			}, 200);
		});
})(window.angular);
