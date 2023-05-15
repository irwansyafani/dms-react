import {Colors} from 'react-native/Libraries/NewAppScreen';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  wrapper: {
    padding: 10,
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: 'black',
    marginBottom: 5,
    position: 'relative',
    paddingRight: 70,
  },
  iconsWrapper: {
    display: 'flex',
    flexDirection: 'row',
    position: 'absolute',
    right: 5,
    top: 5,
  },
  buttonsOpts: {
    width: 30,
    padding: 5,
    borderRadius: 4,
    backgroundColor: Colors.white,
    marginRight: 2,
  },
  icon: {
    width: 20,
    height: 20,
  },
  textColor: {
    color: Colors.black,
  },
});
