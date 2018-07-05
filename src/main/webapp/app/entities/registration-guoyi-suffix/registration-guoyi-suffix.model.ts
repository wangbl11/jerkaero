import { BaseEntity } from './../../shared';

export const enum Decision {
    'YES',
    'NO'
}

export const enum HxjslyEnum {
    'S1',
    'S2',
    'S3',
    'S4',
    'OTHER'
}

export const enum KjcgzhEnum {
    'S1',
    'S2',
    'S3',
    'OTHER'
}

export const enum JmlyqkEnum {
    'K1',
    'K2',
    'K3'
}

export const enum XbEnum {
    'MAN',
    'WOMAN'
}

export const enum AgeEnum {
    'A1',
    'A2',
    'A3',
    'A4',
    'A5',
    'A6',
    'A7'
}

export const enum RzjhgkfwEnum {
    'O1',
    'O2',
    'O3'
}

export const enum RzmbEnum {
    'R1',
    'R2',
    'R3',
    'R4',
    'R5',
    'R6',
    'R7',
    'R8'
}

export class RegistrationGuoyiSuffix implements BaseEntity {
    constructor(
        public id?: number,
        public registType?: number,
        public dwqc?: string,
        public hxcpmc?: string,
        public zztjdw?: string,
        public dwhgrdz?: string,
        public szqylx?: string,
        public ssly?: string,
        public gscpjj?: string,
        public mbkhsc?: string,
        public dqzykh?: string,
        public gnwhjjx?: string,
        public zljs?: Decision,
        public hxjsly?: HxjslyEnum,
        public kjcgzh?: KjcgzhEnum,
        public jmlyqk?: JmlyqkEnum,
        public jscsd?: string,
        public jzmsylqk?: string,
        public jzysjs?: string,
        public fzrdh?: string,
        public xb?: XbEnum,
        public lxfs?: string,
        public email?: string,
        public fzrnl?: AgeEnum,
        public tdpjnl?: AgeEnum,
        public gjrcs?: number,
        public sfgjrzgxjsqy?: Decision,
        public tdysjs?: string,
        public xycz?: string,
        public wlxwhdzclx?: string,
        public wlxwhdzclx1?: string,
        public sfxyxc?: string,
        public rzjhgkfw?: RzjhgkfwEnum,
        public rzmb?: RzmbEnum,
        public lxrzw?: string,
        public lxdh?: string,
        public lxyx?: string,
        public lxdz?: string,
        public ssly1?: string,
        public createdDate?: any,
        public modifiedDate?: any,
        public fbzt?:number,
        public jerk?:any
    ) {
    }
}
