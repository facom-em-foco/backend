import { Router } from "express";
import TagController from "@/controllers/tag.controller";

const tagController = new TagController();
const tagRouter = Router();

tagRouter.get('/tag/:id', tagController.getTagById.bind(tagController));
tagRouter.get('/tag', tagController.getAllTags.bind(tagController));

export default tagRouter;