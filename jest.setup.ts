import mockAsyncStorage from './src/lib/async-storage-jest';

jest.mock('./src/lib/async-storage', () => mockAsyncStorage);
jest.mock('./src/lib/clipboard', () => require('./src/lib/clipboard'));
jest.mock('react-native-reanimated', () => require('react-native-reanimated/mock'));

// Silence reanimated mock warnings
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
