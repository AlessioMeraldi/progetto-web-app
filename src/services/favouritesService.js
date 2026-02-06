// Supabase imports
import { supabase } from "./supabaseClient.js";

/**
 * getUserFavourites
 * @param userEmail
 * Fetches user's favourites saved in Supabase, alongside the user's email (for identification)
 * @returns {Promise<*[]>}
 */
export async function getUserFavourites (userEmail) {

    // get data from remote DB
    const { data, error } = await supabase
        .from("favourites_characters")
        .select("character_id")
        .eq("user_email", userEmail) // email is used to know in the DB which user saved which character
    ;

    if (error) {
        console.error(error);
        throw error;
    }

    return data.map(f => f.character_id);
}

/**
 * addFavourite
 * @param characterId
 * @param userEmail
 * Saves a favourite character in the Supabase DB, associating the favourite with the user's email
 * @returns {Promise<void>}
 */
export async function addFavourite (characterId, userEmail) {

    // .from('where to insert data') , .insert(value-to-insert)
    await supabase
        .from("favourites_characters")
        .insert({
            character_id: characterId,
            user_email: userEmail,
            })
        ;
}

/**
 * removeFavourite
 * @param characterId
 * @param userEmail
 * Removes a previously saved favourite character in the Supabase DB, associated with the user's email
 * @returns {Promise<void>}
 */
export async function removeFavourite (characterId, userEmail) {

    await supabase
        .from("favourites_characters")
        .delete()
        .eq("character_id", characterId)
        .eq("user_email", userEmail)
    ;

}
