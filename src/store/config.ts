import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore , FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage";

import userSlice from "./slices/userSlice";
import modalSlice from "./slices/modalSlice";
import boxSlice from "./slices/boxSlice";

const persistConfig = {
    key: "user",  // storage에 저장될 key 이름
    storage: storage,  // 저장할 storage (local or session)
    whitelist: ["user"],  // localstorage에 저장할 reducer 지정
};

// rootReducer: reducer 여러개를 하나로 뭉친 것
const rootReducer = combineReducers({ 
    user: userSlice.reducer,
    modal: modalSlice.reducer,
    box: boxSlice.reducer,
});
// persistReducer와 rootReducer를 결합.
// persistedReducer: Reducer에 이미 존재하는 액션(rootReducer) 외에 PERSIST, PURGE, FLUSH, PAUSE, REHYDRATE을 추가적으로 탐지해 특정 기능 수행
const persistedReducer = persistReducer(persistConfig, rootReducer);

// store: Provider에 전달하여 리덕스 스토어를 사용하기 위함
// persistor: PersistGate에 전달하여 로컬/세션 스토리지를 사용하기 위함
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