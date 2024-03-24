import multer from "multer";
import { ApiUpload } from "../helpers/ApiUpload";

const uploadMiddleware = multer(ApiUpload("./tmp"));

export { uploadMiddleware };
