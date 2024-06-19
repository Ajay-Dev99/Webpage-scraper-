import React, { useEffect, useState } from 'react'
import { Table } from "flowbite-react";
import { toast } from 'react-toastify';
import { handlefavouriteStatus, listInsights } from '../services/userApis';
import TrimmedText from './TrimmedText';
import DeleteModal from './DeleteModal'


function InsightsTable() {
    const [results, setResults] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [domain, SetDomain] = useState({})

    const listResults = () => {
        try {
            listInsights().then((res) => {
                setResults(res.data)
            }).catch((err) => {
                toast.error(err)
            })
        } catch (error) {
            toast.error(error.message)
        }
    }

    const RemoveItem = (Domain) => {
        SetDomain(Domain)
        setShowModal(true)
    }

    const insightRemoved = (msg) => {
        toast.success(msg)
        listResults()
    }

    const handleModal = (status) => {
        setShowModal(status)
    }

    const handleFavourites = (data) => {
        let status = !data.favouriteStatus
        handlefavouriteStatus(data._id, status).then((res) => {
            listResults()
        }).catch((err) => {
            toast.error(err)
        })
    }

    useEffect(() => {
        listResults()
    }, [])
    return (
        <div className='p-5'>
            <h1 className='text-4xl font-bold mb-5'>Results</h1>
            { results && results.length ? <Table >
                <Table.Head className=' font-semibold text-black'>
                    <Table.HeadCell>Domain name</Table.HeadCell>
                    <Table.HeadCell>WordCount</Table.HeadCell>
                    <Table.HeadCell>favourite</Table.HeadCell>
                    <Table.HeadCell>Web-Links</Table.HeadCell>
                    <Table.HeadCell>Media-Links</Table.HeadCell>
                    <Table.HeadCell>Actions</Table.HeadCell>
                    <Table.HeadCell>
                        <span className="sr-only">Edit</span>
                    </Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y overflow-x-auto">
                    {
                      results && results.length &&  results.map((result, index) => (
                            <Table.Row key={index}>
                                <Table.Cell >
                                    <TrimmedText link={result.domainName} />
                                </Table.Cell>
                                <Table.Cell className=' font-semibold text-black'>{result.wordCount}</Table.Cell>
                                <Table.Cell className=' font-semibold text-black'>{`${result.favouriteStatus}`}</Table.Cell>
                                <Table.Cell>
                                    {
                                       result.webLinks && result.webLinks.length ? result.webLinks.map((link, index) => (

                                            <TrimmedText link={link} index={index + 1} />
                                        )) : <p className=' font-semibold text-black'>No webLinks Available</p>
                                    }


                                </Table.Cell>
                                <Table.Cell>
                                    {
                                      result.mediaLinks &&  result.mediaLinks.length ? result.mediaLinks.map((link, index) => (
                                            <TrimmedText link={link} index={index + 1} key={index} />
                                        )) : <p className=' font-semibold text-black'>No Media Links Availabele</p>
                                    }
                                </Table.Cell>
                                <Table.Cell className='space-y-2'>
                                    <p> <button className='bg-gray-500 text-white p-1 w-40 text-xs' onClick={() => RemoveItem(result)}>Remove</button></p>
                                    <button className='bg-gray-500 text-white p-1 w-40 text-xs' onClick={() => handleFavourites(result)}>{result.favouriteStatus ? "Remove From Favourite" : "Add To Favorite"}</button>
                                </Table.Cell>
                            </Table.Row>
                        ))
                    }
                </Table.Body>
            </Table> : <p>No results</p>}
            <DeleteModal show={showModal} callBack={handleModal} Domain={domain} insightRemoved={insightRemoved} />
        </div>
    )
}

export default InsightsTable
