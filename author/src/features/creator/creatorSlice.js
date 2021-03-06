import {  createSlice } from '@reduxjs/toolkit';

export const creatorSlice = createSlice({
  name: 'creator',
  
  initialState: {
    selectedNode: null,
    selectedLink: null,
    viewAdd: false,
    name: "",
    rule: "",
    onstart : {},
    actions:"",
    type:"button",
  },

  reducers: {
    setEditNode : (state, action)=>{
      const {name,rule, onstart, actions, type} = action.payload;
      state.selectedNode = name;
      state.name = name;
      state.rule = rule;
      state.onstart = onstart;
      state.actions = actions;
      state.type = type;
    },
    setEditLink: (state, action)=>{
      state.selectedLink = action.payload;
    },
    setViewAddNode : (state, action)=>{
      state.viewAdd = action.payload;
    },
    setName : (state, action)=>{
      state.name = action.payload;
    },
    setRule : (state, action)=>{
      state.rule = action.payload;
    },
    setOnstart: (state, action)=>{
      state.onstart = action.payload;
    },
    setActions: (state, action)=>{
      state.actions = action.payload;
    },
    setType: (state, action)=>{
      state.type = action.payload;
    }
  }
});

export const { setEditNode,setViewAddNode,setName,setRule, setOnstart,setActions,setEditLink,setType } = creatorSlice.actions;

export const showAddNode = (value)=>{
  return (dispatch, getState)=>{
      dispatch(setViewAddNode(value))
  }
}

export const editNode = (node)=>{
  return (dispatch, getState)=>{
      dispatch(setEditNode(node));
      dispatch(showAddNode(true));
  };
}

export const nodeToEdit         = state => state.creator.selectedNode;
export const linkToEdit         = state => state.creator.selectedLink;
export const selectViewAdd      = state => state.creator.viewAdd;
export const selectName         = state => state.creator.name;
export const selectRule         = state => state.creator.rule;
export const selectOnstart      = state => state.creator.onstart;
export const selectActions      = state => state.creator.actions;
export const selectType         = state => state.creator.type;

export default creatorSlice.reducer;
