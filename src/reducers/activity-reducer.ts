import { Activity } from "../types";

//Actions
export type ActivityActions =
  | {
      type: "save-activity";
      //Payload is what we send to the reducers, in this case, an activity
      payload: { newActivity: Activity };
    }
  //Action to set an element as active through the id
  | {
      type: "set-activeId";
      payload: { id: Activity["id"] };
    }
  | {
      type: "remove-activity";
      payload: { id: Activity["id"] };
    }
  | {
      type: "reset-app";
    };

//Define the type for my state
export type ActivityState = {
  activities: Activity[];
  activeId: Activity["id"];
};

//Function to get the saved activities from the local storage
const localStorageActivities = (): Activity[] => {
  const activities = localStorage.getItem("activities");
  //if there are no activities, return an empty array
  return activities ? JSON.parse(activities) : [];
};

//Initial state
export const initialState: ActivityState = {
  activities: localStorageActivities(),
  activeId: "",
};

//Reducer
export const activityReducer = (
  state: ActivityState = initialState,
  action: ActivityActions
) => {
  //Define the functionality for save the activity
  if (action.type === "save-activity") {
    let updatedActivities: Activity[] = [];

    //If the selected activity it's the same than the activeId, update it, do no create another activity
    if (state.activeId) {
      updatedActivities = state.activities.map((activity) =>
        activity.id === state.activeId ? action.payload.newActivity : activity
      );
    } else {
      updatedActivities = [...state.activities, action.payload.newActivity];
    }
    //Return the a copy of the previous state
    return {
      ...state,
      //Save the copy of my activities and add a new activity to the activities array through the payload
      activities: updatedActivities,
      //After to create a new actitivy the activeId will be restored to empty
      activeId: "",
    };
  }
  //Set the active id for an activity
  if (action.type === "set-activeId") {
    return {
      ...state,
      activeId: action.payload.id,
    };
  }

  //Using deleting activity action with the activeId
  // if (action.type === "remove-activity") {
  //   let updatedActivities: Activity[] = [];
  //   if (state.activeId) {
  //     updatedActivities = state.activities.filter(
  //       (activity) => activity.id !== state.activeId
  //     );
  //   }
  //   return {
  //     ...state,
  //     //Filter the activities and remove the activity that has the same id than the selected activity on the payload
  //     activities: updatedActivities,
  //   };
  // }

  if (action.type === "remove-activity") {
    return {
      ...state,
      //Filter the activities whose id is different as the selected activity on the payload
      activities: state.activities.filter(
        (activity) => activity.id !== action.payload.id
      ),
    };
  }

  if(action.type === 'reset-app'){
    return {
      activities: [],
      activeId: ''
    }
  }
  return state;
};
