import { Activity } from "../types";
import { useMemo } from "react";
import CaloryDisplay from "./CaloryDisplay";

type CalorieTrackerProps = {
  activities: Activity[];
};

function CalorieTracker({ activities }: CalorieTrackerProps) {
  const caloriesConsumed = useMemo(
    () =>
      activities.reduce(
        (total, activity) =>
          //If the category is 1 (food) the function will sum the calories of the activity, if not, do nothing
          activity.category === 1 ? total + activity.calories : total,
        0
      ),
    [activities]
  );

  const caloriesBurned = useMemo(
    () =>
      activities.reduce(
        (total, activity) =>
          //If the category is 1 (food) the function will sum the calories of the activity, if not, do nothing
          activity.category === 2 ? total + activity.calories : total,
        0
      ),
    [activities]
  );

  const totalCalories = useMemo(
    () => caloriesConsumed - caloriesBurned,
    [caloriesConsumed, caloriesBurned]
  );

  return (
    <>
      <h2 className="text-4xl font-black text-white text-center">
        Calories overview
      </h2>
      <div className="flex flex-col items-center md:flex-row md:justify-between gap-10 md:gap-5 mt-10">
        <CaloryDisplay calories={caloriesConsumed} text="Consumed" />
        <CaloryDisplay calories={caloriesBurned} text="Burned" />
        <CaloryDisplay calories={totalCalories} text="Difference" />
      </div>
    </>
  );
}

export default CalorieTracker;
