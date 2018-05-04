const config = {
	"name": "商品选择器",
	"displayName": "商品选择器",
	"maxNum": 1000,
	"helpText": "商品选择器",
	"retColumn": "user_id,source,tenant_id",
	"commonConditionConfig": [{
			"columnName": "source",
			"styleType": "",
			"typeName": "enum",
			"displayName": "数据来源",
			"dicType": null,
			"dynamicConfigs": [{
					"descVal": "1",
					"destVal": "上海"
				},
				{
					"descVal": "2",
					"destVal": "北京"
				}
			],
			"helpText": "数据来源指的是数据的数据源"
		},
		{
			"columnName": "tenant_id",
			"styleType": "",
			"typeName": "text",
			"displayName": "租户ID",
			"dicType": null,
			"dynamicConfigs": null,
			"helpText": ""
		},
		{
			"columnName": "is_initial_pwd",
			"styleType": "",
			"typeName": "boolean",
			"displayName": "初始化密码",
			"dicType": null,
			"dynamicConfigs": [{
					"descVal": "true",
					"destVal": "已初始化"
				},
				{
					"descVal": "false",
					"destVal": "未初始化"
				}
			],
			"helpText": ""
		}
	],
	"moreConditionConfig": [{
			"columnName": "user_id",
			"styleType": "",
			"typeName": "text",
			"displayName": "用户ID",
			"dicType": null,
			"dynamicConfigs": null,
			"helpText": ""
		},
		{
			"columnName": "creator",
			"styleType": "",
			"typeName": "text",
			"displayName": "创建人",
			"dicType": null,
			"dynamicConfigs": null,
			"helpText": ""
		},
		{
			"columnName": "created",
			"styleType": "YMDhms",
			"typeName": "date",
			"displayName": "创建时间",
			"dicType": null,
			"dynamicConfigs": null,
			"helpText": ""
		},
		{
			"columnName": "reset_time",
			"styleType": "YMD",
			"typeName": "date",
			"displayName": "重置时间",
			"dicType": null,
			"dynamicConfigs": null,
			"helpText": ""
		},
		{
			"columnName": "update_time",
			"styleType": "YMDhm",
			"typeName": "date",
			"displayName": "更新时间",
			"dicType": null,
			"dynamicConfigs": null,
			"helpText": "多对多"
		}
	],
	"disableConditionConfig": [{
		"columnName": "password",
		"styleType": "",
		"typeName": "text",
		"displayName": "用户密码",
		"dicType": null,
		"dynamicConfigs": null,
		"helpText": ""
	}],
	"isAdvancedConfig": false,
	"sortField": "created",
	"sort": "DESC",
	"displayColumnConfig": [{
			"columnName": "user_id",
			"displayName": null,
			"isFull": false,
			"helpText": "用户ID"
		},
		{
			"columnName": "tenant_id",
			"displayName": null,
			"isFull": false,
			"helpText": ""
		},
		{
			"columnName": "source",
			"displayName": null,
			"isFull": false,
			"helpText": "数据来源"
		},
		{
			"columnName": "is_initial_pwd",
			"displayName": null,
			"isFull": false,
			"helpText": ""
		},
		{
			"columnName": "creator",
			"displayName": null,
			"isFull": false,
			"helpText": ""
		},
		{
			"columnName": "created",
			"displayName": null,
			"isFull": false,
			"helpText": ""
		},
		{
			"columnName": "update_time",
			"displayName": null,
			"isFull": false,
			"helpText": ""
		},
		{
			"columnName": "reset_time",
			"displayName": null,
			"isFull": false,
			"helpText": ""
		}
	],
	"undisplayColumnConfig": [{
		"columnName": "password",
		"displayName": null,
		"isFull": false,
		"helpText": "商品选择器"
	}]
};

function genCondition(c) {
	return {
		...c,
		name: c.displayName,
		code: c.columnName,
		tooltip: c.helpText,
		dataType: c.typeName
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
		.controller('ctrl', function($scope, $bsDetailSelector) {
			const fields = [
				...config.commonConditionConfig,
				...config.moreConditionConfig,
				...config.disableConditionConfig
			];

			$scope.open1 = function() {
				$bsDetailSelector.open({
					uid: 'zdyx1',
					title: config.displayName,
					conditions: config.commonConditionConfig.map(genCondition),
					extendConditions: config.moreConditionConfig.map(genCondition),
					columns: config.displayColumnConfig.map((c) => genColumns(c, fields))
				});
			};

			$scope.open2 = function() {
				$bsDetailSelector.open({
					uid: 'zdyx2',
					title: '🙂 我就要叫商品选择器怎么了',
					setter: {
						title: '我想叫什么就叫什么',
						offsetLeft: '210px'
					}
				});
			};

			$scope.open3 = function() {
				$bsDetailSelector.open({
					uid: 'zdyx3',
					title: '🙂 我就要叫商品选择器怎么了',
					setter: false,
					advanceSearch: false
				});
			};

			$scope.open4 = function() {
				$bsDetailSelector.open({
					uid: 'zdyx1',
					selectType: 'single'
				});
			};

			setTimeout(function() {
				$scope.open1();
			}, 200);
		});
})(window.angular);
