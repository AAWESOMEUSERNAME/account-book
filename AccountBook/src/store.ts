import {configureStore, createSlice} from '@reduxjs/toolkit'
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux'

interface ModalVisibleStates {
  showTagManagement: boolean
}

export const modalSlice = createSlice({
  name: 'modals',
  initialState: {showTagManagement: false},
  reducers: {
    toggleTagManagement: (state: ModalVisibleStates) => ({...state, showTagManagement: !state.showTagManagement})
  }
})

const store = configureStore({
  reducer: {
    modals: modalSlice.reducer
  }
})

type RootState = ReturnType<typeof store.getState>
export const useAppDispatch = () => useDispatch<typeof store.dispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const tagManagementVisibleSelector = (state: RootState) => state.modals.showTagManagement
export const {toggleTagManagement} = modalSlice.actions


export default store
