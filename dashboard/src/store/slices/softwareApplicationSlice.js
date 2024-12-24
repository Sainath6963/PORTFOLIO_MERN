import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const softwareApplicationSlice = createSlice({
  name: "softwareApplications",
  initialState: {
    loading: false,
    softwareApplications: [],
    error: null,
    message: null,
  },
  reducers: {
    getAllSoftwareApplicationsRequest(state, action) {
      state.softwareApplications = [];
      state.error = null;
      state.loading = true;
    },
    getAllSoftwareApplicationsSuccess(state, action) {
      state.softwareApplications = action.payload;
      state.error = null;
      state.loading = false;
    },
    getAllSoftwareApplicationsFailed(state, action) {
      state.softwareApplications = state.softwareApplications;
      state.error = action.payload;
      state.loading = false;
    },
    addNewsoftwareApplicationRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    addNewsoftwareApplicationSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload;
    },

    addNewsoftwareApplicationFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    deletesoftwareApplicationsRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    deletesoftwareApplicationsSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload;
    },
    deletesoftwareApplicationsFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },

    resetSoftwareApplicationSlice(state, action) {
      state.error = null;
      state.softwareApplications = state.softwareApplications;
      state.message = null;
      state.loading = false;
    },
    clearAllErrors(state, action) {
      state.error = null;
      state.softwareApplications = state.softwareApplications;
    },
  },
});

export const getAllSoftwareApplications = () => async (dispatch) => {
  dispatch(
    softwareApplicationSlice.actions.getAllSoftwareApplicationsRequest()
  );
  try {
    const response = await axios.get(
      "https://mern-stack-portfolio-backend-jcei.onrender.com/api/v1/softwareApplications/getallApplications",
      { withCredentials: true }
    );
    dispatch(
      softwareApplicationSlice.actions.getAllSoftwareApplicationsSuccess(
        response.data.softwareApplications
      )
    );
    dispatch(softwareApplicationSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      softwareApplicationSlice.actions.getAllSoftwareApplicationsFailed(
        error.response.data.message
      )
    );
  }
};

export const addNewSoftwareApplication = (data) => async (dispatch) => {
  dispatch(softwareApplicationSlice.actions.addNewsoftwareApplicationRequest());
  try {
    const response = await axios.post(
      "https://mern-stack-portfolio-backend-jcei.onrender.com/api/v1/softwareApplications/addApplications",
      data,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    dispatch(
      softwareApplicationSlice.actions.addNewsoftwareApplicationSuccess(
        response.data.message
      )
    );
    dispatch(softwareApplicationSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      softwareApplicationSlice.actions.addNewsoftwareApplicationFailed(
        error.response.data.message
      )
    );
  }
};

export const deleteSoftwareApplication = (id) => async (dispatch) => {
  dispatch(
    softwareApplicationSlice.actions.deletesoftwareApplicationsRequest()
  );
  try {
    const response = await axios.delete(
      `https://mern-stack-portfolio-backend-jcei.onrender.com/api/v1/softwareApplications/deleteApplications/${id}`,
      { withCredentials: true }
    );
    dispatch(
      softwareApplicationSlice.actions.deletesoftwareApplicationsSuccess(
        response.data.message
      )
    );
    dispatch(softwareApplicationSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      softwareApplicationSlice.actions.deletesoftwareApplicationsFailed(
        error.response.data.message
      )
    );
  }
};

export const clearAllSoftwareAppError = () => (dispatch) => {
  dispatch(softwareApplicationSlice.actions.clearAllErrors());
};

export const resetSoftwareApplicationSlice = () => (dispatch) => {
  dispatch(softwareApplicationSlice.actions.resetSoftwareApplicationSlice());
};

export default softwareApplicationSlice.reducer;
