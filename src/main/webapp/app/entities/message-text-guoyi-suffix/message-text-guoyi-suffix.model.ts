import { BaseEntity } from './../../shared';
export const enum MessageTypeEnum {
    "BROADCAST"=0,
    "PRIVATE"=1
}
export class MessageTextGuoyiSuffix implements BaseEntity {
    constructor(
        public id?: number,
        public sendID?: number,
        public msgType?: number,
        public msgStatus?: any,
        public title?: string,
        public mcontent?: string,
        public createdDate?: any,
        public receivers?: BaseEntity[],
        //public recIDs?: number[],
        //public recNames?: string[]
    ) {
    }
}
