/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Navigator,
  Text
} from 'react-native';

import TaskList from './TaskList';
import TaskForm from './TaskForm';

class MyFirstProject extends Component {
  constructor(props, context){
    super(props, context);
    this.state = {
        todos: [
          {
            task:'Learn React Native'

          },
          {
            task:'Learn JS7'

          },
        ],
    };
  }

  onAddStarted() {
    console.log('on add started');
    this.nav.push({
      name: 'taskform'
    });
  }

  onAdd(task){
    console.log('added', task);
    this.state.todos.push({ task });
    this.setState({ todos: this.state.todos })
    this.nav.pop();
  }
  onCancel() {
    console.log('cancelled');
    this.nav.pop();
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
            onAddStarted={this.onAddStarted.bind(this)}
            todos={this.state.todos} />
        )

    }
  }

  configureScene () {
    return Navigator.SceneConfigs.FloatFromBottom;
  }

  render() {
    return(
      <Navigator
        configureScene={this.configureScene}
        initialRoute={{ name: 'tasklist', index: 0}}
        ref={((nav) => {  //this is a shorthand notation that already binds the function to this object
          this.nav = nav;
        })}
        renderScene={this.renderScene.bind(this)}
      />
    );
  }
}

AppRegistry.registerComponent('MyFirstProject', () => MyFirstProject)
