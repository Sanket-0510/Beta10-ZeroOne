
const multer = require('multer');
const fs = require('fs');

const handlecvpost = async(req,res)=>{
    try {
    
        const base64String = req.body.Image
        console.log(base64String)
        const base64Data = base64String.split(',')[1];
      
        const apiUrl = 'http://localhost:5000'; 

          try {
            const response = await fetch(apiUrl, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({base64Data:base64Data}), 
            });
            console.log(response)
    
            if (response.ok) {
              const result = await response.json();
              res.json(result);
            } else {
              res.status(response.status).json({ error: 'Error in the API request' });
            }
          } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error sending data to the API' });
          }


      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error handling the file upload' });
      }
}




const handlePricePost = async (req, res) => {
  try {
    const commodity = req.body.commodity; // Get the commodity from the request body
    
    const filePath = "./data.json"; // Update with the correct file path

    fs.readFile(filePath, 'utf8', async (err, data) => {
      if (err) {
        console.error('Error reading JSON file:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }

      try {
        const jsonData = JSON.parse(data);

        if (jsonData[commodity]) {
          const result = await fetch('http://localhost:5000/predict', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ commodity: jsonData[commodity] }), // Use the selected commodity data
          });

          if (result.status === 200) {
            const responseJson = await result.json();
            console.log('Response from server:', responseJson);
            // You can send a response back to the client if needed
            res.status(200).json(responseJson);
          } else {
            console.error('Error in the HTTP request. Status:', result.status);
            res.status(result.status).json({ error: 'HTTP request error' });
          }
        } else {
          console.error('Commodity not found in JSON data');
          res.status(400).json({ error: 'Commodity not found' });
        }
      } catch (parseError) {
        console.error('Error parsing JSON data:', parseError);
        res.status(500).json({ error: 'Error parsing JSON data' });
      }
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports= {handlecvpost, handlePricePost}