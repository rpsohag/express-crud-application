const showIndexPage = (req,res) => {
    res.status(200).render('index');
}

module.exports = {
    showIndexPage
}