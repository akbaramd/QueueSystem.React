//Include Both Helper File with needed methods

// action
import {fetchError, fetchItemsSuccess, fetchItemSuccess, resetState} from "./reducer";
import {
    deleteDepartmentDelete,
    getDepartmentsFilter,
    postDepartmentCreate,
    putDepartmentUpdate
} from "../../../helpers/api_helper";
import {reset} from "list.js";


export const filterDepartments = ({search}) => async (dispatch) => {
    try {
        let response;
        response = getDepartmentsFilter({search});

        const data = await response;

        if (data) {
            dispatch(fetchItemsSuccess(data));
        }

    } catch (error) {
        dispatch(fetchError(error));
    }
};


export const getDepartmentDetail = (id) => async (dispatch) => {
    try {
        let response;

        response = getDepartmentDetail(id);

        const data = await response;

        if (data) {
            dispatch(fetchItemSuccess(data));
        }

    } catch (error) {
        dispatch(fetchError(error));
    }
};


export const createDepartment = (payload) => async (dispatch) => {

    try {
        let response;
        response = postDepartmentCreate(payload);

        const data = await response;

        if (data) {
            dispatch(fetchItemSuccess(data));
            return data;
        }
        
        return null;
    } catch (error) {
        dispatch(fetchError(error));
        return null;
    }
};

export const updateDepartment = (payload) => async (dispatch) => {
    try {
        let response;

        response = putDepartmentUpdate(payload);

        const data = await response;

        if (data) {
            dispatch(fetchItemSuccess(data));
            return data;
        }
        
        return  null;

    } catch (error) {
        dispatch(fetchError(error));
        return  null;
    }
};


export const deleteDepartment = (id) => async (dispatch) => {
    try {
        let response;

        response = deleteDepartmentDelete(id);

        const data = await response;

        if (data) {
            dispatch(fetchItemSuccess(data));
            return data;
        }

        return null;

    } catch (error) {
        dispatch(fetchError(error));
        return null;
    }
};


