import { Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { toast } from "react-toastify";
import { deleteInsight } from "../services/userApis";
import { Spinner } from "flowbite-react";
import { useState } from "react";


function DeleteModal({show,Domain,callBack,insightRemoved}) {
   
  const [loading,setLoading] = useState(false)

  const handleModal =(status)=>{
    callBack(status)
  }

  const removeItem = ()=>{
    try {
      setLoading(true)
      deleteInsight(Domain._id).then((res)=>{
        insightRemoved("Insight Deleted")
        setLoading(false)
        handleModal(false)
      }).catch((err)=>{
        setLoading(false)
        console.log(err);
      })
    } catch (error) {
      setLoading(false)
      toast.error(error.message || "Something went wrong")
    }
  }

  return (
    <>
    
      <Modal show={show} size="md"  popup onClose={()=>handleModal(false)}>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this product?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={removeItem} className="w-40">
                {loading ? <Spinner aria-label="Extra small spinner example" size="xs"/> : "Yes, I'm sure"}
              </Button>
              <Button color="gray" onClick={()=>handleModal(false)} className="w-40">
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
  </>
  )
}

export default DeleteModal
