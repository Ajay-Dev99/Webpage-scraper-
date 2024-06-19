import { Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { toast } from "react-toastify";
import { deleteInsight } from "../services/userApis";

function DeleteModal({show,Domain,callBack,insightRemoved}) {
   
  const handleModal =(status)=>{
    callBack(status)
  }

  const removeItem = ()=>{
    try {
      deleteInsight(Domain._id).then((res)=>{
        insightRemoved("Insight Deleted")
        handleModal(false)
      }).catch((err)=>{
        console.log(err);
      })
    } catch (error) {
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
              <Button color="failure" onClick={removeItem}>
                {"Yes, I'm sure"}
              </Button>
              <Button color="gray" onClick={()=>handleModal(false)}>
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
