const {Router} = require("express")
const connectionController = require("../controller/connectionController");

const router = Router();

router.post("/sendRequest",connectionController.sendConnectionRequest);
router.post("/cancelRequest",connectionController.cancelConnectionRequest);
router.post("/acceptRequest",connectionController.acceptConnectionRequest);
router.get("/getAllConnections",connectionController.getAllConnections)
router.get("/getPendingConnections",connectionController.getPendingConnections)
router.get("/getPendingInvitations",connectionController.getPendingInvitations)


module.exports = router