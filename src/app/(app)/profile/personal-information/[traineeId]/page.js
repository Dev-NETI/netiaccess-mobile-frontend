'use client'

import React, { useEffect, useState } from 'react'
import { useTrainee } from '@/hooks/api/trainee'
import { handleSetMethod } from '@/utils/utils'

function PersonalInformationForm({ params }) {
  const { show } = useTrainee()
  const [traineeData, setTraineeData] = useState();

  useEffect(() => {

    const fetchData = () => {
      show(params.traineeId)
        .then(({ data }) => {
          handleSetMethod(setTraineeData, data)
        })
    }

    fetchData()
  }, [])

  console.log(traineeData)

  return (
    <div>

    </div>
  )
}

export default PersonalInformationForm
