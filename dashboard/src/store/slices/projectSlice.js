import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const projectSlice = createSlice({
  name: "project",
  initialState: {
    loading: false,
    projects: [],
    error: null,
    message: null,
    singleProject: {},
  },
  reducers: {
    getAllProjectRequest(state, action) {
      state.projects = [];
      state.error = null;
      state.loading = true;
    },
    getAllProjectSuccess(state, action) {
      state.projects = action.payload;
      state.error = null;
      state.loading = false;
    },
    getAllProjectFailed(state, action) {
      state.projects = state.projects;
      state.error = state.payload;
      state.loading = false;
    },
    addNewProjectRequest(state, action) {
      state.loading = true;
      state.message = null;
      state.error = null;
    },
    addNewProjectSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
      state.error = null;
    },
    addNewProjectFailed(state, action) {
      state.error = action.payload;
      state.message = null;
      state.loading = false;
    },
    deleteProjectRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    deleteProjectSuccess(state, action) {
      state.error = null;
      state.message = action.payload;
      state.loading = false;
    },
    deleteProjectFailed(state, action) {
      state.error = action.payload;
      state.loading = false;
      state.message = null;
    },
    updateProjectRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    updateProjectSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload;
    },
    updateProjectFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    resetProjectSlice(state, action) {
      state.error = null;
      state.projects = state.projects;
      state.message = null;
      state.loading = false;
    },
    clearAllErrors(state, error) {
      state.error = null;
      state.projects = state.projects;
    },
  },
});

export const getAllProject = () => async (dispatch) => {
  dispatch(projectSlice.actions.getAllProjectRequest());
  try {
    const response = await axios.get(
      "https://mern-stack-portfolio-backend-jcei.onrender.com/api/v1/projects/getAll",
      {
        withCredentials: true,
      }
    );
    dispatch(projectSlice.actions.getAllProjectSuccess(response.data.projects));
    dispatch(projectSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(projectSlice.actions.getAllProjectFailed(error.response));
  }
};

export const addNewProject = (projectData) => async (dispatch) => {
  dispatch(projectSlice.actions.addNewProjectRequest());
  try {
    const response = await axios.post(
      "https://mern-stack-portfolio-backend-jcei.onrender.com/api/v1/projects/add",
      projectData,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    dispatch(projectSlice.actions.addNewProjectSuccess(response.data.message));
    dispatch(projectSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      projectSlice.actions.addNewProjectFailed(error.response.data.message)
    );
  }
};

export const deleteProject = (id) => async (dispatch) => {
  dispatch(projectSlice.actions.deleteProjectRequest());
  try {
    const response = await axios.delete(
      `https://mern-stack-portfolio-backend-jcei.onrender.com/api/v1/projects/delete/${id}`,
      { withCredentials: true }
    );
    dispatch(projectSlice.actions.deleteProjectSuccess());
    dispatch(projectSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      projectSlice.actions.deleteProjectFailed(error.response.data.message)
    );
  }
};

export const updateProject = (id, newData) => async (dispatch) => {
  dispatch(projectSlice.actions.updateProjectRequest());
  try {
    const response = await axios.put(
      `https://mern-stack-portfolio-backend-jcei.onrender.com/api/v1/projects/update/${id}`,
      newData,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    dispatch(projectSlice.actions.updateProjectSuccess(response.data.message));
    dispatch(projectSlice.actions.clearAllErrors());
  } catch (error) {
    console.log(error);
    dispatch(
      projectSlice.actions.updateProjectFailed(error.response.data.message)
    );
  }
};

export const resetProjectSlice = () => (dispatch) => {
  dispatch(projectSlice.actions.resetProjectSlice());
};

export const clearAllProjectErrors = () => (dispatch) => {
  dispatch(projectSlice.actions.clearAllErrors());
};

export default projectSlice.reducer;
