import React from "react";
import cancel from "../cancel.png";
import classNames from "classnames";
import posed, { PoseGroup } from "react-pose";
import ListItem from "./items";
import CatList from "./CatList";
const Item = posed.li({
  enter: {
    opacity: 1,
    scale: 1,
    transition: {
      scale: {
        type: "spring",
        mass: 0.6
      },
      duration: 500
    }
  },
  exit: {
    opacity: 0,
    scale: 0,
    transition: {
      scale: {
        type: "spring"
      },
      duration: 500
    }
  }
});
const CatWrapper = posed.li({
  enter: {
    opacity: 1,
    scale: 1,
    transition: {
      scale: {
        type: "spring",
        mass: 0.6
      },
      duration: 500
    }
  },
  exit: {
    opacity: 0,
    scale: 0,
    transition: {
      scale: {
        type: "spring"
      },
      duration: 500
    }
  },
  close: {
    height: "28px",
    duration: 200
  },
  open: {
    height: "auto",
    duration: 200
  }
});
const Catinput = posed.div({
  enter: {
    y: 0,
    opacity: 1,
    delay: ({ delay }) => delay,
    transition: {
      y: { type: "spring", stiffness: 1000, damping: 15 },
      default: { duration: 300 }
    }
  },
  exit: {
    y: 50,
    opacity: 0,
    transition: { duration: 150 }
  }
});
class Main extends React.Component {
  state = {
    things: [],
    cats: [],
    inputval: "",
    inputvalcat: "",
    filter: "all",
    creating_cat: false,
    isEditingCat: 0,
    addingDo: false,
    catMod: false,
    showConf: false
  };
  id = 0;
  catId = 0;
  add = text => {
    if (text) {
      this.setState(prevstate => {
        return {
          things: [
            ...prevstate.things,
            {
              text: text,
              done: false,
              id: this.id++,
              cat: 0
            }
          ],
          inputval: ""
        };
      });
    } else {
      alert("لطفا فیلد را پر کنید");
    }
  };
  reset = () => {
    this.setState({
      things: []
    });
  };
  did = id => {
    console.log("weewf");
    this.setState(prevstate => {
      return {
        things: prevstate.things.map(todo => {
          if (todo.id === id) {
            return {
              ...todo,
              done: !todo.done
            };
          } else {
            return todo;
          }
        })
      };
    });
  };
  remove = id => {
    this.setState(prevstate => {
      return {
        things: prevstate.things.filter(thing => thing.id != id)
      };
    });
  };
  edit = (id, newname) => {
    this.setState(prevstate => {
      return {
        things: prevstate.things.map(thing => {
          if (thing.id === id) {
            return {
              ...thing,
              text: newname
            };
          } else {
            return thing;
          }
        })
      };
    });
  };
  handleinput = event => {
    this.setState({
      inputval: event.target.value
    });
  };
  handleinputCat = event => {
    this.setState({
      inputvalcat: event.target.value
    });
  };
  setfilter = filter => {
    this.setState({
      filter: filter
    });
  };
  getcontent = () => {
    switch (this.state.filter) {
      case "all":
        return this.state.things;
      case "done":
        return this.state.things.filter(thing => thing.done);
      case "undone":
        return this.state.things.filter(thing => !thing.done);
    }
  };
  handleenter = event => {
    if (event.key === "Enter") {
      this.add(event.target.value);
    }
  };
  handleenterCat = event => {
    if (event.key === "Enter") {
      this.createCat();
    }
  };
  catCreatStart = () => {
    if (this.state.things.length) {
      this.setState(prevstate => {
        return {
          creating_cat: !prevstate.creating_cat
        };
      });
    } else {
      alert(
        "برای ساخت دسته بندی حداقل باید یک کار برای انجام دادن داشته باشید"
      );
    }
  };
  createCat = () => {
    if (this.state.inputvalcat) {
      this.setState(
        prevstate => {
          return {
            cats: [
              ...prevstate.cats,
              {
                name: this.state.inputvalcat,
                id: ++this.catId,
                isOpen: false
              }
            ]
          };
        },
        () => {
          this.setState({
            inputvalcat: ""
          });
        }
      );
    } else {
      alert("نامی برای دسته بندی انتخاب کنید");
    }
  };
  showAdd = id => {
    this.setState({ isEditingCat: id, addingDo: true });
  };
  addToCat = id => {
    this.setState(prevstate => ({
      things: prevstate.things.map(thing => {
        if (id == thing.id) {
          return { ...thing, cat: prevstate.isEditingCat };
        } else {
          return thing;
        }
      })
    }));
  };
  closeAdding = () => {
    this.setState({ addingDo: false, isEditingCat: 0 });
  };
  showMore = id => {
    this.setState(prevstate => ({
      cats: prevstate.cats.map(thing => {
        if (thing.id === id) {
          return { ...thing, isOpen: !thing.isOpen };
        } else {
          return thing;
        }
      })
    }));
  };
  catMod = () => {
    this.setState(prevstate => ({ catMod: !prevstate.catMod }));
  };
  confirmRemoveCat = id => {
    this.setState({
      isEditingCat: id,
      showConf: true
    });
  };
  removeCat = () => {
    this.setState(prevstate => ({
      cats: prevstate.cats.filter(cat => this.state.isEditingCat !== cat.id),
      things: prevstate.things.filter(
        thing => this.state.isEditingCat !== thing.cat
      ),
      showConf: false
    }));
  };
  closeConf = () => {
    this.setState({
      showConf: false,
      isEditingCat: 0
    });
  };
  render() {
    return (
      <>
        <div>
          <input
            placeholder="عنوان کار خود را بنویسید"
            type="text"
            value={this.state.inputval}
            onChange={this.handleinput}
            onKeyPress={this.handleenter}
          />
        </div>
        <div className="btn_wrapper">
          <button
            onClick={() => {
              this.add(this.state.inputval);
            }}
          >
            اضافه کردن کار
          </button>
          <button onClick={this.reset}> ریست کردن </button>
          <button
            style={{
              minWidth: "120px"
            }}
            onClick={this.catCreatStart}
          >
            {this.state.creating_cat ? "بستن" : "افزودن دسته بندی"}
          </button>
          {this.state.cats.length != 0 ? (
            <button onClick={this.catMod}>
              {this.state.catMod ? "نمایش تکی" : "نمایش زیرمجموعه ای دسته بندی"}
            </button>
          ) : null}
        </div>
        <PoseGroup>
          {this.state.creating_cat ? (
            <Catinput
              delay={100}
              style={{
                marginTop: "20px"
              }}
              key="catInput"
              className="catinput"
            >
              <input
                value={this.state.inputvalcat}
                onChange={this.handleinputCat}
                onKeyPress={this.handleenterCat}
                placeholder="عنوان دسته بندی را بنویسید"
                type="text"
              />
              <p className="btn_wrapper">
                <button onClick={this.createCat}> ذخیره دسته بندی </button>
              </p>
            </Catinput>
          ) : null}
        </PoseGroup>
        <ul>
          <li>
            <span className="title_check"> انجام شده </span>
            <p> لیست کار ها </p> <span className="title_img"> حذف </span>
          </li>

          <PoseGroup>
            {!this.state.catMod
              ? this.getcontent().map((object, index) => {
                  return (
                    <Item
                      key={object.id}
                      className={classNames({
                        did: object.done
                      })}
                    >
                      <ListItem
                        {...object}
                        delete={() => {
                          this.remove(object.id);
                        }}
                        toggle={() => {
                          this.did(object.id);
                        }}
                        edit={newname => {
                          this.edit(object.id, newname);
                        }}
                      />
                    </Item>
                  );
                })
              : this.state.cats.map((object, index) => {
                  return (
                    <CatWrapper
                      key={object.id}
                      className="cat_wrapper select_cat"
                      pose={object.isOpen ? "open" : "close"}
                    >
                      <button
                        className="edit_btn"
                        style={{ left: "15px", top: "1px" }}
                        onClick={() => {
                          this.showMore(object.id);
                        }}
                      >
                        {object.isOpen
                          ? "کوچک کردن"
                          : "دیدن کار های این دسته بندی"}
                      </button>
                      {object.name}
                      <ul>
                        {this.getcontent().map(thing => {
                          if (thing.cat == object.id) {
                            return (
                              <li
                                key={thing.id}
                                className={classNames({ did: thing.done })}
                              >
                                <ListItem
                                  {...thing}
                                  delete={() => {
                                    this.remove(thing.id);
                                  }}
                                  toggle={() => {
                                    this.did(thing.id);
                                  }}
                                  edit={newname => {
                                    this.edit(thing.id, newname);
                                  }}
                                />
                              </li>
                            );
                          }
                        })}
                      </ul>
                    </CatWrapper>
                  );
                })}
          </PoseGroup>
          {this.state.things.length === 0 ? (
            <li> کاری برای انجام دادن وجود ندارد </li>
          ) : null}
        </ul>
        <div
          className={classNames("btn_wrapper", {
            active: this.state.filter
          })}
        >
          <button
            className={classNames({
              active: this.state.filter === "done"
            })}
            onClick={() => {
              this.setfilter("done");
            }}
          >
            done
          </button>
          <button
            className={classNames({
              active: this.state.filter === "undone"
            })}
            onClick={() => {
              this.setfilter("undone");
            }}
          >
            undone
          </button>
          <button
            className={classNames({
              active: this.state.filter === "all"
            })}
            onClick={() => {
              this.setfilter("all");
            }}
          >
            all
          </button>
        </div>
        {this.state.cats.length !== 0 ? (
          <div className="cats">
            <h4> دسته بندی ها </h4>
            <ul>
              <PoseGroup>
                {this.state.cats.map(cat => (
                  <Item key={cat.id}>
                    <CatList
                      addDo={() => {
                        this.showAdd(cat.id);
                      }}
                      remove={() => {
                        this.confirmRemoveCat(cat.id);
                      }}
                    >
                      {cat.name}
                    </CatList>
                  </Item>
                ))}
              </PoseGroup>
            </ul>
          </div>
        ) : null}
        <PoseGroup>
          {this.state.addingDo ? (
            <Catinput className="pop_up" key="choose" delay={0}>
              <div className="body">
                <div>
                  <button onClick={this.closeAdding}>بستن</button>
                </div>
                <ul>
                  {this.state.things.map(thing => {
                    if (thing.cat === 0) {
                      return (
                        <li
                          key={thing.id}
                          className="select_cat"
                          onClick={() => {
                            this.addToCat(thing.id);
                          }}
                        >
                          {thing.text}
                        </li>
                      );
                    }
                  })}
                </ul>
              </div>
            </Catinput>
          ) : null}
        </PoseGroup>
        {this.state.showConf ? (
          <PoseGroup>
            <Catinput className="pop_up" key="remove_cat" delay={0}>
              <div className="body">
                <p>
                  شما قصد حذف دسته بندی
                  {this.state.cats[this.state.isEditingCat - 1].name} را
                  دارید.تمام کار های زیرمجموعه این دسته هم حذف خواهند شد.ادامه
                  میدهید؟
                </p>
                <div className="btn_wrapper">
                  <button onClick={this.removeCat}>حذف دسته بندی</button>
                  <button onClick={this.closeConf}>انصراف</button>
                </div>
              </div>
            </Catinput>
          </PoseGroup>
        ) : null}
      </>
    );
  }
}
export default Main;
