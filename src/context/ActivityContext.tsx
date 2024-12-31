import { createContext, Dispatch, ReactNode, useMemo, useReducer } from "react";
import {
  ActivityActions,
  activityReducer,
  ActivityState,
  initialState,
} from "../reducers/activity-reducer";
import { categories } from "../data/categories";
import { Activity } from "../types";

type ActivityProviderProps = {
  children: ReactNode;
};

type ActivityContextProps = {
  state: ActivityState;
  dispatch: Dispatch<ActivityActions>;
  caloriesConsumed: number;
  caloriesBurned: number;
  totalCalories: number;
  categoryName: (category: Activity["category"]) => (string | false)[];
  isEmptyActivities: boolean;
};

export const ActivityContext = createContext<ActivityContextProps>(null!);

export const ActivityProvider = ({ children }: ActivityProviderProps) => {
  const [state, dispatch] = useReducer(activityReducer, initialState);

  const caloriesConsumed = useMemo(
    () =>
      state.activities.reduce(
        (total, activity) =>
          //If the category is 1 (food) the function will sum the calories of the activity, if not, do nothing
          activity.category === 1 ? total + activity.calories : total,
        0
      ),
    [state.activities]
  );

  const caloriesBurned = useMemo(
    () =>
      state.activities.reduce(
        (total, activity) =>
          //If the category is 1 (food) the function will sum the calories of the activity, if not, do nothing
          activity.category === 2 ? total + activity.calories : total,
        0
      ),
    [state.activities]
  );

  const totalCalories = useMemo(
    () => caloriesConsumed - caloriesBurned,
    [caloriesConsumed, caloriesBurned]
  );

  //Function to get the category name based from the id
  const categoryName = useMemo(
    () => (category: Activity["category"]) =>
      //If the actitivy name is equal to 1, the function will map the categories and find the category with the same id (1), and then, will return the name (food)
      categories.map((cat) => cat.id === category && cat.name),
    [state.activities]
  );

  //Derivated state to check if the activities array is empty
  const isEmptyActivities = useMemo(
    () => state.activities.length === 0,
    [state.activities]
  );

  return (
    <ActivityContext.Provider
      value={{
        state,
        dispatch,
        caloriesConsumed,
        caloriesBurned,
        totalCalories,
        categoryName,
        isEmptyActivities,
      }}
    >
      {children}
    </ActivityContext.Provider>
  );
};
