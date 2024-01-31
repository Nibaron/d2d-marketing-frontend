'use-client';

import { CalendarIcon } from '@/assets/icons';
import { FilterLeadsCardProps, StatusState } from '@/models/global-types';
import {
  ASSIGNEE_USERS_LIST,
  CREATED_BY_USERS_LIST,
} from '@/utils/constants/leadslist-constant';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { CustomMultiSelect } from '../custom-multi-select';
import StatusCheckbox from '../status-checkbox';
import './style.css';

const FilterLeadsCard: React.FC<FilterLeadsCardProps> = ({
  onFilterData,
  setFilterCardOpen,
}) => {
  //! State for date range
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);

  //! State for status
  const [status, setStatus] = useState<StatusState>({
    hot: false,
    warm: false,
    cool: false,
  });

  //! State for Created by
  const [selectedCreatedBy, setCreatedBy] = useState<string | null>(null);
  const [selectedAssignee, setAssignee] = useState<string | null>(null);

  //* Output
  const filterData = {
    startDate: startDate,
    endDate: endDate,
    status: status,
    createdBy: selectedCreatedBy,
    assignee: selectedAssignee,
  };

  const handleCheckboxChange = (statusName: keyof StatusState) => {
    setStatus((prevStatus) => ({
      hot: statusName === 'hot' ? !prevStatus.hot : false,
      warm: statusName === 'warm' ? !prevStatus.warm : false,
      cool: statusName === 'cool' ? !prevStatus.cool : false,
    }));
  };

  const ApplyFilter = () => {
    if (
      filterData.createdBy === null &&
      filterData.assignee === null &&
      filterData.status.hot === false &&
      filterData.status.warm === false &&
      filterData.status.cool === false &&
      filterData.endDate === null
    ) {
      setFilterCardOpen(false);
      return null;
    } else {
      onFilterData(filterData);
      setFilterCardOpen(false);
    }
  };

  const CancelFilter = () => {
    setFilterCardOpen(false);
  };

  return (
    <div>
      <div className=' bg-white  mt-2 pl-[12px] pt-[20px] pr-[20px] pb-[20px]'>
        {/* Created by */}
        <div>
          <label className='font-semibold text-base leading-[28px] text-[#00156A] mb-1 pl-[8px]'>
            Created by
          </label>
          <div>
            <CustomMultiSelect
              setSelected={setCreatedBy}
              options={CREATED_BY_USERS_LIST}
              onSelectChange={(value: any) => setCreatedBy(value)}
            />
          </div>
        </div>

        <div className='border-t my-[10px] w-[349px] h-[1px] border-[#E9F0FF] ml-[7px]'></div>

        {/* Assignee */}
        <div className='mt-[10px]'>
          <label className='font-semibold text-base leading-[28px] text-[#00156A] mb-1 pl-[8px]'>
            Assignee
          </label>
          <div>
            <CustomMultiSelect
              setSelected={setAssignee}
              options={ASSIGNEE_USERS_LIST}
              onSelectChange={(value: any) => setAssignee(value)}
            />
          </div>
        </div>

        <div className='border-t my-[10px] w-[349px] h-[1px] border-[#E9F0FF] ml-[7px]'></div>

        {/* Status */}
        <div className='mt-[10px]'>
          <label className='font-semibold text-base leading-[28px] text-[#00156A] mb-1 pl-[8px]'>
            Status
          </label>
          <div className='m-[10px] flex items-center'>
            <StatusCheckbox
              id='hot-checkbox'
              checked={status.hot}
              onChange={() => handleCheckboxChange('hot')}>
              Hot
            </StatusCheckbox>
            <StatusCheckbox
              id='warm-checkbox'
              checked={status.warm}
              onChange={() => handleCheckboxChange('warm')}>
              Warm
            </StatusCheckbox>
            <StatusCheckbox
              id='cool-checkbox'
              checked={status.cool}
              onChange={() => handleCheckboxChange('cool')}>
              Cool
            </StatusCheckbox>
          </div>
        </div>

        <div className='border-t my-[10px] w-[349px] h-[1px] border-[#E9F0FF] ml-[7px]'></div>

        {/* Date Range */}
        <div className='my-[10px] pl-[8px]'>
          <label className='font-semibold text-base leading-[28px] text-[#00156A] mb-1'>
            Date Range
          </label>
          <div className='bg-white w-full mt-2 text-center'>
            <div className='flex space-x-2 items-center'>
              <div className='relative w-[159px] h-[44px]'>
                <div className='py-2 px-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 date-style flex justify-start'>
                  <DatePicker
                    selected={startDate}
                    onChange={(date: any) => setStartDate(date)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    dateFormat='MMM d, yyyy'
                  />
                </div>
                <span className='absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600'>
                  <CalendarIcon />
                </span>
              </div>
              <span className='text-[#667085]'>–</span>
              <div className='relative w-[159px] h-[44px]'>
                <div className='py-2 px-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 date-style flex justify-start'>
                  <DatePicker
                    selected={endDate}
                    onChange={(date: any) => setEndDate(date)}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                    dateFormat='MMM d, yyyy'
                  />
                </div>
                <span className='absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600'>
                  <CalendarIcon />
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Apply and Cancel Buttons */}
        <div className='flex justify-between mt-[18px] gap-2 pl-[8px]'>
          <button
            onClick={CancelFilter}
            className='bg-[#EBEBEB] text-black font-semibold px-4 py-2 focus:outline-none w-[170px] h-[40px] rounded-xl text-sm leading-5 transition duration-500 ease-in-out transform hover:-translate-y-1.5 hover:scale-200'>
            Cancel
          </button>
          <button
            onClick={ApplyFilter}
            className='bg-[#5630FF] text-white font-semibold px-4 py-2 focus:outline-none w-[170px] h-[40px] rounded-xl text-sm leading-5 transition duration-500 ease-in-out transform hover:-translate-y-1.5 hover:scale-200'>
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterLeadsCard;
