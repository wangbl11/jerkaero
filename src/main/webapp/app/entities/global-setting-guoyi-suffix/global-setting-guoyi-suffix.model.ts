import { BaseEntity } from './../../shared';

export class GlobalSettingGuoyiSuffix implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public type?: number,
        public value?: string,
        public defvalue?: string,
        public createdDate?: any,
        public modifiedDate?: any,
    ) {
    }
}
