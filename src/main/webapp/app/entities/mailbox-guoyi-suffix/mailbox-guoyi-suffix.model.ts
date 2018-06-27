import { BaseEntity } from './../../shared';

export class MailboxGuoyiSuffix implements BaseEntity {
    constructor(
        public id?: number,
        public sendId?: number,
        public receiverId?: number,
        public msgType?: number,
        public title?: string,
        public mcontent?: string,
        public sourceId?: number,
        public createdDate?: any,
        public readDate?: any,
        public anonymous?: number,
        public jerk?: BaseEntity,
    ) {
    }
}
