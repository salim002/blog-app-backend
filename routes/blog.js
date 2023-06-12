import express from "express";
const router = express.Router();
import AuthController from '../controllers/authController.js';
import BlogController from '../controllers/blogController.js';
import CategoryController from '../controllers/categoryController.js';
import checkIsUserAuthenticated from '../middlewares/authMiddleware.js';

import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, `public/upload`);
    },
    filename: function (req, file, cb){
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
const upload = multer({storage: storage});


router.post("/user/register", AuthController.userRegisteration);
router.post("/user/login", AuthController.userLogin);

// Protected Routes

router.get("/get/allblogs", checkIsUserAuthenticated, BlogController.getAllBlogs);
router.post("/add/blog", checkIsUserAuthenticated, upload.single("thumbnail"), BlogController.addNewBlog);
router.get("/get/blog/:id", checkIsUserAuthenticated, BlogController.getSingleBlog);

router.get("/get/categories", checkIsUserAuthenticated, CategoryController.getAllCategories);
router.post("/add/category", checkIsUserAuthenticated, CategoryController.addNewCategory);


export default router;