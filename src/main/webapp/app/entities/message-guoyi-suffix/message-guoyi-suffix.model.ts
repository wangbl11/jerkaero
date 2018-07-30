import { BaseEntity } from './../../shared';

export class MessageGuoyiSuffix implements BaseEntity {
    constructor(
        public id?: number,
        public sendID?: number,
        public recID?: number,
        public recName?: string,
        public statue?: number,
        public readDate?: any,
    ) {
    }
}
