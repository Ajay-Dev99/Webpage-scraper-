const { getInsights, listInsights, deleteInsight, handleFavouriteStatus } = require("../controllers/userController")

const Router = require("express").Router()

Router.post("/getinsights",getInsights)
Router.get("/listinsights",listInsights)
Router.delete("/deleteinsight/:id",deleteInsight)
Router.put("/handlefavourite/:id",handleFavouriteStatus)


module.exports = Router