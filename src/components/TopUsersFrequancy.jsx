import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTopFreq } from "../redux/slice/userSlice";

const TopUsers = () => {
  const dispatch = useDispatch();

  const { topUsers = [], isLoadingTopUsers } = useSelector(
    (state) => state.users
  );

  useEffect(() => {

    dispatch(getTopFreq());
  }, []);

  console.log(topUsers);

  return (
    <>
      <div className="text-3xl font-bold tracking-tight text-gray-900 mt-5 ml-2">
        Top Users List
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {topUsers && (
          <ul role="list" className="divide-y divide-gray-100">
            {topUsers?.map((user) => (
              <li key={user.id} className="flex justify-between gap-x-6 py-5">
                <div className="flex min-w-0 gap-x-4">
                  <div className="min-w-0 flex-auto">
                  
                    <p className="text-sm/6 font-semibold text-gray-900">
                      {user.email}
                    </p>
                    <p className="text-sm/6 font-semibold text-gray-900">
                      {user.name}
                    </p>
                    <p className="mt-1 truncate text-xs/5 text-gray-500">
                      {user.login_count}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}

        {!topUsers && (
          <img
            src="../../src/assets/noData.webp"
            className="mx-auto"
            alt="No data"
          />
        )}
      </div>
    </>
  );
};

export default TopUsers;
