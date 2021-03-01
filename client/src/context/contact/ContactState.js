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
  };

  const [state, dispatch] = useReducer(ContactReducer, initialState);

  // Add Contact

  const addContact = (contact) => {
    contact.id = uuid.v4();
    dispatch({ type: ADD_CONTACT });
  };

  // Delete Contact

  //Set Current Contact

  //Clear Current Contact

  //Update Contact

  //Filter Contact

  //Clear Filter

  return (
    <contactContext.Provider
      value={{
        contacts: state.contacts,
      }}
    >
      {props.children}
    </contactContext.Provider>
  );
};

export default ContactState;
