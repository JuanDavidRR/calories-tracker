import CaloryDisplay from "./CaloryDisplay";
import { useActivity } from "../hooks/useActivity";

function CalorieTracker() {
  const { caloriesConsumed, caloriesBurned, totalCalories } =
    useActivity();

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
