import { useMemo } from "react";
import { Activity } from "../types";
import { categories } from "../data/categories";
//Import from npm i @heroicons/react
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { TrashIcon } from "@heroicons/react/24/outline";

import { ActivityActions } from "../reducers/activity-reducer";

type ActivityListProps = {
  activities: Activity[];
  dispatch: React.Dispatch<ActivityActions>;
};

function ActivityList({ activities, dispatch }: ActivityListProps) {
  //Derivated state to check if the activities array is empty
  const isEmptyActivities = useMemo(
    () => activities.length === 0,
    [activities]
  );

  //Function to delete an activity
  const handleDelete = (id: Activity["id"]) => {
    dispatch({
      type: "remove-activity",
      payload: { id },
    });
  };
  //Function to set the active id on the clicked activity
  const handleSetActiveId = (id: Activity["id"]) => {
    dispatch({
      type: "set-activeId",
      payload: { id },
    });
  };

  //Function to get the category name based from the id
  const categoryName = useMemo(
    () => (category: Activity["category"]) =>
      //If the actitivy name is equal to 1, the function will map the categories and find the category with the same id (1), and then, will return the name (food)
      categories.map((cat) => cat.id === category && cat.name),
    []
  );
  return (
    <>
      {isEmptyActivities ? (
        <section className="text-slate-950 text-center">
          <h2 className="text-4xl font-black">No activities yet</h2>
          <p className="text-xl mt-3">
            Use the form above and start tracking your calories!
          </p>
        </section>
      ) : (
        <section>
          <h2 className="text-4xl font-black text-slate-950 text-center">
            Food and activities
          </h2>
          {activities.map((activity) => (
            <section
              key={activity.id}
              className="px-5 py-10 bg-white mt-5 flex justify-between shadow-lg rounded-lg"
            >
              <div className="space-y-2 relative">
                <p
                  className={`absolute -top-8 -left-8 px-5 py-2 rounded-lg text-white uppercase font-bold ${
                    activity.category === 1 ? "bg-lime-600" : "bg-orange-500"
                  }`}
                >
                  {categoryName(+activity.category)}
                </p>
                <p className="text-2xl font-bold pt-5">{activity.name}</p>
                <p
                  className={`font-black text-4xl ${
                    activity.category === 1
                      ? "text-lime-600"
                      : "text-orange-500"
                  }`}
                >
                  {activity.calories} <span>Calories</span>
                </p>
              </div>

              <div className="flex gap-5 items-center">
                <button onClick={() => handleSetActiveId(activity.id)}>
                  <PencilSquareIcon className="h-8 w-8text-slate-950" />
                </button>
                <button onClick={() => handleDelete(activity.id)}>
                  <TrashIcon className="h-8 w-8 text-red-600" />
                </button>
              </div>
            </section>
          ))}
        </section>
      )}
    </>
  );
}

export default ActivityList;
