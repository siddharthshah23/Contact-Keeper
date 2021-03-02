import React, { useReducer } from "react";
import { v4 as uuid } from "uuid";
import ContactContext from "./ContactContext";
import ContactReducer from "./ContactReducer";
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
} from "../types";
import contactContext from "./ContactContext";

const ContactState = (props) => {
  const initialState = {
    contacts: [
      {
        id: 1,
        name: "Rock Smith",
        email: "rock.smith@abc.com",
        phone: "111-111-1111",
        type: "personal",
      },
      {
        id: 2,
        name: "Rock Smith",
        email: "rock.smith@abc.com",
        phone: "111-111-1111",
        type: "professional",
      },
      {
        id: 3,
        name: "Rock Smith",
        email: "rock.smith@abc.com",
        phone: "111-111-1111",
        type: "personal",
      },
    ],
    current: null,
  };

  const [state, dispatch] = useReducer(ContactReducer, initialState);

  // Add Contact

  const addContact = (contact) => {
    contact.id = uuid.v4;
    dispatch({ type: ADD_CONTACT, payload: contact });
  };

  // Delete Contact

  const deleteContact = (id) => {
    dispatch({ type: DELETE_CONTACT, payload: id });
  };

  //Set Current Contact

  const setCurrent = (contact) => {
    dispatch({ type: SET_CURRENT, payload: contact });
  };

  //Clear Current Contact

  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  //Update Contact

  const updateContact = (contact) => {
    dispatch({ type: UPDATE_CONTACT, payload: contact });
  };

  //Filter Contact

  //Clear Filter

  return (
    <contactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        addContact,
        updateContact,
        deleteContact,
        setCurrent,
        clearCurrent,
      }}
    >
      {props.children}
    </contactContext.Provider>
  );
};

export default ContactState;
