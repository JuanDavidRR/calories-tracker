import { Activity } from "../types";
//Import from npm i @heroicons/react
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useActivity } from "../hooks/useActivity";

function ActivityList() {
  const { state, dispatch, isEmptyActivities, categoryName } = useActivity();

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

    // Scroll to the form section
    const formElement = document.getElementById("navbar");
    formElement?.scrollIntoView({ behavior: "smooth" });
  };

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
          {state.activities.map((activity) => (
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
