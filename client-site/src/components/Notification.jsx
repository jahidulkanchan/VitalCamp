/* eslint-disable react/prop-types */

import { format } from "date-fns";


const Notification = ({notification}) => {
  const { message, notifyDate } = notification
  return (
    <>
      <div className="text-sm text-left py-3 border-b px-3">
          <p>{message}</p>
          <p className="text-xs text-slate-500">
            {notifyDate ? <>{format(new Date(notifyDate), 'P | p')}</> : 'Time: 9:12 PM | Date: 12-02-25'}
          </p>
      </div>
    </>
  );
};

export default Notification;