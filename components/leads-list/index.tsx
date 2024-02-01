'use client';
import { useState, useEffect, useContext } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import LeadRow from '@/components/lead-row';
import { PAGE_ROUTES } from '@/utils/constants/common-constants';
import SearchBar from '@/components/search-bar';
import { LeadListType } from '@/models/global-types';
import { LeadService } from '@/services/lead-services';
import FilterLeadsButton from '../filter-leads-button';
import CreateLeadsButton from '../create-leads-button';
import { LeadsContext } from '@/context/leads-context';

function LeadsList() {
  const [searchValue, setSearchValue] = useState<string>('');
  const [searchData, setSearchData] = useState<LeadListType[]>([]);
  const [keyPress, setKeyPress] = useState<boolean>(false);
  const [filterData, setFilterData] = useState({});
  const [leadsData, setLeadsData] = useState<LeadListType[]>([]);
  const [leadRefresh, setLeadRefresh] = useState<boolean>(false);

  const {
    executivesOption,
    setExecutivesOption,
    leadDetailsRef,
    createdByOptions,
    setCreatedByOptions,
  } = useContext(LeadsContext);

  const { data: sessionData } = useSession();
  //@ts-ignore den
  const token: string = sessionData?.user?.access_token;

  const router = useRouter();

  const handleCreateLeadButtonClick = () => {
    router.push(PAGE_ROUTES.LeadCreate);
  };

  useEffect(() => {
    if (token) {
      const LeadServices = new LeadService();
      LeadServices.getExecutivesData(setExecutivesOption, token);
      LeadServices.getCreatedByData(setCreatedByOptions, token);
      LeadServices.getLeadsData(setLeadsData, token);
    }
  }, [token, setExecutivesOption, setCreatedByOptions]);

  useEffect(() => {
    if (keyPress && searchValue !== '') {
      const newFilteredData = leadsData.filter((data) => {
        return data.title.toLowerCase().includes(searchValue.toLowerCase());
      });
      setSearchData(newFilteredData);
    } else {
      setSearchData([]);
    }
  }, [keyPress, leadsData, searchValue]);

  const handleKeyDown = (e: any) => {
    if (e.key === 'Enter') {
      setKeyPress(true);
    } else setKeyPress(false);
  };

  const handleScroll = () => {
    leadDetailsRef.current.close();
  };

  return (
    <div className='border border-gray-100 bg-white rounded-xl w-full h-[calc(100vh-102px)]'>
      <div className='py-4 md:py-6 pl-8 h-[96px]'>
        <div className='flex justify-between gap-5'>
          <div className='flex pt-2'>
            <div>
              <p className='font-semibold text-[16px] text-[#2B3674]'>Leads</p>
            </div>

            <div className='flex items-center justify-center h-6 bg-[#D2FBE7] rounded-[17px] ms-2 p-2'>
              <p className='text-black font-semibold text-[16px]'>
                {searchData.length > 0 ? searchData.length : leadsData.length}
              </p>
            </div>
          </div>

          <div className='flex justify-end m-0 p-0 w-[72%]'>
            <SearchBar
              handleKeyDown={handleKeyDown}
              value={searchValue}
              setValue={setSearchValue}
              leadsData={leadsData}
            />

            <div>
              <FilterLeadsButton onFilterData={(data: any) => setFilterData(data)} />
            </div>
            <div onClick={handleCreateLeadButtonClick}>
              <CreateLeadsButton />
            </div>
          </div>
        </div>
      </div>
      <div
        className='overflow-y-auto overflow-x-hidden tiny-scrollbar h-[68vh]'
        onScroll={handleScroll}>
        <div className="w-full px-8 whitespace-nowrap [font-family:'Metropolis-Bold',Helvetica] font-medium text-[14px] leading-[normal]">
          {searchData.length > 0
            ? searchData.map((item, index) => (
                <LeadRow
                  key={index}
                  item={item}
                  leadRefresh={leadRefresh}
                  setLeadRefresh={() => setLeadRefresh(!leadRefresh)}
                />
              ))
            : leadsData.map((item, index) => (
                <LeadRow
                  key={index}
                  item={item}
                  leadRefresh={leadRefresh}
                  setLeadRefresh={() => setLeadRefresh(!leadRefresh)}
                />
              ))}
        </div>
      </div>
    </div>
  );
}

export default LeadsList;
