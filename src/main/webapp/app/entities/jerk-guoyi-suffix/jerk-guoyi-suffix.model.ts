import { BaseEntity } from './../../shared';
import {PreferenceGuoyiSuffix} from '../preference-guoyi-suffix';
import {RegistrationGuoyiSuffix} from '../registration-guoyi-suffix';
export const enum AuthStatusEnum {
    'A0',
    'A1',
    'A2'
}

export class JerkGuoyiSuffix implements BaseEntity {
    constructor(
        public id?: number,
        public username?: string,
        public passwd?: string,
        public displayname?: string,
        public authStatus?: AuthStatusEnum,
        public createdDate?: any,
        public modifiedDate?: any,
        public jerkInfo?: RegistrationGuoyiSuffix,
        public preference?: PreferenceGuoyiSuffix,
        public inboxes?: BaseEntity[],
        public outboxes?: BaseEntity[],
        public favorites?: BaseEntity[],
    ) {
    }
}
