'use client'
import PasswordHeader from '@/components/profile/password/header'
import { useAuth } from '@/hooks/auth'
import PersonalInfoForm from '@/components/auth/register/PersonalInfoForm'
import { useEffect, useState } from 'react'
import ResponseView from '@/components/profile/password/Response'
import { RegisterContext } from '@/stores/RegisterContext'
import { useTrainee } from '@/hooks/api/trainee'

function PersonalInformationForm() {
  const [traineeData, setTraineeData] = useState(null);
  const [activeForm, setActiveForm] = useState(1);
  const { user } = useAuth({ middleware: 'auth' })
  const title = "Personal Information"
  const label = "Here you can update your personal information."
  const initialData = {
    firstname: user.f_name,
    middlename: user.m_name,
    lastname: user.l_name,
    suffix: user.suffix,
    dateOfBirth: user.birthday,
    placeOfBirth: user.birthplace,
    nationalityId: user.nationalityid,
    genderId: user.genderid,
  }
  const [requestResponse, setRequestResponse] = useState();
  const { patch } = useTrainee()

  useEffect(() => {
    if (traineeData !== null) {
      const response = patch(user.id, traineeData)
      setRequestResponse(response);
      setActiveForm(activeForm + 1)
      return
    }
  }, [traineeData])

  let UI;
  if (activeForm === 1) {
    UI = <>
      <PasswordHeader title={title} label={label} />

      <div className='basis-full px-5 mb-5'>
        <PersonalInfoForm initialData={initialData} mode="update" />
      </div>
    </>
  } else {
    UI = <ResponseView response={requestResponse} successLabel='Personal Information Updated!' defaultRoute="/profile" defaultButtonLabel="Go to profile" />
  }

  return (
    <RegisterContext.Provider value={{ traineeData, setTraineeData }} >
      <div className='flex flex-col gap-4 bg-gray-50 mx-10 my-10 py-4 
        border-0 rounded-xl shadow-xl'>
        {UI}
      </div>
    </RegisterContext.Provider>
  )
}

export default PersonalInformationForm
