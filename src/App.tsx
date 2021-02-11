import React, { Component } from "react";
import { FormEvent } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

const StyledContainer = styled.div`
  min-height: 100vh;
  max-width: 100vw;
  background-color: ${(props) => props.color};
`;
const StyledHeading = styled.h1`
  color: ${(props) => props.color};
`;

const StyledTodo = styled.div`
  font-size: 30px;
  text-align: center;
  padding: 60px;
  max-width: 100%;
  color: ${(props) => props.color};
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
  background-color: ${(props) => props.color};
  border: 1px solid #351e29;
  min-height: 80px;
  width: 100%;
  justify-content: center;
  align-items: center;
  overflow-x: hidden;
  padding: 5px 0 5px 0;
  display: flex;
  margin-top: 5px;

  @media all and (max-width: 480px) {
    width: 100%;
    padding: 0px;
    font-size: 25px;
  }
`;

const CloseButton = styled(motion.button)`
  background-color: ${(props) => props.color};
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
  appTitleColor: string;
  itemColor: string;
  itemFontColor: string;
  itemCloseColor: string;
}
export default class Todo extends Component<Props, State> {
  state = {
    value: "",
    todoList: [],
    idCount: 0,
    backgroundColor: "#283d3b",
    appTitle: "Todo List",
    appTitleColor: "white",
    itemColor: "#edddd4",
    itemFontColor: "black",
    itemCloseColor: "#c44536",
  };

  saveStateToStorage = () => {
    this.faviconChanger();
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
        if (text.search(/colou?r/) >= 0) {
          let color = text.split(" ");
          this.setState(
            {
              value: "",
              appTitleColor: color[color.length - 1],
            },
            () => {
              this.saveStateToStorage();
            }
          );
        } else {
          this.setState(
            {
              value: "",
              appTitle: text.split("title ")[1],
            },
            () => {
              this.saveStateToStorage();
            }
          );
        }
      } else if (command === "reset") {
        // Resets everything
        this.clearAll(true);
      } else if (command === "item ") {
        if (text.search(/colou?rs?/) >= 0) {
          let colors = text.split(" ");
          console.log(colors);
          if (colors.length === 4) {
            this.setState(
              {
                value: "",
                itemColor: colors[3],
              },
              () => {
                this.saveStateToStorage();
              }
            );
          } else if (colors.length === 5) {
            this.setState(
              {
                value: "",
                itemColor: colors[3],
                itemFontColor: colors[4],
              },
              () => {
                this.saveStateToStorage();
              }
            );
          } else if (colors.length === 6) {
            this.setState(
              {
                value: "",
                itemColor: colors[3],
                itemFontColor: colors[4],
                itemCloseColor: colors[5],
              },
              () => {
                this.saveStateToStorage();
              }
            );
          }
        }
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
          appTitleColor: "white",
          itemColor: "#edddd4",
          itemFontColor: "black",
          itemCloseColor: "#c44536",
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
    } else {
      this.setState({
        todoList: [
          { id: 0, text: "Touch this item to disable it", done: false },
          {
            id: 1,
            text: "type 'x color gold' to change background color",
            done: false,
          },
          {
            id: 2,
            text: "type 'x title 💰💰` to set cutom title",
            done: false,
          },
          { id: 3, text: "type 'x clear` to clear the list", done: false },
          {
            id: 4,
            text: "type 'x reset' to reset app to default state",
            done: false,
          },
        ],
        idCount: 4,
      });
    }
  };

  showMeState = () => {
    console.log(localStorage.getItem("todoAppState"));
  };
  faviconChanger = () => {
    console.log(this.state.appTitle, this.state.appTitleColor);
    var favicon = document.getElementById("favicon");
    var faviconSize = 192;

    var canvas = document.createElement("canvas");
    canvas.width = faviconSize;
    canvas.height = faviconSize;

    var context = canvas.getContext("2d");
    var img = document.createElement("img");

    if (favicon) {
      img.src = (favicon as HTMLLinkElement).href;

      img.onload = () => {
        // Draw Original Favicon as Background
        if (context) {
          context.drawImage(img, 0, 0, faviconSize, faviconSize);
          let txt = this.state.appTitle[0] || "✍";
          console.log(this.state.appTitle[0], "is txt");
          //set background of favicon from the app bakground
          context.fillStyle = this.state.backgroundColor;
          context.fillRect(0, 0, 192, 192);
          //first char from your title
          context.font = "148px serif";
          context.fillStyle = this.state.appTitleColor;
          context.textBaseline = "middle";
          context.textAlign = "center";
          context.fillText(txt, faviconSize / 2, faviconSize / 2);
          // Replace favicon
          (favicon as HTMLLinkElement).href = canvas.toDataURL("image/png");
          let homeScreen = document.getElementById("home-screen");
          (homeScreen as HTMLLinkElement).href = canvas.toDataURL("image/png");
        }
      };
    }
  };
  render() {
    let todolist;
    if (this.state.todoList) {
      todolist = this.state.todoList.map(
        (i: { [key: string]: any }, index: number) => {
          if (i.done) {
            return (
              <ItemTodo
                color={this.state.itemColor}
                initial={{ opacity: 1 }}
                animate={{ opacity: 0.1 }}
                exit={{ opacity: 0 }}
                key={index}
                onClick={this.listClick}
                id={i.id.toString()}
              >
                {i.text}
                <CloseButton
                  color={this.state.itemCloseColor}
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
                color={this.state.itemColor}
                initial={{ opacity: 0.1 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                key={index}
                onClick={this.listClick}
                id={i.id.toString()}
              >
                {i.text}
                <CloseButton
                  color={this.state.itemCloseColor}
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
        <StyledTodo color={this.state.itemFontColor}>
          <div className="container">
            <StyledHeading color={this.state.appTitleColor}>
              {this.state.appTitle}
            </StyledHeading>
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
