import { useEffect, useState } from "react";
//Import from npm i uuid for build id and install the types npm i --save-dev @types/uuid
import { v4 as uuidv4 } from "uuid";
import { categories } from "../data/categories";
import { Activity } from "../types";
import { useActivity } from "../hooks/useActivity";

const initialState: Activity = {
  id: uuidv4(),
  category: 1,
  name: "",
  calories: 0,
};

function Form() {
  const { state, dispatch } = useActivity();

  //Define the object state for my form fields and assign them a my initialState
  const [activity, setActivity] = useState<Activity>(initialState);

  //Set the activity to edit using the activeId, if this is the same than the id of the selected activity, the form will take its values
  useEffect(() => {
    //Check if exists an activeId
    if (state.activeId) {
      //Check if the activeId on the state it's the same than the id of the selected activity
      const selectedActivity = state.activities.filter(
        (stateActivity) => stateActivity.id === state.activeId
      )[0];
      //Updating the form through the selected activity
      setActivity(selectedActivity);
    }
    return;
  }, [state]);

  //Read the value of the input and update the state
  //To get the type of the event set on the value of onchange like this onChange={e=>} and hover over it
  const handleChange = (
    //Union type to accept two types of events (input and select)
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    //Identify if the input is a number field
    const isNumberField = ["category", "calories"].includes(e.target.id);
    //Keep the previous state and update the new value of the input when the value changes
    setActivity({
      ...activity,
      //If the input is a number field, convert the value to a number, otherwise as is
      [e.target.id]: isNumberField ? +e.target.value : e.target.value,
    });
    console.log(e.target.id);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //Dispatch the action to save the new activity from our reducer
    dispatch({
      type: "save-activity",
      //The payload newActivity will be the activity from our useState
      payload: { newActivity: activity },
    });

    //Reset the form fields after a submit, then save the new activity and generate a new id
    setActivity({
      ...initialState,
      id: uuidv4(),
    });
  };

  //Function to validate that the inputs are not empty
  const isValidActivity = () => {
    const { name, calories } = activity; //Not category because has a default value
    //Validate if the name it's not empty and calories are greater than 0
    return name.trim() !== "" && calories > 0;
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 bg-white shadow p-10 rounded-lg"
    >
      <div className="grid grid-cols-1 gap-3">
        <label className="font-bold" htmlFor="category">
          Category
        </label>
        <select
          className="border border-slate-300 p-2 rounded-lg w-full bg-white"
          id="category"
          value={activity.category}
          onChange={handleChange}
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 gap-3">
        <label className="font-bold" htmlFor="name">
          Activity
        </label>
        <input
          id="name"
          type="text"
          className="border border-slate-300 p-2 rounded-lg w-full bg-white"
          placeholder="EG. Food, Orange juice, Salad, Workout, etc."
          value={activity.name}
          onChange={handleChange}
        />
      </div>

      <div className="grid grid-cols-1 gap-3">
        <label className="font-bold" htmlFor="calories">
          Calories
        </label>
        <input
          id="calories"
          type="number"
          className="border border-slate-300 p-2 rounded-lg w-full bg-white"
          placeholder="Calories. E.G. 100, 200, 300, etc."
          value={activity.calories}
          onChange={handleChange}
        />
      </div>

      <input
        className="bg-slate-800 hover:bg-slate-950 duration-300 w-full uppercase cursor-pointer p-2 font-bold text-white rounded-lg disabled:opacity-50"
        type="submit"
        value={activity.category === 1 ? "Add food" : "Add exercise"}
        disabled={!isValidActivity()}
      />
    </form>
  );
}

export default Form;
