import React, { Component } from "react";
import { FormEvent } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const StyledTodo = styled.div`
  font-size: 30px;
  text-align: center;
  padding: 60px;

  input {
    height: 50px;
    width: 99%;
    margin-top: 30px;
    font-size: 30px;

  }

  ul {
    list-style: none;
    width: 100%;
    margin-block-start: 0em;
    margin-block-end: 0em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-inline-start: 0px;
  }
  h1 {
    color: white;
  }
  @media all and (max-width: 480px) { 
  padding: 20px;
  ul {
    margin: 10px;
    padding:10px;
    margin-block-start: 0em;
    margin-block-end: 0em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-inline-start: 0px;
  }
  input {
    width: 90%;
    padding: 10px;
  }
  }
 
`;

const ItemTodo = styled(motion.li)`
  position: relative;
  text-align: center;
  display: flex;
  background-color: #edddd4;
  border: 1px solid #351e29;
  min-height: 80px;
  width: 100%;
  justify-content: center;
  align-items: center;
  overflow-x: hidden;


  @media all and (max-width: 480px) {
    width: 100%;
    padding: 0px;
  }
`;

const CloseButton = styled(motion.button)`
  background-color: #c44536;
  position: absolute;
  right: 0px;
  width: 50px;
  height: 100%;
  color: white;
  border: none;
  margin-left: 2px;
`;

interface Props {}
interface State {
  value: string;
  todoList: { id: number; text: string; done: boolean }[];
  idCount: number;
}
export default class Todo extends Component<Props, State> {
  state = {
    value: "",
    todoList: localStorage.getItem("todoList")
      ? JSON.parse(localStorage.getItem("todoList") as string)
      : [
          { id: 1, text: "wash my face", done: false },
          { id: 2, text: "clean my room", done: false },
          { id: 3, text: "check my message", done: false },
        ],
    idCount: localStorage.getItem("todoListCount")
    ? parseInt(localStorage.getItem("todoListCount") as string)
    :3
  };

  handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(this.state);
    this.setState(
      {
        value: "",
        todoList: [
          ...this.state.todoList,
          { id: this.state.idCount + 1, text: this.state.value, done: false },
        ],
        idCount: this.state.idCount + 1,
      },
      () => {
        console.log(this.state);
        localStorage.setItem("todoList", JSON.stringify(this.state.todoList));
        localStorage.setItem("todoListCount", JSON.stringify(this.state.idCount));
        console.log(JSON.parse(localStorage.getItem("todoList") as string));
      }
    );
  };
  handleChange = (e: FormEvent) => {
    this.setState({
      value: (e.target as HTMLInputElement).value,
    });
  };
  deleteItem = (e: FormEvent) => {
    console.log("deletingitem");

    e.preventDefault();
    e.stopPropagation();
    let selectedItem = (e.target as HTMLSpanElement).id.split("-")[1];

    let noItem = this.state.todoList.filter(
      (i: { [key: string]: any }) => i.id !== parseInt(selectedItem)
    );
    console.log(noItem);
    this.setState({ todoList: noItem }, () => {
      console.log(this.state);
      localStorage.setItem("todoList", JSON.stringify(this.state.todoList));
      console.log(JSON.parse(localStorage.getItem("todoList") as string));
    });
  };
  listClick = (e: React.MouseEvent<HTMLLIElement>) => {
    console.log("running listclick");

    e.preventDefault();
    console.log(e.target, this.state);
    let selectedItem = (e.target as HTMLLIElement).id;

    const newList = this.state.todoList.map((item: { [key: string]: any }) => {
      if (item.id.toString() === selectedItem) {
        console.log(item.id, selectedItem);
        const updatedItem = {
          ...item,
          done: !item.done,
        };
        console.log(updatedItem);
        return updatedItem;
      }
      console.log(item);
      return item;
    });
    this.setState({ ...this.state, todoList: newList }, () => {
      localStorage.setItem("todoList", JSON.stringify(this.state.todoList));
    });
    /*    var result = this.state.todoList.filter((obj) => {
      
      return obj.id === 1;
    }); */
  };
  render() {
    let todolist;
    if (this.state.todoList) {
      todolist = this.state.todoList.map(
        (i: { [key: string]: any }, index: number) => {
          if (i.done) {
            return (
              <ItemTodo
                initial={{ opacity: 1 }}
                animate={{ opacity: 0.1 }}
                key={index}
                onClick={this.listClick}
                id={i.id.toString()}
                style={{ display: "flex", marginTop: 5 }}
              >
                {i.text}
                <CloseButton
                  key={index + "-button"}
                  onClick={this.deleteItem}
                  id={"button-" + i.id.toString()}
                >
                  {" "}
                  &times;{" "}
                </CloseButton>
              </ItemTodo>
            );
          } else {
            return (
              <ItemTodo
                initial={{ opacity: 0.1 }}
                animate={{ opacity: 1 }}
                key={index}
                onClick={this.listClick}
                id={i.id.toString()}
                style={{ display: "flex", marginTop: 5 }}
              >
                {i.text}
                <CloseButton
                  key={index + "button"}
                  id={"button-" + i.id.toString()}
                  onClick={this.deleteItem}
                >
                  {" "}
                  &times;{" "}
                </CloseButton>
              </ItemTodo>
            );
          }
        }
      );
    } else {
      todolist = null;
    }

    return (
      <StyledTodo>
        <div className="container">
          <h1>To Do List</h1>
          <form onSubmit={this.handleSubmit}>
            <input
              onSubmit={this.handleSubmit}
              type="text"
              name="text-box"
              id="text-box"
              value={this.state.value}
              onChange={this.handleChange}
              placeholder="&#x270F;"
            />
          </form>
          <ul>{todolist}</ul>
        </div>
      </StyledTodo>
    );
  }
}
