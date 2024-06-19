import { userInstance } from "../axios/axiosInstance";

export const getInsights = (url) => {
    return userInstance.post("/getinsights", url)
}
export const listInsights = (lastId,value) => {
    console.log(lastId,value,"last Id");
    const url = lastId && value ? `/listinsights?lastId=${lastId}&value=${value}` : '/listinsights';
    return userInstance.get(url)
}
export const deleteInsight = (insightId) => {
    return userInstance.delete(`/deleteinsight/${insightId}`)
}
export const handlefavouriteStatus = (insightId,status) => {
    return userInstance.put(`/handlefavourite/${insightId}`,{status})
}