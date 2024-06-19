import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import { getInsights } from '../services/userApis'
import { Button, Spinner } from "flowbite-react";

function WordCountForm() {
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    const initialValues = {
        url: "",
    }

    const validationSchema = Yup.object({
        url: Yup.string().required("* This field is required").matches(/^\S*$/, "No whitespaces allowed").matches(/^\S{3,}$/, "Must be at least 3 characters long").matches(
            /^(ftp|http|https):\/\/.*(?!.*\s).*$/,
            "Input must contain a valid URL starting with http:// or https://"
        ),
    })
    const onSubmit = (values) => {
        try {
            setIsLoading(true)
            getInsights(values).then((res) => {
                setIsLoading(false)
                navigate("/table")

            }).catch((err) => {
                setIsLoading(false)
                toast.error(err)
            })
        } catch (error) {
            setIsLoading(false)
            toast(error.message || "Something Went Wrong")
        }
    }

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema
    })


    return (
        <div className='h-screen flex flex-col justify-center items-center'>
            <div className='flex flex-col items-center gap-9  p-4  justify-center  w-full md:w-auto border border-black mb-3'>
                <h1 className='text-3xl font-bold mb-6'>Webpage Scraper</h1>
                <div>
                    <input type="text" name="url" id="" className='border border-black p-3 w-full md:w-[29rem] bg-[#cfe2f3] placeholder:text-black' placeholder='Enter Website URL' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.url} />
                    {formik.touched.url && formik.errors.url ? <p className="text-sm text-start w-full text-red-600">{formik.errors.url}</p> : null}
                </div>
                {isLoading ? <Button>
                    <Spinner aria-label="Spinner button example" size="sm" />
                    <span className="pl-3">Loading...</span>
                </Button> : <button className='bg-[#cfe2f3] p-3 text-lg  border border-black' onClick={formik.handleSubmit}>Get Insights</button>}
            </div>

            <div className='bg-red-400'>
            <button className='bg-black text-white p-3 text-lg  border border-black' onClick={()=>navigate("/table")}>Go To History</button>
            </div>

        </div>

    )
}

export default WordCountForm
