function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value
    Client.checkForName(formText)

    console.log("::: Form Submitted :::", formText)
    //const data = {};
    //data.zip = formText;
    //const dataStr = JSON.stringify(data)
    const postData = async(url='', data = {}) => {
        console.log('In postData', data)
        const res = await fetch(url, {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        try {
            const newData = await res.json();
            return newData
        } catch(error) {
            console.log(error)
        }
    } 
    
    const getData = async(url='') => {
        const res = await fetch(url)

        try {
            console.log("Response received ", res.body)
            return res.body
        } catch(error) {
            console.log(error)
        }
    }

    postData('http://localhost:8081/test', {zip: formText})

        .then(function(res) {
            document.getElementById('results').innerHTML = res.zip
        })
       .then(getData('http://localhost:8081/test'))
       .then(res => console.log(res))


    
}

export { handleSubmit }
