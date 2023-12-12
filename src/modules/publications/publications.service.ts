import { Injectable } from '@nestjs/common';
import { Publication } from 'src/core/interfaces/publication.interface';
import { EntitiesService } from 'src/entities/entities.service'
import {
    PUBLICATIONSENTITY,
    USERENTITY,
    MILISECONSDINDAY,
    USR,
    PBL,
    USR_NAME,
    PBL_TITLE,
    PBL_AUTH,
    PBL_DATE,
    PBL_MSG,
    USR_UUID,
    USR_STATUS,
    RETURNLIMIT
} from 'src/core/constants/constants'

@Injectable()
export class PublicationsService {
    constructor(
        private entitiesService: EntitiesService
    ) { }

    async create(data: Publication) {
        const newData: Publication = {
            ...data,
            creationDate: new Date().getTime()
        }
        const publication: Publication = await this.entitiesService.createPublication(newData)
        return publication
    }

    async getWithOffset(offset: number) {
        const query: string = `SELECT ${USR}.${USR_NAME}, ${PBL}.${PBL_TITLE}, ${PBL}.${PBL_DATE}, ${PBL}.${PBL_MSG} FROM ${USERENTITY} ${USR} INNER JOIN ${PUBLICATIONSENTITY} ${PBL} ON ${USR}.${USR_UUID} = ${PBL}.${PBL_AUTH} LIMIT ${RETURNLIMIT} OFFSET ${offset};`
        const temp: Publication[] = await this.entitiesService.getWithOffset(query)
        return temp
    }

    async filterPublications(title?: string, creationDate?: string, findUser?: string, isActive?: boolean) {
        let isEdited: boolean = false
        let query: string = `SELECT ${USR}.${USR_NAME}, ${PBL}.${PBL_TITLE}, ${PBL}.${PBL_DATE}, ${PBL}.${PBL_MSG} FROM ${USERENTITY} ${USR} INNER JOIN ${PUBLICATIONSENTITY} ${PBL} ON ${USR}.${USR_UUID} = ${PBL}.${PBL_AUTH} WHERE`
        if (isActive || title || creationDate || findUser) {
            if (isActive) {
                query = query + ` ${USR}.${USR_STATUS} = ${isActive} `
                isEdited = true
            }
            if (creationDate) {
                const splitDate = creationDate.split("-")
                const startDate = new Date(Number(splitDate[0]), Number(splitDate[1]), Number(splitDate[2])).getTime()
                const endDate = startDate + MILISECONSDINDAY
                query = query + (
                    isEdited ?
                        ` AND ${PBL}.${PBL_DATE} BETWEEN ${startDate} AND ${endDate}` :
                        ` ${PBL}.${PBL_DATE} BETWEEN ${startDate} AND ${endDate}`
                )
                isEdited = true
            }
            if (title) {
                query = query +
                    (isEdited ?
                        ` AND ${PBL}.${PBL_TITLE} LIKE '%${title}%' ` :
                        ` ${PBL}.${PBL_TITLE} LIKE '%${title}%' `)
                isEdited = true
            }
            if (findUser) {
                query = query +
                    (isEdited ?
                        ` AND ${PBL}.${PBL_AUTH} = '${findUser}' ` :
                        ` ${PBL}.${PBL_AUTH} = '${findUser}' `)
                isEdited = true
            }
        } else {
            const newQuery = query.split(' ')
            newQuery.pop()
            query = newQuery.join(' ')
        }
        query = `${query};`
        const res = await this.entitiesService.getPublicationsWithFilter(query)
        const fixedRes = res.map(e => {
            return {
                ...e,
                creationDate: this.formatTime(e.creationDate)
            }

        })
        return fixedRes
    }

    formatTime(date) {
        const options: Intl.DateTimeFormatOptions = {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
            day: '2-digit',
            month: 'numeric',
            year: '2-digit'
        };
        return new Intl.DateTimeFormat('en-US', options).format(date);
    }



}
