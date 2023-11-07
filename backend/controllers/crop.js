const { fileURLToPath } = require("url");

const { MessagingResponse } = require("twilio").twiml;

const fetchCropData = async (crop, state) => {
  try {
    console.log(state.toUpperCase())
    const upperState = state.toUpperCase()
    console.log("here in fetch")
    const result = await fetch(
      "https://enam.gov.in/web/Agm_Enam_ctrl/trade_data_list",
      {
        method: "POST",
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/119.0",
          Accept: "application/json, text/javascript, /; q=0.01",
          "Accept-Language": "en-US,en;q=0.5",
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          "X-Requested-With": "XMLHttpRequest",
          "Sec-Fetch-Dest": "empty",
          "Sec-Fetch-Mode": "cors",
          "Sec-Fetch-Site": "same-origin",
          Pragma: "no-cache",
          "Cache-Control": "no-cache",
        },
        referrer: "https://enam.gov.in/web/dashboard/Agm_Enam_ctrl",
        body: `language=en&stateName=${upperState}&fromDate=2023-11-04&toDate=2023-11-04`,
        credentials: "include",
        mode: "cors",
      }
    );

    if (!result.ok) {
      throw new Error(`Request failed with status ${result.status}`);
    }

    return await result.json();
  } catch (e) {
    console.log(e);
    throw e;
  }
};

const handleWebCropPost = async (req, res) => {
  try {
    const { crop, state } = req.body;
    console.log("here");
    console.log(crop)
    console.log(state)
    const response = await fetchCropData(crop, state)
    console.log(response.data)
    if(response.data){
    const filteredData = response.data.filter(item => {
      return item.ndtd_Commodity==crop.toUpperCase()
    });
    console.log(filteredData)
    if(filteredData.length!=0)
     res.status(200).json(filteredData);
    else res.json([{
      "ndtd_Commodity": "Not found",
      "ndtd_Mandi": "Not found",
      "ndtd_Mandi_type": "Not found",
      "ndtd_Mandi_type_desc": "Not found",
      "ndtd_Max_Price": "Not found",
      "ndtd_Min_Price": "Not found",
      "ndtd_Modal_Price": "Not found",
      "ndtd_State": "Not found",
      "ndtd_Variety": "Not found",
      "ndtd_trn_date": "Not found"
  }])
  }
  else {
    res.json([{
      "ndtd_Commodity": "Not found",
      "ndtd_Mandi": "Not found",
      "ndtd_Mandi_type": "Not found",
      "ndtd_Mandi_type_desc": "Not found",
      "ndtd_Max_Price": "Not found",
      "ndtd_Min_Price": "Not found",
      "ndtd_Modal_Price": "Not found",
      "ndtd_State": "Not found",
      "ndtd_Variety": "Not found",
      "ndtd_trn_date": "Not found"
  }])
  
  }

   
  } catch (error) {
    console.error(error);
    res.status(500).send("Error");
  }
};


const handleTwilioCropData = async (req, res) => {

  const twiml = new MessagingResponse();
  const incomingMessage = req.body.Body.toUpperCase();

  if (incomingMessage.includes("CROP")) {
    const cropData = await fetchCropData();
    console.log(cropData);

    twiml.message(`Here is the crop data: ${JSON.stringify(cropData)}`);
  } else {
    twiml.message("Please include 'CROP' in your message to get crop data.");
  }

  res.type("text/xml").send(twiml.toString());
};

const handleSms = async (req, res) => {
  const { crop, phoneNo, state } = req.body;
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const client = require("twilio")(accountSid, authToken);
  const response = await fetchCropData(crop, state)
  const firstFiveData = response.data.slice(0, 5);
  console.log(firstFiveData)
  const message = `crop data ${firstFiveData[0].ndtd_Variety} /n ${firstFiveData[0].ndtd_Commodity}/n ${firstFiveData[0].ndtd_Mandi} /n price: ${firstFiveData[0].ndtd_Modal_Price} `;
  const result = await client.messages.create({
    body: message,
    from: "+17407910489",
    to: `+91${phoneNo}`,
  });
  res.status(200).send(message)

};
module.exports = { handleWebCropPost, handleTwilioCropData, handleSms };
