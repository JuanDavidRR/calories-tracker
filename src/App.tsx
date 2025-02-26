import { useReducer, useEffect, useMemo } from "react";
import Form from "./components/Form";
import { activityReducer, initialState } from "./reducers/activity-reducer";
import ActivityList from "./components/ActivityList";
import CalorieTracker from "./components/CalorieTracker";

function App() {
  const [state, dispatch] = useReducer(activityReducer, initialState);

  //Save my activities in the local storage, now on activity-reducer I'll show the activities saved in local storage
  useEffect(() => {
    localStorage.setItem("activities", JSON.stringify(state.activities));
  }, [state.activities]);

  const handleReset = () => {
    dispatch({
      type: "reset-app",
    });
  };

  const isActivitiesEmpty = useMemo(
    () => state.activities.length > 0,
    [state.activities]
  );

  return (
    <>
      <header className="bg-slate-800 py-3 px-5">
        <section className="max-w-4xl mx-auto flex justify-between items-center">
          <h1 className="text-center text-lg text-white uppercase font-bold">
            Calorie tracker
          </h1>
          <button
            className="bg-lime-600 font-bold text-white cursor-pointer uppercase p-3 rounded-lg disabled:opacity-30"
            onClick={() => handleReset()}
            disabled={!isActivitiesEmpty}
          >
            Reset app
          </button>
        </section>
      </header>

      <section className="bg-lime-400 py-10 px-5">
        <div className="max-w-4xl mx-auto">
          <Form state={state} dispatch={dispatch} />
        </div>
      </section>

      <section className="bg-slate-800 py-10 text-white">
        <div className="max-w-4xl mx-auto">
          <CalorieTracker activities={state.activities} />
        </div>
      </section>

      <section className="p-10 mx-auto max-w-4xl">
        <ActivityList activities={state.activities} dispatch={dispatch} />
      </section>
    </>
  );
}

export default App;
