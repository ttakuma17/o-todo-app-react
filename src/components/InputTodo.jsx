import React, { useState } from "react";
export const InputTodo = (props) => {
  return (
    <div class="input-area">
      <input
        id="add-todo"
        type="text"
        placeholder="Enter your todo"
        size="30"
      />
      <button id="add-button">Add</button>
    </div>
  );
};
