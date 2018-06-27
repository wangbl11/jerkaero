import { BaseEntity } from './../../shared';

export const enum StatusEnum {
    'OFFLINE',
    'ONLINE'
}

export class TagGuoyiSuffix implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public type?: number,
        public status?: StatusEnum,
        public weight?: number,
        public createdDate?: string,
        public modifiedDate?: string,
    ) {
    }
}
