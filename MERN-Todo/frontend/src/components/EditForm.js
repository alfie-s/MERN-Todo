import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useAuthContext } from "../hooks/useAuthContext";
 
export default function EditForm() {
  // get user from useAUthcontext import to use for authorisation
  const { user } = useAuthContext()
    // setting states for the edit form
 const [form, setForm] = useState({
  todoItem: "",
   todos: [],
 });
//  setting variable for useParams to return an object of key/value pairs
 const params = useParams();
//  allows to use navigate such as in the useEffect
 const navigate = useNavigate();
 useEffect(() => {
   async function fetchData() {
    // settting variable for the id in the params
     const id = params.id.toString();
    //  fetch the data
     const response = await fetch(`/api/todos//${params.id.toString()}`,{
      headers: {
      'Authorization': `Bearer ${user.token}`,
      }
    });
     if (!response.ok) {
      // error messge if not ok response
       const message = `An error has occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
     const todo = await response.json();
     if (!todo) {
       window.alert(`Todo with id ${id} not found`);
       navigate("/");
       return;
     }
    //  set state
     setForm(todo);
   }
  //  call fetchData
   fetchData();
   return;
  //  dependencies
 }, [params.id, navigate]);
 
 // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
//  prevent default and set the states to the values from the form
 async function onSubmit(e) {
   e.preventDefault();
   const editedTodo = {
    todoItem: form.todoItem,
   };
 
   // This will send a post request to update the data in the database.
   await fetch(`/api/todos/edit/${params.id}`, {
     method: "PUT",
     body: JSON.stringify(editedTodo),
     headers: {
       'Content-Type': 'application/json',
       'Authorization': `Bearer ${user.token}`
     },
   });
 
   navigate("/");
}
    return (
        <>
            {/* Edit form */}
            <form className="createTodo" onSubmit={onSubmit}>
                <h3>Update Todo</h3>
                {/* <label>Todo:</label> */}
                <input
                    type="text"
                    onChange={(e) => updateForm({ todoItem: e.target.value })}
                    value={form.todoItem}
                />
                <button>Update</button>
            </form>
            </>
    )
}