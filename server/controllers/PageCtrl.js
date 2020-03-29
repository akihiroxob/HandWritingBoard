class PageCtrl {
    index(req, res, next) {
        res.render('index');
    }
}

export default new PageCtrl();
