import cron from "node-cron";

import {
    completeExpiredRentalsService,
} from "../services/rentalService.js";


const rentalCompletionJob = () =>{

    cron.schedule("0 * * * *", async () =>{
        try {
            const completedCount  = await completeExpiredRentalsService();
            console.log( `${completedCount} expired rentals completed`);
        } catch (error) {
            console.error(
                "Error completing expired rentals:",
                error
            );
        }
    });
}


export default rentalCompletionJob;