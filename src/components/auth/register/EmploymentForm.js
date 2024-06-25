import React, { useEffect, useState } from 'react'
import SelectGroup from '@/components/form-components/SelectGroup';
import { useRank } from '@/hooks/api/rank';
import { useCompany } from '@/hooks/api/company';
import SelectOption from '@/components/form-components/SelectOption';
import { useContext } from 'react';
import { RegisterContext } from '@/stores/RegisterContext';
import Button from '@/components/Button';
import { indexResource } from '@/utils/resource';
import Loading from '@/components/Loading';
import ValidationError from '@/components/form-components/ValidationError';

function EmploymentForm() {
    const { index: getRank } = useRank();
    const { index: getCompany } = useCompany();
    const [dropdownData, setDropdownData] = useState({
        rankData: null,
        companyData: null,
    })
    const [loading, setLoading] = useState(true)
    const [errors, setErrors] = useState(null)
    const { setTraineeData, handleNextProcess, Yup } = useContext(RegisterContext);
    const rules = Yup.object().shape({
        rank: Yup.string().required('Rank is required!'),
        company: Yup.string().required('Company is required!'),
    })

    useEffect(() => {
        const fetchData = async () => {
            await indexResource(getRank, setDropdownData, 'rankData')
            await indexResource(getCompany, setDropdownData, 'companyData')
            setLoading(false)
        }

        fetchData()
    }, []);

    async function handleSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());

        try {
            await rules.validate(data, { abortEarly: false })
            setTraineeData((prevState) => {
                return {
                    ...prevState,
                    ...data
                }
            })
            handleNextProcess();
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                const errors = error.inner.map(err => ({ path: err.path, message: err.message }))
                setErrors(errors)
            }
        }

    }


    let ui = loading ?
        <div className="w-full">
            <Loading label="Loading..." />
        </div>
        :
        <form onSubmit={handleSubmit}>
            {
                errors &&
                <div className="w-full">
                    <ValidationError title="Warning!" errors={errors} />
                </div>
            }
            <div className="w-full">
                <SelectGroup id="rank" name="rank" label="Rank" errorMessage="This is a test error message!"  >
                    <SelectOption id="" label="Select" />
                    {dropdownData.rankData && dropdownData.rankData?.map((data) => <SelectOption key={data.rankid} id={data.rankid} label={data.rankacronym} />)}
                </SelectGroup>
            </div>
            <div className="w-full">
                <SelectGroup id="company" name="company" label="Company" errorMessage="This is a test error message!"  >
                    <SelectOption id="" label="Select" />
                    {dropdownData.companyData && dropdownData.companyData?.map((data) => <SelectOption key={data.companyid} id={data.companyid} label={data.company} />)}
                </SelectGroup>
            </div>
            <div className='w-full'>
                <Button className="mt-2 w-4/12 align" >Next</Button>
            </div>
        </form>

    return ui
}

export default EmploymentForm
