const Test = require("../models/test.model");

module.exports = {
    registTestData: (req, res) => {
        try {
            const { title, content } = req.body;

            console.log(req.body);

            // testModel 객체를 생성하고 데이터를 설정합니다.
            const testModel = new Test({
                title: title,
                content: content
            });

            testModel
                .save()
                .then((newPost) => {
                    console.log('Create 완료');
                    res.status(200).json({
                        message: 'Create success',
                        data: {
                            post: newPost,
                        },
                    });
                })
                .catch((err) => {
                    res.status(500).json({
                        message: err,
                    });
                });
        }
        catch (error) {
            res.status(500).json({
                message: error.message
            });
        }
    }
};
