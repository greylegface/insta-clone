import React, { useEffect } from 'react';
import * as ROUTES from '../constants/routes';
import Timeline from '../components/Timeline';
import Sidebar from '../components/sidebar';
import Header from '../components/Header';

export default function Dashboard() {
  useEffect(() => {
    document.title = `${ROUTES.DASHBOARD_NAME}`;
  }, []);

  return (
    <div className="bg-background-gray">
      <Header />
      <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
        <Timeline />
        <Sidebar />
      </div>
    </div>
  );
}
