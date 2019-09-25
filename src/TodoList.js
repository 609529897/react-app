import React, { Component, Fragment } from 'react';

import TodoItem from './TodoItem';

class TodoList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inputValue: "",
      list: []
    };
    this.handleBtnClick = this.handleBtnClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  };
  render() {
    return (
      <Fragment>
        <div>
          <label htmlFor="insertArea">输入内容: </label>
          <input id="insertArea" value={this.state.inputValue}
            onChange={this.handleInputChange}
          />
          <button onClick={this.handleBtnClick}>submit</button>
        </div>
        <ul>
          {this.getTodoItem()}
        </ul>
      </Fragment >
    );
  };
  getTodoItem() {
    return this.state.list.map((item, index) => {
      return (
        <div key={index}>
          <TodoItem content={item} index={index} handleItemDelete={this.handleItemDelete.bind(this)} />
          {/*dangerouslySetInnerHTML={{__html: item}} 输入的内容会解析，这种是不安全的*/}
          {/*<li key={index} onClick={this.handleItemDelete.bind(this, index)} dangerouslySetInnerHTML={{ __html: item }}></li>*/}
        </div>
      )
    })
  };
  handleInputChange(e) {
    const value = e.target.value;
    // ES6 里 () 表示函数返回对象
    // 当使用 e 事件对象时必须先保存后填入，为了性能优化
    this.setState(() => ({ inputValue: value }));
  };
  handleBtnClick() {
    //接受一个参数 prevState ，表示修改前的状态
    this.setState((prevState) => ({
      list: [...prevState.list, prevState.inputValue],
      inputValue: ""
    }));
  };
  handleItemDelete(index) {
    // immutable: state 不允许我们做任何改变
    // 你要改就拷贝出一个副本，让后把副本改了让后添加回去
    this.setState((prevState) => {
      const list = [...prevState.list];
      list.splice(index, 1);
      return { list }
    });
  };
};

export default TodoList;
