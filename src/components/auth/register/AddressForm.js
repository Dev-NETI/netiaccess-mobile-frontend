import React, { useEffect, useState } from 'react'
import ToggleSwitch from '@/components/ToggleSwitch'
import InputGroup from '@/components/form-components/InputGroup';
import SelectGroup from '@/components/form-components/SelectGroup';
import { RegisterContext } from '@/stores/RegisterContext';
import { useContext } from 'react';
import { useRegion } from '@/hooks/api/region';
import { useProvince } from '@/hooks/api/province';
import { useCity } from '@/hooks/api/city';
import { useBrgy } from '@/hooks/api/brgy';
import SelectOption from '@/components/form-components/SelectOption';
import Button from '@/components/Button';
import { indexResource, showResource } from '@/utils/resource';
import Loading from '@/components/Loading';

function AddressForm() {
    const [selectedSwitch, setSelectedSwitch] = useState(1);
    const [dropdownData, setDropdownData] = useState({
        regionData: null,
        provinceData: null,
        cityData: null,
        brgyData: null,
    })
    const [loading, setLoading] = useState(true)
    const [validationError, setValidationError] = useState(null)
    const { setTraineeData, handleNextProcess, Yup } = useContext(RegisterContext);
    const { index: getRegion } = useRegion();
    const { show: showProvince } = useProvince();
    const { show: showCity } = useCity();
    const { show: showBrgy } = useBrgy();
    let rules = selectedSwitch ?
        Yup.object().shape({
            region: Yup.string().required('Region is required!'),
            province: Yup.string().required('Province is required!'),
            city: Yup.string().required('City is required!'),
            brgy: Yup.string().required('Brgy is required!'),
            street: Yup.string().required('Street is required!')
                .min(5, 'Street must be at least 5 characters long!')
                .max(100, 'Street must not exceed 100 characters!'),
            postalCode: Yup.number().typeError('Postal code must be number')
                .required('Postal code is required!')
                .integer('Postal code must be an integer'),
        })
        :
        Yup.object().shape({
            fullAddress: Yup.string().required('Address is required!').min(5, 'Address must be at least 5 characters long!')
                .max(100, 'Address must not exceed 100 characters!')
        })

    useEffect(() => {

        const fetchData = async () => {
            indexResource(getRegion, setDropdownData, 'regionData')
            setLoading(false)
        }
        fetchData()

    }, []);


    function handleToggle(value) {
        setSelectedSwitch(value);
    }

    async function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target)
        const data = Object.fromEntries(formData.entries())

        try {
            await rules.validate(data, { abortEarly: false });
            setTraineeData((prevState) => {
                return {
                    ...prevState,
                    ...data,
                    selectedSwitch
                }
            });

            handleNextProcess();
        } catch (error) {
            const errors = error.inner.reduce((acc, curr) => {
                acc[curr.path] = curr.message;
                return acc;
            }, {});
            setValidationError(errors);
        }

    }

    const activeForm = (selectedSwitch) => {
        if (selectedSwitch === 1) {
            return (
                <>
                    <div className="w-full">
                        <SelectGroup id="region" name="region" label="Region" errorMessage={validationError && validationError.region} isError={validationError && validationError.region}
                            onChange={(event) => showResource(showProvince, event.target.value, setDropdownData, 'provinceData')}  >
                            <SelectOption id="" label="Select" />
                            {dropdownData.regionData?.map((data) => <SelectOption key={data.regCode} id={data.regCode} label={data.regDesc} />)}
                        </SelectGroup>
                    </div>
                    <div className="w-full">
                        <SelectGroup id="province" name="province" label="Province" errorMessage={validationError && validationError.province} isError={validationError && validationError.province}
                            onChange={(event) => showResource(showCity, event.target.value, setDropdownData, 'cityData')}  >
                            <SelectOption id="" label="Select" />
                            {dropdownData.provinceData && dropdownData.provinceData?.map((data) => <SelectOption key={data.provCode} id={data.provCode} label={data.provDesc} />)}
                        </SelectGroup>
                    </div>
                    <div className="w-full">
                        <SelectGroup id="city" name="city" label="City" errorMessage={validationError && validationError.city} isError={validationError && validationError.city}
                            onChange={(event) => showResource(showBrgy, event.target.value, setDropdownData, 'brgyData')}  >
                            <SelectOption id="" label="Select" />
                            {dropdownData.cityData && dropdownData.cityData?.map((data) => <SelectOption key={data.citymunCode} id={data.citymunCode} label={data.citymunDesc} />)}
                        </SelectGroup>
                    </div>
                    <div className="w-full">
                        <SelectGroup id="brgy" name="brgy" label="Brgy" errorMessage={validationError && validationError.brgy} isError={validationError && validationError.brgy}  >
                            <SelectOption id="" label="Select" />
                            {dropdownData.brgyData && dropdownData.brgyData?.map((data) => <SelectOption key={data.brgyCode} id={data.brgyCode} label={data.brgyDesc} />)}
                        </SelectGroup>
                    </div>
                    <div className="w-full">
                        <InputGroup id="street" name="street" label="Street" placeholder="Enter Street" errorMessage={validationError && validationError.street} isError={validationError && validationError.street} />
                    </div>
                    <div className="w-full">
                        <InputGroup id="postalCode" name="postalCode" label="Postal Code" placeholder="Enter Postal Code" errorMessage={validationError && validationError.postalCode} isError={validationError && validationError.postalCode} />
                    </div>
                </>
            )
        } else {
            return (
                <div className="w-full">
                    <InputGroup id="fullAddress" name="fullAddress" label="Full Address" placeholder="Enter Full Address"
                        errorMessage={validationError && validationError.fullAddress} isError={validationError && validationError.fullAddress} />
                </div>
            )
        }
    }

    return (
        <>
            {
                loading ?
                    <div className="w-full">
                        <Loading label="Loading..." />
                    </div>
                    :
                    <>
                        <div className="w-full">
                            <ToggleSwitch activeOption={selectedSwitch} handleToggle={handleToggle}
                                firstOption="Local" secondOption="Foreign" />
                        </div>

                        <form onSubmit={handleSubmit}>
                            {activeForm(selectedSwitch)}
                            <div className='w-full'>
                                <Button className="mt-2 w-4/12 align" >Next</Button>
                            </div>
                        </form>
                    </>
            }
        </>
    )
}

export default AddressForm
