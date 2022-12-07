import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore , FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage";

import authSlice from "./slices/authSlice";
import modalSlice from "./slices/modalSlice";

const persistConfig = {
    key: "root",
    storage: storage,
    // localstorage에 저장할 reducer 지정
    whitelist: ["auth"],
};

// reducer를 뭉친것을 rootReducer 라고 정해준다.
// reducer는 여러개 있을 수 있으므로 하나로 뭉쳐주는 작업이다.
const rootReducer = combineReducers({ auth: authSlice.reducer, modal: modalSlice.reducer });
// persistReducer와 reducer를 뭉쳐놓은 덩어리를 같이 합쳐준다.
// persistedReducer: Reducer에 이미 존재하는 액션(rootReducer) 외에 PERSIST, PURGE, FLUSH, PAUSE, REHYDRATE을 추가적으로 탐지해 특정 기능 수행
const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    })
});

export const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>