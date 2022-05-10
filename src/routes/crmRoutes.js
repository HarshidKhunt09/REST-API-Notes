import { addNewContact,
         getContacts,
         getContactWithID,
         updateContact,
         deleteContact,
         signin,
         signup,
         about
} from "../controllers/crmController";
import { authenticate } from "../../middleware/authenticate";

const routes = (app) => {
    app.route('/contact')
        .get((req, res, next) => {
            //middleware
            console.log(`Request from: ${req.originalUrl}`)
            console.log(`Request type: ${req.method}`)
            next();
        }, getContacts)

        .post(addNewContact);

    app.route('/contact/:contactID')
        .get(getContactWithID)

        .put(updateContact)

        .delete(deleteContact);

    app.route('/signup')
        .post(signup);

    app.route('/signin')
        .post(signin);

    app.route('/about')
        .get(authenticate, about);
}

export default routes;