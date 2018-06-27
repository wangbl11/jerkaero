import { BaseEntity } from './../../shared';

export class FootprintGuoyiSuffix implements BaseEntity {
    constructor(
        public id?: number,
        public sourceId?: number,
        public sourceType?: number,
        public readerId?: number,
        public createdDate?: any,
        public jerk?: BaseEntity,
    ) {
    }
}
