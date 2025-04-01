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
        name: "Batman",
        email: "batman@outlook.com",
        github: "Batman",
    },
    {
        id: "4",
        name: "Superman",
        email: "Superman@outlook.com",
        github: "Superman",
    },
    {
        id: "5",
        name: "Harry Potter",
        email: "harrypotter@outlook.com",
        github: "HarryPotter",
    },
    {
        id: "6",
        name: "Peter Parker",
        email: "peterparker@outlook.com",
        github: "PeterParker",
    },//create ten more
    {
        id: "7",
        name: "Clark Kent",
        email: "clarkkent@outlook.com",
        github: "ClarkKent",

    }
    

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
            //Es mejor con push
            state.push({ id, ...action.payload })
        },
        deleteUserById: (state, action: PayloadAction<UserId>) => {
            const id = action.payload;
            return state.filter((user) => user.id !== id);
        },
        rollbackUser: (state, action: PayloadAction<UserWithId>) => {
            const userIsAlreadyDefined = state.some(user => user.id == action.payload.id)
            if (!userIsAlreadyDefined) {
                //Es mejor con push
                state.push(action.payload)
            }
        }
    },
});

export default usersSlice.reducer;

export const { addNewUser, deleteUserById, rollbackUser } = usersSlice.actions;