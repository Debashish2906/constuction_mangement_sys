const express = require("express");
const router = express.Router();
const {
  createUser,
  login,
  deleteUser,
  updateUser,
  allUser,
  addTask,
  getTask,
  deleteTask,
  getTaskById,
  updateTask
} = require("../controller/user");
const {upload}=require('../controller/cloudinary')
const { auth } = require("../middleware/auth");
router.post("/create-user", createUser);
router.post("/login", login);
router.get('/all-user',allUser)
router.delete("/delete-user/:id",auth,deleteUser);
router.patch("/update-user/:id",auth, updateUser);
router.post('/upload',upload);
router.post('/addTask',addTask);
router.get('/tasks',getTask);
router.delete('/delete-task/:id',deleteTask)
router.get('/taskbyid/:id',getTaskById)
router.put('/update-task/:id',updateTask)
module.exports = router;
