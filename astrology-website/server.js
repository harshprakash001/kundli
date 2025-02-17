const express = require("express")
const path = require("path")
const axios = require("axios")

const app = express()
const port = process.env.PORT || 5000

app.use(express.static("public"))
app.use(express.json())

app.post("/api/match-making", async (req, res) => {
  try {
    const response = await axios.post("https://json.apiastro.com/match-making/ashtakoot-score", req.body, {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "skU7HNl9tG40AzU5L8vqV27uXIfxhp4B7TXwFk1q",
      },
    })
    res.json(response.data)
  } catch (error) {
    console.error("Error in match-making:", error.response ? error.response.data : error.message)
    res.status(500).json({ error: "An error occurred while fetching data" })
  }
})

app.post("/api/geocode", async (req, res) => {
  try {
    const response = await axios.post("https://json.apiastro.com/geo-details", req.body, {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "skU7HNl9tG40AzU5L8vqV27uXIfxhp4B7TXwFk1q",
      },
    })
    console.log("Geocode API response:", response.data)
    res.json(response.data)
  } catch (error) {
    console.error("Error in geocoding:", error.response ? error.response.data : error.message)
    res.status(500).json({ error: "An error occurred while fetching geocode data" })
  }
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

