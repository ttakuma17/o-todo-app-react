import React, { useState } from "react";
import { InputTodo } from "./components/InputTodo";
import "./styles.css";

export const App = () => {
  const [todoText, setTodoText] = useState("");
  const [incompleteTodo, setIncompleteTodo] = useState([
    "未完了のTodo１",
    "未完了のTodo2"
  ]);
  const [workingTodo, setWorkingTodo] = useState([
    "処理中のTodo１",
    "処理中のTodo2"
  ]);
  const [pendingTodo, setPendingTodo] = useState([
    "保留中のTodo１",
    "保留中のTodo2"
  ]);
  const [completeTodo, setCompleteTodo] = useState([
    "完了したTodo１",
    "完了したTodo2"
  ]);
  const onChangeTodoText = (event) => {
    setTodoText(event.target.value);
  };
  const onClickAdd = () => {
    if (todoText === "") return;
    const newIncompleteTodo = [...incompleteTodo, todoText];
    setIncompleteTodo(newIncompleteTodo);
    setTodoText("");
  };
  const onClickDelete = (index, listname) => {
    switch (listname) {
      case "incompletelist":
        const newIncompleteTodo = [...incompleteTodo];
        newIncompleteTodo.splice(index, 1);
        setIncompleteTodo(newIncompleteTodo);
        break;

      case "completelist":
        const newCompleteTodo = [...completeTodo];
        newCompleteTodo.splice(index, 1);
        setCompleteTodo(newCompleteTodo);
        break;
      default:
        console.log("エラーが発生しています");
    }
  };
  const onClickWorking = (index, listname) => {
    switch (listname) {
      case "incompletelist":
        const newIncompleteTodo = [...incompleteTodo];
        newIncompleteTodo.splice(index, 1);
        const newWorkingTodoForIncomplete = [
          ...workingTodo,
          incompleteTodo[index]
        ];
        setWorkingTodo(newWorkingTodoForIncomplete);
        setIncompleteTodo(newIncompleteTodo);
        break;
      case "pendinglist":
        const newPendingTodo = [...pendingTodo];
        newPendingTodo.splice(index, 1);
        const newWorkingTodoForPending = [...workingTodo, pendingTodo[index]];
        setWorkingTodo(newWorkingTodoForPending);
        setPendingTodo(newPendingTodo);
        break;
      default:
        console.log("エラーが発生しています");
    }
  };
  const onClickPending = (index, listname) => {
    switch (listname) {
      case "incompletelist":
        const newIncompleteTodo = [...incompleteTodo];
        newIncompleteTodo.splice(index, 1);
        const newPendingTodoforIncomplete = [
          ...pendingTodo,
          incompleteTodo[index]
        ];
        setPendingTodo(newPendingTodoforIncomplete);
        setIncompleteTodo(newIncompleteTodo);
        break;
      case "workinglist":
        const newWorkingTodo = [...workingTodo];
        newWorkingTodo.splice(index, 1);
        const newPendingTodoForWorking = [...pendingTodo, workingTodo[index]];
        setPendingTodo(newPendingTodoForWorking);
        setWorkingTodo(newWorkingTodo);
        break;
      default:
        console.log("エラーが発生しています");
    }
  };
  const onClickDone = (index) => {
    const newWorkingTodo = [...workingTodo];
    console.log(newWorkingTodo);
    newWorkingTodo.splice(index, 1);
    const newCompleteTodo = [...completeTodo, workingTodo[index]];
    setWorkingTodo(newWorkingTodo);
    setCompleteTodo(newCompleteTodo);
  };
  const onClickBackTodo = (index, listname) => {
    switch (listname) {
      case "completelist":
        const newCompleteTodo = [...completeTodo];
        newCompleteTodo.splice(index, 1);
        const newIncompleteTodoBackFromComplete = [
          ...incompleteTodo,
          completeTodo[index]
        ];
        setIncompleteTodo(newIncompleteTodoBackFromComplete);
        setCompleteTodo(newCompleteTodo);
        break;
      case "pendinglist":
        const newPendingTodo = [...pendingTodo];
        newPendingTodo.splice(index, 1);
        const newIncompleteTodoBackFromPending = [
          ...incompleteTodo,
          pendingTodo[index]
        ];
        setIncompleteTodo(newIncompleteTodoBackFromPending);
        setPendingTodo(newPendingTodo);
        break;
      default:
        console.log("エラーが発生しています");
    }
  };

  return (
    // <InputTodo />;
    <>
      <header>Manage Your Todo</header>
      <div class="input-area">
        <input
          id="add-todo"
          type="text"
          placeholder="Enter your todo"
          size="30"
          value={todoText}
          onChange={onChangeTodoText}
        />
        <button id="add-button" onClick={onClickAdd}>
          Add
        </button>
      </div>

      <div class="incomplete-area">
        <p class="title">・Todo List</p>
        <ul id="incomplete-list">
          {incompleteTodo.map((todo, index) => {
            return (
              <div key={todo} class="list-row">
                <li>{todo}</li>
                <button
                  onClick={() => {
                    onClickWorking(index, "incompletelist");
                  }}
                >
                  Working
                </button>
                <button
                  onClick={() => {
                    onClickPending(index, "incompletelist");
                  }}
                >
                  Pending
                </button>
                <button
                  onClick={() => {
                    onClickDelete(index, "incompletelist");
                  }}
                >
                  Delete
                </button>
              </div>
            );
          })}
        </ul>
      </div>

      <div class="working-area">
        <p class="title">・Working Todo</p>
        <ul id="working-list">
          {workingTodo.map((todo, index) => {
            return (
              <div key={todo} class="list-row">
                <li>{todo}</li>
                <button
                  onClick={() => {
                    onClickPending(index, "workinglist");
                  }}
                >
                  Pending
                </button>
                <button
                  onClick={() => {
                    onClickDone(index);
                  }}
                >
                  Done
                </button>
              </div>
            );
          })}
        </ul>
      </div>

      <div class="pending-area">
        <p class="title">・Pending Todo List</p>
        <ul id="pending-list">
          {pendingTodo.map((todo, index) => {
            return (
              <div key={todo} class="list-row">
                <li>{todo}</li>
                <button
                  onClick={() => {
                    onClickBackTodo(index, "pendinglist");
                  }}
                >
                  Back Todo
                </button>
                <button
                  onClick={() => {
                    onClickWorking(index, "pendinglist");
                  }}
                >
                  Working
                </button>
              </div>
            );
          })}
        </ul>
      </div>
      <div class="complete-area">
        <p class="title">・Complete Todo List</p>
        <ul id="complete-list">
          {completeTodo.map((todo, index) => {
            return (
              <div key={todo} class="list-row">
                <li>{todo}</li>
                <button
                  onClick={() => {
                    onClickBackTodo(index, "completelist");
                  }}
                >
                  Back Todo
                </button>
                <button
                  onClick={() => {
                    onClickDelete(index, "completelist");
                  }}
                >
                  Delete
                </button>
              </div>
            );
          })}
        </ul>
      </div>
      <footer>Try to complete todo !</footer>
    </>
  );
};
