import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { handlefavouriteStatus, listInsights } from '../services/userApis';
import TrimmedText from './TrimmedText';
import DeleteModal from './DeleteModal'
import Loading from './Loading';
import { Spinner } from "flowbite-react";
import { IoArrowBackCircle } from "react-icons/io5";
import { BsEmojiFrown } from "react-icons/bs";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';


function InsightsTable() {
    const [results, setResults] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [domain, SetDomain] = useState({})
    const [dataFetching, setDataFetching] = useState(false)
    const [loadingButtonId, setLoadingButtonId] = useState(null);
    const navigate = useNavigate()

    const listResults = () => {
        try {
            setDataFetching(true)
            listInsights().then((res) => {
                setDataFetching(false)
                setResults(res.data)
            }).catch((err) => {
                toast.error(err)
                setDataFetching(false)
            })
        } catch (error) {
            toast.error(error.message)
        }
    }

    const RemoveItem = (Domain) => {
        SetDomain(Domain)
        setShowModal(true)
    }

    const insightRemoved = () => {
        toast.success()
        setResults((prevResults) =>
            prevResults.filter((item) => item._id !== domain._id)
        );
    }

    const handleModal = (status) => {
        setShowModal(status)
    }



    const handleFavourites = (data) => {
        let status = !data.favouriteStatus;
        setLoadingButtonId(data._id)
        handlefavouriteStatus(data._id, status).then((res) => {
            setResults((prevResults) =>
                prevResults.map((item) =>
                    item._id === res.data.domain._id ? { ...item, favouriteStatus: status } : item
                )
            );
            setLoadingButtonId(null);

        }).catch((err) => {
            setLoadingButtonId(null);
            toast.error(err);
        });
    }


    useEffect(() => {
        listResults()
    }, [])


    function NoResult(){
        return(
            <div className='h-screen flex flex-col gap-4 justify-center items-center'>
                <BsEmojiFrown className='text-gray-500 w-1/2 h-1/3'/>
                <p className='text-2xl font-bold text-gray-500'>No results!</p>
            <button onClick={()=>navigate("/")} className='bg-black px-4 py-2 text-white flex items-center gap-1'><FaArrowLeft /> Back</button>
            </div>
        )
    }
    return (
        <>
            {dataFetching   ? <Loading /> :
                <div>
                    { results && results.length ?
                        <div className='p-5'>
                        <div className='flex justify-between items-center'>
                            <h1 className='text-4xl font-bold '>Results</h1>
                            <IoArrowBackCircle className='w-8 h-8 cursor-pointer hover:text-red-600' onClick={() => navigate("/")} />
                        </div>
                        { results.length &&
                            <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                                <table class="w-full text-sm text-left rtl:text-right text-gray-500 ">
                                    <thead class="text-xs text-gray-700 uppercase ">
                                        <tr>
                                            <th scope="col" class="px-6 py-3 bg-gray-50 ">
                                                Domain Name
                                            </th>
                                            <th scope="col" class="px-6 py-3">
                                                WordCount
                                            </th>
                                            <th scope="col" class="px-6 py-3 bg-gray-50 ">
                                                favourite
                                            </th>
                                            <th scope="col" class="px-6 py-3">
                                                Web-Links
                                            </th>
                                            <th scope="col" class="px-6 py-3">
                                                Media-Links
                                            </th>
                                            <th scope="col" class="px-6 py-3">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            results && results.length && results.map((result, index) => (
                                                <tr class="border-b border-gray-200">
                                                    <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 ">
                                                        <TrimmedText link={result.domainName} />
                                                    </td>
                                                    <td class="px-6 py-4 font-semibold text-black">
                                                        {result.wordCount}
                                                    </td>
                                                    <td class="px-6 py-4 bg-gray-50 font-semibold text-black">
                                                        {`${result.favouriteStatus}`}
                                                    </td>
                                                    <td class="px-6 py-4">
                                                        {
                                                            result.webLinks && result.webLinks.length ? result.webLinks.map((link, index) => (
    
                                                                <TrimmedText link={link} index={index + 1} />
                                                            )) : <p className=' font-semibold text-black'>No webLinks Available</p>
                                                        }
                                                    </td>
                                                    <td class="px-6 py-4">
                                                        {
                                                            result.mediaLinks && result.mediaLinks.length ? result.mediaLinks.map((link, index) => (
                                                                <TrimmedText link={link} index={index + 1} key={index} />
                                                            )) : <p className=' font-semibold text-black'>No Media Links Availabele</p>
                                                        }
                                                    </td>
                                                    <td class="px-6 py-4 space-y-2">
                                                        <p> <button className='bg-gray-500 text-white p-1 w-40 text-xs' onClick={() => RemoveItem(result)}>Remove</button></p>
                                                        <button className='bg-gray-500 text-white p-1 w-40 text-xs' onClick={() => handleFavourites(result)}>
                                                            {loadingButtonId === result._id ?
                                                                <Spinner aria-label="Extra small spinner example" size="xs" /> :
                                                                (result.favouriteStatus ? "Remove From Favourite" : "Add To Favorite")}
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                            }
                        <DeleteModal show={showModal} callBack={handleModal} Domain={domain} insightRemoved={insightRemoved} />
                    </div> : <NoResult/>
                    }
                </div>
            }
        </>
    )
}

export default InsightsTable
