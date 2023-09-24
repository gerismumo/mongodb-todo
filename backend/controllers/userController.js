const todoModel  = require('../models/todo');

const todoController = {
    //add new user
    createUser: async (req, res) => {
        try {
            const {name, position} = req.body;

            const newTodo = new todoModel({
                name, 
                position
            });
            const savedTodo = await newTodo.save();
            res.json(savedTodo);
        } catch (error) {
           res.status(400).json({message : error.message});
        }
    },
    //select users

    selectUser: async (req, res) => {
        try{
            const users = await todoModel.find();
            res.json(users);
        } catch(error) {
            res.status(400).json({message : error.message});
        }
    },
    
    //delete users
    deleteUser: async (req,res) => {
        try {
            const {id} = req.params;
            await todoModel.findByIdAndDelete(id);
            res.json({success: true, message: 'User deleted successfully'});
        } catch (error) {
            res.status(400).json({message : error.message});
        }
    },

    //add user
    editUser: async (req, res) => {
        try {
            const {id} = req.params;
            const {name, position} = req.body;
            const updatedUser = await todoModel.findByIdAndUpdate(id, {name: name, position: position}, {new: true});
            res.json(updatedUser);
        } catch (error) {
            res.status(400).json({message : error.message});
        }
    }
}
module.exports = todoController;