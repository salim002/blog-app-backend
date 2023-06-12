import categoryModel from "../models/categoryModel.js";

class CategoryController{
    static getAllCategories = async (req, res)=>{
        try{
            const fetchAllcategories = await categoryModel.find({});
            return res.status(200).json(fetchAllcategories);
        } catch (error){
            return res.status(400).json({message: error.message});
        }
    };
    static addNewCategory = async (req, res)=>{
        const {title} = req.body;
        try{
            if(title){
                const newCategory = new categoryModel({
                    title: title,
                })
                const savedCategory = await newCategory.save();
                if(savedCategory){
                    res.status(201).json({message: "Category Added Successfully"});
                }
            }
            else{
                return res.status(400).json({message: "All fields are required"});
            }
        } catch(error){
            return res.status(400).json({message: error.message});
        }
    };
}

export default CategoryController;