'use client'
import React, { useEffect, useState } from 'react'
import InputGroup from '@/components/form-components/InputGroup'
import Button from '@/components/Button';
import SelectGroup from '@/components/form-components/SelectGroup';
import { useContext } from 'react';
import { RegisterContext } from '@/stores/RegisterContext';
import { useNationality } from "@/hooks/api/nationality"
import { useGender } from '@/hooks/api/gender';
import SelectOption from '@/components/form-components/SelectOption';
import { indexResource, showResource } from '@/utils/resource';
import Loading from '@/components/Loading';

function PersonalInfoForm({ initialData = {}, mode = "store" }) {

    const { setTraineeData, handleNextProcess, Yup } = useContext(RegisterContext);
    const [dropdownData, setDropdownData] = useState({
        nationalityData: null,
        genderData: null,
        selectedGender: null,
        selectedNationality: null,
    });
    const [loading, setLoading] = useState(true);
    const [validationError, setValidationError] = useState([])
    const { index: getNationality, show: showNationality } = useNationality();
    const { index: getGender, show: showGender } = useGender();
    const rules = Yup.object().shape({
        firstname: Yup.string().required('Firstname is required!'),
        middlename: Yup.string().required('Middlename is required'),
        lastname: Yup.string().required('Lastname is required'),
        dateOfBirth: Yup.date('Invalid date format').required('Date of birth is required'),
        placeOfBirth: Yup.string().required('Place of birth is requried'),
        gender: Yup.string().required('Gender is required'),
        nationality: Yup.string().required('Nationality is required'),
    })

    useEffect(() => {
        const fetchData = async () => {
            if (mode !== 'store') {
                await showResource(showGender, initialData.genderId, setDropdownData, 'selectedGender')
                await showResource(showNationality, initialData.nationalityId, setDropdownData, 'selectedNationality')
            }
            await indexResource(getNationality, setDropdownData, 'nationalityData')
            await indexResource(getGender, setDropdownData, 'genderData')
            setLoading(false)
        }

        fetchData()

    }, []);

    async function handleSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());

        try {
            await rules.validate(data, { abortEarly: false });
            setTraineeData((prevState) => {
                return {
                    ...prevState,
                    ...data
                }
            })

            if (mode === 'store') {
                handleNextProcess();
            }

        } catch (error) {
            const errors = error.inner.reduce((acc, curr) => {
                acc[curr.path] = curr.message;
                return acc;
            }, {});
            setValidationError(errors);
        }
    }

    let ui = loading
        ?
        (
            <div className="w-full flex justify-center">
                <Loading label="Loading..." />
            </div>
        )
        :
        (
            <>
                <div className="w-full">
                    <InputGroup defaultValue={initialData.firstname || ""} id="firstname" name="firstname" label="Firstname" placeholder="Firstname" isError={validationError.firstname} errorMessage={validationError.firstname} />
                </div>
                <div className="w-full">
                    <InputGroup defaultValue={initialData.middlename || ""} id="middlename" name="middlename" label="Middlename" placeholder="Middlename" isError={validationError.middlename} errorMessage={validationError.middlename} />
                </div>
                <div className="w-full">
                    <InputGroup defaultValue={initialData.lastname || ""} id="lastname" name="lastname" label="Lastname" placeholder="Lastname" isError={validationError.lastname} errorMessage={validationError.lastname} />
                </div>
                <div className="w-full">
                    <InputGroup defaultValue={initialData.suffix || ""} id="suffix" name="suffix" label="Suffix" placeholder="Suffix" errorMessage="This is a test error message!" />
                </div>
                <div className="w-full">
                    <InputGroup defaultValue={initialData.dateOfBirth || ""} type="date" id="dateOfBirth" name="dateOfBirth" label="Date of birth" placeholder="Date of birth" isError={validationError.dateOfBirth} errorMessage={validationError.dateOfBirth} />
                </div>
                <div className="w-full">
                    <InputGroup defaultValue={initialData.placeOfBirth || ""} id="placeOfBirth" name="placeOfBirth" label="Place of birth" placeholder="Place of birth" isError={validationError.placeOfBirth} errorMessage={validationError.placeOfBirth} />
                </div>
                <div className="w-full">
                    <SelectGroup label="Gender" id="gender" name="gender" isError={validationError.gender} errorMessage={validationError.gender}  >
                        {mode !== 'store'
                            ? <SelectOption id={dropdownData.selectedGender?.genderid} label={dropdownData.selectedGender?.gender} />
                            : <SelectOption id="" label="Select" />}
                        {dropdownData.genderData?.map((data) => <SelectOption key={data.genderid} id={data.genderid} label={data.gender} />)}
                    </SelectGroup>
                </div>
                <div className="w-full">
                    <SelectGroup label="Nationality" id="nationality" name="nationality" isError={validationError.nationality} errorMessage={validationError.nationality}  >
                        {mode !== 'store'
                            ? <SelectOption id={dropdownData.selectedNationality?.nationalityid} label={dropdownData.selectedNationality?.nationality} />
                            : <SelectOption id="" label="Select" />}
                        {dropdownData.nationalityData?.map((data) => <SelectOption key={data.nationalityid} id={data.nationalityid} label={data.nationality} />)}
                    </SelectGroup>
                </div>

                <div className='w-full'>
                    <Button className="mt-2 w-4/12 align" >Next</Button>
                </div>
            </>
        )

    return (
        <form onSubmit={handleSubmit}>
            {ui}
        </form>
    )
}

export default PersonalInfoForm
