import { SetMetadata } from '@nestjs/common';

export const jwtConstants = {
    secret: 'QWERTY',
};

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

export const maxTitleLength = 30
export const maxMessageLength = 300

export const MILISECONSDINDAY = 86400000





//SQL CONST
export const RETURNLIMIT = 2
//tables
export const USERENTITY = "user_entity"
export const PUBLICATIONSENTITY = "publication_entity"

//alias
export const USR = "usr"
export const PBL = "pbl"

//user
export const USR_UUID = "uuid"
export const USR_NAME = "name"
export const USR_MAIL = "email"
export const USR_PSWD = "password"
export const USR_STATUS = "isActive"

//publication 
export const PLB_ID = "id"
export const PBL_TITLE = "title"
export const PBL_MSG = "message"
export const PBL_DATE = "creationDate"
export const PBL_AUTH = "author"
