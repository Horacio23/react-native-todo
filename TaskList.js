import React from 'react-native' //imports react-native

const {
  ListView,
  View,
  TouchableHighlight,
  Text
} = React

const styles = React.StyleSheet.create({
  container: {
    paddingTop: 40,
    backgroundColor: '#F7F7F7',
    flex: 1,
    justifyContent: 'flex-start'
  },
  button: {
    height:60,
    borderColor: '#05A5D1',
    borderWidth: 2,
    backgroundColor: '#333',
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: '#FAFAFA',
    fontSize: 20,
    fontWeight: '600'
  }
})

import TaskRow from './TaskRow'

class TaskList extends React.Component {
    constructor (props, context) {
      super(props, context)

      const ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2    //if the objects have a different refference, they will be themed different
      })

      this.state = {
        dataSource: ds.cloneWithRows(props.todos)     //calling clone with rows on a dataset populates it
      }
    }

    componentWillReceiveProps(nextProps) {
      const dataSource = this
        .state
        .dataSource
        .cloneWithRows(nextProps.todos);

      this.setState({ dataSource }); //this is the equivalent to saying dataSource: dataSource. Its a JS6 thing
    }
    renderRow (todo) {
        return (
          <TaskRow
            onDone={this.props.onDone}
            todo={todo} />
        )
    }

    render () {
      return (
        <View style={styles.container}>
          <ListView
              key={this.props.todos}
              dataSource={this.state.dataSource}
              renderRow={this.renderRow.bind(this)}
          />

          <TouchableHighlight
            onPress={this.props.onAddStarted}
            style={styles.button}>
            <Text style={styles.buttonText}>Add one</Text>
          </TouchableHighlight>
        </View>
      )
    }
}

TaskList.propTypes = {
  onDone: React.PropTypes.func.isRequired,
  todos: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  onAddStarted: React.PropTypes.func.isRequired
}

export default TaskList
