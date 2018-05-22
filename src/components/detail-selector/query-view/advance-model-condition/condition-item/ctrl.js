import styles from './index.scss';
import { Inject } from 'angular-es-utils';

@Inject()
export default class ConditionItem {
	styles = styles;

	condition = {};

	$onInit() {}
}
