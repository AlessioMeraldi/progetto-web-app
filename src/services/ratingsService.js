// Supabase imports
import { supabase } from "./supabaseClient.js";

/**
 * getCharacterRatingStats
 * @param characterId
 * Fetches the average rating and total number of reviews for a specific character
 */
export async function getCharacterRatingStats(characterId) {
    const { data, error } = await supabase
        .from("character_ratings")
        .select("donuts")
        .eq("character_id", characterId);

    if (error) throw error;

    if (data.length === 0) return { average: 0, count: 0 };

    const sum = data.reduce((acc, curr) => acc + curr.donuts, 0);
    return {
        average: (sum / data.length).toFixed(1),
        count: data.length
    };
}

/**
 * getUserRating
 * @param characterId
 * @param userEmail
 * Checks if a specific user has already rated this character
 */
export async function getUserRating(characterId, userEmail) {
    const { data, error } = await supabase
        .from("character_ratings")
        .select("donuts")
        .eq("character_id", characterId)
        .eq("user_email", userEmail)
        .maybeSingle();

    if (error) throw error;
    return data ? data.donuts : 0;
}

/**
 * saveRating
 * @param characterId
 * @param userEmail
 * @param donuts
 * Saves or updates a user's rating (upsert logic)
 */
export async function saveRating(characterId, userEmail, donuts) {
    const { error } = await supabase
        .from("character_ratings")
        .upsert({
            character_id: characterId,
            user_email: userEmail,
            donuts: donuts
        }, { onConflict: 'character_id, user_email' });

    if (error) {
        console.error("Error saving rating:", error);
        throw error;
    }
}

/**
 * getTopFiveCharacters
 * Fetches the top 5 rated characters from the dedicated database view
 */
export async function getTopFiveCharacters() {
    const { data, error } = await supabase
        .from("top_rated_characters")
        .select("*");

    if (error) {
        console.error("Error fetching leaderboard:", error);
        throw error;
    }
    return data;
}