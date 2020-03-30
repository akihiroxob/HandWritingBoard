class PageCtrl {
    index(req, res, next) {
        res.render('index');
    }

    board(req, res, next) {
        const data = {};
        data.title = req.params.room;
        data.room = req.params.room;
        res.render('board', data);
    }
}

export default new PageCtrl();
