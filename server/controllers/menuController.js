//menu items list
const menu=require('../models/Menu');
exports.index= async(req, res) => {
    try {
        const menuItems = await menu.find();
        res.json(menuItems); // Send the menu items as a JSON response
    } catch (error) {
        res.status(500).json({ message: 'Error fetching menu items', error });
    }
};

exports.itemFetch=async(req,res)=>{
    try{
        const {id} = req.params;
        const itemDetails=await menu.findById(id);
        res.status(201).json(itemDetails);
    }
    catch(error){
        res.status(500).json({message:'Error fetching the required data',error});
    }
}

exports.itemUpdate=async(req,res)=>{
    try{
        const {id} = req.params;
        const updateData=req.body;
        const updatedItem=await menu.findByIdAndUpdate(id,updateData,{new:true});
        console.log('Updating item with ID:', id, 'Data:', updateData);
        if (!updatedItem) {
            return res.status(404).json({ message: 'Item not found' });
        }
        //res.status(200).json({success: true,message:'Item updated successfully'},updatedItem);
        return res.status(200).json({ success: true, message: 'Item updated successfully', updatedItem });
    } catch (error) {
        console.error('Error updating item:', error);
        res.status(500).json({ message: 'Error updating item', error });
    }
}
exports.createMenuItem=async(req,res)=>{
    try{
        const {name,description,price,size}=req.body;
        const imageName=req.file?req.file.originalname:null;
        if (!imageName) {
            return res.status(400).json({ message: 'Image upload failed' });
        }
        const newItem=new menu({
            name,
            description,
            size,
            price,
            image:imageName
        });

        await newItem.save();
        return res.status(201).json({message:'New item added successfully'});
    }
    catch(e){
        res.status(500).json({message:'Error in adding new item', error: e.message});
    }
}

exports.itemDelete=async(req,res)=>{
    try{
        const {id}=req.params;
        const deleteditem= await menu.findByIdAndDelete(id);
        if(!deleteditem){
            return res.status(404).json({ message: 'Item not found' });
        }

        return res.status(200).json({success:true, message: 'Item deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting item', error });
    }
}