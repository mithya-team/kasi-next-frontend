import React from 'react';

const Schedule = () => {
  return (
    <div className='w-full px-5 font-medium font-primary overflow-auto'>
      <div className='flex bg-gray-800 text-base  text-gray-400 mb-5'>
        <div className='w-[19%] py-3 pl-5'>Username</div>
        <div className='w-[15%] py-3 pl-5'>Workout</div>
        <div className='w-[19%] py-3 pl-5'>Workout Name</div>
        <div className='w-[10%] py-3 pl-5'>Date</div>
        <div className='w-[10%] py-3 pl-5'>Time</div>
        <div className='w-[19%] py-3 pl-5'>Call</div>
        <div className='w-[5%] py-3 pl-5'></div>
      </div>
    </div>
  );
};

export default Schedule;
