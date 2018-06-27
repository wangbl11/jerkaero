import { BaseEntity } from './../../shared';

export class PreferenceGuoyiSuffix implements BaseEntity {
    constructor(
        public id?: number,
        public wechat?: string,
        public address?: string,
        public imageUrl?: string,
        public lang?: string,
        public createdDate?: any,
        public modifiedDate?: any,
    ) {
    }
}
