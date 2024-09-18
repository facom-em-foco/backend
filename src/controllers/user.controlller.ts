import { Request,Response } from "express";
import { HttpStatusCode } from "@/enums/http-status-code.enum";
import { httpRequestHelper } from "@/helpers/http-request-helper";
import { sendErrorResponse, sendSuccessResponse } from "@/helpers/response-helper";
import UserService from "@/services/user.service";

export default class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    async getUserById(req: Request, res: Response): Promise<void> {
        const { params, headers } = httpRequestHelper(req);

        try {
            const data = await this.userService.getById(params);

            sendSuccessResponse(res, data, headers, HttpStatusCode.OK);
        } catch (error) {
            sendErrorResponse(res, error, headers);
        }
    }
}