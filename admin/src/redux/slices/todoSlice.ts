import { createSlice } from "@reduxjs/toolkit";
import { Name } from "../../models/todo";
import { ITodoList } from "../../types/type";
const initialState:Name[]=[]

const todoSlice=createSlice({
    name:"TodoSlice",
    initialState: initialState,
    reducers:{
        addTodo:(state:any,action:PayloadAction)=>{
           state.push(action.payload)
            return state
        }
        getTodo:(state:ITodoList[],action:PayloadAction):ITodoList[]=>{
            state=action.payload
            return state
        }
    }
})

// get Selector
export const {addTodo,getTodo}=todoSlice.actions

// get Reducer
export default todoSlice.reducer
