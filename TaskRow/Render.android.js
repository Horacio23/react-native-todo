import React from 'react-native';

const {
  View,
  Text,
  TouchableHighlight,
  Animated,
  Image,
} = React;

export default function render(styles) {
    const doneAnimation = new Animated.ValueXY();

    const localStyles = React.StyleSheet.create({
        doneButton: {
            borderRadius: 5,
            padding: 5,

        },
        image: {
            height: 20,
            width: 25,
        },
        row: {
            transform: doneAnimation.getTranslateTransform(),
        },
    });

    function animatedPress() {
        Animated.spring(doneAnimation, {
            tension: 2, // speed in which it will animated away
            friction: 3, // controls acceleration and deceleration
            toValue: {
                x: -500, // so it leaves to the left
                y: 0,    // we dont want it to move in the y
            },
        }).start();

        setTimeout(() => {
            this.onDonePressed();
        }, 1000);
    }

    return (
      <Animated.View style={[styles.container, localStyles.row]}>
        <Text style={styles.label}>{this.props.todo.task}</Text>
        <TouchableHighlight
            onPress={animatedPress.bind(this)}
            style={localStyles.doneButton}
            underlayColor="#ddd"
        >
          <Image
              source={require('../images/done.png')}
              style={localStyles.image}
          />
        </TouchableHighlight>
      </Animated.View>
    );
}
