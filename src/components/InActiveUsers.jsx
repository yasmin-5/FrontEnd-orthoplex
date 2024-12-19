import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getInActiveUsers } from "../redux/slice/userSlice";
const InActiveUsers = () => {
  const dispatch = useDispatch();

  const { inActiveUsers, isLoadingInActive } = useSelector(
    (state) => state.users
  );

  useEffect(() => {
    dispatch(getInActiveUsers());
  }, [dispatch]);

  return (
    <>
      <div className="text-3xl font-bold tracking-tight text-gray-900 mt-5 ml-2">
        Users List
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {inActiveUsers && (
          <ul role="list" className="divide-y divide-gray-100">
            {inActiveUsers.map((person) => (
              <li key={person.id} className="flex justify-between gap-x-6 py-5">
                <div className="flex min-w-0 gap-x-4">
                  <div className="min-w-0 flex-auto">
                    <p className="text-sm/6 font-semibold text-gray-900">
                      {person.userId}
                    </p>
                    <p className="mt-1 truncate text-xs/5 text-gray-500">
                      {person.login_time}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
        {!inActiveUsers && (
          <img src="../../src/assets/noData.webp" className="mx-auto"></img>
        )}
      </div>
    </>
  );
};

export default InActiveUsers;
