'use client';
import { useState, useEffect } from 'react';
import { Modal } from './modal';
import { CreateEmployeeModalProps } from '@/models/global-types';
import { Input } from '@/components/input';
import { Button } from '@/components/button';
import { ExIcon } from '@/assets/icons';
import { EMPLOYEE_ROLE } from '@/utils/constants/common-constants';
import { CustomSelect } from './select/custom-select';

const CreateEmployeeModal = ({
  modalIsOpen,
  setModalIsOpen = () => {},
  formData,
  setFormData = () => {},
  formErrors,
  setFormErrors = () => {},
}: CreateEmployeeModalProps) => {
  const [selected, setSelected] = useState('Executive');

  useEffect(() => {
    setFormData((prev: any) => {
      return { ...prev };
    });
  }, [formErrors]);

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;

    setFormData((prev: any) => {
      return { ...prev, [name]: value };
    });

    setFormErrors((prev: any) => {
      return { ...prev, [name]: '' };
    });
  };

  const submitData = () => {
    const newFormErrors: any = {};

    for (let field in formData) {
      if (formData[field as keyof typeof formData] === '') {
        newFormErrors[field] = `(${field} is required)`;
      }
    }
    setFormErrors(newFormErrors);

    console.log(formData);
    if (Object.values(formData).includes('')) {
      setModalIsOpen(true);
    } else {
      setModalIsOpen(false);
    }
  };

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel='Example Modal'>
        <div className='flex justify-between mb-4'>
          <p className='text-indigo-950 text-2xl font-bold leading-[14px]'>
            Create employee
          </p>
          <button onClick={closeModal}>
            <ExIcon />
          </button>
        </div>
        <Input
          label={<p className='text-[#00156A] font-medium text-xs mb-1'>Name</p>}
          placeholder='Name'
          type='text'
          id='name'
          name='Name'
          htmlFor='name'
          errorMessage={formErrors.Name}
          className={`w-full mb-5 ${formErrors.Name && 'border-red-500 shadow'}`}
          onChange={handleInputChange}
        />
        <Input
          label={<p className='text-[#00156A] font-medium text-xs mb-1'>Phone Number</p>}
          placeholder='Phone Number'
          type='text'
          id='phone'
          name='Phone'
          htmlFor='phone'
          errorMessage={formErrors.Phone}
          className={`w-full mb-5 ${formErrors.Phone && 'border-red-500 shadow'}`}
          onChange={handleInputChange}
        />
        <Input
          label={<p className='text-[#00156A] font-medium text-xs mb-1'>Email</p>}
          placeholder='Email'
          type='text'
          id='email'
          name='Email'
          htmlFor='email'
          errorMessage={formErrors.Email}
          className={`w-full mb-5 ${formErrors.Email && 'border-red-500 shadow'}`}
          onChange={handleInputChange}
        />
        <CustomSelect
          label='Role'
          setSelected={setSelected}
          options={EMPLOYEE_ROLE}
          className='mb-4'
        />

        <Button onClick={submitData} className='w-full rounded-[10px] h-[60px] mt-8'>
          Create
        </Button>
      </Modal>
    </div>
  );
};

export default CreateEmployeeModal;