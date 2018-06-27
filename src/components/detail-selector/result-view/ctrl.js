import classes from './index.scss';
import { Inject } from 'angular-es-utils';

@Inject('$scope', '$ccTips')
export default class DetailSelectorResultViewCtrl {
    classes = classes;

    params = {
        page: 1,
        size: 10
    };

    data = [];

    $onInit() {


    }

    fetch(params) {
        const fetchResult = this.config.fetchResult;
        fetchResult({ ...this.params, ...params }).then(res => {
            this.data = res;
        }).catch(err => {
            this._$ccTips.error(err.message, {
                duration: 3000,
                container: this._$element[0].querySelector('.modal_body')
            });
        });
    }

    refresh() {

    }

    pageChange(page, size) {
        console.log(page, size);

    }

}
