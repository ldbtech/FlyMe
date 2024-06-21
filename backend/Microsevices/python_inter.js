async function getPrediction(inputData) {
    const response = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input: inputData }),
    });

    const data = await response.json();
    return data.prediction;
}

// Example 
const inputData = {
    getPrediction(inputData).then(prediction => {
        console.log('prediction', prediction);
    })
}