import React, { Component } from "react";
import { FormEvent } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

const StyledContainer = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: ${(props) => props.color};
`;

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
      padding: 10px;
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
    font-size: 25px;
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
interface todoItem {
  id: number;
  text: string;
  done: boolean;
}
interface State {
  value: string;
  todoList: todoItem[];
  idCount: number;
  backgroundColor: string;
  appTitle: string;
}
export default class Todo extends Component<Props, State> {
  getStateFromStorage = () => {
    let storedState = localStorage.getItem("todoAppState");
    if (storedState) {
      this.setState(JSON.parse(storedState));
    } else {
      this.setState({
        value: "",
        todoList: localStorage.getItem("todoList") //if list exists use it
          ? JSON.parse(localStorage.getItem("todoList") as string)
          : // if the user has never added an item to the app, show sample todos
            [
              { id: 1, text: "wash my face", done: false },
              { id: 2, text: "clean my room", done: false },
              { id: 3, text: "check my message", done: false },
            ],
        idCount: localStorage.getItem("todoListCount")
          ? parseInt(localStorage.getItem("todoListCount") as string)
          : 3,
        backgroundColor: "#283d3b",
        appTitle: "Todo App",
      });
    }
  };
  state = {
    value: "",
    todoList: [],
    idCount: 0,
    backgroundColor: "#283d3b",
    appTitle: "First Load",
  };

  saveStateToStorage = () => {
    console.log(this.state);
    localStorage.setItem("todoAppState", JSON.stringify(this.state));
    this.showMeState();
  };
  handleSubmit = (e: FormEvent) => {
    let addItem = () => {
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
          this.saveStateToStorage();
        }
      );
    };

    e.preventDefault();
    console.log(this.state);
    let text = this.state.value;
    if (text.substring(0, 2) === "x " || text.substring(0, 2) === "X ") {
      let command = text.substring(2, 7);
      console.log(`"${command}"`);
      if (command === "clear") {
        //// clears the list, keeps preferences
        this.clearAll(false);
      } else if (command === "color" || command === "colou") {
        console.log("color is", text.split(" ")[2]);
        this.setState(
          {
            value: "",
            backgroundColor: text.split(" ")[2],
          },
          () => {
            this.saveStateToStorage();
          }
        );
      } else if (command === "title") {
        this.setState(
          {
            value: "",
            appTitle: text.split("title")[1],
          },
          () => {
            this.saveStateToStorage();
          }
        );
      } else if (command === "reset") {
        // Resets everything
        this.clearAll(true);
      } else {
        addItem();
      }
    } else {
      addItem();
    }
  };
  /** Clears the local storage if true is provided, otherwise simply clears the list
   * and saves user's preferences such as title and color */

  clearAll = (reset: boolean) => {
    if (reset) {
      localStorage.clear();
      this.setState(
        {
          value: "",
          todoList: [],
          idCount: 0,
          appTitle: "Todo App",
          backgroundColor: "#283d3b",
        },
        () => {
          this.saveStateToStorage();
        }
      );
    } else {
      this.setState(
        {
          value: "",
          todoList: [],
          idCount: 0,
        },
        () => {
          this.saveStateToStorage();
        }
      );
    }
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
      this.saveStateToStorage();
    });
  };
  listClick = (e: React.MouseEvent<HTMLLIElement>) => {
    console.log("running listclick");

    e.preventDefault();
    console.log(e.target, this.state);
    let selectedItem = (e.target as HTMLLIElement).id;

    const newList = this.state.todoList.map((item: todoItem) => {
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
      this.saveStateToStorage();
    });
    /*    var result = this.state.todoList.filter((obj) => {
      
      return obj.id === 1;
    }); */
  };
  componentDidMount = () => {
    //read from storage to see if a previous configuration / state exists
    this.showMeState();
    let previousAppState = localStorage.getItem("todoAppState");

    if (previousAppState) {
      this.setState(JSON.parse(previousAppState));
    }
  };

  showMeState = () => {
    console.log(localStorage.getItem("todoAppState"));
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
                exit={{ opacity: 0 }}
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
                exit={{ opacity: 0 }}
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
      <StyledContainer color={this.state.backgroundColor}>
        <StyledTodo>
          <div className="container">
            <h1>{this.state.appTitle}</h1>
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
            <ul>
              {" "}
              <AnimatePresence>{todolist}</AnimatePresence>
            </ul>
          </div>
        </StyledTodo>
      </StyledContainer>
    );
  }
}
