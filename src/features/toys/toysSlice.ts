import { createSlice } from '@reduxjs/toolkit'
import { nanoid } from 'nanoid';
import { RootState } from '../../app/store';
import { randomToysData } from '../../util/randomToysData';
export interface IToy {
    id: string;
    name: string;
    type: string;
    description: string;
}

const initialState: IToy[] = [];

export const selectToys = (state: RootState) => state.toys;

const toysSlice = createSlice({
    name: 'toys',
    initialState,
    reducers: {
        add(state, action) {
            state.push(action.payload)
        },
        remove(state, action) {
            const index = state.findIndex(toy => toy.id === action.payload);
            state.splice(index, 1);
        },
        edit(state, action) {
            const index = state.findIndex(toy => toy.id === action.payload.id);
            state[index] = action.payload;
        },
        fillWithRandomData(state, action) {
            randomToysData.forEach(toy => state.push({ id: nanoid(), ...toy }))
        },
    },
})

export const { add, remove, edit, fillWithRandomData } = toysSlice.actions
export default toysSlice.reducer