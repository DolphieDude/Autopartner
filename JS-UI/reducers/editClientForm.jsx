import * as A from '../actions/client/editClientForm';
import {emptyClient} from '../constants/constants';
import {API} from "../rest/restAPI";
import * as auth from '../actions/auth';
import {Stack} from 'immutable';

const defaultEditClientFormState = {
    isOpen: false,
    initialClient: emptyClient,
    client: emptyClient,
    validations: Stack()
};

export default function editClientForm(state = defaultEditClientFormState, action) {
    switch (action.type) {
        case A.OPEN_EDIT_CLIENT_FORM:
            return {
                ...defaultEditClientFormState,
                initialClient: action.payload.client,
                client: action.payload.client,
                isOpen: true
            };
        case A.CLOSE_EDIT_CLIENT_FORM:
            return defaultEditClientFormState;
        case A.RESET_EDIT_CLIENT_FORM:
            return {
                ...defaultEditClientFormState,
                initialClient: state.initialClient,
                client: state.initialClient,
                isOpen: true
            };
        case A.UPDATE_EDIT_CLIENT:
            return {
                ...state,
                client: state.client.set(action.payload.fieldName, action.payload.value)
            };
        case A.VALIDATIONS_EDIT_CLIENT:
            const c = action.payload.fieldNames;
            const cl = state.client.normalize();
            const v = c && c.length > 0 ? state.validations.filter((v) => {
                return c.indexOf(v.fieldName) === -1
            }).concat(cl.validate(action.payload.fieldNames)) : cl.validate(action.payload.fieldNames);

            return {
                ...state,
                client: cl,
                validations: v
            };
        case API.events.editClient.actionSuccess:
            const validations = state.validations.concat(action.data.payload.validations);
            const fail = validations.find((v) => {return v.level === 'error'}) ? true : false;
            return {
                ...state,
                validations: validations,
                isOpen: fail
            };
        case auth.LOGOUT_SUCCESS:
            return defaultEditClientFormState;
        default:
            return state;
    }
}