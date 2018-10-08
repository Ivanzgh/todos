fetch('https://www.npmjs.com/search?q=keywords:url', {
    method: 'GET'
})
    .then(res => {
        return res.text();
    })
    .then(res => {
        console.log(res)
    });