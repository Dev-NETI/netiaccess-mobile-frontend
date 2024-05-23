import React, { useEffect, useState } from 'react'
import InputGroup from '@/components/form-components/InputGroup'
import Button from '@/components/Button';
import SelectGroup from '@/components/form-components/SelectGroup';
import { useContext } from 'react';
import { RegisterContext } from '@/stores/RegisterContext';
import { useNationality } from "@/hooks/api/nationality"
import { useGender } from '@/hooks/api/gender';
import SelectOption from '@/components/form-components/SelectOption';

function PersonalInfoForm() {

    const { setTraineeData, handleNextProcess } = useContext(RegisterContext);
    const [nationalityData, setNationalityData] = useState([]);
    const [genderData, setGenderData] = useState([]);
    const { index } = useNationality();
    const { index: getGender } = useGender();

    useEffect(() => {

        index()
            .then(({ data }) => {
                setNationalityData(data);
            })
            .finally()

        getGender()
            .then(({ data }) => {
                setGenderData(data);
            })
            .finally()
    }, []);

    // console.log(genderData);

    function handleSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());

        //update collected trainee data
        setTraineeData((prevState) => {
            return {
                ...prevState,
                ...data
            }
        });

        handleNextProcess();
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="w-full">
                <InputGroup id="firstname" name="firstname" label="Firstname" placeholder="Firstname" errorMessage="This is a test error message!" required />
            </div>
            <div className="w-full">
                <InputGroup id="middlename" name="middlename" label="Middlename" placeholder="Middlename" errorMessage="This is a test error message!" required />
            </div>
            <div className="w-full">
                <InputGroup id="lastname" name="lastname" label="Lastname" placeholder="Lastname" errorMessage="This is a test error message!" required />
            </div>
            <div className="w-full">
                <InputGroup id="suffix" name="suffix" label="Suffix" placeholder="Suffix" errorMessage="This is a test error message!" required />
            </div>
            <div className="w-full">
                <InputGroup id="dateOfBirth" name="dateOfBirth" label="Date of birth" placeholder="Date of birth" errorMessage="This is a test error message!" required />
            </div>
            <div className="w-full">
                <InputGroup id="placeOfBirth" name="placeOfBirth" label="Place of birth" placeholder="Place of birth" errorMessage="This is a test error message!" required />
            </div>
            <div className="w-full">
                <SelectGroup label="Gender" id="gender" name="gender" errorMessage="This is a test error message!" required>
                    <SelectOption id="" label="Select" />
                    {genderData.map((data) => <SelectOption key={data.genderid} id={data.genderid} label={data.gender} />)}
                </SelectGroup>
            </div>
            <div className="w-full">
                <SelectGroup label="Nationality" id="nationality" name="nationality" errorMessage="This is a test error message!" required>
                    <SelectOption id="" label="Select" />
                    {nationalityData.map((data) => <SelectOption key={data.nationalityid} id={data.nationalityid} label={data.nationality} />)}
                </SelectGroup>
            </div>

            <div className='w-full'>
                <Button className="mt-2 w-4/12 align" >Next</Button>
            </div>
        </form>
    )

}

export default PersonalInfoForm
