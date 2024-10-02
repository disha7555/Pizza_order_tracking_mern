const Cart= require('../models/Cart');
const Menu = require('../models/Menu');
// // exports.addCartItems=async(req,res)=>{
// //     const {newItemQuantity,userId,itemId}=req.body;
// //     try{

// //         let cart=await Cart.findOne({userId});
        
// //         //If cart does not exist then create a new cart for user
// //         if(!cart){
// //             cart= new Cart({userId,items:[]})
// //         };
         
// //         //fetch item details from menu
// //         let menuItem = await Menu.findById(itemId);
// //         if (!menuItem) {
// //             return res.status(404).json({ success: false, message: 'Menu item not found' });
// //         }
// //         //const {name,image,price,size,description}=menuItem;
// //         cart.items.push({
// //             itemId:menuItem._id,
// //             itemName: menuItem.name,
// //             price: menuItem.price,
// //             size: menuItem.size,
// //             image: menuItem.image,
// //             quantity:newItemQuantity
// //         });

// //         await cart.save();
// //         return res.json({ success: true, message: 'Item added to cart successfully!' });
// //     }
// //     catch(e){
// //         console.error('Error adding item to cart:', error);
// //         res.status(500).json({ success: false, message: 'Internal Server Error' });
   
// //     }

// // }

// exports.addCartItems = async (req, res) => {
//     const { newItemQuantity, userId, itemId } = req.body;

//     try {
//         let cart = await Cart.findOne({ userId });

//         // If cart does not exist, create a new one for the user
//         if (!cart) {
//             cart = new Cart({ userId, items: [] });
//         }

//         // Fetch item details from the menu
//         let menuItem = await Menu.findById(itemId);
//         if (!menuItem) {
//             return res.status(404).json({ success: false, message: 'Menu item not found' });
//         }

//         // Check if the item already exists in the cart
//         const existingItem = cart.items.find(item => item.itemId.toString() === itemId);

//         if (existingItem) {
//             // Update the existing item's quantity (increase by newItemQuantity or set it directly)
//             existingItem.quantity += newItemQuantity;
//         } else {
//             // Add the new item to the cart (starting quantity should be newItemQuantity)
//             cart.items.push({
//                 itemId: menuItem._id,
//                 itemName: menuItem.name,
//                 price: menuItem.price,
//                 size: menuItem.size,
//                 image: menuItem.image,
//                 quantity: newItemQuantity // Set this to newItemQuantity
//             });
//         }

//         await cart.save();
//         return res.json({ success: true, message: 'Item added to cart successfully!' });

//     } catch (error) {
//         console.error('Error adding item to cart:', error);
//         return res.status(500).json({ success: false, message: 'Internal Server Error' });
//     }
// };

// exports.listCartItems=async(req,res)=>{
//     const {userId,itemId}= req.params;
//     try{
        
//     const cart= await Cart.findOne({userId});
//    if(!cart){
//      //res.status(404).json({message:"Cart not found",cart});
//      console.log("no cart")
//    }
   
//    //find specific item in the cart
//    const item = cart.items.find((item)=>{item.itemId.toString()===itemId});
// //    if(!item){
// //     return res.status(404).json({message:"Item not available in cart"});
// //    }

//    return res.status(200).json({success: "true",message:"item found",quantity:item.quantity});
  
//     }
//     catch(e){
//         console.error(e);
//         return res.status(500).json({ message: 'Internal server error' });
//     }
// }

exports.addCartItems = async (req, res) => {
    const { newItemQuantity, userId, itemId } = req.body;

    try {
        let cart = await Cart.findOne({ userId });

        // If cart does not exist, create a new one for the user
        if (!cart) {
            cart = new Cart({ userId, items: [] });
        }

        // Fetch item details from the menu
        let menuItem = await Menu.findById(itemId);
        if (!menuItem) {
            return res.status(404).json({ success: false, message: 'Menu item not found' });
        }

        // Check if the item already exists in the cart
        const existingItem = cart.items.find(item => item.itemId.toString() === itemId);

        if (existingItem) {
            // Update the existing item's quantity
            existingItem.quantity += newItemQuantity;
        } else {
            // Add the new item to the cart with starting quantity
            cart.items.push({
                itemId: menuItem._id,
                itemName: menuItem.name,
                price: menuItem.price,
                size: menuItem.size,
                image: menuItem.image,
                quantity: newItemQuantity
            });
        }

        await cart.save();
        return res.json({ success: true, message: 'Item added to cart successfully!' });
    } catch (error) {
        console.error('Error adding item to cart:', error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};


exports.listCartItems = async (req, res) => {
    const { userId, itemId } = req.params;

    try {
        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ success: false, message: "Cart not found" });
        }

        // Find specific item in the cart
        const item = cart.items.find(item => item.itemId.toString() === itemId);

        if (!item) {
            return res.status(404).json({ success: false, message: "Item not available in cart" });
        }

        return res.status(200).json({ success: true, message: "Item found", quantity: item.quantity });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


// New function to list all cart items for a specific user
exports.listAllCartItems = async (req, res) => {
    const { userId } = req.params; // Extract userId from request parameters
    if (!userId) {
        return res.status(400).json({ message: "User ID is required." });
    }


    try {
        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ success: false, message: "Cart not found" });
        }

        return res.status(200).json({ success: true, cartItems: cart.items, totalQuantity: cart.totalQuantity, totalPrice: cart.totalPrice });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

exports.qtyinc = async()