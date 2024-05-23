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

function AddressForm() {
    const [selectedSwitch, setSelectedSwitch] = useState(1);
    const { setTraineeData, handleNextProcess } = useContext(RegisterContext);
    const [regionData, setRegionData] = useState([]);
    const [provinceData, setProvinceData] = useState(null);
    const [cityData, setCityData] = useState(null);
    const [brgyData, setBrgyData] = useState(null);
    const { index } = useRegion();
    const { show: showProvince } = useProvince();
    const { show: showCity } = useCity();
    const { show: showBrgy } = useBrgy();

    useEffect(() => {
        index()
            .then(({ data }) => {
                setRegionData(data);
            })
            .finally()
    }, []);


    function handleToggle(value) {
        setSelectedSwitch(value);
    }

    function handleSelectDropdown(regCode, getDataMethod, setDataMethod) {
        getDataMethod(regCode)
            .then(({ data }) => {
                setDataMethod(data)
            })
            .finally()
    }

    function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target)
        const data = Object.fromEntries(formData.entries())

        setTraineeData((prevState) => {
            return {
                ...prevState,
                ...data,
                selectedSwitch
            }
        });

        handleNextProcess();
    }

    const activeForm = (selectedSwitch) => {
        if (selectedSwitch === 1) {
            return (
                <>
                    <div className="w-full">
                        <SelectGroup id="region" name="region" label="Region" errorMessage="This is a test error message!"
                            onChange={(event) => handleSelectDropdown(event.target.value, showProvince, setProvinceData)} required >
                            <SelectOption id="" label="Select" />
                            {regionData.map((data) => <SelectOption key={data.regCode} id={data.regCode} label={data.regDesc} />)}
                        </SelectGroup>
                    </div>
                    <div className="w-full">
                        <SelectGroup id="province" name="province" label="Province" errorMessage="This is a test error message!"
                            onChange={(event) => handleSelectDropdown(event.target.value, showCity, setCityData)} required >
                            <SelectOption id="" label="Select" />
                            {provinceData && provinceData.map((data) => <SelectOption key={data.provCode} id={data.provCode} label={data.provDesc} />)}
                        </SelectGroup>
                    </div>
                    <div className="w-full">
                        <SelectGroup id="city" name="city" label="City" errorMessage="This is a test error message!"
                            onChange={(event) => handleSelectDropdown(event.target.value, showBrgy, setBrgyData)} required >
                            <SelectOption id="" label="Select" />
                            {cityData && cityData.map((data) => <SelectOption key={data.citymunCode} id={data.citymunCode} label={data.citymunDesc} />)}
                        </SelectGroup>
                    </div>
                    <div className="w-full">
                        <SelectGroup id="brgy" name="brgy" label="Brgy" errorMessage="This is a test error message!" required >
                            <SelectOption id="" label="Select" />
                            {brgyData && brgyData.map((data) => <SelectOption key={data.brgyCode} id={data.brgyCode} label={data.brgyDesc} />)}
                        </SelectGroup>
                    </div>
                    <div className="w-full">
                        <InputGroup id="street" name="street" label="Street" placeholder="Enter Street" errorMessage="This is a test error message!" required />
                    </div>
                    <div className="w-full">
                        <InputGroup id="postalCode" name="postalCode" label="Postal Code" placeholder="Enter Postal Code" errorMessage="This is a test error message!" required />
                    </div>
                </>
            )
        } else {
            return (
                <div className="w-full">
                    <InputGroup id="fullAddress" name="fullAddress" label="Full Address" placeholder="Enter Full Address" 
                    errorMessage="This is a test error message!" required />
                </div>
            )
        }
    }


    return (
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
    )
}

export default AddressForm
