const express = require('express');
const router = express.Router();
const { authenticateLocal, authenticateGoogle, authenticateJwt } = require('../middleware/authMiddleware');
const authController = require('../controllers/authController');
const workspaceController = require('../controllers/workspaceController');

router.post('/login', authenticateLocal, authController.login);
router.get('/tokenLogin', authenticateJwt, authController.login);
router.get('/google', authenticateGoogle);
router.get('/google/callback', authenticateGoogle, authController.login);
router.post('/register', authController.register);

router.get('/file', authenticateJwt, workspaceController.getFile);
router.post('/file', authenticateJwt, workspaceController.setFile);
router.put('/file', authenticateJwt, workspaceController.updateFile);
router.delete('/file', authenticateJwt, workspaceController.deleteFile);

module.exports = router;
