import { configureStore, type Middleware } from '@reduxjs/toolkit'
import usersReducer, { rollbackUser } from './users/slice'
import { toast } from 'sonner'

const persistanceLocalStorageMiddleware: Middleware = (store) => (next) => (action) => {
    //Podemos hacer cualquier cosa con el store antes de que se actualice el estado
    /* console.log(store.getState());
    console.log(action); */

    next(action);
    //Podemos hacer cualquier cosa con el store después de que se actualice el estado
    /* console.log(store.getState()); */
    localStorage.setItem('reduxState', JSON.stringify(store.getState()));
}

//Esto es para la actualización optimista, es decir, que lo va aquitar de pantalla incluso antes de que la query se haga y, si sale mal, hará rollback y regresará al usuario borrado
const syncWithDatabaseMiddleware: Middleware = store => next => action => {
    const { type, payload } = action
    console.log({ action, state: store.getState() })
    const previousState = store.getState()
    next(action)

    if (type === 'users/deleteUserById') {
        const userToRemove = previousState.users.find(user => user.id == payload)
        fetch(`https://jsonplaceholder.typicode.com/users/${payload}`, {
            method: 'DELETE'
        })
            .then(res => { if (res.ok) toast.success('Success!') })
            .catch(() => {
                toast.error('Error deleting!')
                if (userToRemove) store.dispatch(rollbackUser(userToRemove))
                console.log('error')
            }
            )
    }
    console.log({ action, state: store.getState() })
}


export const store = configureStore({
    reducer: {
        users: usersReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([persistanceLocalStorageMiddleware, syncWithDatabaseMiddleware]),
})

//Es para que typescript sepa que tipo de dato es el store
export type RootState = ReturnType<typeof store.getState>

//Es para que typescript sepa que tipo de dato es el dispatch
export type AppDispatch = typeof store.dispatch