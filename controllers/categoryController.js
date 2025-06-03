const Category = require("../models/categoryModel")


//to post category in database
exports.postCategory = async(req,res)=>{
    let category = new Category ({
        category_name:req.body.category_name
    })
    //to check if category already exists or not in database
    Category.findOne({category_name:category.category_name}).then(async data=>{
        if(data == null){
             //save data in database
           category = await category.save()
           if(!category){
            return res.status(400).json({error:"Something went wrong"})
        }
        res.send(category) 
        }
        else{
            return res.status(400).json({error:"Category name must be unique"})
        }
    })
    .catch(err=>{
        return res.status(400).json({error:err})
    })  
}
    

//to show all category list
exports.showCategoryList = async(req,res)=>{
    const category = await Category.find()
    if(!category){
        return res.status(400).json({error:"Something went wrong"})
    }
    res.send(category)
}

//to fetch category details
exports.categoryDetails = async(req,res)=>{
    const category = await Category.findById(req.params.id);
    if(!category){
        return res.status(400).json({error:"Something went wrong"})
    }
    res.send(category)
}

//to update category
exports.updateCategory = async(req,res)=>{
    const category = await Category.findByIdAndUpdate
    (
        req.params.id,
        {
            category_name: req.body.category_name
        },
        {new:true} //to show updated values in result
    )
     if(!category){
        return res.status(400).json({error:"Something went wrong"})
    }
    res.send(category)
}

//to delete category 
exports.deleteCategory = (req,res)=>{
    Category.findByIdAndDelete(req.params.id).then(category=>{
        if(!category){
        return res.status(403).json({error:"Category not found"})
    }
    else{
        return res.status(200).json({msg:"Category deleted"})
    }
    })
    .catch(err=>{
        return res.status(400).json({error:err})
    })
}