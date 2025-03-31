import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface User {
    name: string;
    email: string;
    github: string;
}

export type UserId = string;

export interface UserWithId extends User {
    id: UserId;
}

const DEFAULT_STATE = [
    {
        id: "1",
        name: "Efrain Arenas",
        email: "efrain_arenas_ramirez@outlook.com",
        github: "EfrainArenas",
    },
    {
        id: "2",
        name: "Henry Cavill",
        email: "henrycavill@outlook.com",
        github: "HenryCavill",
    },
];
//FUNCIONAMIENTO:
// 1. Se obtiene el estado persistido del localStorage
// 2. Si no hay estado persistido, se usa el estado por defecto
// 3. Si hay estado persistido, se usa el estado persistido
// 4. Se retorna el estado

const initialState: UserWithId[] = (() => {
    const persistedState = localStorage.getItem("reduxState");
    return persistedState ? JSON.parse(persistedState).users : DEFAULT_STATE;
})()

export const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        addNewUser: (state, action: PayloadAction<User>) => {
            const id = crypto.randomUUID()
            return [...state, { id, ...action.payload }]
        },
        deleteUserById: (state, action: PayloadAction<UserId>) => {
            const id = action.payload;
            return state.filter((user) => user.id !== id);
        },
        rollbackUser: (state, action: PayloadAction<UserWithId>) => {
            const userIsAlreadyDefined = state.some(user => user.id == action.payload.id)
            if (!userIsAlreadyDefined) {
                return [...state, action.payload]
            }
        }
    },
});

export default usersSlice.reducer;

export const { addNewUser, deleteUserById, rollbackUser } = usersSlice.actions;