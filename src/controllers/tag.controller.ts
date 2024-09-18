import {Request, Response} from 'express';
import {HttpStatusCode} from '@/enums/http-status-code.enum';
import {httpRequestHelper} from '@/helpers/http-request-helper';
import {sendErrorResponse, sendSuccessResponse} from '@/helpers/response-helper';
import TagService from '@/services/tag.service';

export default class TagController {
    private tagService: TagService;

    constructor() {
        this.tagService = new TagService();
    }

    async getTagById(req: Request, res: Response): Promise<void> {
        const {params, headers} = httpRequestHelper(req);

        try {
            const data = await this.tagService.getById(params);

            sendSuccessResponse(res, data, headers, HttpStatusCode.OK);
        } catch (error) {
            sendErrorResponse(res, error, headers);
        }
    }

    async getAllTags(req: Request, res: Response): Promise<void> {
        const {query, headers} = httpRequestHelper(req);

        try {
            const data = await this.tagService.getAll(query);

            sendSuccessResponse(res, data, headers, HttpStatusCode.OK);
        } catch (error) {
            sendErrorResponse(res, error, headers);
        }
    }
}