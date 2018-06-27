import { BaseEntity } from './../../shared';

export const enum SettingTypeEnum {
    'STRING',
    'INTEGER',
    'BOOL'
}

export class SettingGuoyiSuffix implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public type?: SettingTypeEnum,
        public value?: string,
        public defvalue?: string,
        public createdDate?: any,
        public modifiedDate?: any,
    ) {
    }
}
