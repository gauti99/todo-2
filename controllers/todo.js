import Todo from "../models/todo.js";

// CREATE TODO
export const createTodo = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        message: "Todo name is required",
      });
    }

    // if same todo already exists
    const existingTodo = await Todo.findOne({
      name: name.trim(),
    });

    if (existingTodo) {
      return res.status(400).json({
        message: "This task already exists",
      });
    }

    const todo = await Todo.create({
      name: name.trim(),
    });

    res.status(201).json({
      message: "Todo created successfully",
      todo,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET TODOS
export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });

    res.status(200).json(todos);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE TODO
export const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({
        message: "Todo not found",
      });
    }

    res.status(200).json({
      message: "Todo updated successfully",
      todo: updatedTodo,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// DELETE TODO
export const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTodo = await Todo.findByIdAndDelete(id);

    if (!deletedTodo) {
      return res.status(404).json({
        message: "Todo not found",
      });
    }

    res.status(200).json({
      message: "Todo deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};