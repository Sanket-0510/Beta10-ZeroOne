
const multer = require('multer');
const fs = require('fs');

const handlecvpost = async(req,res)=>{
    try {
    
        const base64String = req.
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
     const todaysPrice = req.body.price;
    const commodity = req.body.commodity;


    const decreasePercentage = Math.random() * (2 - 1) + 1;
    const decreaseAmount = todaysPrice * (decreasePercentage / 100);
    const priceArray = [];
    for (let i = 0; i < 3; i++) {
      priceArray.push(Math.floor(todaysPrice - decreaseAmount - i));
    }
    priceArray.push(Math.floor(Number(todaysPrice))); // Today's price in the middle
    for (let i = 0; i < 3; i++) {
      priceArray.push(Math.floor(todaysPrice - decreaseAmount + i));
    }

    const result0 = await fetch("http://localhost:5000/predict",{
      method:"POST",
      headers:{
        'Content-Type':'application/json'
      },
     body:JSON.stringify({"data":priceArray})
    })
 
    const result = (await result0.json()).result
    const final_array =[]
    const decreasePercent = Math.random() * (2 - 1) + 1;
    const decreaseAm = result * (decreasePercent / 100);
    for (let i = 0; i < 3; i++) {
      final_array.push(Math.floor(result - decreaseAm- i));
    }
    final_array.push(Math.floor(Number(todaysPrice))); 
    for (let i = 0; i < 3; i++) {
      final_array.push(Math.floor(result - decreaseAm + i));
    }
    
    res.status(200).json({ result: final_array });
  } catch (e) {
    console.error('Error:', e);
    res.status(500).json({ error: 'Internal server error' });
  }
};





module.exports= {handlecvpost, handlePricePost}