import { Inngest } from "inngest";
import dbConnect from "./db";
import User from "@/Models/user";

export const inngest = new Inngest({ id: "quickcart-next" });

export const syncUserCreation =  inngest.createFunction (
    {
        id: 'sync-user-from-clerk'
    },
    {event: 'clerk/user.created'},
    async ({ event, step }) => {
        const { id, first_name, last_name, email_addresses, image_url } = event.data;
        const userData = {
            _id: id,
            name: first_name + '' + last_name,
            email: email_addresses[0].email_address,
            imageUrl: image_url
        };
        await dbConnect
        await User.create(userData)
    }
    )

    export const syncUserUpdate =  inngest.createFunction (
        {
            id: 'update-user-from-clerk'
        },
        {event: 'clerk/user.updated'},
        async ({ event, step }) => {
            const { id, first_name, last_name, email_addresses, image_url } = event.data;
            const userData = {
                _id: id,
                name: first_name + '' + last_name,
                email: email_addresses[0].email_address,
                imageUrl: image_url
            };
            await dbConnect
            await User.findByIdAndUpdate(id, userData)
        }
    )

    export const syncUserDeletion =  inngest.createFunction (
        {
            id: 'delete-user-with-clerk'
        },
        {event: 'clerk/user.deleted'},
        async ({ event }) => {
            const { id } = event.data;
            await dbConnect
            await User.findByIdAndDelete(id)
        }
    )
