import React, {
  AppRegistry,
  Component,
  Navigator,
} from 'react-native';

import TaskList from './TaskList';
import TaskForm from './TaskForm';
import store from './todoStore';

class MyFirstProject extends Component {
  constructor(props, context) {
      super(props, context);
      this.state = store.getState();

      store.subscribe(() => {
          console.log('the component was updated');
      // this is a callback so that the store can update the component if it has a change of state
          this.setState(store.getState()); // eslint-disable-line react/no-set-state
      });
  }

  onAddStarted() {
      this.nav.push({
          name: 'taskform',
      });
  }

  onAdd(task) {
      console.log('added', task);
      // this.state.todos.push({ task });
      // this.setState({ todos: this.state.todos })

      store.dispatch({
          type: 'ADD_TODO',
          task,    // this is the ES6 literal,the variable are the same so u can write it only once (task: task)
      });

      this.nav.pop();
  }
  onCancel() {
      console.log('cancelled');
      this.nav.pop();
  }

  onDone(todo) {
      console.log('todo was completed', todo.task);
      store.dispatch({
          type: 'DONE_TODO',
          todo,
      });
  }

  onToggle() {
      store.dispatch({
          type: 'TOGGLE_STATE',
      });
  }

  renderScene(route, nav) {
      switch (route.name) {
      case 'taskform':
          return (
            <TaskForm
                onAdd={this.onAdd.bind(this)}
                onCancel={this.onCancel.bind(this)}
            />
          );
      default:
          return (
            <TaskList
                filter={this.state.filter}
                onAddStarted={this.onAddStarted.bind(this)}
                onDone={this.onDone.bind(this)}
                onToggle={this.onToggle.bind(this)}
                todos={this.state.todos}
            />
          );

      }
  }

  configureScene() {
      return Navigator.SceneConfigs.FloatFromBottom;
  }

  render() {
      return (
        <Navigator
            configureScene={this.configureScene}
            initialRoute={{ name: 'tasklist', index: 0 }}
            ref={((nav) => {  // this is a shorthand notation that already binds the function to this object
                this.nav = nav;
            })}
            renderScene={this.renderScene.bind(this)}
        />
    );
  }
}

AppRegistry.registerComponent('MyFirstProject', () => MyFirstProject);
