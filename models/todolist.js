const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todolistSchema = new Schema({
    list : String
});
const todolist = mongoose.model('todolist',todolistSchema);

module.exports = todolist;