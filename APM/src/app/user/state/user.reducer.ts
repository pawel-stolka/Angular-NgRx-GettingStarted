import { createAction, createReducer, on } from "@ngrx/store";

const initialState = {
  showMask: false
}

export const userReducer = createReducer(
  initialState,
  on(createAction('[User] Username Mask'), state => {
    console.log('original mask', state)
    return {
      ...state,
      showMask: !state.showMask
    }
  })
)
