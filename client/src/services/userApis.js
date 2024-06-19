import { userInstance } from "../axios/axiosInstance";

export const getInsights = (url) => {
    return userInstance.post("/getinsights", url)
}
export const listInsights = () => {
    return userInstance.get("/listinsights")
}
export const deleteInsight = (insightId) => {
    return userInstance.delete(`/deleteinsight/${insightId}`)
}
export const handlefavouriteStatus = (insightId,status) => {
    return userInstance.put(`/handlefavourite/${insightId}`,{status})
}