import {applyMiddleware, createStore, combineReducers} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import {setContactStore, contactReducer} from '@/store/contact';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {composeWithDevTools} from 'redux-devtools-extension';
const middlewares: any[] = [];

const enhancer = composeWithDevTools(applyMiddleware(...middlewares));

const reducers = combineReducers({
  contacts: contactReducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = createStore(persistedReducer, enhancer);
export const persistor = persistStore(store);

// set store
setContactStore(store);
