'use client'
import PasswordHeader from '@/components/profile/password/header'
import { useAuth } from '@/hooks/auth'
import PersonalInfoForm from '@/components/auth/register/PersonalInfoForm'
import { useEffect, useState } from 'react'
import ResponseView from '@/components/profile/password/Response'
import { RegisterContext } from '@/stores/RegisterContext'
import { useTrainee } from '@/hooks/api/trainee'
import * as Yup from 'yup'

function PersonalInformationForm() {
  const { user } = useAuth({ middleware: 'auth' })
  const [traineeData, setTraineeData] = useState(null);
  const [utilsState, setUtilsState] = useState({
    activeForm: 1,
    requestResponse: null,
  })
  const initialData = {
    firstname: user.f_name,
    middlename: user.m_name,
    lastname: user.l_name,
    suffix: user.suffix,
    dateOfBirth: user.birthday,
    placeOfBirth: user.birthplace,
    nationalityId: user.nationalityid,
    genderId: user.genderid,
  };
  const title = "Personal Information"
  const label = "Here you can update your personal information."
  const { update: updateTrainee } = useTrainee()

  useEffect(() => {
    if (traineeData !== null) {
      const update = async () => {
        const { data } = await updateTrainee(user.traineeid, traineeData)
        setUtilsState(prevState => ({ ...prevState, requestResponse: data }));
        setUtilsState(prevState => ({ ...prevState, activeForm: 2 }))
        return
      }
      update()
    }
  }, [traineeData])

  let UI;
  if (utilsState.activeForm === 1) {
    UI = <div className='basis-full rounded-t-lg bg-white'>
      <PasswordHeader title={title} label={label} />

      <div className='basis-full bg-white px-5 mb-24'>
        <PersonalInfoForm initialData={initialData} mode="update" />
      </div>
    </div>
  } else {
    UI = <div className='basis-full rounded-t-lg bg-white'>
      <ResponseView response={utilsState.requestResponse} successLabel='Personal Information Updated!'
        defaultRoute="/profile" defaultButtonLabel="Go to profile" />
    </div>
  }

  return (
    <RegisterContext.Provider value={{ traineeData, setTraineeData, Yup }} >
      {UI}
    </RegisterContext.Provider>
  )
}

export default PersonalInformationForm
