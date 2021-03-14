import React, { useEffect } from 'react';
import * as ROUTES from '../constants/routes';
import * as GENERAL from '../constants/app';

export default function NotFound() {
  useEffect(() => {
    document.title = `${ROUTES.NOT_FOUND_NAME} - ${GENERAL.APP_NAME}`;
  }, []);
  return (
    <div className="bg-background-gray">
      <div className="flex justify-center items-center mx-auto w-full h-screen max-w-screen-lg">
        <p className="text-center text-2xl">Not Found</p>
      </div>
    </div>
  );
}
