import React, { useEffect, useState } from 'react'
import SelectGroup from '@/components/form-components/SelectGroup';
import { useRank } from '@/hooks/api/rank';
import { useCompany } from '@/hooks/api/company';
import SelectOption from '@/components/form-components/SelectOption';
import { useContext } from 'react';
import { RegisterContext } from '@/stores/RegisterContext';
import Button from '@/components/Button';

function EmploymentForm() {
    const { index: showRank } = useRank();
    const { index: showCompany } = useCompany();
    const [rankData, setRankData] = useState(null);
    const [companyData, setCompanyData] = useState(null);
    const { setTraineeData, handleNextProcess } = useContext(RegisterContext);

    useEffect(() => {

        showRank()
            .then(({ data }) => {
                setRankData(data)
            })
            .finally()

        showCompany()
            .then(({ data }) => {
                setCompanyData(data)
            })
            .finally()
    }, []);
    
    function handleSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());
        setTraineeData((prevState) => {
            return {
                ...prevState,
                ...data
            }
        })

        handleNextProcess();
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="w-full">
                <SelectGroup id="rank" name="rank" label="Rank" errorMessage="This is a test error message!" required >
                    <SelectOption id="" label="Select" />
                    {rankData && rankData.map((data) => <SelectOption key={data.rankid} id={data.rankid} label={data.rankacronym} />)}
                </SelectGroup>
            </div>
            <div className="w-full">
                <SelectGroup id="company" name="company" label="Company" errorMessage="This is a test error message!" required >
                    <SelectOption id="" label="Select" />
                    {companyData && companyData.map((data) => <SelectOption key={data.companyid} id={data.companyid} label={data.company} />)}
                </SelectGroup>
            </div>
            <div className='w-full'>
                <Button className="mt-2 w-4/12 align" >Next</Button>
            </div>
        </form>
    )
}

export default EmploymentForm
