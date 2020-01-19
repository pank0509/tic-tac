import React from 'react';
import {View, TouchableOpacity, StyleSheet, Text, Alert} from 'react-native';

class Game extends React.Component {
  state = {
    gameState: [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
    currentPlayer: 1,
  };
  onBoxPressed = (row, col) => {
    const {gameState, currentPlayer} = this.state;
    const value = gameState[row][col];
    if (value !== 0) {
      return null;
    }
    const finalArray = gameState.slice();
    finalArray[row][col] = currentPlayer;
    this.setState({
      gameState: finalArray,
    });
    const nextPlayer = currentPlayer === 1 ? -1 : 1;
    this.setState({
      currentPlayer: nextPlayer,
    });

    const winner = this.getWinner();
    if (winner === 1) {
      Alert.alert('Player 1 is the winner');
      this.setState({
        gameState: [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
        currentPlayer: 1,
      });
    } else if (winner === -1) {
      Alert.alert('Player 2 is the winner');
      this.setState({
        gameState: [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
        currentPlayer: 1,
      });
    }
  };
  getWinner = () => {
    const arr = this.state.gameState;
    let sum = null;
    for (let i = 0; i < 3; i++) {
      sum = arr[i][0] + arr[i][1] + arr[i][2];
      if (sum === 3) {
        return 1;
      } else if (sum === -3) {
        return -1;
      }
    }
    for (let i = 0; i < 3; i++) {
      sum = arr[i][0] + arr[i][1] + arr[i][2];
      if (sum === 3) {
        return 1;
      } else if (sum === -3) {
        return -1;
      }
    }
    sum = arr[0][0] + arr[1][1] + arr[2][2];
    if (sum === 3) {
      return 1;
    } else if (sum === -3) {
      return -1;
    }
    sum = arr[2][0] + arr[1][1] + arr[0][2];
    if (sum === 3) {
      return 1;
    } else if (sum === -3) {
      return -1;
    }
    return 0;
  };
  onNextButtonPressed = () => {
    this.setState({
      gameState: [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
      currentPlayer: 1,
    });
  };
  renderIcon = (row, col) => {
    const value = this.state.gameState[row][col];
    switch (value) {
      case 1:
        return (
          <View>
            <Text style={styles.valuesStyle}>X</Text>
          </View>
        );
      case -1:
        return (
          <View>
            <Text style={styles.valuesStyle}>O</Text>
          </View>
        );
      default:
        return <View />;
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text>X is player 1</Text>
          <Text>O is player 2</Text>
        </View>
        <View style={styles.upperRow}>
          <TouchableOpacity
            style={styles.box}
            onPress={() => this.onBoxPressed(0, 0)}>
            {this.renderIcon(0, 0)}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.box}
            onPress={() => this.onBoxPressed(0, 1)}>
            {this.renderIcon(0, 1)}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.box}
            onPress={() => this.onBoxPressed(0, 2)}>
            {this.renderIcon(0, 2)}
          </TouchableOpacity>
        </View>
        <View style={styles.lowerRow}>
          <TouchableOpacity
            style={styles.box}
            onPress={() => this.onBoxPressed(1, 0)}>
            {this.renderIcon(1, 0)}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.box}
            onPress={() => this.onBoxPressed(1, 1)}>
            {this.renderIcon(1, 1)}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.box}
            onPress={() => this.onBoxPressed(1, 2)}>
            {this.renderIcon(1, 2)}
          </TouchableOpacity>
        </View>
        <View style={styles.lowerRow}>
          <TouchableOpacity
            style={styles.box}
            onPress={() => this.onBoxPressed(2, 0)}>
            {this.renderIcon(2, 0)}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.box}
            onPress={() => this.onBoxPressed(2, 1)}>
            {this.renderIcon(2, 1)}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.box}
            onPress={() => this.onBoxPressed(2, 2)}>
            {this.renderIcon(2, 2)}
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={this.onNextButtonPressed}
          style={styles.resetBtn}>
          <Text>RESET</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    borderWidth: 1,
    width: 100,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
  },
  upperRow: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
  },
  lowerRow: {
    flexDirection: 'row',
  },
  valuesStyle: {
    fontSize: 30,
  },
  resetBtn: {
    marginTop: 40,
  },
});

export default Game;
