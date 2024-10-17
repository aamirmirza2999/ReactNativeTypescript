// .storybook/index.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { view } from './storybook.requires';

const StorybookUIRoot = view.getStorybookUI({
  storage: {
    getItem: AsyncStorage.getItem,
    setItem: AsyncStorage.setItem,
  },
});

// Adjust this path to match your directory structure
const importStories = () => {
  require('./stories/Button/Button.stories'); // Adjust the path as needed
};

importStories();

export default StorybookUIRoot;
