const cheerio = require('cheerio');
const axios = require('axios');
const resultModal = require('../modal/resultModal');
const { default: mongoose } = require('mongoose');

const countWords = (text) => {
    return text.split(/\s+/).filter(word => word.length > 0).length;
};

const getInsights = async (req, res, next) => {
    try {
        const { url } = req.body;
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);
        const text = $('body').text();
        const wordCount = countWords(text);

        const mediaUrls = [];

        $('img').each((index, element) => {
            if (mediaUrls.length >= 10) {
                return false; 
            }
            let value = $(element).attr('src')
            if (value) mediaUrls.push(value);
        });
        $('video').each((index, element) => {
            if (mediaUrls.length >= 10) {
                return false; 
            }
            let value = $(element).attr('src')
            if (value) mediaUrls.push(value);
        });

        const links = [];
        $('a').each((index, element) => {
            if (links.length >= 10) {
                return false;
            }
            const link = $(element).attr('href');
            if (link && (link.startsWith('http://') || link.startsWith('https://'))) {
                if (!links.includes(link)) {
                    links.push(link);
                }
            }
        });



        const newResult = new resultModal({
            domainName: url,
            wordCount,
            webLinks: links,
            mediaLinks: mediaUrls
        })

        const save = await newResult.save()

        res.status(200).json({ message: "Successfull" })


    } catch (error) {
        if (error.message.includes("ENOTFOUND")) {
            return res.status(error.status || 500).json({ message: "Invalid URL" })
        }
        res.status(error.status || 500).json({ message: error.message || "Internal Server Error" })
    }
}


const listInsights = async (req, res, next) => {
    try {
        const insights = await resultModal.find()
        if (insights) {
            res.status(200).json(insights.reverse())
        }
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || "Internal Server Error" })

    }
}

const deleteInsight = async (req, res, next) => {
    try {
        const { id } = req.params
        const deleted = await resultModal.deleteOne({ _id: id })
        if (deleted) {
            return res.status(200).json({ message: "Insight Deleted" })
        } else {
            return res.status(400).json({ message: "Cannot Delete the insight" })
        }
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || "Internal Server Error" })
    }
}

const handleFavouriteStatus = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { status } = req.body
        let updated = await resultModal.findOneAndUpdate({ _id: new mongoose.Types.ObjectId(id) }, { $set: { favouriteStatus: status } })
        if (updated) {
            return res.status(200).json({ message: status ? "Added To Favourite" : "Removed From Favourite", domain: updated })
        }
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ message: error.message || "Internal Server Error" })
    }
}
module.exports = {
    getInsights,
    listInsights,
    deleteInsight,
    handleFavouriteStatus
}