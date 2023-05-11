# Routes

You can add new javascript files to modify or extend your backend. 
Each file in this directory needs to export a **router**.
### Sample:

    const router = require('express').Router();
    
    router.post(
        '/your_route',
        async (req, res, next) => {
            /**
             * Your code
             */
        }
    );
    
    module.exports = router;

