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
import ValidationError from '@/components/form-components/ValidationError';
import * as Yup from 'yup'
import Loading from '@/components/Loading';

function PersonalInfoForm({ initialData = {}, mode = "store" }) {

    const { setTraineeData, handleNextProcess } = useContext(RegisterContext);
    const [dropdownData, setDropdownData] = useState({
        nationalityData: null,
        genderData: null,
        selectedGender: null,
        selectedNationality: null,
    });
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        firstname: initialData.firstname || "",
        middlename: initialData.middlename || "",
        lastname: initialData.lastname || "",
        suffix: initialData.suffix || "",
        dateOfBirth: initialData.dateOfBirth || "",
        placeOfBirth: initialData.placeOfBirth || "",
        genderId: initialData.genderId || "",
        nationalityId: initialData.nationalityId || "",
    });
    const { index: getNationality, show: showNationality } = useNationality();
    const { index: getGender, show: showGender } = useGender();
    const [validationError, setValidationError] = useState([])
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
                await showResource(showGender, formData.genderId, setDropdownData, 'selectedGender')
                await showResource(showNationality, formData.nationalityId, setDropdownData, 'selectedNationality')
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
            if (error instanceof Yup.ValidationError) {
                const errors = error.inner.map(err => ({ path: err.path, message: err.message }));
                setValidationError(errors);
            }
        }

    }

    let ui = loading
        ?
        (
            <div className="w-full">
                <Loading label="Loading..." />
            </div>
        )
        :
        (
            <>
                {validationError.length > 0 && <ValidationError className="w-full " title="Warning!" errors={validationError} />}
                <div className="w-full">
                    <InputGroup defaultValue={formData.firstname} id="firstname" name="firstname" label="Firstname" placeholder="Firstname" errorMessage="This is a test error message!" />
                </div>
                <div className="w-full">
                    <InputGroup defaultValue={formData.middlename} id="middlename" name="middlename" label="Middlename" placeholder="Middlename" errorMessage="This is a test error message!" />
                </div>
                <div className="w-full">
                    <InputGroup defaultValue={formData.lastname} id="lastname" name="lastname" label="Lastname" placeholder="Lastname" errorMessage="This is a test error message!" />
                </div>
                <div className="w-full">
                    <InputGroup defaultValue={formData.suffix} id="suffix" name="suffix" label="Suffix" placeholder="Suffix" errorMessage="This is a test error message!" />
                </div>
                <div className="w-full">
                    <InputGroup defaultValue={formData.dateOfBirth} type="date" id="dateOfBirth" name="dateOfBirth" label="Date of birth" placeholder="Date of birth" errorMessage="This is a test error message!" />
                </div>
                <div className="w-full">
                    <InputGroup defaultValue={formData.placeOfBirth} id="placeOfBirth" name="placeOfBirth" label="Place of birth" placeholder="Place of birth" errorMessage="This is a test error message!" />
                </div>
                <div className="w-full">
                    <SelectGroup label="Gender" id="gender" name="gender" errorMessage="This is a test error message!"  >
                        {mode !== 'store' ? <SelectOption id={dropdownData.selectedGender?.genderid} label={dropdownData.selectedGender?.gender} />
                            : <SelectOption id="" label="Select" />}
                        {dropdownData.genderData?.map((data) => <SelectOption key={data.genderid} id={data.genderid} label={data.gender} />)}
                    </SelectGroup>
                </div>
                <div className="w-full">
                    <SelectGroup label="Nationality" id="nationality" name="nationality" errorMessage="This is a test error message!"  >
                        {mode !== 'store' ? <SelectOption id={dropdownData.selectedNationality?.nationalityid} label={dropdownData.selectedNationality?.nationality} />
                            : <SelectOption id="" label="Select" />}
                        {dropdownData.nationalityData?.map((data) => <SelectOption key={data.nationalityid} id={data.nationalityid} label={data.nationality} />)}
                    </SelectGroup>
                </div>

                <div className='w-full'>
                    <Button className="mt-2 w-4/12 align" >Next</Button>
                </div></>
        )
    return (
        <form onSubmit={handleSubmit}>
            {ui}
        </form>
    )
}

export default PersonalInfoForm
